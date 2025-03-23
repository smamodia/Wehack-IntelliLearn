const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Enhanced prompt for structured response
    const modifiedPrompt = `
      You are a friendly tutor helping a student understand a concept. Provide a clear, concise, and well-formatted answer to the following question. Use the following guidelines:
      - Start with a brief introduction (1-2 sentences).
      - Break the explanation into small, easy-to-understand steps using bullet points (-).
      - Use *bold text* to highlight key terms or important points.
      - Avoid complex jargon and keep the language simple.
      - Include a short, relatable example after the steps to illustrate the concept.
      - End with a one-sentence summary.
      Here is the question: "${question}"
    `;

    const result = await model.generateContent(modifiedPrompt);
    const response = await result.response;
    let answer = response.text();

    // Clean up response formatting
    answer = answer
      .replace(/\n+/g, '\n') // Normalize multiple newlines
      .replace(/^\s+|\s+$/g, '') // Trim whitespace
      .replace(/-\s*/g, '- ') // Ensure bullet point spacing
      .trim();

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
