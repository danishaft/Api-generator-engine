import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.OPENAI_API_KEY,
});
const modelName = "gpt-4o-mini"

// Schema for request validation
const RequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty"),
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const validation = RequestSchema.safeParse({ query });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Generate schema using OpenAI
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content: `You are a JSON Schema generator. Based on a provided description of data, generate a valid JSON Schema adhering to the following guidelines:  
1. Assign appropriate data types (e.g., string, number, boolean, array, object) to each field.  
2. Include required fields only when they are explicitly or contextually essential.  
3. Use clear and descriptive property names that align with the data's purpose.  
4. Provide brief, meaningful descriptions for all complex fields to enhance schema clarity.  
5. Ensure compliance with the official JSON Schema specification in the generated output.
6. Return only the JSON Schema, without any additional text or explanations or characters.  `
        },
        {
          role: "user",
          content: `Generate a JSON Schema for this data description: ${query}`
        }
      ],
      temperature: 1,
      max_tokens: 1000,
    });

    console.log(completion.choices[0].message.content);

    // Parse and validate the schema
    const schemaStr = completion.choices[0].message.content || '';
    if (!schemaStr) {
      throw new Error('No schema generated');
    }
    const schema = JSON.parse(schemaStr);

    return NextResponse.json({ schema });
  } catch (error) {
    console.error('Error generating schema:', error);
    return NextResponse.json(
      { error: 'Failed to generate schema' },
      { status: 500 }
    );
  }
}