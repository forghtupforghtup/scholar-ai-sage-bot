
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  subject?: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success('Message copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy message');
    }
  };

  const formatContent = (content: string) => {
    // Split content by lines and format with proper spacing
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Handle different types of formatting
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-bold text-purple-300 mb-2">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      
      if (line.startsWith('- ')) {
        return (
          <div key={index} className="ml-4 mb-1 flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }

      if (line.includes('```')) {
        return (
          <div key={index} className="bg-slate-900 rounded-lg p-3 my-2 font-mono text-sm border border-slate-600">
            {line.replace(/```/g, '')}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }

      return (
        <div key={index} className="mb-1">
          {line}
        </div>
      );
    });
  };

  if (message.sender === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-purple-600 rounded-2xl px-4 py-3 max-w-md text-white">
          <div className="whitespace-pre-wrap">{message.content}</div>
          <div className="text-purple-200 text-xs mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div className="bg-purple-600 p-2 rounded-full">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-full">
        <Bot className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 max-w-4xl">
        <div className="bg-slate-700 rounded-2xl px-4 py-3 text-white">
          <div className="whitespace-pre-wrap leading-relaxed">
            {formatContent(message.content)}
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-600">
            <div className="text-slate-400 text-xs">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-white hover:bg-slate-600 h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-green-400 hover:bg-slate-600 h-8 w-8 p-0"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-red-400 hover:bg-slate-600 h-8 w-8 p-0"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
