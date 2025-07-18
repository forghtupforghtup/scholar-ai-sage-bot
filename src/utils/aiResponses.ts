
import { supabase } from '@/integrations/supabase/client';

export const generateAIResponse = async (question: string, subject: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('github-ai-chat', {
      body: { question, subject }
    });

    if (error) {
      console.error('Error calling AI function:', error);
      return getFallbackResponse(question, subject);
    }

    return data.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error calling AI function:', error);
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
