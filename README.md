# 🤖 V-AIVA: Vision & Voice AI Assistant

![V-AIVA Banner](https://user-images.githubusercontent.com/0000000/vision-voice-ai.jpg)  
*A Smart Assistant that Sees, Hears, and Speaks.*  
<br/>

> V-AIVA is an accessible, web-based AI assistant that integrates **real-time object detection**, **speech recognition**, and **natural language response**. Designed for inclusivity, it empowers users—especially the visually impaired—with **auditory feedback** for both visual and spoken inputs.

---

## 🌟 Key Features

- 🧠 **Real AI Chat** with language model backend (e.g., LLaMA/GPT)
- 🗣️ **Speech-to-Text** via Web Speech API
- 🔊 **Text-to-Speech** response using Web Speech Synthesis
- 📸 **Object Detection** with TensorFlow.js + COCO-SSD
- ⚡ **Real-time Feedback** via canvas overlay and audio
- 🌙 **Dark Mode** for Accessibility
- 📱 **Mobile-Ready** architecture (React Native transition-ready)

---

## 🚀 Live Demo

[🔗 Click here to try V-AIVA](https://your-deployment-link.vercel.app/)  
*(Note: Works best on Chromium browsers with webcam and mic access.)*

---

## 🧰 Tech Stack

| Frontend       | Backend       | ML/AI         | Tools & Plugins         |
|----------------|---------------|---------------|--------------------------|
| React.js       | Node.js       | COCO-SSD (TF.js) | Vite, Web Speech API     |
| HTML + SCSS    | Express.js    | GPT/LLaMA via Ollama | TensorFlow.js, Canvas API |
| React Hooks    | REST APIs     | TFLite (planned mobile) | dotenv, concurrently      |

---

## 📁 Project Structure

```
vision-voice-mvp/
├── public/
├── src/
│   ├── components/
│   │   ├── CameraFeed.jsx
│   │   ├── VoiceCommand.jsx
│   │   └── ObjectOverlay.jsx
│   ├── App.jsx
│   ├── App.scss
│   └── main.jsx
├── server/
│   └── index.js
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Installation & Setup

> Follow the steps below to clone and run V-AIVA locally.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- Webcam & Microphone access
- Browser: Chrome or Edge recommended

### 💻 Clone the Repository

```bash
git clone https://github.com/shreess9/team10.git
cd team10/vision-voice-mvp
```

### 📦 Install Dependencies

```bash
npm install
```

### 🧠 Run the Backend (AI/Chat Server)

```bash
cd server
npm install
npm run start
```

### 💡 Run the Frontend

```bash
cd ..
npm run dev
```

> Visit `http://localhost:5173` in your browser.

---

## 🧪 How It Works

### 🎥 Object Detection

```js
import * as cocoSsd from '@tensorflow-models/coco-ssd';
const model = await cocoSsd.load();
const predictions = await model.detect(videoRef.current);
```

- Uses `TensorFlow.js` COCO-SSD to detect real-world objects in webcam feed.
- Detected objects are drawn using `<canvas>`.

### 🗣️ Voice Commands

```js
const recognition = new window.webkitSpeechRecognition();
recognition.onresult = (e) => {
  const voiceText = e.results[0][0].transcript;
  handleUserQuery(voiceText);
};
```

- Captures voice and converts to text.
- Queries backend or object detection module.

### 🔊 Voice Response

```js
const utterance = new SpeechSynthesisUtterance(response);
speechSynthesis.speak(utterance);
```

- Speaks back results to help visually impaired users.

---

## 🔌 Plugins & Packages

| Package               | Purpose                        |
|-----------------------|--------------------------------|
| @tensorflow-models/coco-ssd | Object detection model    |
| react-speech-recognition | Voice input handling       |
| react-speech-kit       | Text-to-speech utility       |
| react-router-dom       | Navigation                   |
| express + dotenv       | Backend chat processing      |
| vite                   | Blazing-fast frontend dev    |

---

## 📲 Mobile Deployment (Coming Soon)

- `React Native + Expo`
- `expo-camera`, `expo-speech`, `TensorFlow Lite`
- Voice-first UI for the blind
- Offline inference support with `tflite-react-native`

---

## 🧠 Future Enhancements

- 🤝 Integration with **Ollama**, **LangChain**, or **LLaMA CPP**
- 🌐 Translation and multilingual voice support
- 🔐 User personalization with local storage
- 📱 Full mobile deployment with **TFLite**

---

## 👨‍💻 Kudos to Team V-AIVA 👏

This project is brought to life by a passionate and hardworking team:

**Team Members**  
- 🧠 Pavitha  
- 🗣️ Sanjay  
- 🎯 Rohith  
- 🎨 Arun  
- 💻 Vikasini  
- 🚀 Shree Sangamithrai *(Team Lead)*

> Built with ❤️, caffeine ☕, and the vision of a more inclusive AI world.

---

## 🌍 License

This project is licensed under the [MIT License](LICENSE).

---

## 📣 Connect With Us

Feel free to raise issues or suggest features via the [GitHub Issues Page](https://github.com/shreess9/team10/issues).

---

## 🙌 Acknowledgements

- OpenAI, TensorFlow, Google, Mozilla Web APIs  
- Hackathons & mentors who inspired this innovation  
- Community of developers building inclusive AI tools  

> _"The best way to predict the future is to invent it."_ — Alan Kay

---
