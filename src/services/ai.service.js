import { configDotenv } from 'dotenv';
configDotenv()  
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function generateResponse(content) {
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content
    })
    return response.text
}