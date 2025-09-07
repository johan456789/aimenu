const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const OpenAI = require('openai');
const multer = require('multer');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

const MENU_ANALYSIS_PROMPT = `
    Analyze this restaurant menu image and return a JSON with the following structure:
    {
      "categories": [
        {
          "name": "string",
          "items": [
            {
              "name": "string",
              "price": "string",
              "description": "string",
              "ingredients": ["string"],
              "allergens": ["string"],
              "history": "string"
            }
          ]
        }
      ]
    }
    Follow the rules:
    - Don't be lazy and return all menu items in JSON
    - If menu has sections on the photo — they should become categories in JSON. Otherwise use one category named "Menu".
    - Name and price must be taken from the menu. If there are no prices, put N/A in the field.
    - For description, ingredients and allergens you must act like a chef and describe me the dish yourself.
    - For history, provide 3-5 interesting sentences about the dish's origin, cultural significance, and historical facts.
    - (!) ONLY JSON IS ALLOWED as an answer. No explanation or other text is allowed!
  `;

// API Endpoints
app.post('/api/images', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.GOOGLE_SEARCH_API_KEY,
        cx: process.env.GOOGLE_SEARCH_CX,
        q: `${query} photo`,
        searchType: 'image',
        num: 6,
      },
    });

    const imageUrls = response.data.items?.map((item) => item.link) || [];
    res.json({ imageUrls });
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/analyze', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: MENU_ANALYSIS_PROMPT },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    if (!response.choices[0].message.content) {
      throw new Error('No response from OpenAI');
    }

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/^```json\s*([\s\S]*?)\s*```$/);
    const cleanedJson = jsonMatch ? jsonMatch[1].trim() : content.trim();

    res.json(JSON.parse(cleanedJson));
  } catch (error) {
    console.error('Error analyzing menu:', error);
    res.status(500).json({ error: 'Failed to analyze menu' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
