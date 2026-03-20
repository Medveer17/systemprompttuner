import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, data } = await req.json();
  const knowledgeBase = data?.knowledgeBase || "No data loaded.";

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `KNOWLEDGE BASE CONTEXT: ${knowledgeBase}`,
    messages,
  });

  return result.toDataStreamResponse();
}
