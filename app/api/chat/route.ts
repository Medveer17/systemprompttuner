import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  // We pull the "Knowledge Base" from the client-side data
  const knowledgeBase = data?.knowledgeBase || "No specific context provided.";

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `You are an expert AI assistant. 
             Use the following Knowledge Base to inform your answers:
             ---
             ${knowledgeBase}
             ---
             If the answer isn't in the knowledge base, use your general knowledge but stay in character.`,
    messages,
  });

  return result.toDataStreamResponse();
}
