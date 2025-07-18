// components/VoiceCommand.jsx
import React from 'react';

const VoiceCommand = ({ onTranscript }) => {
  const handleListen = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onTranscript(text);
      speak(`You said: ${text}`);
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e);
      onTranscript('');
      speak("Sorry, I didn't catch that.");
    };

    recognition.start();
  };

  const speak = (text) => {
    if (!text || typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return <button onClick={handleListen}>🎙️ Start Speaking</button>;
};

export default VoiceCommand;
