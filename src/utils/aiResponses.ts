
export const generateAIResponse = async (question: string, subject: string): Promise<string> => {
  // Your GitHub API key is embedded directly
  const apiKey = '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';
  
  if (!apiKey) {
    console.error('GitHub API key not configured');
    return getFallbackResponse(question, subject);
  }

  try {
    // Using GitHub Models API endpoint
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'EduAI-Assistant',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert AI tutor specializing in ${subject === 'general' ? 'all academic subjects' : subject}. You help students with homework, explain concepts clearly, solve problems step-by-step, and provide detailed explanations for multiple choice questions. 

For multiple choice questions:
- Analyze each option (A, B, C, D)
- Explain why the correct answer is right
- Explain why the incorrect answers are wrong
- Provide context and background information

Always be encouraging, educational, and thorough in your explanations. Use formatting like **bold** for emphasis and bullet points for clarity.`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response Error:', response.status, errorText);
      
      // Try to parse as JSON, fallback to text
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('API Response received successfully');
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error calling GitHub AI API:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        console.error('Authentication failed - API key may be invalid or expired');
        return "**API Key Issue:** The GitHub API key appears to be invalid or expired. Please check if the key is still active in your GitHub settings and has the necessary permissions for AI models.";
      }
      
      if (error.message.includes('429')) {
        return "**Rate Limit:** The AI service is currently busy. Please wait a moment and try again.";
      }
      
      if (error.message.includes('403')) {
        return "**Permission Error:** The API key doesn't have access to AI models. Please ensure your GitHub account has access to GitHub Models.";
      }
    }
    
    return getFallbackResponse(question, subject);
  }
};

// Fallback responses when API is not available
const getFallbackResponse = (question: string, subject: string): string => {
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('(a)') || questionLower.includes('(b)') || questionLower.includes('(c)') || questionLower.includes('(d)')) {
    return `**Multiple Choice Question Detected!**

I can see this is a multiple choice question. To give you the detailed analysis you need (like explaining why each option is correct or incorrect), I need to be connected to a real AI service.

**What I would do with real AI:**
- Analyze each option (A, B, C, D) individually
- Explain the reasoning behind the correct answer
- Show why the other options are incorrect
- Provide background context and study tips

**To get real AI responses:**
1. Enter your GitHub API key in the yellow box above
2. Ask your question again for detailed analysis!

**Study tip:** Even without AI, try to eliminate obviously wrong answers first, then choose between the remaining options based on your knowledge of the topic.`;
  }

  if (questionLower.includes('help') || questionLower.includes('explain') || questionLower.includes('how')) {
    return `**I'd love to help explain this topic!**

For detailed explanations and step-by-step breakdowns, I need to be connected to a real AI service like GitHub's AI.

**What real AI can do for you:**
- Explain complex concepts in simple terms
- Provide step-by-step solutions
- Give examples and analogies
- Answer follow-up questions
- Adapt explanations to your level

**To unlock real AI help:**
1. Enter your GitHub API key above in the yellow "Connect Real AI" box
2. Ask any question for intelligent responses!

**Subject: ${subject}**
I'm ready to help with any topic in ${subject} once connected to real AI!`;
  }

  return `**Ready to help with ${subject}!**

I can see you want to ask about ${subject}. To give you the intelligent, detailed responses you deserve (like ChatGPT), I need to connect to a real AI service.

**What you'll get with real AI:**
✓ Detailed explanations for any topic
✓ Step-by-step problem solving
✓ Multiple choice question analysis
✓ Personalized study advice
✓ Follow-up questions and clarification

**Quick setup:**
1. Enter your GitHub API key in the yellow box above
2. Start getting real AI responses!

Ask me anything once connected - from basic concepts to complex problems!`;
};
