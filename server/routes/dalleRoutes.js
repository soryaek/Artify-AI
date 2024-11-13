import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAI } from 'openai';
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});

router.route('/').get((req, res) => {
    res.send('Hello from DALLE-E!');
})

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body; // from client
        openai.createImage
        const apiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        const image = apiResponse.data.data[0].b64_json;

        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error?.message);
    }
})

export default router;