# VisionX — Real-Time AI Object Detection

**Detect anything. Instantly. In real-time.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TensorFlow](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[Live Demo: https://visionnx.vercel.app](https://visionnx.vercel.app)

## About
VisionX is a high-performance, real-time object detection web application. It leverages the power of TensorFlow.js and the pre-trained COCO-SSD (Common Objects in Context - Single Shot MultiBox Detector) model to identify and locate up to 80 different classes of objects directly in your browser. With a clean, minimal UI and hardware-accelerated WebGL processing, VisionX delivers smooth and accurate computer vision capabilities without requiring any backend servers.

## Features
✅ **Real-Time Detection**: Processes live webcam feeds to detect objects instantaneously.
✅ **80 Object Classes**: Capable of identifying a wide variety of everyday objects, animals, vehicles, and more.
✅ **Client-Side Inference**: 100% of the AI processing happens in your browser via TensorFlow.js, ensuring privacy and low latency.
✅ **Interactive Controls**: Adjust confidence thresholds and maximum object limits on the fly.
✅ **FPS Monitoring**: Built-in frames-per-second tracker to monitor inference performance.
✅ **Snapshot Capture**: Capture and save frames with bounding boxes directly to your device.
✅ **Clean Minimal UI**: A modern, dark-themed interface built with vanilla HTML/CSS.

## How It Works
VisionX is powered by **TensorFlow.js** and the **COCO-SSD** model.
- **WebGL Acceleration**: TensorFlow.js utilizes your device's GPU via WebGL to accelerate mathematical operations, allowing for real-time video frame processing.
- **Detection Pipeline**: 
  1. The app requests access to your webcam using the MediaDevices API.
  2. Video frames are continuously drawn and passed to the COCO-SSD model.
  3. The model outputs an array of predictions, including the class name, confidence score, and bounding box coordinates `[x, y, width, height]`.
  4. An HTML5 Canvas overlays the video, drawing accurate bounding boxes and rendering live detection pills for the user.

## Detectable Objects
VisionX can detect the following 80 COCO classes:

| Category | Objects |
| :--- | :--- |
| **People** | Person |
| **Vehicles** | Bicycle, Car, Motorcycle, Airplane, Bus, Train, Truck, Boat |
| **Animals** | Bird, Cat, Dog, Horse, Sheep, Cow, Elephant, Bear, Zebra, Giraffe |
| **Sports** | Frisbee, Skis, Snowboard, Sports ball, Kite, Baseball bat, Baseball glove, Skateboard, Surfboard, Tennis racket |
| **Food** | Bottle, Wine glass, Cup, Fork, Knife, Spoon, Bowl, Banana, Apple, Sandwich, Orange, Broccoli, Carrot, Hot dog, Pizza, Donut, Cake |
| **Furniture** | Chair, Couch, Potted plant, Bed, Dining table, Toilet, Sink, Vase |
| **Electronics** | TV, Laptop, Mouse, Remote, Keyboard, Cell phone, Microwave, Oven, Toaster, Refrigerator, Hair drier |
| **Other** | Backpack, Umbrella, Handbag, Tie, Suitcase, Book, Clock, Scissors, Teddy bear, Toothbrush |

## Tech Stack
- **HTML5**: Structure and Semantic Layout
- **CSS3**: Custom Minimal Styling, Flexbox, Animations
- **JavaScript (Vanilla)**: Application Logic, Media Capture, Canvas Rendering
- **TensorFlow.js**: Web-based Machine Learning Framework
- **COCO-SSD**: Pre-trained Object Detection Model

## How to Run

1. Clone the repository:
```bash
git clone https://github.com/poovarasu638178-rgb/CodeAlpha_VisionX.git
cd CodeAlpha_VisionX
```

2. Start a local server:
```bash
python3 -m http.server 8080
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## Project Structure
```text
CodeAlpha_VisionX/
├── index.html     # Main application layout and UI
├── style.css      # Minimal dark-theme styling
├── script.js      # TensorFlow.js logic and UI interactions
├── favicon.png    # App icon and logo
└── README.md      # Project documentation
```

## Author
Built by **Poovarasu S**
- GitHub: [poovarasu638178-rgb](https://github.com/poovarasu638178-rgb)
- Internship: CodeAlpha AI Internship 2026
- Student ID: CA/DF1/126353

## License
This project is licensed under the MIT License.

---
⭐ *If you found this project helpful or interesting, please consider starring the repository!*
