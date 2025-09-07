# Ai Menu Parser

This project is an AI-powered menu analyzer that takes a picture of a restaurant menu and transforms it into a structured, interactive digital format. It uses AI to extract dish names and prices, and then enriches the data with generated descriptions, ingredients, allergens, and historical facts. It also fetches relevant images for each dish.

Inspired by the concept of "Vibe Coding" described in this article: https://vas3k.com/notes/vibe_coding/

## Features

*   **AI-Powered Menu Analysis**: Upload an image of a menu to have it automatically parsed by an AI model (GPT-4o-mini).
*   **Structured Data**: Converts unstructured menu text into a clear, categorized JSON format.
*   **Data Enrichment**: For each menu item, the AI generates:
    *   A detailed description.
    *   A list of potential ingredients and allergens.
    *   A brief, interesting history of the dish.
*   **Image Association**: Automatically fetches and displays images for each dish using the Google Search API.
*   **Interactive UI**: A clean, responsive interface built with React and Material-UI to browse the digitized menu.
*   **Client-Side Caching**: Caches the processed menu in the browser's `localStorage` to avoid re-processing on page reload.

## Tech Stack

*   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
*   **UI Library**: [Material-UI (MUI)](https://mui.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **API Interaction**:
    *   **AI**: [OpenAI API](https://openai.com/api/) (specifically the `gpt-4o-mini` model)
    *   **Image Search**: [Google Custom Search API](https://developers.google.com/custom-search)
*   **Routing**: [React Router](https://reactrouter.com/)

---

## Getting Started

Follow these instructions to get a local copy up and running.

### 🚨 Security Warning

**Do not use your main or production API keys for this project in its current state.**

This application is designed for demonstration purposes and handles API keys on the **client-side (in the browser)**. This is insecure and exposes your keys to anyone who uses the application. Use temporary, budget-limited, or trial keys for testing.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
*   `npm` or a compatible package manager
*   An **OpenAI API Key**.
*   A **Google Custom Search API Key** and a **Search Engine ID (CX)**.

### Installation & Configuration

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Configure Google API Keys:**
    *   Open the file `src/config/config.ts`.
    *   Add your Google Custom Search API Key and Search Engine ID:
        ```typescript
        export const CONFIG = {
          GOOGLE_SEARCH_API_KEY: 'YOUR_GOOGLE_API_KEY', // <-- ADD KEY HERE
          GOOGLE_SEARCH_CX: 'YOUR_GOOGLE_SEARCH_ENGINE_ID', // <-- ADD CX HERE
          // ...
        }
        ```

4.  **Configure OpenAI API Key:**
    *   The OpenAI key is passed directly from the UI. When you run the application, you will see an input field asking for your OpenAI API key. Paste your key there to start the menu analysis.

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```

2.  Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

3.  Paste your OpenAI API key, upload a menu image, and enjoy!
