import React, { useState } from 'react';

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    setAIResponse('');
    setTranscript('');

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript.trim();
      setTranscript(speechText);
      recognition.stop();
      setListening(false);
      if (speechText) {
        await handleVoiceCommand(speechText);
      } else {
        setAIResponse("I didn't catch anything. Please try again.");
        speakOutLoud("I didn't catch anything. Please try again.");
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      recognition.stop();
      setListening(false);
      setAIResponse("Oops! Something went wrong with voice recognition.");
      speakOutLoud("Oops! Something went wrong with voice recognition.");
    };

    recognition.start();
  };

  const getAIResponse = async (text) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.toLowerCase().trim() }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.reply) {
        return data.reply;
      } else {
        console.error('Bad response format or error:', data);
        return "Sorry, I couldn't understand that.";
      }
    } catch (error) {
      console.error("API call failed:", error);
      setLoading(false);
      return "There was an error talking to the assistant.";
    }
  };

  const speakOutLoud = (message) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("Speech Synthesis not supported.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const handleVoiceCommand = async (text) => {
    const aiReply = await getAIResponse(text);
    setAIResponse(aiReply);
    speakOutLoud(aiReply);
  };

  return (
    <div className="voice-box">
      <h2>🎤 Voice Assistant</h2>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Talking'}
      </button>

      {transcript && (
        <div className="transcript-box">
          <strong>🗣️ You said:</strong> {transcript}
        </div>
      )}

      {loading && (
        <div className="transcript-box">
          <em>Processing your request...</em>
        </div>
      )}

      {aiResponse && !loading && (
        <div className="transcript-box">
          <strong>🤖 AI Response:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
