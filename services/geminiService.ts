import { GoogleGenAI, Type } from "@google/genai";
import { DocumentContent, TitleSuggestion } from "../types";

// Helper to convert File to base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. OCR: Extract structured text from handwriting
export const transcribeHandwriting = async (file: File): Promise<DocumentContent> => {
  const ai = getAIClient();
  const base64Data = await fileToGenerativePart(file);

  // Using a multimodal capable model. 'gemini-2.5-flash-latest' maps to a recent flash version.
  const modelId = 'gemini-flash-latest'; 

  const prompt = `
    Analyze this image of a handwritten document. 
    Transcribe the content exactly as written.
    Attempt to identify the Title, Author, and Body paragraphs.
    If there is no clear title, leave the title field empty.
    If there is no clear subtitle, leave the subtitle field empty.
    If there is no clear author, leave the author field empty.
    
    Return the result in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { inlineData: { mimeType: file.type, data: base64Data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            author: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ['body']
        }
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);

    return {
      title: json.title || "",
      subtitle: json.subtitle || "",
      author: json.author || "",
      body: json.body || "",
      extractedFromImage: true,
    };
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to transcribe image.");
  }
};

// 2. AI Enhancement: Generate Titles/Subtitles if missing
export const generateCreativeTitles = async (body: string): Promise<TitleSuggestion[]> => {
  const ai = getAIClient();
  // Using a strong text model for reasoning
  const modelId = 'gemini-3-flash-preview';

  const prompt = `
    Read the following text content carefully.
    The user has not provided a title or needs better title options.
    Analyze the story background, emotional tone, and core conflict.
    
    Generate 3 distinct title options in the following styles:
    1. Literary (Artistic, metaphorical)
    2. Documentary (Descriptive, factual)
    3. Minimalist (Short, punchy, abstract)

    For each title, also generate a matching subtitle (a golden sentence from the text or a summary).

    Content:
    "${body.substring(0, 3000)}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              style: { type: Type.STRING, enum: ['Literary', 'Documentary', 'Minimalist'] },
              subtitle: { type: Type.STRING }
            },
            required: ['title', 'style', 'subtitle']
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text) as TitleSuggestion[];
  } catch (error) {
    console.error("Title Generation Error:", error);
    // Fallback if AI fails
    return [
      { title: "Untitled Draft", style: "Minimalist", subtitle: "Please review your content" }
    ];
  }
};
