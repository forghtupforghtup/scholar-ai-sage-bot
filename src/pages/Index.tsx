import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Calculator, Atom, Globe, Palette, Code, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import ChatMessage from '@/components/ChatMessage';
import SubjectSelector from '@/components/SubjectSelector';
import { generateAIResponse } from '@/utils/aiResponses';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  subject?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI Study Assistant. I can help you with any academic question - from multiple choice questions to complex topics. Ask me anything!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      subject: selectedSubject,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      // Pass conversation history to AI (exclude welcome message)
      const conversationHistory = messages.slice(1).map(msg => ({
        content: msg.content,
        sender: msg.sender
      }));
      
      const aiResponse = await generateAIResponse(inputValue, selectedSubject, conversationHistory);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        subject: selectedSubject,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const subjects = [
    { id: 'general', name: 'General', icon: Brain, color: 'bg-purple-500' },
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' },
    { id: 'science', name: 'Science', icon: Atom, color: 'bg-green-500' },
    { id: 'history', name: 'History', icon: Globe, color: 'bg-orange-500' },
    { id: 'literature', name: 'Literature', icon: BookOpen, color: 'bg-red-500' },
    { id: 'arts', name: 'Arts', icon: Palette, color: 'bg-pink-500' },
    { id: 'computer', name: 'Computer Science', icon: Code, color: 'bg-indigo-500' },
  ];

  const currentSubject = subjects.find(s => s.id === selectedSubject);
  const CurrentIcon = currentSubject?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="h-8 w-8 text-purple-400" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EduAI Assistant</h1>
              <p className="text-slate-400 text-sm">Your intelligent study companion powered by GitHub AI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Subject Selector */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-green-400">
                <Bot className="h-4 w-4" />
                <span className="text-sm font-medium">GitHub AI Ready!</span>
              </div>
              <p className="text-green-300 text-xs mt-1">
                Securely connected via Supabase. Ask any question!
              </p>
            </div>
            <SubjectSelector 
              subjects={subjects}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {CurrentIcon && (
                    <div className={`p-2 rounded-lg ${currentSubject?.color}`}>
                      <CurrentIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {currentSubject?.name || 'General'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      GitHub AI ready to help via secure Supabase connection!
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className="ml-auto bg-green-500/20 text-green-400 border-green-500/50"
                >
                  AI Connected
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-slate-700 rounded-2xl px-4 py-3 max-w-xs">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="bg-slate-700/50 p-4 border-t border-slate-600/50">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="bg-slate-800 border-slate-600 text-white placeholder-slate-400 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-slate-500 text-xs mt-2 text-center">
                Ask multiple choice questions, request explanations, or get help with any topic!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
