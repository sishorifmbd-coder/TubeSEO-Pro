
import { GoogleGenAI, Type } from "@google/genai";
import { SEOResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const optimizeYouTubeVideo = async (videoUrl: string, additionalContext: string): Promise<SEOResult> => {
  const prompt = `
    You are a world-class YouTube SEO expert. 
    Task: Analyze the provided YouTube video link and/or context and provide a comprehensive SEO package.
    
    Video URL: ${videoUrl}
    Additional Context: ${additionalContext}

    If the URL is accessible via search, use that information. 
    Provide the following in your response:
    1. 5 Click-worthy, SEO-optimized Titles.
    2. A comprehensive, keyword-rich video description (approx 300-400 words).
       IMPORTANT FORMATTING RULES FOR DESCRIPTION:
       - Use clean, neat alignment with clear vertical spacing between paragraphs.
       - Incorporate relevant emojis at the beginning of key sentences or sections to make it visually engaging (e.g., 🚀 for growth, 💡 for tips, 📈 for results).
       - Organize the content into clear sections: 'About this Video', 'What You Will Learn', and 'Call to Action'.
       - Ensure sentences are balanced and lines are broken attractively for mobile and desktop viewing.
    3. 15 relevant tags (comma separated).
    4. 5 trending hashtags.
    5. A set of video chapters (timestamps and titles).
    6. A thumbnail concept description.
    7. Definition of the target audience.
    8. 10 high-volume suggested keywords.

    Return only valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      tools: [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          chapters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                title: { type: Type.STRING }
              },
              required: ["timestamp", "title"]
            }
          },
          thumbnailConcept: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          suggestedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["titles", "description", "tags", "hashtags", "chapters", "thumbnailConcept", "targetAudience", "suggestedKeywords"]
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI");
  }
};
