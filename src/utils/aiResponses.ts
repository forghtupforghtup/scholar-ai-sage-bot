export const generateAIResponse = async (prompt: string, subject: string): Promise<string> => {
  const apiKey = (window as any).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;

  if (!apiKey) {
    return "❌ No API key provided. Please enter your GPT-4 key first.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful and intelligent tutor who explains things clearly. The user is asking about: ${subject}.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return `❌ Error from GPT API: ${errorData.error?.message || response.statusText}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "⚠️ GPT-4 gave an empty response.";
  } catch (err: any) {
    return `❌ Network or API error: ${err.message}`;
  }
};
