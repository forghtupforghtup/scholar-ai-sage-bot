
export const generateAIResponse = async (question: string, subject: string): Promise<string> => {
  // Comprehensive educational AI responses based on subject and question type
  const responses = {
    math: {
      keywords: ['equation', 'solve', 'algebra', 'calculus', 'geometry', 'trigonometry', 'derivative', 'integral', 'limit', 'function'],
      responses: [
        "Let me break down this mathematical concept step by step:\n\n**Understanding the Problem:**\n- First, identify what we're looking for\n- Note any given information\n- Choose the appropriate method\n\n**Solution Process:**\n1. Set up the equation/formula\n2. Substitute known values\n3. Solve systematically\n4. Check your answer\n\n**Key Tips:**\n- Always show your work\n- Double-check calculations\n- Consider if your answer makes sense\n\nWould you like me to work through a specific example?",
        "Great math question! Here's how to approach this:\n\n**Core Concept:**\nThis involves understanding the fundamental principles and applying them correctly.\n\n**Step-by-Step Method:**\n- Break down complex problems into smaller parts\n- Use visual aids like graphs or diagrams when helpful\n- Practice similar problems to build confidence\n\n**Common Mistakes to Avoid:**\n- Rushing through calculations\n- Forgetting to check units\n- Not verifying final answers\n\nWhat specific area would you like to focus on?"
      ]
    },
    science: {
      keywords: ['chemistry', 'physics', 'biology', 'reaction', 'force', 'energy', 'molecule', 'cell', 'experiment'],
      responses: [
        "Excellent science question! Let's explore this systematically:\n\n**Scientific Method Approach:**\n1. Observation and question formation\n2. Hypothesis development\n3. Experimental design\n4. Data collection and analysis\n5. Conclusion drawing\n\n**Key Concepts to Remember:**\n- All scientific phenomena follow natural laws\n- Evidence-based reasoning is crucial\n- Reproducibility validates findings\n\n**Study Strategy:**\n- Connect concepts to real-world examples\n- Use diagrams and visual models\n- Practice with lab scenarios\n\nWhat specific scientific principle would you like to dive deeper into?",
        "This is a fascinating area of science! Here's how to master it:\n\n**Understanding the Fundamentals:**\n- Identify the basic principles involved\n- Connect to previously learned concepts\n- Recognize patterns and relationships\n\n**Practical Application:**\n- Relate theory to everyday phenomena\n- Work through sample problems\n- Conduct thought experiments\n\n**For AP Success:**\n- Focus on understanding, not memorization\n- Practice explaining concepts clearly\n- Connect multiple topics together\n\nWhich aspect would you like to explore further?"
      ]
    },
    history: {
      keywords: ['war', 'revolution', 'empire', 'civilization', 'treaty', 'democracy', 'constitution', 'culture'],
      responses: [
        "Great historical inquiry! Let's analyze this systematically:\n\n**Historical Analysis Framework:**\n- **Context:** What was happening at the time?\n- **Cause and Effect:** What led to this event?\n- **Significance:** Why does this matter?\n- **Perspective:** Who were the key players?\n\n**Critical Thinking Approach:**\n1. Examine primary sources\n2. Consider multiple viewpoints\n3. Identify bias and perspective\n4. Connect to broader themes\n\n**For AP History Success:**\n- Practice document-based questions (DBQs)\n- Understand chronological thinking\n- Make connections across time periods\n\nWhat specific historical period or event interests you most?",
        "Excellent question about this historical topic! Here's how to approach it:\n\n**Understanding Historical Significance:**\n- Immediate impact on society\n- Long-term consequences\n- Connections to modern issues\n\n**Key Study Strategies:**\n- Create timelines for context\n- Use maps to understand geography's role\n- Compare different historical interpretations\n\n**Essay Writing Tips:**\n- Start with a clear thesis\n- Use specific historical evidence\n- Address counterarguments\n- Connect to broader historical themes\n\nWhich aspect of this topic would you like to explore in more depth?"
      ]
    },
    literature: {
      keywords: ['poem', 'novel', 'character', 'theme', 'symbolism', 'metaphor', 'analysis', 'author', 'rhetoric'],
      responses: [
        "Wonderful literary question! Let's analyze this thoughtfully:\n\n**Literary Analysis Framework:**\n- **Plot and Structure:** How is the story organized?\n- **Character Development:** How do characters change?\n- **Theme:** What deeper meanings emerge?\n- **Style and Technique:** How does the author craft their message?\n\n**Close Reading Strategies:**\n1. Read actively with annotations\n2. Identify literary devices\n3. Consider historical context\n4. Analyze author's choices\n\n**For AP Literature Success:**\n- Practice with timed essays\n- Develop sophisticated vocabulary\n- Connect texts to broader themes\n- Support arguments with textual evidence\n\nWhat specific work or concept would you like to explore?",
        "Great literature question! Here's how to approach literary analysis:\n\n**Understanding Literary Elements:**\n- Character motivations and development\n- Setting's influence on plot\n- Symbolic meanings and metaphors\n- Author's use of language and style\n\n**Critical Analysis Skills:**\n- Identify patterns and connections\n- Consider multiple interpretations\n- Evaluate author's effectiveness\n- Relate to universal themes\n\n**Writing Strong Essays:**\n- Develop clear thesis statements\n- Use specific textual evidence\n- Explain significance of quotes\n- Maintain formal academic tone\n\nWhich literary work or concept interests you most?"
      ]
    },
    general: {
      keywords: ['study', 'learn', 'exam', 'test', 'homework', 'assignment', 'grade', 'college', 'AP'],
      responses: [
        "I'm here to help you succeed academically! Here's my approach to your question:\n\n**Comprehensive Study Strategy:**\n- Break down complex topics into manageable parts\n- Use multiple learning methods (visual, auditory, kinesthetic)\n- Practice active recall and spaced repetition\n- Connect new information to what you already know\n\n**For Academic Success:**\n1. Set clear, achievable goals\n2. Create a consistent study schedule\n3. Seek help when needed\n4. Review regularly, not just before tests\n\n**AP Class Tips:**\n- Understand the exam format early\n- Practice with real AP questions\n- Focus on both content and skills\n- Use official College Board resources\n\nWhat specific subject or study challenge can I help you with?",
        "Excellent question! I'm designed to help students like you excel in your studies. Here's how I can assist:\n\n**My Capabilities:**\n- Explain complex concepts clearly\n- Provide step-by-step problem solving\n- Offer study strategies and tips\n- Help with homework and assignments\n- Prepare you for tests and AP exams\n\n**Study Success Framework:**\n- **Understand:** Grasp the underlying concepts\n- **Practice:** Apply knowledge through problems\n- **Review:** Regularly revisit material\n- **Connect:** Link ideas across subjects\n\n**Let's Get Specific:**\nWhat subject, assignment, or concept would you like to work on? The more specific your question, the better I can help you succeed!\n\nRemember: There's no such thing as a 'stupid question' - asking for help is how we learn and grow!"
      ]
    }
  };

  // Determine the most relevant response category
  const questionLower = question.toLowerCase();
  let category = subject === 'general' ? 'general' : subject;
  
  // Check for specific keywords to refine category
  for (const [key, data] of Object.entries(responses)) {
    if (data.keywords.some(keyword => questionLower.includes(keyword))) {
      category = key;
      break;
    }
  }

  // Special handling for specific question types
  if (questionLower.includes('ap ') || questionLower.includes('advanced placement')) {
    const apResponse = `**AP-Specific Guidance:**\n\nFor AP classes, success requires mastering both content knowledge and exam skills:\n\n**Content Mastery:**\n- Understand key concepts deeply, not just memorization\n- Practice connecting ideas across units\n- Use official AP resources and past exams\n\n**Exam Strategy:**\n- Familiarize yourself with question formats\n- Practice time management\n- Learn to analyze and synthesize information quickly\n\n**Study Schedule:**\n- Review material regularly throughout the year\n- Create concept maps linking related topics\n- Form study groups with classmates\n\nWhat specific AP subject or topic would you like help with? I can provide targeted strategies for any AP course!`;
    return apResponse;
  }

  if (questionLower.includes('how to study') || questionLower.includes('study tips')) {
    return `**Effective Study Strategies:**\n\n**Active Learning Techniques:**\n- Teach concepts to someone else\n- Create your own practice questions\n- Use the Feynman Technique (explain in simple terms)\n- Make concept maps and visual aids\n\n**Time Management:**\n- Use the Pomodoro Technique (25 min focused study + 5 min break)\n- Prioritize difficult subjects when your mind is fresh\n- Break large assignments into smaller tasks\n\n**Memory Enhancement:**\n- Space out your review sessions\n- Use mnemonics for complex information\n- Connect new info to what you already know\n- Practice retrieval (test yourself without notes)\n\n**Subject-Specific Tips:**\n- Math/Science: Practice problems daily\n- History/Literature: Create timelines and character maps\n- Languages: Use spaced repetition for vocabulary\n\nWhat specific subject would you like study strategies for?`;
  }

  // Get appropriate response set
  const responseSet = responses[category as keyof typeof responses] || responses.general;
  const randomResponse = responseSet.responses[Math.floor(Math.random() * responseSet.responses.length)];

  // Add personalized elements based on question content
  let personalizedResponse = randomResponse;

  if (questionLower.includes('difficult') || questionLower.includes('hard') || questionLower.includes('struggling')) {
    personalizedResponse += "\n\n**Remember:** Every expert was once a beginner. The fact that you're asking questions shows you're on the right path to mastering this concept!";
  }

  if (questionLower.includes('exam') || questionLower.includes('test')) {
    personalizedResponse += "\n\n**Test Prep Bonus:**\n- Start reviewing at least a week before the exam\n- Practice under timed conditions\n- Get plenty of sleep before test day\n- Stay calm and read questions carefully";
  }

  return personalizedResponse;
};
