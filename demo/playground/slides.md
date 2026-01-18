---
# try also 'default' to start simple
theme: gemini
# some information about your slides (markdown enabled)
title: AI Era for JavaScript Developers
info: |
  ## JSDC 2025
  AI boom and the role of JavaScript developers
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# duration of the presentation
duration: 35min
layout: cover
background: /bg-2.jpg
class: text-center
---

# JSDC 2025

## In the AI boom

### Where should JavaScript developers go?

Rediscover your value
Find the position of JavaScript developers in the AI era

---
layout: cover
background: /ai-everywhere.jpg
---

# AI is everywhere

Open any social feed and you cannot escape the topic

---

# Wait, AI is not new

AI + Python has been around for decades. Machine learning, deep learning, computer vision...
These technologies have always been here, and Python has always been a main player.

**So why were we not anxious before, and why are we anxious now?**

Timeline

- 2012: AlexNet breakthrough in deep learning. Trigger for computer vision (ImageNet).
- 2016: AlphaGo beats humans. A win for reinforcement learning (DeepMind).
- 2017: Transformer paper. Foundation of LLMs (Attention Is All You Need).
- 2022: ChatGPT release. The iPhone moment for AI (GenAI).

---

# Anxiety you cannot ignore

When the whole world talks about Python and AI...

In 2024, Python officially surpassed JavaScript as the most popular language on GitHub.
Jupyter Notebooks usage also surged, highlighting rapid growth in data science and
machine learning on GitHub.

**"As a JS developer, will I be replaced?"**

