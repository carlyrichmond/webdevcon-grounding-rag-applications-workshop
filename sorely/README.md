# Travel Planner AI Agent

Example Travel Planner Application Showing AI Agents Built Using AI SDK by Vercel and Elasticsearch.

![Travel Planner Screenshot](./screenshots/travel-planner-full.png)

## Prerequisites

To run this example, please ensure prerequisites listed in the repository [README](https://github.com/carlyrichmond/travel-planner-ai-agent) are performed:

1. Please ensure you have the following tools installed:
- Node.js
- npm

To check you have Node.js and npm installed, run the following commands:

```zsh
node -v
npm -v
```

*Please ensure that you are running Node v20.13.1 or higher*

2. Register for an OpenAI key via [their site](https://chatgpt.com/).

3. Create an account and API key for the [Weather API](https://www.weatherapi.com/). Optionally, you can substitute your own weather data in [`weatherTool`](./src/app/ai/weather.tool.ts).

## Install & Run

Pull the required code from the accompanying content repository and start the project:

```zsh
git clone https://github.com/carlyrichmond/travel-planner-ai-agent.git
```

Populate the `.env` file with your OpenAI key, Weather API key, Elasticsearch endpoint and Elasticsearch API key as per the below example, also available in [.example-env](.example-env):

```zsh
OPENAI_API_KEY=ARandomOpenAIKey?
WEATHER_API_KEY=MyWeatherKey!
ELASTIC_DEPLOYMENT=https://my-random-elastic-deployment:123
ELASTIC_API_KEY=ARandomKey!
```

Once these keys have been populated, you can use [`direnv`](https://direnv.net/) or an equivalent tool to load them. Note that `.env` file detection requires explicit configuration using the [`load_dotenv` option](https://direnv.net/man/direnv.toml.1.html#codeloaddotenvcode) as covered [here](https://dev.to/charlesloder/tidbit-get-direnv-to-use-env-5fkn).

Load the sample flight data using [`tsx`](https://www.npmjs.com/package/tsx) or [`ts-node`](https://www.npmjs.com/package/ts-node):

```zsh
direnv allow
cd src/app/scripts
tsx ingestion.ts
```

Initialize and start the application:

```zsh
npm install # key dependencies: ai @ai-sdk/openai zod @elastic/elasticsearch
npm run dev
```
