LLM API Engine

Build and deploy AI-powered APIs in seconds. The LLM API Engine allows you to create custom APIs that extract structured data from websites using natural language descriptions, powered by LLMs and web scraping technology.

🚀 Features

🤖 Natural Language API Creation – Describe your data needs in plain English.

🔄 Automatic Schema Generation – Powered by OpenAI.

🌐 Intelligent Web Scraping – Uses Firecrawl for real-time data extraction.

⚡ Scheduled Data Updates – Automate recurring scrapes.

🚀 Instant API Deployment – Deploy anywhere, including Vercel and Cloudflare Workers.

📊 Structured Data Output – JSON Schema validation ensures consistent results.

💾 Efficient Caching – Redis-powered storage for optimized performance.

🏗️ Architecture

The LLM API Engine is designed with a modular and flexible architecture:

API Builder – A Next.js application for creating and managing API endpoints.

Consumable Endpoints – Deployable and accessible via:

Cloudflare Workers (Coming Soon)

Vercel Edge Functions

AWS Lambda

Any HTTP-compatible server

This decoupled approach allows you to:

Use Next.js solely for endpoint creation and management.

Deploy your API endpoints separately for performance optimization.

Scale API consumption independently of the management interface.

🛠 Tech Stack

Frontend: Next.js 14, React 18, TailwindCSS

APIs: OpenAI, Firecrawl, Upstash Redis

Data Validation: Zod

Animations: Framer Motion

Deployment: Vercel

🔧 Getting Started

Prerequisites

Ensure you have the following:

Node.js 18+

npm, yarn, or pnpm

Upstash Redis account

OpenAI API key

Firecrawl API key

Installation

Clone the repository:

git clone https://github.com/developersdigest/llm-api-engine.git
cd llm-api-engine

Install dependencies:

npm install

Set up environment variables:
Create a .env file with the following:

OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_FIRECRAWL_API_KEY=your_firecrawl_key
SERPER_API_KEY=your_serper_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
NEXT_PUBLIC_API_ROUTE=http://localhost:3000  # Your API base URL

Run the development server:

npm run dev

Open http://localhost:3000 in your browser.

🚢 Deployment Options

LLM API Engine supports various deployment models:

1️⃣ Builder Interface Only

Deploy the Next.js app for API creation and management.

Use Redis to store configurations.

2️⃣ Independent API Deployment

Deploy generated endpoints anywhere.

Example using Hono with Cloudflare Workers:

import { Hono } from 'hono'
const app = new Hono()

app.get('/api/results/:endpoint', async (c) => {
  const data = await redis.get(`api/results/${c.req.param('endpoint')}`)
  return c.json(data)
})

Supported frameworks:

Cloudflare Workers

Express.js

AWS Lambda

3️⃣ Hybrid Approach

Use the builder for configuration.

Deploy endpoints separately.

Keep configurations synced via Redis.

📌 Usage

1️⃣ Create an API

Enter a natural language description of the data you need.

2️⃣ Generate Schema

The system automatically generates a JSON schema.

3️⃣ Configure Sources

Select websites for data extraction.

4️⃣ Deploy

Deploy instantly and receive a structured API endpoint.

Example Request

curl -X POST "https://your-domain.com/api/deploy" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Extract company name, revenue, and employee count",
    "urls": ["https://example.com/company"],
    "schedule": "0 5 * * *"
  }'

📝 API Documentation

Endpoints

POST /api/generate-schema – Generate JSON schema from description.

POST /api/extract – Extract data from specified URLs.

POST /api/deploy – Deploy a new API endpoint.

GET /api/routes – List all deployed routes.

GET /api/results/:endpoint – Retrieve structured data.

⏳ CRON Implementation (Coming Soon)

Automated data updates via:

Vercel Cron Jobs (Free) – Configure vercel.json:

{
  "crons": [{
    "path": "/api/cron/update",
    "schedule": "0 0 * * *"
  }]
}

Upstash QStash – Advanced scheduling for more frequent updates.

GitHub Actions – Free alternative with flexible scheduling.

📡 API Usage Example

To fetch data from a deployed endpoint:

curl -X GET "${API_ROUTE}/api/results/nvidia-market-cap" \
  -H "Authorization: Bearer sk_your_api_key" \
  -H "Content-Type: application/json"

Response:

{
  "success": true,
  "data": {
    // Extracted data
  },
  "lastUpdated": "2024-01-01T00:00:00.000Z",
  "sources": [
    "https://example.com/source1",
    "https://example.com/source2"
  ]
}

🤝 Contributing

Fork the repository.

Create a feature branch (git checkout -b feature/amazing-feature).

Commit your changes (git commit -m 'Add amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.

📜 License

This project is licensed under the MIT License – see the LICENSE file for details.

💡 Acknowledgments

Built with Next.js

Powered by OpenAI

Web scraping via Firecrawl

Data storage by Upstash