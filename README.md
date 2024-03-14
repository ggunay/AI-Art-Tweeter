# AI Art Tweeter

This application generates thematic images using OpenAI's DALL-E and tweets them. It selects a theme randomly from a predefined list and uses it to create an image that is then posted to Twitter with a customized message.

## Features

- **Automatic Image Generation**: Leverages OpenAI's DALL-E to create images based on a random theme.
- **Dynamic Tweeting**: Posts the generated image to Twitter with a unique message each time.

## Setup

### Prerequisites

- Node.js installed on your machine
- Twitter Developer account
- OpenAI API key

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/ai-art-tweeter.git
cd ai-art-tweeter
```

2. **Install Dependencies and setup variables**:

Install dependancies:

```bash
npm install
```

Create an .env file and add the following env variables:

```bash
OPENAI_API_KEY=your_openai_api_key_here
TWITTER_APP_KEY=your_twitter_app_key_here
TWITTER_APP_SECRET=your_twitter_app_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_SECRET=your_twitter_access_token_secret_here
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
```

3. **Usage**:

```bash
node ArtTweeter.js
```

## License

MIT