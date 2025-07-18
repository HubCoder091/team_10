const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const cleaned = message?.toLowerCase().trim();

  try {
    let reply;

    // Hardcoded responses
    if (!cleaned) {
      reply = "I didn't catch that. Could you please repeat?";
    } else if (/\b(hi|hello|hey)\b/.test(cleaned)) {
      reply = "Hi there! How can I assist you today?";
    } else if (/\b(weather|climate|forecast)\b/.test(cleaned)) {
      reply = "It's sunny and bright outside!";
    } else if (/\btime\b/.test(cleaned)) {
      reply = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (/\b(date|day|today)\b/.test(cleaned)) {
      reply = `Today's date is ${new Date().toLocaleDateString()}`;
    } else {
      // Use Ollama LLaMA model as fallback for everything else
      const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: message,
          stream: false
        })
      });

      const data = await ollamaResponse.json();
      reply = data.response?.trim() || "I'm trying my best, but I couldn't come up with an answer.";
    }

    res.json({ reply });

  } catch (error) {
    console.error('🔥 Error from server:', error);
    res.status(500).json({ error: 'Failed to generate a response' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running locally at http://localhost:${PORT}`);
});
