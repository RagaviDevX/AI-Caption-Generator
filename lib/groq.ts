import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateCaptions(imageUrl: string, tone: string = "viral"): Promise<{
  instagram: string;
  youtube: string;
  linkedin: string;
  hashtags: string;
}> {
  const toneGuides: Record<string, string> = {
    viral: "Create viral, engaging content that drives maximum shares and engagement",
    funny: "Create witty, humorous content that makes people laugh and share",
    luxury: "Create sophisticated, aspirational content that conveys exclusivity and premium quality",
    emotional: "Create heartfelt, emotionally resonant content that creates deep connections",
    professional: "Create polished, professional content suitable for business audiences",
    inspirational: "Create motivational, uplifting content that inspires action",
  };

  const toneGuide = toneGuides[tone] || toneGuides.viral;

  const userPrompt = `You are a viral social media copywriter. ${toneGuide}.

Analyze this image and respond ONLY with valid JSON (no markdown):
{
  "instagram": "Hook + story + emojis + CTA + 3 hashtags (max 300 chars)",
  "youtube": "SEO title + description + CTA to subscribe (max 500 chars)",
  "linkedin": "Professional insight + value + CTA (max 400 chars)",
  "hashtags": "25 hashtags: #tag1 #tag2 ... mix of popular and niche"
}

Tone: ${tone}`;

  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } },
          { type: "text", text: userPrompt },
        ],
      },
    ],
    max_tokens: 1024,
    temperature: 0.85,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  return {
    instagram: parsed.instagram || "",
    youtube: parsed.youtube || "",
    linkedin: parsed.linkedin || "",
    hashtags: parsed.hashtags || "",
  };
}

export default groq;
