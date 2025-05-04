'use client';

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import Image from 'next/image'; // Import Image component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, X, Loader2, Bot, User, Sparkles, HelpCircle, Briefcase, Layers3 } from 'lucide-react'; // Added more icons
import { cn } from '@/lib/utils';
import { portfolioChat } from '@/ai/flows/portfolio-chatbot-flow';
import { z } from 'zod';

// --- Define Schemas and Types locally ---
const MessagePartSchema = z.object({
  text: z.string(),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'tool']),
  content: z.array(MessagePartSchema),
});

const PortfolioChatInputSchema = z.object({
    history: z.array(MessageSchema).describe('The conversation history.'),
    message: z.string().describe('The latest user message.'),
});
type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response message.'),
});
type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

type Message = z.infer<typeof MessageSchema> & { id: string };
// --- End Local Schema/Type Definitions ---

// Predefined prompts
const predefinedPrompts = [
  { text: "What are Ram's key skills?", icon: <Layers3 className="h-4 w-4 mr-1.5" /> },
  { text: "Tell me about Ram's experience.", icon: <Briefcase className="h-4 w-4 mr-1.5" /> },
  { text: "What kind of projects has Ram worked on?", icon: <Sparkles className="h-4 w-4 mr-1.5" /> },
  { text: "How can I contact Ram?", icon: <HelpCircle className="h-4 w-4 mr-1.5" /> },
];


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null); // Ref for the viewport div

   // Add initial welcome message and predefined prompts when chat opens
   useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'bot-welcome',
          role: 'model',
          content: [{ text: "Hello! I'm Aura, Ram's Portfolio Assistant. ✨ I'm here to help answer your questions about his skills, projects, or experience. How can I assist you today?" }],
        }
        // Predefined prompts are now rendered as buttons, not messages
      ]);
    }
   }, [isOpen]); // Only depends on isOpen now


  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]); // Depend on messages


  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 150); // Slightly longer timeout for bottom sheet animation
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Function to handle sending a message (used by form and buttons)
  const sendMessage = async (messageContent: string) => {
    const trimmedMessage = messageContent.trim();
    if (!trimmedMessage || isLoading) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: [{ text: trimmedMessage }],
    };

    // Exclude welcome message from history sent to AI
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);

    setInput(''); // Clear input field
    setIsLoading(true);
    inputRef.current?.focus(); // Keep focus on input

    try {
      const historyForApi = currentMessages
        .filter(msg => msg.id !== 'bot-welcome') // Filter out welcome message
        .map(({ role, content }) => ({ role, content }));

      const chatInput: PortfolioChatInput = PortfolioChatInputSchema.parse({
        history: historyForApi,
        message: trimmedMessage,
      });

      const result: PortfolioChatOutput = await portfolioChat(chatInput);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: [{ text: result.response }],
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
        if (error instanceof z.ZodError) {
             console.error("Chatbot input validation error:", error.errors);
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
      inputRef.current?.focus(); // Refocus input after response/error
    }
  };

  // Handle form submission
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  // Handle predefined prompt button click
  const handlePromptClick = (promptText: string) => {
    setInput(promptText); // Set input field for user confirmation
    sendMessage(promptText); // Immediately send the message
  };


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all hover:scale-105 z-50 border-2 border-background p-0 overflow-hidden" // Added p-0 and overflow-hidden
          aria-label="Open Aura Assistant"
        >
          {/* AI Character Image */}
          <Image
             src="https://picsum.photos/seed/ai-face2/100/100" // Placeholder image URL
             alt="Aura AI Assistant Face"
             width={64} // Match button size
             height={64} // Match button size
             className="object-cover" // Ensure image covers the button area
             data-ai-hint="female friendly ai assistant face illustration" // Hint for image generation
           />
        </Button>
      </SheetTrigger>
      {/* Make SheetContent slide from bottom right */}
      <SheetContent
         side="right" // Changed side, although positioning is manually handled below
         className="fixed bottom-24 right-6 h-[65vh] max-h-[600px] w-[90vw] max-w-[420px] flex flex-col p-0 rounded-lg shadow-xl border border-border/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-[2rem] data-[state=closed]:slide-out-to-right-[0rem] data-[state=open]:slide-in-from-bottom-[2rem] data-[state=open]:slide-in-from-right-[0rem]" // Updated position: bottom-24, right-6. Kept animation classes.
         onOpenAutoFocus={(e) => e.preventDefault()} // Prevent default focus stealing
      >
        <SheetHeader className="p-4 border-b bg-muted/30 flex-shrink-0">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
             {/* You can use a smaller version of the image or an icon here */}
             <Avatar className="h-6 w-6 border">
                <AvatarImage src="https://picsum.photos/seed/ai-face2/40/40" alt="Aura Avatar" data-ai-hint="female ai assistant face illustration small"/>
                 <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
             </Avatar>
             Aura - Portfolio Assistant
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable chat area */}
         <ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
             {/* Viewport needed for direct reference */}
             <div className="h-full p-4 space-y-4" ref={viewportRef}>
                 {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex items-start gap-3",
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                    {message.role === 'model' && (
                        <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                         <AvatarImage src="https://picsum.photos/seed/ai-face2/40/40" alt="Aura Avatar" data-ai-hint="female ai assistant face illustration small"/>
                         <AvatarFallback><Bot className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'rounded-xl p-3 max-w-[85%] break-words text-sm shadow-sm', // Rounded-xl
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none' // User bubble style
                            : 'bg-card text-card-foreground border border-border/50 rounded-bl-none' // Bot bubble style
                        )}
                    >
                        {message.content.map((part, index) =>
                        part.text ? <span key={index}>{part.text}</span> : null
                        )}
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                         <AvatarFallback><User className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="h-8 w-8 border border-border flex-shrink-0">
                            <AvatarImage src="https://picsum.photos/seed/ai-face2/40/40" alt="Aura Avatar" data-ai-hint="female ai assistant face illustration small"/>
                            <AvatarFallback><Bot className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                         <div className="rounded-xl rounded-bl-none p-3 bg-muted text-muted-foreground flex items-center space-x-2 shadow-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Aura is thinking...</span>
                        </div>
                    </div>
                )}
             </div>
        </ScrollArea>

         {/* Predefined Prompts Area */}
         {messages.length <= 1 && !isLoading && ( // Show only initially or if no messages sent yet
             <div className="px-4 pt-2 pb-1 border-t border-border/30 flex-shrink-0">
                 <p className="text-xs text-muted-foreground mb-2 text-center">Or start with a suggestion:</p>
                 <div className="flex flex-wrap justify-center gap-2">
                 {predefinedPrompts.map((prompt) => (
                     <Button
                         key={prompt.text}
                         variant="outline"
                         size="sm"
                         className="text-xs h-auto py-1 px-2.5"
                         onClick={() => handlePromptClick(prompt.text)}
                         disabled={isLoading}
                     >
                         {prompt.icon}
                         {prompt.text}
                     </Button>
                 ))}
                 </div>
             </div>
         )}


        {/* Input area */}
        <SheetFooter className="p-4 border-t bg-background flex-shrink-0">
          <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura about skills, projects..." // Updated placeholder
              className="flex-1"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <Button type="submit" size="icon" variant="secondary" disabled={isLoading || !input.trim()} aria-label="Send message">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;
