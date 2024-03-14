# AI Art Tweeter

This AWS Lambda function generates thematic images using OpenAI's DALL-E and tweets them. It selects a theme randomly from a predefined list and uses it to create an image that is then posted to Twitter with a customized message.

## Features

- **Automatic Image Generation**: Leverages OpenAI's DALL-E to create images based on a random theme.
- **Dynamic Tweeting**: Posts the generated image to Twitter with a unique message each time.
- **Scheduled Execution**: Automatically runs at specified intervals, making your Twitter feed dynamic and engaging.

## Setup

### Prerequisites

- AWS Account
- Node.js installed on your machine
- Twitter Developer account
- OpenAI API key

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/ggunay/Ai-Art-Tweeter.git
cd Ai-Art-Tweeter
```

2. **Install Dependencies and setup variables**:

Install dependancies:

```bash
npm install
```

For local development, you might use a .env file to store your variables and dotenv for loading these variables into your application. However, for AWS Lambda deployment, you set environment variables directly in the Lambda function configuration in the AWS Management Console.

```bash
OPENAI_API_KEY=your_openai_api_key_here
TWITTER_APP_KEY=your_twitter_app_key_here
TWITTER_APP_SECRET=your_twitter_app_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_SECRET=your_twitter_access_token_secret_here
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
```
For AWS Lambda, configure these environment variables in the Lambda function's settings under the Environment variables section

Deployment to AWS Lambda:

Follow AWS Lambda's documentation to create a new function.
Upload your code as a zip file or deploy through AWS CLI or AWS SAM.
Set the environment variables in the Lambda function's configuration.

3. **Usage**:

The function is designed to be triggered automatically according to the schedule you set in AWS CloudWatch Events. You can also invoke it manually through the "Test" tab or any other trigger supported by AWS Lambda.

## License

MIT