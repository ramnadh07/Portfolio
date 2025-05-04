
'use server';
/**
 * @fileOverview A chatbot flow for Ramalingeswara Nadh's portfolio.
 *
 * - portfolioChat - A function that handles the chatbot conversation.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import type {MessageData} from 'genkit'; // Import MessageData type

// Define the input schema for a single message part
const MessagePartSchema = z.object({
  text: z.string(),
  // Add other parts if needed, e.g., media: z.object({ url: z.string() })
});

// Define the input schema for a full message (user or model)
// Internal schema, not exported
const InternalMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'tool']), // Added 'system', 'tool'
  content: z.array(MessagePartSchema),
});
type InternalMessageType = z.infer<typeof InternalMessageSchema>;


// Define the input schema for the chat flow
const PortfolioChatInputSchema = z.object({
  history: z.array(InternalMessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
// Internal type, not exported
type PortfolioChatInputType = z.infer<typeof PortfolioChatInputSchema>;

// Define the output schema for the chat flow
const PortfolioChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response message.'),
});
// Internal type, not exported
type PortfolioChatOutputType = z.infer<typeof PortfolioChatOutputSchema>;


// Wrapper function to call the flow - This is the only export
export async function portfolioChat(input: PortfolioChatInputType): Promise<PortfolioChatOutputType> {
  return portfolioChatFlow(input);
}

// Convert internal Zod schemas to Genkit MessageData format
function convertToMessageData(messages: InternalMessageType[]): MessageData[] {
    return messages.map(msg => ({
        role: msg.role,
        content: msg.content.map(part => ({ text: part.text })) // Assuming only text parts for now
    }));
}


// Define the Genkit flow
const portfolioChatFlow = ai.defineFlow<
  typeof PortfolioChatInputSchema,
  typeof PortfolioChatOutputSchema
>(
  {
    name: 'portfolioChatFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    // Construct the prompt messages including history and the new user message
    const messages: MessageData[] = [
        { role: 'system', content: [{ text: `You are a helpful, professional AI assistant for Ramalingeswara Nadh's portfolio website. Your goal is to answer questions about Ram's skills, experience, projects, and professional background based on the typical information found in a portfolio.

        Key areas of expertise include:
        - Business Analysis (Requirements Elicitation, Process Modeling, Stakeholder Analysis, UAT)
        - Functional Consulting (CRM/ERP configuration - Salesforce/Dynamics conceptual, Solution Design, Fit-Gap)
        - Business Strategy & GTM (Market Analysis, Competitive Intelligence, Business Cases, Pursuits, Proposal Support)
        - Technical Skills (SQL, Data Analysis, Agile/Scrum, SDLC)
        - Domains: E-commerce, Healthcare Tech, Manufacturing, FinTech, EdTech, SaaS.

        Maintain a polite and helpful tone. If asked about topics outside of Ram's professional portfolio or capabilities, politely decline to answer or steer the conversation back to relevant topics. Do not invent information not typically found in a portfolio context. Keep responses concise and informative.` }] },
        ...convertToMessageData(history), // Add existing history
        { role: 'user', content: [{ text: message }] } // Add the new user message
    ];


    const llmResponse = await ai.generate({
      prompt: messages, // Pass the constructed messages array
      // Optionally add config like temperature, maxOutputTokens if needed
       // config: { temperature: 0.7 }
    });

    return {
        response: llmResponse.text ?? "I'm sorry, I couldn't generate a response at this moment.",
    };
  }
);

// Removed export of MessageSchema and types PortfolioChatInput, PortfolioChatOutput
