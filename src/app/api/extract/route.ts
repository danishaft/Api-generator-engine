import { NextResponse } from 'next/server';
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from 'zod';
import { JsonSchema } from '@/types';

// Initialize Firecrawl with API key
const firecrawl = new FirecrawlApp({
  apiKey: process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || ""
});

// Input validation schema
const requestSchema = z.object({
  urls: z.array(z.string().url()),
  query: z.string(),
  schema: z.object({
    type: z.string(),
    properties: z.record(z.any()),
    required: z.array(z.string()).optional()
  }).passthrough() // You might want to make this more specific based on your schema structure
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request body
    const validatedData = requestSchema.parse(body);
    const { urls, query, schema } = validatedData;

    // Convert JSON schema to Zod schema
    const zodSchema = convertJsonSchemaToZod(schema);

    // Call Firecrawl extract
    const scrapeResult = await firecrawl.extract(urls, {
      prompt: query,
      schema: zodSchema
    });

    if (!scrapeResult.success) {
      throw new Error('Unknown extraction request failed');
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: scrapeResult
    });

  } catch (error) {
    console.error('Extract API error:', error);

    // Handle different types of errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request data', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Helper function to convert JSON schema to Zod schema
function convertJsonSchemaToZod(schema: JsonSchema) {
  if (!schema.properties) {
    throw new Error('Invalid schema: missing properties');
  }

  const zodSchema: Record<string, z.ZodType> = {};
  
  Object.entries(schema.properties).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const propType = value.type;
      
      // Convert JSON schema types to Zod types
      zodSchema[key] = propType === 'string' ? z.string() :
                       propType === 'boolean' ? z.boolean() :
                       propType === 'number' ? z.number() :
                       propType === 'integer' ? z.number().int() :
                       propType === 'array' ? z.array(z.any()) :
                       propType === 'object' ? z.record(z.any()) :
                       z.any();

      // Add description if available
      if (value.description) {
        zodSchema[key] = zodSchema[key].describe(value.description);
      }

      // Handle required fields
      if (schema.required?.includes(key)) {
        zodSchema[key] = zodSchema[key];
      } else {
        zodSchema[key] = zodSchema[key].optional();
      }
    }
  });

  return z.object(zodSchema);
}