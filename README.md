# API Generator Engine

🚀 **Build and deploy AI-powered APIs in seconds.**  
This project allows you to create custom APIs that extract structured data from websites using natural language descriptions. Powered by **OpenAI**, **Firecrawl**, and **Redis**, it’s designed to make data extraction and API creation as simple as describing what you need in plain English.

---

## Overview

The **LLM API Engine** is a powerful tool for automating data extraction and API creation. Here’s how it works:

1. **Describe Your Data**: Tell the system what data you need in plain English (e.g., “Get me the latest tech news headlines and their publish dates”).
2. **Generate a Schema**: The system uses **OpenAI** to convert your description into a structured JSON schema.
3. **Scrape Data**: Using **Firecrawl**, the system extracts data from websites based on your schema.
4. **Deploy Your API**: The system generates a callable API endpoint that serves the extracted data.
5. **Schedule Updates**: Set up periodic scraping to keep your data fresh and up-to-date.

This project is perfect for developers, data engineers, or anyone who needs to automate data extraction and API creation without writing complex code.

---

## Features

✨ **Natural Language API Creation**  
Describe your data needs in plain English, and the system generates a structured API for you.

🤖 **Automatic Schema Generation**  
Uses **OpenAI** to convert your natural language descriptions into structured JSON schemas.

🌐 **Intelligent Web Scraping**  
Powered by **Firecrawl**, the system extracts data from websites based on your schema.

⚡ **Real-Time Data Updates**  
Schedule periodic scraping to keep your data fresh and up-to-date.

🚀 **Instant API Deployment**  
Deploy your API with a single click and get a callable endpoint.

💾 **Redis-Powered Caching**  
Uses **Upstash Redis** to cache and store scraped data for quick access.

---

## Tools and Technologies

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI (GPT-3.5/4) for schema generation
- **Web Scraping**: Firecrawl
- **Caching/Storage**: Upstash Redis
- **Data Validation**: Zod
- **Animations**: Framer Motion
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- **Node.js v18 or higher** installed.
- Accounts for:
  - [OpenAI](https://openai.com) (for API key)
  - [Firecrawl](https://firecrawl.dev) (for web scraping)
  - [Upstash Redis](https://upstash.com) (for caching and storage)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/danishaft/api-generator-engine.git
   cd api-generator-engine
   ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Set up environment variable**:
    Create a .env.local file in the root of your project and add the following:
    ```env
      OPENAI_API_KEY=your_openai_key
      NEXT_PUBLIC_FIRECRAWL_API_KEY=your_firecrawl_key
      UPSTASH_REDIS_REST_URL=your_redis_url
      UPSTASH_REDIS_REST_TOKEN=your_redis_token
      NEXT_PUBLIC_API_ROUTE=http://localhost:6000
    ```
4. **Run the development server**:
    ```bash
    npm run dev
    ```
5. **Open the app**:
    Visit http://localhost:6000 in your browser. 
    
## API Endpoints

- **POST /api/generate-schema**: Generate a JSON schema from a natural language description.
- **POST /api/search**: Search for relevant URLs based on a query.
- **POST /api/extract**: Extract data from selected URLs.
- **POST /api/deploy**: Deploy a new API endpoint.

## Deployment

### Deploy to Vercel

1. Create a new Vercel project.
2. Go to Vercel and import your repository.
3. Add your environment variables in the Vercel dashboard.
4. Deploy your project.

### Deploy to Other Platforms

You can deploy the API endpoints to any platform that supports HTTP requests, such as:
- AWS Lambda
- Google Cloud Functions
- Express.js
- Cloudflare Workers

### Contributing

Contributions are welcome! Here’s how you can contribute:

1. **Fork the repository**.
2. **Create a feature branch**:
    ```bash
    git checkout -b feature/amazing-feature
    ```
3.  **Commit your changes**:
    ```bash
    git commit -m 'Add some amazing feature or bug fix'
    ```
4.  **Push to the branch**:
    ```bash
    git push origin feature/amazing-feature
    ```
4.  **Open a pull request.**

## Questions or Feedback?

Feel free to open an issue or reach out to me directly. Happy coding! 🚀