# VisionX — Real-Time AI Object Detection System

![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![COCO-SSD](https://img.shields.io/badge/COCO--SSD-Object%20Detection-00F5FF?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-7B2FFF?style=flat-square)

**VisionX** is a production-ready, browser-based real-time object detection system with a NASA mission control / engineering dashboard interface. Powered by TensorFlow.js and the COCO-SSD model, it detects 80 object classes live from your webcam — no server, no install, no API keys.

---

## Live Demo

> 🚀 **Live Demo:** _Coming soon — deploy to GitHub Pages or Vercel_

```bash
# Run locally
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome.

---

## Features

- **Real-time detection** — 80 COCO object classes via webcam at up to 60 FPS
- **Mission control UI** — NASA/Iron Man HUD engineering dashboard with live telemetry
- **Configurable engine** — Adjustable confidence threshold, max detections, and inference interval
- **Live telemetry** — FPS graph, detection log, stats bar, and detected objects panel
- **Category-coded bounding boxes** — Color-coded by object type (person, vehicle, animal, etc.)
- **Frame capture** — Export annotated PNG snapshots with one click
- **WebGL acceleration** — GPU-accelerated inference with automatic WASM fallback
- **Error handling** — Camera permission guides, model retry, and graceful degradation
- **Zero dependencies** — Pure HTML/CSS/JS, loads TF.js from CDN

---

## How It Works

```
Webcam Feed → TensorFlow.js (WebGL) → COCO-SSD Model → Bounding Boxes → Canvas Overlay
                     ↓
              Detection Log + Stats + FPS Graph + Object Panel
```

1. **Page load** — VisionX runs an initialization sequence, loads TensorFlow.js and the COCO-SSD model (~8MB)
2. **Start Detection** — Requests webcam access at 1280×720 resolution
3. **Inference loop** — `requestAnimationFrame` drives detection at your configured interval
4. **Filtering** — Predictions are filtered by confidence threshold and capped at max detections
5. **Rendering** — Bounding boxes and labels are drawn on a canvas overlay with category colors
6. **Telemetry** — FPS, stats, object list, and detection log update in real time

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome** | ✅ Recommended | Best WebGL performance, full feature support |
| **Edge** | ✅ Supported | Chromium-based, same performance as Chrome |
| **Firefox** | ✅ Supported | Good support, slightly lower FPS |
| **Safari** | ⚠️ Limited | WebGL works but may have camera permission quirks |
| **Mobile** | ⚠️ Limited | Works but performance varies; desktop recommended |

**Requirements:** Webcam, WebGL (or WASM fallback), HTTPS or localhost for camera access.

---

## Performance Tips

- Use **Chrome** with **WebGL** enabled for best FPS
- Ensure **good lighting** — detection accuracy drops significantly in low light
- Lower the **detection interval** (e.g. 33ms) for smoother boxes; raise it (e.g. 100ms) to save CPU
- Set **confidence threshold** to 0.5–0.7 to reduce false positives
- Close other GPU-heavy tabs to free WebGL resources
- Use a **720p or 1080p** webcam for optimal balance of speed and accuracy

---

## Controls

| Control | Description |
|---------|-------------|
| **Confidence Threshold** | Minimum score (0.1–0.9) for a detection to be shown |
| **Max Detections** | Cap simultaneous detections (1–20) |
| **Detection Interval** | Milliseconds between inference runs (16–200ms) |
| **Start / Stop** | Begin or halt the detection pipeline |
| **Capture Frame** | Download current frame with bounding boxes as PNG |
| **Clear Log** | Reset the detection event log |

---

## All 80 COCO Detectable Classes

| # | Class | Category | # | Class | Category |
|---|-------|----------|---|-------|----------|
| 1 | person | Person | 41 | wine glass | Food |
| 2 | bicycle | Vehicle | 42 | cup | Food |
| 3 | car | Vehicle | 43 | fork | Food |
| 4 | motorcycle | Vehicle | 44 | knife | Food |
| 5 | airplane | Vehicle | 45 | spoon | Food |
| 6 | bus | Vehicle | 46 | bowl | Food |
| 7 | train | Vehicle | 47 | banana | Food |
| 8 | truck | Vehicle | 48 | apple | Food |
| 9 | boat | Vehicle | 49 | sandwich | Food |
| 10 | traffic light | Other | 50 | orange | Food |
| 11 | fire hydrant | Other | 51 | broccoli | Food |
| 12 | stop sign | Other | 52 | carrot | Food |
| 13 | parking meter | Other | 53 | hot dog | Food |
| 14 | bench | Furniture | 54 | pizza | Food |
| 15 | bird | Animal | 55 | donut | Food |
| 16 | cat | Animal | 56 | cake | Food |
| 17 | dog | Animal | 57 | chair | Furniture |
| 18 | horse | Animal | 58 | couch | Furniture |
| 19 | sheep | Animal | 59 | potted plant | Furniture |
| 20 | cow | Animal | 60 | bed | Furniture |
| 21 | elephant | Animal | 61 | dining table | Furniture |
| 22 | bear | Animal | 62 | toilet | Furniture |
| 23 | zebra | Animal | 63 | tv | Electronics |
| 24 | giraffe | Animal | 64 | laptop | Electronics |
| 25 | backpack | Sports | 65 | mouse | Electronics |
| 26 | umbrella | Other | 66 | remote | Electronics |
| 27 | handbag | Other | 67 | keyboard | Electronics |
| 28 | tie | Other | 68 | cell phone | Electronics |
| 29 | suitcase | Other | 69 | microwave | Electronics |
| 30 | frisbee | Sports | 70 | oven | Electronics |
| 31 | skis | Sports | 71 | toaster | Electronics |
| 32 | snowboard | Sports | 72 | sink | Other |
| 33 | sports ball | Sports | 73 | refrigerator | Electronics |
| 34 | kite | Sports | 74 | book | Other |
| 35 | baseball bat | Sports | 75 | clock | Other |
| 36 | baseball glove | Sports | 76 | vase | Furniture |
| 37 | skateboard | Sports | 77 | scissors | Other |
| 38 | surfboard | Sports | 78 | teddy bear | Other |
| 39 | tennis racket | Sports | 79 | hair drier | Electronics |
| 40 | bottle | Food | 80 | toothbrush | Other |

### Bounding Box Colors by Category

| Category | Color | Classes |
|----------|-------|---------|
| Person | Cyan `#00F5FF` | person |
| Vehicles | Amber `#FFB800` | car, bus, truck, motorcycle, bicycle, train, boat, airplane |
| Animals | Green `#00FF88` | bird, cat, dog, horse, sheep, cow, elephant, bear, zebra, giraffe |
| Furniture | Violet `#7B2FFF` | chair, couch, bed, dining table, toilet, bench, potted plant, vase |
| Electronics | Coral `#FF6B6B` | tv, laptop, mouse, remote, keyboard, cell phone, microwave, oven, toaster, refrigerator, hair drier |
| Food | Orange `#FF8C00` | bottle, wine glass, cup, fork, knife, spoon, bowl, banana, apple, sandwich, orange, broccoli, carrot, hot dog, pizza, donut, cake |
| Sports | Teal `#00D4AA` | frisbee, skis, snowboard, sports ball, kite, baseball bat, baseball glove, skateboard, surfboard, tennis racket, backpack |
| Other | Light Violet `#A0A0FF` | All remaining classes |

---

## Project Structure

```
VisionX/
├── index.html      # Dashboard markup
├── style.css       # Mission control theme & layout
├── script.js       # Detection engine & UI logic
├── README.md       # Documentation
└── .gitignore
```

---

## Tech Stack

- **[TensorFlow.js](https://www.tensorflow.org/js)** — Browser ML runtime with WebGL backend
- **[COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)** — Single-shot object detection (MobileNetV2)
- **HTML5 Canvas** — Bounding box overlay and FPS graph rendering
- **getUserMedia API** — Webcam access
- **Google Fonts** — JetBrains Mono + Inter

---

## License

MIT License — free to use, modify, and distribute.

---

Built with ❤️ by **Poovarasu S** | CodeAlpha AI Internship 2026
