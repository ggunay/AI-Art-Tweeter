const axios = require('axios');
const { OpenAI } = require('openai');
const fs = require('fs').promises;
const path = require('path');
const { TwitterApi } = require('twitter-api-v2');

const tweetVariations = [
"Variation1 ${PromptVariation}",
"${PromptVariation} Variation2",
];

const PromptVariations = [
"Prompt1",
"Prompt2",
];

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Twitter client with environment variables
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
});


  
exports.handler = async (event) => {
    const PromptVariation = getRandomPrompt(PromptVariations); // Pick a random PromptVariation
    const prompt = `Final Prompt! ${PromptVariation}!`; // Use the PromptVariation in the DALL·E prompt
    
    try {
        // Generate Image
        const imageUrl = await generateImage(prompt);
      
        if (!imageUrl) {
            throw new Error("Failed to generate image");
        }
  
        // Download the image if required by Twitter API for posting
        const imagePath = await downloadImage(imageUrl);
      
        // Post Image to Twitter
        const tweetResponse = await postImageToTwitter(PromptVariation, imagePath);
        return { statusCode: 200, body: JSON.stringify(tweetResponse) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
};

async function generateImage(prompt) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3", // Uncomment if model specification is needed
            prompt: prompt,
            n: 1,
            size: "1024x1024", // Uncomment if size specification is needed
        });

        // Debugging: Log the response data to inspect its structure
        console.log("Response data:", JSON.stringify(response.data));

        // Check if the 'data' array exists and has at least one item
        if (response.data && response.data && response.data.length > 0) {
            const imageUrl = response.data[0].url;
            return imageUrl; // Return the URL of the first image
        } else {
            console.error("Data array is empty or undefined.");
            return null; // Return null or handle this scenario as appropriate for your application
        }
    } catch (error) {
        // Log the error if the request failed
        console.error("Error generating image:", error);
        return null; // Return null or throw the error as appropriate for your application
    }
}

async function downloadImage(imageUrl) {
    try {
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const tempPath = path.join("/tmp", "generatedImage.jpg");
        await fs.writeFile(tempPath, Buffer.from(response.data, "utf-8"));
        return tempPath;
    } catch (error) {
        console.error("Failed to download or save image:", error);
        return null;
    }
}

async function postImageToTwitter(PromptVariation, imagePath) {
    const mediaId = await twitterClient.v1.uploadMedia(imagePath);
    const tweetText = getRandomTweet(PromptVariation); // Get a random tweet variation
    return await twitterClient.v2.tweet({
        text: tweetText,
        media: { media_ids: [mediaId] },
    });
}

function getRandomPrompt(PromptVariations) {
    const randomIndex = Math.floor(Math.random() * PromptVariations.length);
    return PromptVariations[randomIndex];
}


  function getRandomTweet(PromptVariation) {
    const randomIndex = Math.floor(Math.random() * tweetVariations.length);
    return tweetVariations[randomIndex].replace('${PromptVariation}', PromptVariation); // Replace ${PromptVariation} with the actual PromptVariation name
}
