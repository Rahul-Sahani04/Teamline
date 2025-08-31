import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<boolean>;
  sending: boolean;
}

export function MessageInput({ onSendMessage, sending }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    const success = await onSendMessage(message.trim());
    if (success) {
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={sending}
        className="flex-1"
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!message.trim() || sending}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
}