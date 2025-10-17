// src/components/chatbot/generators/index.js
import { GoogleGenerativeAI } from "@google/generative-ai";
// Import prompt config
import promptConfig from './promptConfig.json';


console.log("API Key loaded?", import.meta.env.VITE_GEMINI_API_KEY);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

// AI model
const MODEL = "gemini-2.0-flash-lite";

// Count limit
let requestCount = 0;
const MAX_REQUESTS_PER_SESSION = 10;

// detect from user session, browser, or default
const language = 'en';
const systemInstruction = promptConfig[language];

// Rule-based fallback (simple, safe)
export async function paraphraseRuleBased(text) {
    return `🤖 ${text}`;
}

// Gemini-powered paraphrase (optional)
export async function paraphraseGemini(prompt, history = []) {
    if (!genAI) {
        console.error("API Key not found. Using rule-based fallback.");
        return paraphraseRuleBased(prompt);
    }

    if (requestCount >= MAX_REQUESTS_PER_SESSION) {
        console.warn("API usage limit reached. Falling back to rule-based.");
        return 'No hay más charla con la IA - esto no es el patio del recreo.'
    }

    try {
        requestCount++;
        const model = genAI.getGenerativeModel({ model: MODEL });
        // Build message context ####
        const contents = [
            {
                role: "user",
                parts: [{ text: systemInstruction }]
            },
            ...history.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            })),
            { role: "user", parts: [{ text: prompt }] }
        ];

        // const result = await model.generateContent(prompt);
        const result = await model.generateContent({
            // contents: [{ role: "user", parts: [{ text: prompt }] }],
            contents,
            generationConfig: {
                maxOutputTokens: 60, // ⬅️ hard limit on length
                temperature: 0.0,     // tweak for more/less creativity
                topP: 0.1,             // focused, avoids rambling
            },
        });
        const responseText = result?.response?.text();
        return responseText ? responseText : "Sorry, I couldn't generate a response. Please try again.";
    } catch (err) {
        console.error("Gemini error:", err);
        return "An error occurred while connecting to the AI. Please try again later.";
    }
}
