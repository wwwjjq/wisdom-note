import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";
import { getRandomFallbackQuotes } from "../data/quotes";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

const TOPICS = [
  "毛泽东思想经典语录，充满力量、辩证法或革命乐观主义精神",
  "老子（道德经）或庄子的道家智慧，强调顺其自然、逍遥游、辩证看待得失",
  "深刻的人生哲理语录，关于人性、成长、选择或命运",
  "温暖治愈的语录，简短有力，适合抚慰人心，缓解焦虑"
];

export const fetchMixedQuotes = async (): Promise<Quote[]> => {
  // Randomly select 2 topics to mix in this batch to keep it diverse but focused
  const shuffledTopics = [...TOPICS].sort(() => 0.5 - Math.random()).slice(0, 2);
  const topicsStr = shuffledTopics.join("、");

  const prompt = `请生成10条语录。语录的类型需要混合以下主题：${topicsStr}。
  要求：
  1. 每条语录的内容必须简短，严格控制在40个字以内，确保在手机屏幕上展示不超过4行。
  2. 必须以标准JSON数组格式返回，包含语录内容(content)、作者(author)和出处(source，如果没有则留空)。
  3. 内容必须是中文。不要包含重复的语录。
  4. 确保语录内容精辟、有深度。`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              author: { type: Type.STRING },
              source: { type: Type.STRING },
            },
            required: ["content", "author"],
          },
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response");

    const parsedData = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("API Error (using fallback data):", error);
    // Return a random set from our local database to ensure the app works offline or in restricted regions
    return getRandomFallbackQuotes(10);
  }
};
