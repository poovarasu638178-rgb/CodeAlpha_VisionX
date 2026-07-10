/**
 * VisionX — Real-Time AI Object Detection System
 * Clean Minimal Version
 */

(function () {
  'use strict';

  // Config
  const CLASS_COLORS = {
    person: '#00F5FF',
    vehicle: '#7B2FFF',
    animal: '#00FF88',
    furniture: '#FF3366',
    electronics: '#FFB800',
    food: '#FF8C00',
    sports: '#00D4AA',
    other: '#A0A0FF',
  };

  const CLASS_MAP = {
    person: 'person', bicycle: 'vehicle', car: 'vehicle', motorcycle: 'vehicle',
    airplane: 'vehicle', bus: 'vehicle', train: 'vehicle', truck: 'vehicle',
    boat: 'vehicle', bird: 'animal', cat: 'animal', dog: 'animal', horse: 'animal',
    sheep: 'animal', cow: 'animal', elephant: 'animal', bear: 'animal', zebra: 'animal',
    giraffe: 'animal', backpack: 'other', umbrella: 'other', handbag: 'other',
    tie: 'other', suitcase: 'other', frisbee: 'sports', skis: 'sports', snowboard: 'sports',
    'sports ball': 'sports', kite: 'sports', 'baseball bat': 'sports', 'baseball glove': 'sports',
    skateboard: 'sports', surfboard: 'sports', 'tennis racket': 'sports', bottle: 'food',
    'wine glass': 'food', cup: 'food', fork: 'food', knife: 'food', spoon: 'food', bowl: 'food',
    banana: 'food', apple: 'food', sandwich: 'food', orange: 'food', broccoli: 'food',
    carrot: 'food', 'hot dog': 'food', pizza: 'food', donut: 'food', cake: 'food',
    chair: 'furniture', couch: 'furniture', 'potted plant': 'furniture', bed: 'furniture',
    'dining table': 'furniture', toilet: 'furniture', tv: 'electronics', laptop: 'electronics',
    mouse: 'electronics', remote: 'electronics', keyboard: 'electronics', 'cell phone': 'electronics',
    microwave: 'electronics', oven: 'electronics', toaster: 'electronics', sink: 'furniture',
    refrigerator: 'electronics', book: 'other', clock: 'other', vase: 'furniture',
    scissors: 'other', 'teddy bear': 'other', 'hair drier': 'electronics', toothbrush: 'other'
  };

  // State
  let model = null;
  let isRunning = false;
  let stream = null;
  let animationId = null;
  
  let confidenceThreshold = 0.5;
  let maxDetections = 10;
  let currentDetections = [];
  
  // FPS
  let frameTimestamps = [];
  let currentFps = 0;

  // DOM
  const $ = (id) => document.getElementById(id);
  const dom = {
    statusDot: document.querySelector('.status-dot'),
    statusText: document.querySelector('.status-text'),
    webcam: $('webcam'),
    overlayCanvas: $('overlayCanvas'),
    offlineState: $('offlineState'),
    loadingState: $('loadingState'),
    errorState: $('errorState'),
    startBtn: $('startBtn'),
    stopBtn: $('stopBtn'),
    captureBtn: $('captureBtn'),
    retryBtn: $('retryBtn'),
    fpsCounter: $('fpsCounter'),
    confidenceSlider: $('confidenceSlider'),
    confidenceValue: $('confidenceValue'),
    maxDetectionsSlider: $('maxDetectionsSlider'),
    maxDetectionsValue: $('maxDetectionsValue'),
    detectedList: $('detectedList'),
  };

  const overlayCtx = dom.overlayCanvas.getContext('2d');

  function getColor(className) {
    return CLASS_COLORS[CLASS_MAP[className]] || CLASS_COLORS.other;
  }

  function setStatus(state) {
    dom.statusDot.className = 'status-dot';
    
    if (state === 'loading') {
      dom.statusDot.classList.add('status-dot--loading');
      dom.statusText.textContent = 'Model Loading';
    } else if (state === 'ready') {
      dom.statusDot.classList.add('status-dot--ready');
      dom.statusText.textContent = 'Model Ready';
    } else if (state === 'live') {
      dom.statusDot.classList.add('status-dot--live');
      dom.statusText.textContent = 'Live Detection';
    }
  }

  function showVideoState(state) {
    dom.offlineState.classList.add('hidden');
    dom.loadingState.classList.add('hidden');
    dom.errorState.classList.add('hidden');
    
    if (state === 'offline') dom.offlineState.classList.remove('hidden');
    if (state === 'loading') dom.loadingState.classList.remove('hidden');
    if (state === 'error') dom.errorState.classList.remove('hidden');
    
    if (state === 'live') {
      dom.webcam.classList.add('active');
      dom.overlayCanvas.classList.add('active');
    } else {
      dom.webcam.classList.remove('active');
      dom.overlayCanvas.classList.remove('active');
    }
  }

  async function loadModel() {
    try {
      setStatus('loading');
      await tf.ready();
      model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
      setStatus('ready');
      return true;
    } catch (err) {
      console.error('Model load failed', err);
      return false;
    }
  }

  async function initCamera() {
    try {
      showVideoState('loading');
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      dom.webcam.srcObject = stream;
      await dom.webcam.play();
      
      dom.overlayCanvas.width = dom.webcam.videoWidth;
      dom.overlayCanvas.height = dom.webcam.videoHeight;
      
      showVideoState('live');
      return true;
    } catch (err) {
      console.error('Camera error', err);
      showVideoState('error');
      return false;
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    dom.webcam.srcObject = null;
    showVideoState('offline');
  }

  function calculateFps() {
    const now = performance.now();
    frameTimestamps.push(now);
    if (frameTimestamps.length > 10) frameTimestamps.shift();
    if (frameTimestamps.length >= 2) {
      const elapsed = frameTimestamps[frameTimestamps.length - 1] - frameTimestamps[0];
      currentFps = Math.round(((frameTimestamps.length - 1) / elapsed) * 1000);
      dom.fpsCounter.textContent = `${currentFps} FPS`;
    }
  }

  function drawBoundingBoxes(predictions) {
    const ctx = overlayCtx;
    const cw = dom.overlayCanvas.width;
    const ch = dom.overlayCanvas.height;
    
    ctx.clearRect(0, 0, cw, ch);
    
    const scaleX = cw / dom.webcam.videoWidth;
    const scaleY = ch / dom.webcam.videoHeight;

    predictions.forEach((pred) => {
      const [x, y, w, h] = pred.bbox;
      const sx = x * scaleX;
      const sy = y * scaleY;
      const sw = w * scaleX;
      const sh = h * scaleY;
      
      const color = getColor(pred.class);
      const conf = Math.round(pred.score * 100);
      const label = `${pred.class} ${conf}%`;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(sx, sy, sw, sh);
      
      ctx.font = '600 13px Inter, sans-serif';
      const tw = ctx.measureText(label).width;
      
      ctx.fillStyle = color;
      ctx.fillRect(sx, sy - 24, tw + 16, 24);
      
      ctx.fillStyle = '#000000';
      ctx.fillText(label, sx + 8, sy - 7);
    });
  }

  function updatePills(predictions) {
    if (predictions.length === 0) {
      dom.detectedList.innerHTML = '<div class="detected-empty">No objects detected</div>';
      return;
    }
    
    const unique = {};
    predictions.forEach(p => {
      if (!unique[p.class] || p.score > unique[p.class].score) {
        unique[p.class] = p;
      }
    });
    
    const sorted = Object.values(unique).sort((a,b) => b.score - a.score);
    
    dom.detectedList.innerHTML = sorted.map(pred => {
      const conf = Math.round(pred.score * 100);
      return `<div class="detected-pill">${pred.class} <span>${conf}%</span></div>`;
    }).join('');
  }

  async function detectionLoop() {
    if (!isRunning) return;
    
    calculateFps();
    
    try {
      const raw = await model.detect(dom.webcam);
      currentDetections = raw
        .filter(p => p.score >= confidenceThreshold)
        .sort((a,b) => b.score - a.score)
        .slice(0, maxDetections);
        
      drawBoundingBoxes(currentDetections);
      updatePills(currentDetections);
    } catch (e) { }
    
    animationId = requestAnimationFrame(detectionLoop);
  }

  async function startDetection() {
    if (isRunning) return;
    if (!model) await loadModel();
    
    const ok = await initCamera();
    if (!ok) return;
    
    isRunning = true;
    dom.startBtn.classList.add('hidden');
    dom.stopBtn.classList.remove('hidden');
    setStatus('live');
    
    detectionLoop();
  }

  function stopDetection() {
    isRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    stopCamera();
    
    dom.stopBtn.classList.add('hidden');
    dom.startBtn.classList.remove('hidden');
    setStatus('ready');
    
    overlayCtx.clearRect(0, 0, dom.overlayCanvas.width, dom.overlayCanvas.height);
    dom.detectedList.innerHTML = '<div class="detected-empty">No objects detected</div>';
    dom.fpsCounter.textContent = '-- FPS';
  }

  function captureFrame() {
    if (!dom.webcam.videoWidth) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = dom.webcam.videoWidth;
    canvas.height = dom.webcam.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(dom.webcam, 0, 0);
    
    if (currentDetections.length > 0) {
      currentDetections.forEach((pred) => {
        const [x, y, w, h] = pred.bbox;
        const color = getColor(pred.class);
        const conf = Math.round(pred.score * 100);
        const label = `${pred.class} ${conf}%`;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);
        
        ctx.font = '600 13px Inter, sans-serif';
        const tw = ctx.measureText(label).width;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y - 24, tw + 16, 24);
        
        ctx.fillStyle = '#000000';
        ctx.fillText(label, x + 8, y - 7);
      });
    }
    
    const a = document.createElement('a');
    a.download = `visionx-capture.png`;
    a.href = canvas.toDataURL();
    a.click();
  }

  // Bind Events
  dom.startBtn.addEventListener('click', startDetection);
  dom.stopBtn.addEventListener('click', stopDetection);
  dom.captureBtn.addEventListener('click', captureFrame);
  dom.retryBtn.addEventListener('click', startDetection);
  
  dom.confidenceSlider.addEventListener('input', (e) => {
    confidenceThreshold = parseFloat(e.target.value);
    dom.confidenceValue.textContent = confidenceThreshold.toFixed(2);
  });
  
  dom.maxDetectionsSlider.addEventListener('input', (e) => {
    maxDetections = parseInt(e.target.value, 10);
    dom.maxDetectionsValue.textContent = maxDetections;
  });

  // Initial Load
  window.addEventListener('DOMContentLoaded', async () => {
    await loadModel();
  });

})();
