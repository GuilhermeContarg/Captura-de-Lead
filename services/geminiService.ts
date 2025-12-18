
import { GoogleGenAI, Type } from "@google/genai";
import { Lead } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const prospectLeads = async (keyword: string): Promise<{ leads: Lead[], sources: any[] }> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as a senior B2B Data Engineer. Perform a deep discovery for businesses based on the keyword: "${keyword}".
    
    TASKS:
    1. Discovery: Find at least 10 real businesses matching this keyword.
    2. Extraction: For each business, find their Business Name, Website, Phone, Address, and Email (if publicly available).
    3. AI Validation: Verify if the business truly belongs to the requested niche.
    4. Contact Formatting: Normalize phone numbers. Identify if they likely use WhatsApp.
    
    Output the data strictly as a JSON array of objects.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          leads: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                businessName: { type: Type.STRING },
                legalName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                hasWhatsApp: { type: Type.BOOLEAN },
                website: { type: Type.STRING },
                address: { type: Type.STRING },
                niche: { type: Type.STRING },
                relevanceScore: { type: Type.NUMBER },
                confidence: { type: Type.STRING },
              },
              required: ["businessName", "website", "phone", "email", "address"],
            },
          },
        },
        required: ["leads"],
      },
    },
  });

  const rawText = response.text || "{}";
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return { leads: [], sources: [] };
  }

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return {
    leads: parsed.leads || [],
    sources: sources,
  };
};
