
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEncouragement = async (score: number): Promise<string> => {
  try {
    const prompt = `You are a fun and encouraging friend for a 9-year-old girl named Nia who is learning multiplication. She just answered a question correctly! Her new score is ${score}. Write a short, exciting, and positive message for her. Keep it under 20 words. Be creative, use emojis, and maybe mention stars, gems, or superpowers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating encouragement:", error);
    return "You're a math whiz! 🎉 Keep going!";
  }
};

export const generateHint = async (num1: number, num2: number, incorrectAnswer: number): Promise<string> => {
  try {
    const prompt = `You are a gentle and helpful tutor for a 9-year-old girl named Nia. She is practicing multiplication. She tried to answer ${num1} x ${num2} but said ${incorrectAnswer}, which is incorrect. Give her a simple, kind hint to help her find the right answer without giving it away. For example, you could suggest counting by ${num1}, ${num2} times, or relate it to a simpler multiplication fact she might know. Keep it to one or two sentences.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating hint:", error);
    return `That's close! Have you tried counting by ${Math.min(num1, num2)}s? You can do it!`;
  }
};
