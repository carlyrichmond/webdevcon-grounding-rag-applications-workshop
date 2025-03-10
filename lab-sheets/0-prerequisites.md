# Lab 0: Setup

So you want to build a AI and RAG apps? Brilliant, as this is exactly what this workshop is for! 

There are a couple of things you'll need before we start:

## 0: Fork the project

Create your own fork of [this repo](https://github.com/carlyrichmond/webdevcon-grounding-rag-applications-workshop/fork) and then clone the project onto your local machine:

```zsh
git clone https://github.com/<MY_GITHUB_USER>/webdevcon-grounding-rag-applications-workshop.git
```

## 1: Assumed installations

Please ensure you have the following tools installed:

1. [Node.js](https://nodejs.org/en)
2. [npm](https://www.npmjs.com/)
 
To check you have Node.js and npm installed, run the following commands:

```bash
node -v
npm -v
```

*Please ensure that you are running Node v20.13.1 or higher*

3. [tsx](https://www.npmjs.com/package/tsx)

If you don't have tsx installed please make sure you have a global install configured by running the below command:

```zsh
npm install -g tsx
```

If you receive an error, [download and install Node.js and npm using these instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## 2: Ollama

There are many open source and proprietary machine learning models out there that can be used when building RAG applications. To make local development easy, we shall be using [Ollama](https://ollama.com/) to run our models locally.

```zsh
brew install ollama
```

Specifically, we shall make use of models Llama3.1 and smollm2.*Given the size of these models we recommend pulling them in advance of the workshop as you may encounter issues downloading them on conference WiFi!*

```zsh
ollama pull llama3.1
ollama list
```

You can validate the LLM manifests are downloaded correcting by running the models in the terminal via the `run` command from Ollama, as per the below example:

```zsh
ollama run llama3.1
>>> Why is the sky blue and not green?
```

## 3: Other API Keys

### 3.2 WeatherAPI

Create an account and API key for the [Weather API](https://www.weatherapi.com/). Optionally, you can substitute your own weather data in the `weatherTool` steps in the Sorely travel agent tutorial.

### 3.2 OpenAI

We shall compare the output of several LLMs' effectiveness for tool calling against [OpenAI GPT-4o Turbo](https://platform.openai.com/docs/models/gpt-4o). For this, please create an account for OpenAI [via their site](https://platform.openai.com/docs/overview) and create an API key. Creating an account should give you some initial credits to play with.

## 3: direnv

This lab makes use of environment variables for some attributes that are loaded using `process.env` within our application. For ease in the workshop I recommend using a shell environment loading tool such as [direnv](https://github.com/direnv/direnv) configured to support `env` files.

If using `direnv` also make sure that you have configured your profile to accept `.env` files:

```zsh
cat $HOME/.config/direnv/direnv.toml 
```

Example config:

```toml
[global]
load_dotenv=true
```

If you are unable to use direnv, feel free to export the required environment variables from the `.env` file via the terminal.

```zsh
# Unix/ Mac
export ELASTIC_DEPLOYMENT=http://localhost:9200

# Windows
set ELASTIC_DEPLOYMENT=http://localhost:9200
```

## 4. Elasticsearch

To run a local Elasticsearch and Kibana deployment, please use the [start-local script](https://www.elastic.co/guide/en/elasticsearch/reference/current/run-elasticsearch-locally.html) to create a local install:

```zsh
curl -fsSL https://elastic.co/start-local | sh
```

This script uses [Docker](https://www.docker.com/), which you will also need to ensure is [installed on your machine](https://docs.docker.com/desktop/).

Once installed, the terminal will show you the Kibana credentials you can use to login to Kibana at `http://localhost:5601`:

![Elasticsearch `start-local` output](../screenshots/elastic-start-local-output.png)

Please also keep a note of your API key for the duration of the workshop, and ensure you paste it into your `.env` file in the `movie-rag` folder, leaving it looking something like this:

```zsh
ELASTIC_DEPLOYMENT=http://localhost:9200
ELASTIC_API_KEY=ARandomKey!
INDEX_NAME="movies"
```

If you need to start or stop the deployment at any time, use the start and stop scripts as documented in the `start-local` [README](https://github.com/elastic/start-local?tab=readme-ov-file#-start-and-stop-the-services).

This install with a 30-day trial for licensed features if you would like to play with these in the time.

If you do not have Docker installed on your machine, or encounter any issues with the `start-local` script, please either create an [Elastic Cloud trial](https://cloud.elastic.co/registration?tech=rtp&plcmt=nav&cta=eswt-24503-a) or speak to the workshop facilitator who can create a [Cloud deployment](https://www.elastic.co/cloud) for you.

Happy workshopping!