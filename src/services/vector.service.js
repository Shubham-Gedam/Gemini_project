// Import the Pinecone library
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding

const geminiproIndex = pc.Index("gemini-pro");

export async function createMemory({ vectors, metadata, messageId }) {
  await geminiproIndex.upsert([
    {
      id: messageId,
      values: vectors,
      metadata,
    },
  ]);
}

export async function queryMemory({ queryvector, limit = 5, metadata }) {
  const data = await geminiproIndex.query({
    vector: queryvector,
    topK: limit,
    filter: metadata ?  metadata  : undefined,
    includeMetadata: true,
  });
  return data.matches;
}
