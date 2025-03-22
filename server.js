const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Modify the prompt to ensure a simple, student-friendly response
    const modifiedPrompt = `You are a friendly tutor helping a student understand a concept. Explain the answer to the following question in a simple, clear, and concise way, as if teaching a beginner. Break the explanation into small, easy-to-understand steps, avoid complex jargon, and include a simple example to illustrate the concept. Here is the question: "${question}"`;

    const result = await model.generateContent(modifiedPrompt);
    const response = await result.response;
    let answer = response.text();

    // Optional: Clean up the response (e.g., remove extra spaces, ensure proper formatting)
    answer = answer.replace(/\n+/g, '\n').trim();

    res.json({ answer });
  } catch (error) {
    console.error('Error fetching response from Gemini API:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});