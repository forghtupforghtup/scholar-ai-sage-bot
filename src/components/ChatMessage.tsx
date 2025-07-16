
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
    // Clean up the content first - remove weird slash artifacts
    const cleanContent = content
      .replace(/\/\s*\/\s*\/\s*/g, '') // Remove multiple slashes with spaces
      .replace(/\/\s+/g, ' ') // Replace slash followed by spaces with just space
      .replace(/\s+\/\s+/g, ' ') // Replace spaces-slash-spaces with just space
      .replace(/\/+/g, '') // Remove any remaining multiple slashes
      .replace(/\\n/g, '\n') // Convert literal \n to actual newlines
      .trim();

    const lines = cleanContent.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); // Trim each line

      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          result.push(
            <div
              key={`code-${i}`}
              className="bg-slate-900 rounded-lg p-3 my-2 font-mono text-sm border border-slate-600 overflow-x-auto"
            >
              <pre className="whitespace-pre-wrap">{codeBuffer.join('\n')}</pre>
            </div>
          );
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      if (line === '') {
        result.push(<div key={`empty-${i}`} className="h-2" />);
        continue;
      }

      if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        result.push(
          <div key={i} className="font-bold text-purple-300 mb-2">
            {line.replace(/\*\*/g, '')}
          </div>
        );
        continue;
      }

      if (line.startsWith('- ')) {
        result.push(
          <div key={i} className="ml-4 mb-1 flex items-start gap-2">
            <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
            <span className="flex-1">{line.substring(2)}</span>
          </div>
        );
        continue;
      }

      // Handle inline bold text
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-300">$1</strong>');

      result.push(
        <div 
          key={i} 
          className="mb-1" 
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    }

    return result;
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
