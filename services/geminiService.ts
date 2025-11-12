
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { FormData, GeneratedCreative } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const creativeSchema = {
  type: Type.OBJECT,
  properties: {
    adCopies: {
      type: Type.ARRAY,
      description: 'Generate 3 unique and compelling ad copy variations.',
      items: {
        type: Type.OBJECT,
        properties: {
          headline: {
            type: Type.STRING,
            description: 'A short, attention-grabbing headline (max 40 characters).',
          },
          primaryText: {
            type: Type.STRING,
            description: 'The main body of the ad (max 125 characters). Highlight key benefits.',
          },
          callToAction: {
            type: Type.STRING,
            description: 'A clear call to action, e.g., "Shop Now", "Learn More", "Sign Up".',
          },
        },
        required: ['headline', 'primaryText', 'callToAction'],
      },
    },
    caption: {
      type: Type.STRING,
      description: 'A slightly longer, engaging caption for the Facebook post itself.',
    },
    visualConcepts: {
      type: Type.ARRAY,
      description: 'Describe 2 distinct visual concepts for the ad creative.',
      items: {
        type: Type.OBJECT,
        properties: {
          layout: {
            type: Type.STRING,
            description: 'Describe the layout and composition of the visual.',
          },
          colorScheme: {
            type: Type.STRING,
            description: 'Suggest a primary and secondary color palette.',
          },
          imageStyle: {
            type: Type.STRING,
            description: 'Describe the style of the imagery (e.g., minimalist, vibrant, product-focused).',
          },
        },
        required: ['layout', 'colorScheme', 'imageStyle'],
      },
    },
    hashtags: {
      type: Type.ARRAY,
      description: 'Provide 5-7 relevant and trending hashtags.',
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['adCopies', 'caption', 'visualConcepts', 'hashtags'],
};


export const generateAdCreative = async (formData: FormData): Promise<GeneratedCreative> => {
  const { productName, productDescription, targetAudience, adTone, adObjective, adSize } = formData;

  const prompt = `
    Generate a complete set of Facebook ad creatives based on the following details. The output must be a valid JSON object matching the provided schema.

    **Product Information:**
    - Product Name: ${productName}
    - Product Description: ${productDescription}

    **Ad Strategy:**
    - Target Audience: ${targetAudience}
    - Ad Tone: ${adTone}
    - Ad Objective: ${adObjective}
    - Ad Format: ${adSize} (${adSize === 'landscape' ? '1200x628' : '1080x1350'})

    Please generate all the required components: 3 ad copy variations, 1 Facebook caption, 2 visual concepts, and a list of relevant hashtags.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: creativeSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    // Basic validation to ensure the structure is correct
    if (
      !parsedJson.adCopies ||
      !parsedJson.caption ||
      !parsedJson.visualConcepts ||
      !parsedJson.hashtags
    ) {
      throw new Error('Invalid JSON structure received from API.');
    }

    return parsedJson as GeneratedCreative;
  } catch (error) {
    console.error('Error generating ad creative:', error);
    throw new Error('Failed to generate ad creative content.');
  }
};


export const generateAdImage = async (prompt: string): Promise<string | null> => {
    try {
        const fullPrompt = `A high-quality, professional, and eye-catching advertisement image for a product, based on the following creative brief: "${prompt}". The style should be clean and modern, suitable for a Facebook ad. Do not include any text, logos, or watermarks in the image.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        return null;
    } catch (error) {
        console.error('Error generating ad image:', error);
        // Return a placeholder or null on error
        return `https://picsum.photos/${Math.random() > 0.5 ? '1080/1350' : '1200/628'}`;
    }
};