import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, subject, conversationHistory } = await req.json();
    
    console.log('Received request with conversation history:', conversationHistory?.length || 0, 'messages');
    
    // Get the GitHub API key from Supabase secrets
    const githubApiKey = Deno.env.get('GITHUB_API_KEY');
    
    if (!githubApiKey) {
      console.error('GITHUB_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured. Please contact administrator.' 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Making request to GitHub AI API for subject:', subject);

    // Build messages array with conversation history
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI tutor specializing in ${subject === 'general' ? 'all academic subjects' : subject}. You help students with homework, explain concepts clearly, solve problems step-by-step, and provide detailed explanations for multiple choice questions. 

For multiple choice questions:
- Analyze each option (A, B, C, D)
- Explain why the correct answer is right
- Explain why the incorrect answers are wrong
- Provide context and background information

Always be encouraging, educational, and thorough in your explanations. Use formatting like **bold** for emphasis and bullet points for clarity.

Remember previous questions and answers in this conversation to provide better context and follow-up responses.`
      }
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Convert conversation history to OpenAI message format
      conversationHistory.forEach(msg => {
        if (msg.sender === 'user') {
          messages.push({
            role: 'user', 
            content: msg.content
          });
        } else if (msg.sender === 'ai') {
          messages.push({
            role: 'assistant',
            content: msg.content
          });
        }
      });
    }

    // Add current question
    messages.push({
      role: 'user',
      content: question
    });

    console.log('Sending', messages.length, 'messages to AI');

    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${githubApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub AI API error:', response.status, errorData);
      
      let errorMessage = 'Failed to get AI response';
      if (response.status === 401) {
        errorMessage = 'API key is invalid or expired';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }), 
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
    
    console.log('Successfully generated AI response');
    
    return new Response(
      JSON.stringify({ content }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in github-ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error. Please try again.' 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});