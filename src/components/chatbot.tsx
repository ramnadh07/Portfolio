
'use client';

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X, Loader2, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioChat } from '@/ai/flows/portfolio-chatbot-flow'; // Import only the flow function
import { z } from 'zod'; // Import Zod

// --- Define Schemas and Types locally ---
// Define the input schema for a single message part
const MessagePartSchema = z.object({
  text: z.string(),
  // Add other parts if needed, e.g., media: z.object({ url: z.string() })
});

// Define the input schema for a full message (user or model)
const MessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'tool']), // Added 'system', 'tool'
  content: z.array(MessagePartSchema),
});

// Define the input type for the chat flow
const PortfolioChatInputSchema = z.object({
    history: z.array(MessageSchema).describe('The conversation history.'),
    message: z.string().describe('The latest user message.'),
});
type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

// Define the output type for the chat flow
const PortfolioChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response message.'),
});
type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

// Define component message type based on Zod schema, adding an ID
type Message = z.infer<typeof MessageSchema> & { id: string };
// --- End Local Schema/Type Definitions ---


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('div'); // Get the viewport element
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }
  }, [messages]);

  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
        // Timeout needed to allow sheet animation to complete
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);


  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMessageContent = input.trim();
    if (!userMessageContent || isLoading) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`, // Simple unique ID
      role: 'user',
      content: [{ text: userMessageContent }],
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for the API call (use locally defined schema)
      const historyForApi = messages.map(({ role, content }) => ({ role, content }));

      // Validate input against the locally defined schema before calling the flow
      const chatInput: PortfolioChatInput = PortfolioChatInputSchema.parse({
        history: historyForApi,
        message: userMessageContent,
      });


      const result: PortfolioChatOutput = await portfolioChat(chatInput);

      const botMessage: Message = {
        id: `bot-${Date.now()}`, // Simple unique ID
        role: 'model',
        content: [{ text: result.response }],
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
        // Handle potential Zod validation errors or API errors
        if (error instanceof z.ZodError) {
             console.error("Chatbot input validation error:", error.errors);
             // Optionally display a user-friendly validation message
             const errorMessage: Message = {
               id: `error-${Date.now()}`,
               role: 'model',
               content: [{ text: 'There was an issue with the message format.' }],
             };
             setMessages((prev) => [...prev, errorMessage]);
        } else {
            console.error("Chatbot error:", error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                role: 'model',
                content: [{ text: 'Sorry, I encountered an error. Please try again.' }],
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    } finally {
      setIsLoading(false);
       // Refocus input after response
       inputRef.current?.focus();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all hover:scale-105 z-50"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0 w-[400px] sm:w-[500px] md:w-[600px] lg:max-w-lg"> {/* Adjusted width */}
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
             <Bot className="h-5 w-5 text-primary"/> Ram's Portfolio Assistant
          </SheetTitle>
          {/* Optional: Add description if needed */}
          {/* <SheetDescription>Ask me anything about Ram's portfolio.</SheetDescription> */}
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
           <div className="p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex items-start gap-3",
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                    {message.role === 'model' && (
                        <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback><Bot className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'rounded-lg p-3 max-w-[80%] break-words text-sm',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                    >
                        {message.content[0].text} {/* Assuming single text part */}
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="h-8 w-8 border border-border">
                         <AvatarFallback><User className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback><Bot className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                         <div className="rounded-lg p-3 bg-muted text-muted-foreground flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
           </div>
        </ScrollArea>

        <SheetFooter className="p-4 border-t bg-background">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, etc..."
              className="flex-1"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;

