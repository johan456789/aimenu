# Backend Documentation

This document provides instructions for setting up, running, and deploying the backend server for the Menu Translator application.

## 1. Setup

The backend server is built with Node.js and Express.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

The server requires API keys for Google Custom Search and OpenAI. These are managed using a `.env` file.

1.  **Create a `.env` file** in the `backend` directory by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  **Edit the `.env` file** and add your secret keys:
    ```
    # Google Custom Search API
    GOOGLE_SEARCH_API_KEY=your_google_api_key
    GOOGLE_SEARCH_CX=your_google_cx

    # OpenAI API
    OPENAI_API_KEY=your_openai_api_key

    # Server port (optional, defaults to 3001)
    PORT=3001
    ```

## 2. Running for Development

To start the backend server in development mode, run the following command from the `backend` directory:

```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## 3. Deployment

You can deploy this backend server to any platform that supports Node.js applications, such as Heroku, Vercel, AWS, or a traditional VPS.

### General Steps

1.  **Choose a hosting provider.**
2.  **Push your code** to a Git repository (ensure `.env` and `node_modules` are in your `.gitignore`).
3.  **Connect your repository** to the hosting provider.
4.  **Set Environment Variables:** Instead of using a `.env` file, you must set the environment variables (`GOOGLE_SEARCH_API_KEY`, `GOOGLE_SEARCH_CX`, `OPENAI_API_KEY`, and optionally `PORT`) in the settings or dashboard of your hosting provider. This is crucial for keeping your API keys secure.
5.  **Deploy** the application. The provider will typically run `npm install` and then `npm start` to run the server.

### Frontend URL Configuration

After deploying the backend, you will get a public URL for your API (e.g., `https://your-backend-app.herokuapp.com`). You must update the frontend code in `src/services/dataService.ts` and `src/services/menuService.ts` to use this new URL instead of `http://localhost:3001`.
