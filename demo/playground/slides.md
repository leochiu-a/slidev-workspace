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
layout: timeline
timeline:
  - year: "2012"
    event: AlexNet
    desc: Trigger for computer vision
  - year: "2016"
    event: AlphaGo
    desc: A win for reinforcement learning
  - year: "2017"
    event: Transformer
    desc: Attention Is All You Need.
  - year: "2022"
    event: ChatGPT release
    desc: The iPhone moment for AI.
---

# Wait, AI is not new

AI with Python has been around for years—machine learning and deep learning have always used Python as a main tool.


So why weren’t we anxious before?

---
layout: two-cols-header
---

# Anxiety you cannot ignore

::left::

When the whole world talks about Python and AI...

In 2024, Python officially surpassed JavaScript as the most popular language on GitHub.
Jupyter Notebooks usage also surged, highlighting rapid growth in data science and
machine learning on GitHub.

**"As a JS developer, will I be replaced?"**

::right::

![Top languages 2024](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/top-programming-language-2024.webp)

Source: [Octoverse 2024 @ GitHub](https://github.blog/news-insights/octoverse/octoverse-2024/)


<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>

---
layout: topics
topics:
  - title: How to build LLMs?
    desc: Train LLMs, tune parameters, optimize architectures.
    audience: Researchers / ML scientists
    hot: false
    hotLabel: Media buzz, niche in practice
    icon: brain
  - title: How to build new models?
    desc: Design novel neural architectures and algorithms.
    audience: Researchers / PhD students
    hot: false
    hotLabel: Done by a small group
    icon: sparkles
  - title: How to use AI and prompt well?
    desc: Use Gemini, ChatGPT, Claude to boost productivity, create media, generate images.
    audience: Everyone
    hot: true
    hotLabel: Highest discussion volume
    icon: terminal
  - title: How to build AI-driven apps?
    desc: Build AI wrappers, chatbots, RAG systems.
    audience: Software engineers / product builders
    hot: true
    hotLabel: Hot among engineers
    icon: code
---

# What is the "hot" AI everyone talks about?

---
layout: cards
cards:
  - title: The Model
    desc: Powerful, but distant for most people.
    tags:
      - Dense tensors and CUDA details
      - Expensive and hard to access
      - Value hidden behind complexity
  - title: The Application
    desc: Solve problems and create experiences. That is why users pay.
    tags:
      - Summaries, copilots, and workflows
      - Clear user outcomes
      - Real-world business value
---

# AI's real breakout point: applications

Focus: bringing AI into real-world use

---
layout: cover
background: /bg-2.jpg
---

# Do not rush into anxiety

First ask: who are we, and where is our value?

---
layout: cards
cards:
  - title: Born in 1995
    desc: Netscape created JavaScript in 10 days by Brendan Eich.
    tags:
      - "Year: 1995"
      - "Creator: Brendan Eich"
      - "Time: 10 days"
  - title: Context
    desc: The web was young with no frameworks or server-side JS.
    tags:
      - No React, Vue, or Angular
      - No Node.js, no npm
      - Early web era
  - title: Mission
    desc: Make the web interactive, dynamic, and alive.
    tags:
      - Make the web move
      - Change content dynamically
      - Respond to user actions
---

# What was JavaScript born for?


---
layout: cards
cards:
  - title: Frontend
    desc: From simple form validation to rich UI, frameworks like React and Vue set the standard for smooth interactions.
    tags:
      - React
      - Vue
  - title: Backend
    desc: Node.js took JS beyond the browser, powering APIs and services with strong integration and data flow.
    tags:
      - Node.js
      - Express
  - title: Integrating native capabilities
    desc: Chrome and desktop apps (Electron, Tauri) expose JS APIs for system and hardware access.
    tags:
      - Chrome Extensions
      - Web APIs
---

# Know ourselves: what have we always done?

From browser scripts to the core of full-stack development

---
layout: cards
cards:
  - title: Generative UI/UX (from UI to GenUI)
    desc: Build streaming experiences and AI copilot interfaces with strong DX.
    tags:
      - Vercel AI SDK
      - CopilotKit
      - LlamaIndex ChatUI
      - ChatBotKit SDK
  - title: AI agents (orchestration)
    desc: Use LangChain.js and AI SDKs to drive agents, RAG, and tool calling.
    tags:
      - OpenAI Agents SDK
      - "@google/genai"
      - LangChain / LangGraph
      - Firebase Genkit
  - title: On-device inference in the browser
    desc: Run models with WebGPU/WebAssembly for privacy and low latency.
    tags:
      - Chrome Built-in AI
      - TensorFlow.js
      - Transformers.js
      - ONNX Runtime Web
---

# Reclaim our position: we are key to AI adoption

Core value of JavaScript/TypeScript developers in the AI era

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
layout: list
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
class: text-center
---

# Live demo: browser-side sentiment analysis

Transformers.js + DistilBERT, running entirely in the browser, no server required

<SentimentAnalysis />

---
layout: two-cols-header
---

# Chrome Built-in AI

::left::

Lightweight AI models built into the browser

Chrome ships Gemini Nano and specialized expert models, offering APIs like Summarizer,
Translator, and Writer. The browser automatically handles model distribution and
management, no developer deployment required. All inference stays local to protect
privacy, and models work offline after download.

**Built-in AI, automatic management, privacy first**

::right::

![Chrome Built-in AI](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/chrome-built-in-ai.png)

Source: [Chrome for Developers](https://developer.chrome.com/docs/ai/built-in)

---
layout: two-cols-header
---

# Gemini CLI

::left::

An AI tool built entirely with TypeScript

Google's Gemini CLI is a great example. The GitHub language breakdown shows the
entire CLI is 100% TypeScript.

**Many AI CLI tools are written in JavaScript/TypeScript.**

::right::

![Gemini CLI TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/gemini-cli-ts.png)

<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>

---
layout: two-cols-header
---

# n8n

::left::

The hottest workflow automation platform in the AI community

n8n is one of the most popular open-source workflow automation tools, easily
connecting OpenAI, Anthropic, Google AI, and more to build powerful AI agent flows.
Few people realize the entire platform, including the core engine, editor UI, and
AI node system, is 100% TypeScript.

**Popular AI tools are often powered by TypeScript behind the scenes.**

::right::

![n8n TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/n8n.png)

Source: [n8n on GitHub](https://github.com/n8n-io/n8n)

<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>

---
layout: two-cols-header
---

# Langfuse

::left::

Top-tier LLM observability tooling

Langfuse is one of the most popular open-source LLM observability platforms, providing
tracking, monitoring, evaluation, and debugging for LLM apps. The GitHub project shows
the core engine, API, and web UI are built with TypeScript and Next.js.

**TypeScript plays a key role in the AI ecosystem.**

::right::

![Langfuse TypeScript](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/langfuse-ts.png)

Source: [Langfuse on GitHub](https://github.com/langfuse/langfuse)

<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>

---
layout: two-cols-header
---

# Our value is being recognized

::left::

In August 2025, TypeScript surpassed Python and JavaScript to become the most
popular language on GitHub for the first time. Over one million new contributors
were added in a year (+66%), marking the biggest shift in programming languages
in a decade.

**Type safety + AI-assisted development = the future trend**

::right::

![Top languages 2025](/Users/leochiu.chiu/Desktop/jsdc-2025/src/assets/octoverse-2025-top-programming-languages.webp)

Source: [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>
---
layout: two-cols-header
---

# Know your choice: research brains or build products?

::left::

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

<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>
---
layout: table
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
layout: cover
background: /bg-2.jpg
---

# Conclusion

## From the lab to billions of users

> We do not train AI, but we help it serve billions of people.

**Know yourself, reclaim your position, and now go `npm install` your first AI package.**
