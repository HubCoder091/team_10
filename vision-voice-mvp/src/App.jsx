import React, { useState, useRef } from 'react';
import VoiceCommand from './components/VoiceCommand';
import CameraFeed from './components/CameraFeed';

const App = () => {
  const [response, setResponse] = useState('');
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const lastSpokenTextRef = useRef('');
  const lastDetectedRef = useRef([]);

  const speak = (text) => {
    if (!text || isMuted || text === lastSpokenTextRef.current) return;

    speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(`V-AIVA says: ${text}`);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onend = () => {
      lastSpokenTextRef.current = text;
    };

    speechSynthesis.speak(utterance);
  };

  const handleTranscript = async (transcript) => {
    if (!transcript) return;
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcript }),
      });

      const data = await res.json();
      setResponse(data.reply);
      speak(data.reply);
    } catch (error) {
      console.error('Error:', error);
      const errMsg = 'There was an error talking to the assistant.';
      setResponse(errMsg);
      speak(errMsg);
    }
  };

  const handleDetection = (items) => {
    const newObjects = items.filter((item) => !lastDetectedRef.current.includes(item));
    if (newObjects.length > 0) {
      setDetectedObjects(items);
      lastDetectedRef.current = items;
      speak(`I see: ${newObjects.join(', ')}`);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (!prev) speechSynthesis.cancel(); // Stop speech immediately if muting
      return !prev;
    });
  };

  return (
    <div
      style={{
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        backgroundColor: '#121212',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>🤖 V-AIVA: Vision & Voice AI Assistant</h1>

      {/* 🔇 Mute Toggle */}
      <button
        onClick={toggleMute}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: isMuted ? '#444' : '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isMuted ? '🔇 V-AIVA is Muted' : '🔊 V-AIVA is Speaking'}
      </button>

      <CameraFeed onDetect={handleDetection} />

      {detectedObjects.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>👁️ V-AIVA Detected Objects:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {detectedObjects.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      <VoiceCommand onTranscript={handleTranscript} />

      {response && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3>🧠 V-AIVA's Response:</h3>
          <p style={{ fontSize: '1.1rem' }}>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;
