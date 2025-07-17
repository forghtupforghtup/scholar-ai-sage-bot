
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

const ApiKeyInput = ({ onApiKeySet, hasApiKey }: ApiKeyInputProps) => {
  // Pre-fill with your GitHub API key - replace with your actual key
  const [apiKey, setApiKey] = useState('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');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  // Auto-connect with pre-filled key on component mount
  React.useEffect(() => {
    if (apiKey && !hasApiKey) {
      onApiKeySet(apiKey);
    }
  }, [apiKey, hasApiKey, onApiKeySet]);

  if (hasApiKey) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 text-green-400">
          <Key className="h-4 w-4" />
          <span className="text-sm font-medium">GitHub AI Connected!</span>
        </div>
        <p className="text-green-300 text-xs mt-1">
          You can now ask any question and get intelligent responses.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 text-yellow-400 mb-3">
        <Key className="h-4 w-4" />
        <span className="text-sm font-medium">Connect GitHub AI</span>
      </div>
      <p className="text-yellow-300 text-xs mb-3">
        GitHub API key is pre-filled. Click Connect to activate AI responses.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="gho_..."
            className="bg-slate-800 border-slate-600 text-white text-xs pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Button
          type="submit"
          size="sm"
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
          disabled={!apiKey.trim()}
        >
          Connect
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyInput;
