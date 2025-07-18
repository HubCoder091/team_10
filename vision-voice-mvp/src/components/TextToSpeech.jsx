// components/TextToSpeech.jsx
import { useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }, [text]);

  return (
    <div className="transcript-box">
      <strong>AI Response:</strong> {text}
    </div>
  );
};

export default TextToSpeech;