Source: [Octoverse 2024 @ GitHub](https://github.blog/news-insights/octoverse/octoverse-2024/)

![Top languages 2024](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/top-programming-language-2024.webp)

---

# What is the "hot" AI everyone talks about?

| Topic                          | Description                                                                      | Audience                              | Heat                          |
| ------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------- |
| How to build LLMs?             | Train LLMs, tune parameters, optimize architectures                              | Researchers / ML scientists           | Media buzz, niche in practice |
| How to build new models?       | Design novel neural architectures and algorithms                                 | Researchers / PhD students            | Done by a small group         |
| How to use AI and prompt well? | Use Gemini, ChatGPT, Claude to boost productivity, create media, generate images | Everyone                              | Highest discussion volume     |
| How to build AI-driven apps?   | Build AI wrappers, chatbots, RAG systems                                         | Software engineers / product builders | Hot among engineers           |

---

## layout: two-cols

# AI's real breakout point: applications

Focus: bringing AI into real-world use

## The Model

Powerful, but distant for most people.

- Dense tensors and CUDA details
- Expensive and hard to access
- Value hidden behind complexity

::right::

## The Application

Solve problems and create experiences.
That is why users pay.

- Summaries, copilots, and workflows
- Clear user outcomes
- Real-world business value

---

# Do not rush into anxiety

First ask: who are we, and where is our value?

---

# What was JavaScript born for?

From Netscape in 1995

- Year: 1995
- Creator: Brendan Eich
- Time: 10 days
- Mission: make the web interactive, dynamic, and alive

Context

- No React, Vue, or Angular
- No Node.js, no npm
- One simple idea:

**Make the web move.**

Core capabilities

- Dynamically change content
- Respond to user actions
- Create interactive experiences

---

# Know ourselves: what have we always done?

From browser scripts to the core of full-stack development

## Frontend interfaces and interactions

From simple form validation to complex single-page apps, frameworks like React, Vue,
and Angular made JS the standard for building smooth UI and interactions.

Tools: React, Vue, Angular, Svelte

## Backend logic and integration

Node.js took JavaScript beyond the browser. From REST APIs to microservices, JS is
strong at business logic, data flow, and third-party integration.

Tools: Node.js, Express, NestJS, tRPC, GraphQL

## Integrating native system capabilities

JavaScript is no longer just a browser script. Chrome and desktop apps
(Electron, Tauri) expose rich JS APIs for system and hardware access.

Tools: Chrome Extensions, Web APIs, Electron API, WebAssembly

---

# Reclaim our position: we are key to AI adoption

Core value of JavaScript/TypeScript developers in the AI era

## Generative UI/UX (from UI to GenUI)

Build high-performance streaming experiences and innovative AI copilot interfaces.
TypeScript type safety improves end-to-end developer experience (DX).

Tools: Vercel AI SDK, CopilotKit, LlamaIndex ChatUI, ChatBotKit SDK

## AI agents (orchestration)

Use LangChain.js and AI SDKs to drive LLM agents. Connect enterprise data via RAG and
use function calling to integrate external tools and APIs.

Tools: OpenAI Agents SDK, @google/genai, LangChain / LangGraph, Firebase Genkit

## On-device inference in the browser

Use TensorFlow.js and WebGPU/WebAssembly acceleration to run models on user devices
(e.g. ONNX Runtime Web), enabling privacy and zero-latency AI.

Tools: Chrome Built-in AI, TensorFlow.js, Transformers.js, ONNX Runtime Web

---

# Generative UI: from templates to tailored interfaces

AI no longer returns plain text; it draws the best interface for each user in real time.

Key ideas

1. Just-in-time rendering: UI is generated on the fly based on intent.
2. Hyper-personalization: the UI adapts to the specific need.
3. Three implementation paths: Static, Declarative, Open-ended HTML.

Chat demo

- User: Show me Apple's stock trend
- AI: Sure, here is the live chart for Apple (AAPL)
- Data: AAPL $277.55, +0.24%, trend up

---

# Mainstream AI agent frameworks

All provide TypeScript support

Regardless of OpenAI, Google, Vercel, or LangChain, mainstream AI agent frameworks
ship solid TypeScript/JavaScript SDKs.

- `npm install openai` - Official OpenAI SDK
- `npm install @google/genai` - Google Generative AI SDK
- `npm install ai` - Vercel AI SDK
- `npm i langchain` - LangChain core
- `npm i @langchain/langgraph` - LangGraph agent framework

---

# Live demo: browser-side sentiment analysis

Transformers.js + DistilBERT, running entirely in the browser, no server required

![Sentiment analysis demo](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/sentiment-analysis.svg)

---

# Chrome Built-in AI

Lightweight AI models built into the browser

Chrome ships Gemini Nano and specialized expert models, offering APIs like Summarizer,
Translator, and Writer. The browser automatically handles model distribution and
management, no developer deployment required. All inference stays local to protect
privacy, and models work offline after download.

**Built-in AI, automatic management, privacy first**

Source: [Chrome for Developers](https://developer.chrome.com/docs/ai/built-in)

![Chrome Built-in AI](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/chrome-built-in-ai.png)

---

# Gemini CLI

An AI tool built entirely with TypeScript

Google's Gemini CLI is a great example. The GitHub language breakdown shows the
entire CLI is 100% TypeScript.

**Many AI CLI tools are written in JavaScript/TypeScript.**

![Gemini CLI TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/gemini-cli-ts.png)

---

# n8n

The hottest workflow automation platform in the AI community

n8n is one of the most popular open-source workflow automation tools, easily
connecting OpenAI, Anthropic, Google AI, and more to build powerful AI agent flows.
Few people realize the entire platform, including the core engine, editor UI, and
AI node system, is 100% TypeScript.

**Popular AI tools are often powered by TypeScript behind the scenes.**

Source: [n8n on GitHub](https://github.com/n8n-io/n8n)

![n8n TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/n8n.png)

---

# Langfuse

Top-tier LLM observability tooling

Langfuse is one of the most popular open-source LLM observability platforms, providing
tracking, monitoring, evaluation, and debugging for LLM apps. The GitHub project shows
the core engine, API, and web UI are built with TypeScript and Next.js.

**TypeScript plays a key role in the AI ecosystem.**

Source: [Langfuse on GitHub](https://github.com/langfuse/langfuse)

![Langfuse TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/langfuse-ts.png)

---

# Our value is being recognized

In August 2025, TypeScript surpassed Python and JavaScript to become the most
popular language on GitHub for the first time. Over one million new contributors
were added in a year (+66%), marking the biggest shift in programming languages
in a decade.

**Type safety + AI-assisted development = the future trend**

Source: [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

![Top languages 2025](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/octoverse-2025-top-programming-languages.webp)

---

## layout: two-cols

# Know your choice: research brains or build products?

## Model research

Role: MODEL RESEARCHER

- Train and optimize AI models
- Deep theoretical foundations
- Explore the frontier of neural networks

Output: papers, new models

::right::

## Application delivery

Role: PRODUCT DEVELOPER

- Bring AI into the real world
- Strong engineering to solve real needs
- Create real business value

Output: applications, real-world solutions

---

# Be honest: recognize strengths and limits

JavaScript is not universal, but irreplaceable in the right place

| Area                           | Python  | JavaScript | Notes                                       |
| ------------------------------ | ------- | ---------- | ------------------------------------------- |
| Artificial intelligence        | Strong  | Limited    | Python relies on CUDA/C++ for speed.        |
| Data science                   | Strong  | Limited    | Python has decades of academic libraries.   |
| Web interaction and deployment | Limited | Strong     | JS is the browser's native language.        |
| Application development        | Mixed   | Strong     | JS is the best glue to deliver AI to users. |

---

# Conclusion

## From the lab to billions of users

> We do not train AI, but we help it serve billions of people.

**Know yourself, reclaim your position, and now go `npm install` your first AI package.**
