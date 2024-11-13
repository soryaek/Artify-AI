import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

router.route('/').get((req, res) => {
    res.send('Hello from Hugging Face Stable Diffusion!');
});

router.route('/').post(async (req, res) => {
    try {
        const { inputs } = req.body; // prompt coming from the client

        console.log("**req.body", req.body)

        if (!inputs) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: inputs,
            }),
        });

        if (!response.ok) {
            // Log the error details to understand why it failed
            const errorDetails = await response.text();
            console.error(`Error: ${response.status} - ${response.statusText}`, errorDetails);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming the API response includes a base64-encoded image in `data[0].generated_image`
        const image = data?.[0]?.generated_image;
        if (!image) {
            throw new Error("Image data not found in the response");
        }

        res.status(200).json({ photo: `data:image/png;base64,${image}` });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: error.message || 'An error occurred while generating the image' });
    }
});

export default router;


// import express from 'express';
// import * as dotenv from 'dotenv';

// import OpenAI from "openai";

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});

// router.route('/').get((req, res) => {
//     res.send('Hello from DALLE-E!');
// })

// router.route('/').post(async(req, res) => {
//     try {
//         const { prompt } = req.body; // from client
//         //openai.createImage
//         const apiResponse = await openai.images.generate({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         })

//         const image = apiResponse.data.data[0].b64_json;

//         res.status(200).json({photo: image});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response?.data?.error?.message);
//     }
// })

// export default router;


