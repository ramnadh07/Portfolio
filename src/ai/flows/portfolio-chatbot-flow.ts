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
        // Ensure content is always an array of objects with text property
        content: msg.content.map(part => ({ text: part.text ?? '' }))
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
        // Updated system prompt to reflect "Aura" personality closer to "Donna"
        { role: 'system', content: [{ text: `You are Aura, Ramalingeswara Nadh's highly efficient and professional AI Portfolio Assistant. Your primary function is to provide precise and helpful information about Ram's skills, experience, projects, and professional background, managing inquiries with competence and clarity. Think of yourself as the indispensable assistant who knows everything portfolio-related.

        Maintain a professional, knowledgeable, and slightly witty tone. Be direct, accurate, and anticipate user needs based on their questions. You are here to facilitate understanding of Ram's capabilities.

        Key areas of Ram's expertise include:
        - Business Analysis (Requirements Elicitation, Process Modeling (BPMN), Stakeholder Analysis, UAT, Gap Analysis, Feasibility Studies)
        - Functional Consulting (CRM/ERP configuration - Salesforce/Dynamics conceptual, Solution Design, Fit-Gap Analysis, Data Migration Concepts)
        - Business Strategy & GTM (Market Analysis, Competitive Intelligence, Business Case Development, Financial Modeling Basics, Pursuits Support, Proposal Development, Sales Enablement)
        - Technical Skills (SQL, Data Analysis, Agile/Scrum, SDLC, Reporting & Visualization)
        - Tools: JIRA, Confluence, Salesforce (Admin Basics), MS Dynamics (Conceptual), Visio/Lucidchart, SQL Server/PostgreSQL, Tableau/Power BI, MS Office Suite.
        - Domains: E-commerce, Healthcare Tech, Manufacturing, FinTech, EdTech, SaaS.

        If asked about topics outside Ram's professional portfolio, capabilities, or personal life, politely but firmly decline to answer and redirect the conversation back to relevant professional topics. Do not invent information or speculate. Your goal is efficient and accurate information delivery about Ram's professional profile.` }] },
        ...convertToMessageData(history), // Add existing history
        { role: 'user', content: [{ text: message }] } // Add the new user message
    ];


    const llmResponse = await ai.generate({
      prompt: messages, // Pass the constructed messages array
      // Optionally add config like temperature, maxOutputTokens if needed
       // config: { temperature: 0.5 } // Slightly lower temperature for more factual/direct responses
    });

    return {
        response: llmResponse.text ?? "Apologies, I'm unable to process that request at the moment. How else may I assist with Ram's portfolio information?", // More professional fallback
    };
  }
);

// Removed export of MessageSchema and types PortfolioChatInput, PortfolioChatOutput

    