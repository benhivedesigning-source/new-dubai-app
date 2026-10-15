import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // Initialize Gemini AI if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (err) {
      console.error('Failed to initialize GoogleGenAI:', err);
    }
  }

  // Safety Assistant API endpoint
  app.post('/api/safety-chat', async (req, res) => {
    try {
      const { message, language } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!ai) {
        // Fallback intelligent response if AI is not configured
        return res.json({
          response: `As your SHIFT Safety Assistant (Demo Mode), I can confirm that for query "${message}", you must adhere to Dubai Distribution Centre Standard Operating Procedures (SOP-LOG-402). Always maintain 3-meter clearance from active forklifts and wear high-visibility vests and steel-toed boots in all operational zones.`,
          sources: [
            { title: 'Warehouse Safety Essentials SOP', section: 'Section 3.2', version: 'v4.2' },
            { title: 'Emergency Evacuation Guide', section: 'Assembly Point B', version: 'v2.1' }
          ]
        });
      }

      const systemInstruction = `You are SHIFT Safety AI Assistant, an expert industrial safety and compliance chatbot for logistics operations at Dubai Distribution Centre. 
Your tone is professional, clear, safety-first, and concise. 
You answer questions regarding warehouse safety, PPE requirements, forklift routes, hazard reporting, and emergency evacuations.
Always cite standard procedures when relevant (e.g., SOP-LOG-402).
If asked about an emergency, remind the user to follow site emergency procedures immediately.
Respond in language: ${language || 'English'}.
Provide your response in JSON format with fields:
- response (string, the conversational answer with clear bullet points if needed)
- sources (array of objects with { title, section, version })`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error('Gemini chat error:', error);
      // Graceful fallback response
      res.json({
        response: `I'm currently unable to connect to the live knowledge base. For your query, please refer to the Warehouse Safety Essentials SOP or contact the Site Safety Officer at extension 4402.`,
        sources: [
          { title: 'General Safety Protocol', section: 'General Rules', version: 'v1.0' }
        ]
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SHIFT server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
