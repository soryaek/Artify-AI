import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";

router.route('/').get((_req, res) => {
    res.send('Hello from Hugging Face Stable Diffusion!');
});

router.route('/').post(async (req, res) => {
    try {
        const { inputs } = req.body;

        if (!inputs) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch(HUGGING_FACE_API_URL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs }),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            return res.status(response.status).json({ error: errorDetails });
        }

        // Fetch image as a buffer and convert to base64
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;

        res.json({ image: base64Image });
        
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: error.message || 'An error occurred while generating the image' });
    }
});

export default router;

