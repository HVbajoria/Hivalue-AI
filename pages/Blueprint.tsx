import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Cpu, CheckSquare, Layers, CheckCircle, Square, Save, Hammer, Zap, Sparkles, Wrench, Copy, Check, Star, ArrowRight, Loader2, Lightbulb } from 'lucide-react';
import { DATA, TOOLS_DB } from '../data';
import { IdeaItem, Blueprint as IBlueprint, Tool, BlueprintStep, SubStep } from '../types';
import WorkflowVisualizer from '../components/WorkflowVisualizer';

interface BlueprintProps {
  id: string;
  onBack: () => void;
}

// --- Helper Functions for Blueprint Generation ---

const findToolDetails = (name: string, url: string): { tool: Tool, category: string } => {
    // 1. Search in TOOLS_DB
    for (const [cat, tools] of Object.entries(TOOLS_DB)) {
        const found = tools.find(t => t.url === url || t.name === name);
        if (found) return { tool: found, category: cat };
    }
    
    // 2. Specific mapping for common tools not in DB or to force category
    if (name.includes("ChatGPT") || name.includes("Gemini") || name.includes("Claude") || name.includes("Perplexity")) {
        return { 
            tool: { name, url, description: "Advanced AI Assistant for text and analysis." }, 
            category: "General AI Assistants" 
        };
    }

    // 3. Fallback
    return { 
        tool: { name, url, description: "AI-powered tool used in this workflow." }, 
        category: "General Tools" 
    };
};

const generateDetailedBlueprint = (item: IdeaItem): IBlueprint => {
  const steps: BlueprintStep[] = [];
  const workflow: string[] = [];
  
  const createStep = (title: string, desc: string, subSteps: Omit<SubStep, 'id'>[]) => {
    steps.push({
      id: `step-${steps.length + 1}`,
      title,
      description: desc,
      subSteps: subSteps.map((s, i) => ({ ...s, id: `step-${steps.length + 1}-sub-${i}` }))
    });
    workflow.push(title);
  };

  // --- Logic Branching based on Category ---

  if (item.category.includes("Content") || item.idea.toLowerCase().includes("video") || item.idea.toLowerCase().includes("blog")) {
    // CONTENT CREATION BLUEPRINT
    createStep(
        "Niche Research & Strategy",
        "Identify high-performing topics and define your unique angle using AI data analysis.",
        [
            { 
              text: "Use AI to analyze trends in your niche", 
              tool: { name: "Google Gemini", url: "https://gemini.google.com" },
              preview: { 
                label: "Gemini Market Report", 
                content: "SEARCH TREND ANALYSIS:\n\n1. Keyword: 'Sustainable Tech for Home'\n   - Volume: +45% Month-over-Month\n   - Competition: Low/Medium\n   - Top Related Queries: 'Smart thermostat ROI', 'Solar balcony kits', 'Energy efficient desk setup'\n\n2. Audience Insight:\n   - Primary concern: Upfront cost vs long-term savings.\n   - Content Gap: Most existing content is too technical. Users want simple, plug-and-play solutions.\n\n3. Strategic Angle:\n   Focus on 'ROI in 6 months' reviews rather than just eco-friendliness to drive higher CTR."
              },
              aiPromptContext: "Asking for specific metrics (volume, competition) and 'strategic angles' forces the AI to move beyond generic advice and provide actionable data points for decision making."
            },
            { 
              text: "Generate 50+ content ideas/hooks based on trends", 
              tool: { name: "ChatGPT", url: "https://chat.openai.com" },
              preview: { 
                label: "Viral Hooks", 
                content: "VIRAL HOOK GENERATOR (Topic: AI Productivity):\n\n1. The 'Negative' Angle:\n   'Stop using ChatGPT like a Google Search replacement. You are wasting 90% of its potential. Here is the workflow that saves me 20 hours a week...'\n\n2. The 'Insider' Angle:\n   'I spent $5,000 on AI tools so you don't have to. Here are the only 3 you actually need to build a business in 2024...'\n\n3. The 'Case Study' Angle:\n   'How I automated my entire email inbox using a simple 4-step Zapier automation (No code required)...'"
              },
              aiPromptContext: "By requesting specific angles like 'Negative', 'Insider', and 'Case Study', you ensure a diverse range of emotional triggers that increase click-through rates."
            },
            { 
              text: "Analyze competitor top-performing content", 
              tool: { name: "Surfer SEO", url: "https://surferseo.com" },
              preview: { 
                label: "Competitor Audit", 
                content: "COMPETITOR GAP ANALYSIS:\n\nTop Result: '10 Best AI Tools' by TechDaily\n- Word Count: 1,500\n- Weakness: Lists tools but doesn't show *how* to use them.\n- Missing Keywords: 'Workflow automation', 'Cost analysis', 'Integration guide'.\n\nOpportunity: Create a 'Deep Dive' guide that picks only 3 tools but provides full setup tutorials for each. Target word count: 2,500+."
              },
              aiPromptContext: "Focusing on 'missing keywords' and 'weaknesses' allows you to create content that objectively outperforms current top results by filling identified gaps."
            }
        ]
    );
    createStep(
        "AI-Assisted Production",
        "Accelerate the creation process by using AI for drafting, scripting, and asset generation.",
        [
            { 
              text: "Generate detailed scripts or article outlines", 
              tool: { name: "Jasper", url: "https://www.jasper.ai" },
              preview: { 
                label: "Draft Outline", 
                content: "VIDEO SCRIPT OUTLINE (YouTube 10min):\n\nI. The Hook (0:00-0:45)\n   - Visual: Split screen of 'Manual Work' vs 'AI Automation'.\n   - Audio: 'This task used to take me 5 hours. Now it takes 5 minutes.'\n\nII. The Problem (0:45-2:00)\n   - Explain the 'Burnout Loop' created by repetitive admin tasks.\n\nIII. The Solution - Tool #1 (2:00-5:00)\n   - Step-by-step screen share of setting up the automation.\n   - Show the 'Aha!' moment where data flows automatically.\n\nIV. Case Study Results (5:00-8:00)\n   - Show real revenue numbers or time logs saved."
              },
              aiPromptContext: "Structuring the request with timestamps (for video) or headers ensures the output is ready for production, while defining the 'Hook' separately guarantees immediate audience retention."
            },
            { 
              text: "Create thumbnail images or blog headers", 
              tool: { name: "Midjourney", url: "https://www.midjourney.com" },
              preview: { 
                label: "Midjourney Prompt", 
                content: "/imagine prompt: hyper-realistic close-up of a futuristic workspace, neon purple and teal ambient lighting, floating holographic data screens displaying analytics, depth of field, 8k resolution, cinematic lighting, shot on 35mm lens, high contrast --ar 16:9 --v 6.0 --stylize 250"
              },
              aiPromptContext: "Using technical photography terms like 'depth of field', '8k resolution', and specific lighting setup ('neon', 'cinematic') guides the image generator to produce professional, non-blurry results."
            },
            { 
              text: "Generate high-quality visual assets", 
              tool: { name: "Midjourney", url: "https://www.midjourney.com" },
              preview: { 
                label: "Asset Generation", 
                content: "/imagine prompt: isometric 3D icon set of productivity tools, glassmorphism style, soft pastel gradient background, floating elements, high gloss finish, detailed textures, 4k render --ar 1:1",
                image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60"
              },
              aiPromptContext: "Specifying 'isometric', 'glassmorphism', and 'white background' creates consistent, reusable assets that fit modern UI/UX design trends without needing heavy manual editing."
            },
            { 
              text: "Generate voiceovers (if video/podcast)", 
              tool: { name: "ElevenLabs", url: "https://elevenlabs.io" },
              preview: { 
                label: "Voice Config", 
                content: "Settings:\n- Voice: 'Adam' (American, Deep, Narration)\n- Stability: 45% (More expression)\n- Clarity: 80%\n\nScript Segment:\n'Welcome back to the channel. Today, we aren't just talking about theory; we're building a fully autonomous business engine from scratch. [Pause 1s]. Let's dive in.'"
              },
              aiPromptContext: "Defining parameters like 'Stability' and 'Clarity' gives you control over the emotional delivery, ensuring the voiceover matches the pacing and tone of your content."
            }
        ]
    );
    createStep(
        "Editing & Polish",
        "Use AI tools to refine the content, remove errors, and enhance quality.",
        [
            { 
              text: "Edit video silence/filler words automatically", 
              tool: { name: "Descript", url: "https://www.descript.com" },
              preview: { 
                label: "Descript Action", 
                content: "1. Import raw footage.\n2. Select 'Remove Filler Words' -> All 'umms', 'ahhs', and 'likes' detected (Total: 42).\n3. Select 'Shorten Word Gaps' -> Truncate silence > 1.0s to 0.5s.\n4. Apply 'Studio Sound' effect to remove room echo.\n\nResult: 15-minute raw recording condensed to 11 minutes of high-paced content."
              },
              aiPromptContext: "Automated silence removal keeps viewer retention high by eliminating dead air, which is a key metric for algorithm recommendations."
            },
            { text: "Enhance audio quality", tool: { name: "Adobe Podcast", url: "https://podcast.adobe.com" } },
            { 
              text: "Proofread and optimize text readability", 
              tool: { name: "Grammarly", url: "https://www.grammarly.com" },
              preview: { 
                label: "Readability Check", 
                content: "Original: 'Utilization of this methodology facilitates the optimization of workflow processes.'\n\nGrammarly Rewrite: 'Using this method optimizes your workflow.'\n\nMetrics:\n- Clarity Score: 98/100\n- Tone: Confident & Direct\n- Readability Level: 8th Grade"
              },
              aiPromptContext: "Aiming for an 8th-grade reading level is a standard copywriting technique to maximize accessibility and ensure your message is understood by the widest possible audience."
            }
        ]
    );
    createStep(
        "Distribution & Marketing",
        "Maximize reach by using AI to repurpose content and generate social copy.",
        [
            { 
              text: "Generate SEO-optimized titles and descriptions", 
              tool: { name: "TubeBuddy", url: "https://www.tubebuddy.com" },
              preview: { 
                label: "SEO Meta Optimization", 
                content: "Title A: 'How to Use AI for Business' (Score: 62/100 - Too generic)\nTitle B: 'Automate Your Business with AI: Complete 2024 Guide' (Score: 95/100 - High Keyword Volume)\n\nTags:\n#AIautomation #BusinessGrowth #ProductivityHacks #ChatGPT #PassiveIncome"
              },
              aiPromptContext: "Comparing titles based on a numerical score helps remove guesswork, while targeting high-volume keywords ensures your content is discoverable in search."
            },
            { 
              text: "Repurpose long-form into shorts/reels", 
              tool: { name: "OpusClip", url: "https://www.opus.pro" },
              preview: { 
                label: "Viral Clip Extraction", 
                content: "Source: 12-minute YouTube Video.\nOutput: 5 Vertical Short-form Clips.\n\nClip 1: 'The 5-Hour Rule' (0:45 - 1:45)\n- Viral Score: 99\n- Hook: 'This one rule changed how I work forever.'\n- Auto-Captions: Enabled (Yellow/Black style)"
              },
              aiPromptContext: "AI-driven virality scores analyze pacing and emotional spikes to identify segments most likely to retain attention on short-form platforms like TikTok."
            },
            { text: "Schedule posts for optimal times", tool: { name: "Buffer", url: "https://buffer.com" } }
        ]
    );

  } else if (item.category.includes("Gaming") || item.category.includes("App") || item.idea.toLowerCase().includes("software") || item.idea.toLowerCase().includes("build")) {
    // SOFTWARE / GAME DEV BLUEPRINT
    createStep(
        "Concept & Specification",
        "Define the product requirements and logic before writing code.",
        [
            { 
              text: "Generate a Product Requirements Document (PRD)", 
              tool: { name: "ChatGPT", url: "https://chat.openai.com" },
              preview: { 
                label: "PRD (MVP Scope)", 
                content: "PRODUCT: 'TaskMaster AI' - Intelligent To-Do List\n\n1. CORE VALUE:\n   Auto-prioritizes tasks based on deadlines and user energy levels.\n\n2. FEATURES (MVP):\n   - Google OAuth Login.\n   - Natural Language Task Input ('Remind me to call John tomorrow at 5').\n   - 'Focus Mode': Hides all tasks except the top priority.\n\n3. TECH STACK:\n   - Frontend: React Native (Expo)\n   - Backend: Supabase (Auth + DB)\n   - AI: OpenAI API (gpt-3.5-turbo)"
              },
              aiPromptContext: "Defining the 'MVP Scope' prevents feature creep, while asking for a specific tech stack ensures the generated requirements are technically feasible and compatible."
            },
            { text: "Brainstorm game mechanics or app features", tool: { name: "Claude", url: "https://claude.ai" } },
            { 
              text: "Create user personas and user stories", 
              tool: { name: "Notion AI", url: "https://www.notion.so" },
              preview: { 
                label: "User Persona", 
                content: "PERSONA: 'Sarah, the Overwhelmed Freelancer'\n- Age: 28\n- Pain Point: Has 50+ tasks on her list and spends more time organizing them than doing them.\n- Goal: Wants to wake up and simply be told 'Do this one thing first'.\n- Tech Savvy: High, uses iPhone and Mac.\n\nUSER STORY:\n'As Sarah, I want to dictate my tasks while driving so that I don't forget them, without having to type.'"
              },
              aiPromptContext: "Creating detailed personas with specific 'pain points' helps you design features that solve actual user problems rather than building technology for its own sake."
            }
        ]
    );
    createStep(
        "Design & Assets",
        "Create the visual elements and UI/UX using generative design tools.",
        [
            { 
              text: "Generate UI mockups/wireframes", 
              tool: { name: "Uizard", url: "https://uizard.io" },
              preview: { 
                label: "Design Prompt", 
                content: "Prompt: 'Clean, minimalist mobile app interface for a productivity tool. Dark mode. Primary color #6366f1 (Indigo). Large typography for the main task, minimal distractions. Glassmorphism card effects for the task list. Bottom navigation bar with 3 icons: Focus, List, Settings.'"
              },
              aiPromptContext: "Specifying color codes and design styles (e.g., 'Glassmorphism') ensures the generated wireframes align with your brand identity and current market trends."
            },
            { 
              text: "Generate game assets (textures, sprites)", 
              tool: { name: "Scenario", url: "https://www.scenario.com" },
              preview: { 
                label: "Asset Generation", 
                content: "Model: Pixel Art Generator\nPrompt: 'Isometric potion shop interior, magical atmosphere, shelves filled with glowing bottles, purple and blue lighting, 32-bit style, rpg game asset'\n\nResult: 4 variations of shop tilesets ready for Unity import."
              },
              aiPromptContext: "Using style keywords like '32-bit' and 'pixel art' ensures stylistic consistency across all game assets, which is crucial for immersion."
            },
            { text: "Create 3D models or skyboxes", tool: { name: "Blockade Labs", url: "https://www.blockadelabs.com" } }
        ]
    );
    createStep(
        "AI-Assisted Development",
        "Write the code using AI copilots to speed up development by 10x.",
        [
            { text: "Scaffold project structure", tool: { name: "ChatGPT", url: "https://chat.openai.com" } },
            { 
              text: "Write functions and debug code in real-time", 
              tool: { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
              preview: { 
                label: "Code Completion", 
                content: "// Prompt: Create a function that sorts tasks by a weighted score of deadline closeness and importance.\n\nconst sortTasks = (tasks: Task[]): Task[] => {\n  const now = new Date().getTime();\n  return tasks.sort((a, b) => {\n    const scoreA = (a.importance * 2) + (1000 / (a.deadline - now));\n    const scoreB = (b.importance * 2) + (1000 / (b.deadline - now));\n    return scoreB - scoreA;\n  });\n};"
              },
              aiPromptContext: "Providing a comment describing the logic before writing code primes the model to generate the exact algorithm you need, reducing debugging time."
            },
            { 
              text: "Generate boilerplate code for backend", 
              tool: { name: "Replit", url: "https://replit.com" },
              preview: { 
                label: "Backend Boilerplate", 
                content: "Prompt: 'Setup an Express.js server with TypeScript, CORS, and a POST route for /api/tasks that validates input using Zod.'\n\nResult:\n- Generated `server.ts`\n- Installed dependencies (express, cors, zod)\n- Created middleware for error handling\n- Defined Zod schema for Task object"
              },
              aiPromptContext: "Asking for a specific stack (Express, TS, Zod) and middleware setup eliminates hours of repetitive setup work, allowing you to focus on business logic immediately."
            }
        ]
    );
    createStep(
        "Testing & Launch",
        "Prepare for market entry.",
        [
            { 
              text: "Write unit tests using AI", 
              tool: { name: "Codium", url: "https://www.codium.ai" },
              preview: { 
                label: "Test Suite Generation", 
                content: "File: `auth.service.ts`\nAction: Generate Tests\n\nOutput:\n1. should return token when credentials are valid\n2. should throw 401 error when password is incorrect\n3. should lock account after 5 failed attempts\n4. should handle database timeout gracefully\n\nCoverage: 95% lines covered."
              },
              aiPromptContext: "Generating tests based on edge cases (e.g., 'database timeout') ensures your application is robust and handles errors gracefully in production."
            },
            { 
              text: "Generate App Store / Listing descriptions", 
              tool: { name: "Copy.ai", url: "https://www.copy.ai" },
              preview: { 
                label: "Listing Copy", 
                content: "App Title: FocusFlow - The AI To-Do List\n\nShort Description: Stop planning, start doing. The only to-do list that tells you exactly what to focus on next.\n\nFeature Bullets:\n✅ AI Auto-Prioritization\n✅ Voice-to-Task Capture\n✅ Distraction-Free 'Focus Mode'\n\nCall to Action: Download now and reclaim 2 hours of your day."
              },
              aiPromptContext: "Focusing on benefits ('reclaim 2 hours') rather than just features drives higher conversion rates in app stores."
            },
            { text: "Create launch marketing posts", tool: { name: "Jasper", url: "https://www.jasper.ai" } }
        ]
    );

  } else if (item.category.includes("Marketing") || item.category.includes("Sales")) {
    // MARKETING SERVICE BLUEPRINT
    createStep(
        "Offer Creation",
        "Package your AI service into a compelling offer.",
        [
            { 
              text: "Identify target audience pain points", 
              tool: { name: "ChatGPT", url: "https://chat.openai.com" },
              preview: { 
                label: "Pain Point Analysis", 
                content: "Target: E-commerce Fashion Brands\n\n1. High Ad Fatigue: Audiences get bored of creatives in 3 days.\n2. Expensive Photography: Shoots cost $5k+ and take weeks.\n3. Low Conversion: Generic product photos don't inspire desire.\n\nService Angle: 'We generate unlimited, on-model lifestyle imagery for your brand using AI, at 10% of the cost of a photoshoot.'"
              },
              aiPromptContext: "Identifying specific frustrations (e.g., 'expensive photography') allows you to position your service as the cost-effective, faster solution."
            },
            { text: "Draft service level agreements and packages", tool: { name: "Notion AI", url: "https://www.notion.so" } },
            { 
              text: "Create a portfolio of sample AI outputs", 
              tool: { name: "Midjourney", url: "https://www.midjourney.com" },
              preview: { 
                label: "Portfolio Generation", 
                content: "Prompt: 'Editorial fashion photography, model wearing a generic white t-shirt standing in a busy Tokyo street at night, neon lights, bokeh effect, raining, high fashion pose, detailed fabric texture'\n\nUsage: Showcase this to potential clients to demonstrate how you can place their basic products into high-end environments virtually."
              },
              aiPromptContext: "Creating 'on-model' imagery demonstrates practical application, proving to clients that AI can replace expensive photoshoots."
            }
        ]
    );
    createStep(
        "Lead Generation",
        "Find and contact potential clients automatically.",
        [
            { 
              text: "Scrape/Find leads in your niche", 
              tool: { name: "Apollo", url: "https://www.apollo.io" },
              preview: { 
                label: "Lead Filtering", 
                content: "Filters Applied:\n- Industry: Apparel & Fashion\n- Location: United States\n- Company Size: 11-50 employees\n- Job Titles: 'Marketing Director', 'Founder', 'Brand Manager'\n- Keywords: 'DTC', 'Shopify'\n\nResult: 1,450 Verified Emails found."
              },
              aiPromptContext: "Filtering by company size and job title ensures you are pitching to decision-makers with the budget to pay for your services."
            },
            { 
              text: "Draft personalized cold emails", 
              tool: { name: "Lavender", url: "https://www.lavender.ai" },
              preview: { 
                label: "Cold Email Template", 
                content: "Subject: Question about {Company_Name}'s ad creatives\n\nHi {First_Name},\n\nI noticed {Company_Name} is running ads for your new summer collection, but the creative background looks a bit static. Ad fatigue usually sets in after 4-5 days.\n\nWe built a system that generates 50+ lifestyle variations of your existing product photos in minutes. I actually generated 3 mocks for your brand specifically—mind if I send them over for free?\n\nBest,\n[Your Name]"
              },
              aiPromptContext: "Offering value upfront ('I generated 3 mocks') drastically increases response rates compared to generic sales pitches."
            },
            { text: "Set up CRM automation", tool: { name: "HubSpot", url: "https://www.hubspot.com" } }
        ]
    );
    createStep(
        "Execution & Automation",
        "Deliver the service efficiently.",
        [
            { text: "Automate repetitive marketing tasks", tool: { name: "Zapier", url: "https://zapier.com" } },
            { 
              text: "Generate ad creatives at scale", 
              tool: { name: "AdCreative.ai", url: "https://www.adcreative.ai" },
              preview: { 
                label: "Ad Optimization", 
                content: "Input: Brand Logo, Main Color (#FF5733), Product Image, Ad Copy.\n\nAI Output: 50 Banner Variations.\n\nTop Prediction: Variation #12\n- Layout: Conversion-focused\n- Score: 98/100\n- Why: High contrast CTA button and face-focused imagery improve CTR by 30%."
              },
              aiPromptContext: "Using data-backed design predictions allows you to launch campaigns with creatives that are statistically more likely to convert."
            },
            { text: "Analyze campaign data for insights", tool: { name: "Julius AI", url: "https://julius.ai" } }
        ]
    );

  } else {
    // GENERIC / CONSULTING BLUEPRINT (Fallback)
    createStep(
        "Skill Acquisition & Setup",
        "Master the specific AI tools required for this idea.",
        [
            { text: `Research tutorials for ${item.idea}`, tool: { name: "YouTube", url: "https://youtube.com" } },
            { text: "Sign up for necessary AI accounts", tool: { name: "OpenAI", url: "https://openai.com" } },
            { text: "Set up a payment gateway (Stripe/PayPal)", tool: { name: "Stripe", url: "https://stripe.com" } }
        ]
    );
    createStep(
        "Prototype Your Solution",
        "Create a Minimum Viable Product (MVP) or service demo.",
        [
            { 
              text: "Use AI to generate the core output", 
              tool: { name: "ChatGPT", url: "https://chat.openai.com" },
              preview: { 
                label: "MVP Plan", 
                content: "Prompt: 'Create a step-by-step roadmap to launch a Minimum Viable Product for a [Idea] business in 2 weeks. Include a list of necessary tools, a daily schedule, and success metrics.'\n\nOutput: Detailed Gantt chart structure with milestones for 'Prototype', 'Beta Test', and 'Public Launch'."
              },
              aiPromptContext: "Breaking down a launch into a daily schedule with specific tools removes analysis paralysis and provides a clear path to execution."
            },
            { text: "Refine output quality manually", tool: { name: "Google Docs", url: "https://docs.google.com" } },
            { 
              text: "Package it as a PDF or Webpage", 
              tool: { name: "Canva", url: "https://www.canva.com" },
              preview: { 
                label: "Presentation Template", 
                content: "Template Choice: 'Modern Corporate Pitch Deck'\n- Slide 1: Problem Statement (The Hook)\n- Slide 2: The Solution (Your AI Product)\n- Slide 3: How it Works (3 Step Process)\n- Slide 4: Pricing & Packages\n\nAI Design Magic: Automatically adjusted color scheme to match brand logo."
              },
              aiPromptContext: "Using a structured pitch deck format ensures you cover all key business aspects (Problem, Solution, Pricing) required to convince investors or partners."
            }
        ]
    );
    createStep(
        "Marketplace Launch",
        "List your service or product where buyers exist.",
        [
            { text: "Create a gig on freelance platforms", tool: { name: "Fiverr", url: "https://www.fiverr.com" } },
            { 
              text: "Write compelling sales copy", 
              tool: { name: "Copy.ai", url: "https://www.copy.ai" },
              preview: { 
                label: "Sales Copy Framework", 
                content: "Framework: PAS (Problem-Agitation-Solution)\n\nProblem: 'Struggling to keep up with content demands?'\nAgitation: 'Falling behind means losing visibility and revenue to competitors who are moving faster.'\nSolution: 'Our AI-powered service delivers a month's worth of content in 48 hours, guaranteed.'"
              },
              aiPromptContext: "The PAS (Problem-Agitation-Solution) framework is a proven psychological formula that guides the reader from realizing they have a problem to accepting your solution."
            },
            { text: "Optimize profile for keywords", tool: { name: "ChatGPT", url: "https://chat.openai.com" } }
        ]
    );
    createStep(
        "Growth & Scaling",
        "Expand your operation.",
        [
            { text: "Collect testimonials", tool: { name: "Typeform", url: "https://www.typeform.com" } },
            { text: "Automate delivery workflow", tool: { name: "Zapier", url: "https://zapier.com" } },
            { text: "Upsell premium AI services", tool: { name: "Gumroad", url: "https://gumroad.com" } }
        ]
    );
  }

  // Add a final universal step
  createStep(
      "Monetization Optimization",
      "Ensure you are maximizing revenue from your efforts.",
      [
          { text: "Analyze pricing strategy vs competitors", tool: { name: "Perplexity", url: "https://www.perplexity.ai" } },
          { text: "Set up retargeting ads", tool: { name: "Meta Ads", url: "https://business.facebook.com" } }
      ]
  );

  // --- Collect and Group Tools ---
  const groupedTools: Record<string, Tool[]> = {};
  const seenUrls = new Set<string>();

  const addTool = (tool: Tool, category: string) => {
      if (seenUrls.has(tool.url)) return;
      seenUrls.add(tool.url);
      if (!groupedTools[category]) groupedTools[category] = [];
      groupedTools[category].push(tool);
  };

  // 1. Add tools from the specific category DB
  const categoryTools = TOOLS_DB[item.category] || [];
  categoryTools.forEach(t => addTool(t, item.category));

  // 2. Add tools mentioned in steps
  steps.forEach(step => {
      step.subSteps.forEach(sub => {
          if (sub.tool) {
              const { tool, category } = findToolDetails(sub.tool.name, sub.tool.url);
              // Prioritize assigning to the main category if it fits, otherwise use found category
              let targetCat = category;
              if (item.category === category) targetCat = item.category;
              
              addTool(tool, targetCat);
          }
      });
  });

  // 3. Fallback if still empty
  if (Object.keys(groupedTools).length === 0) {
      groupedTools["General AI Assistants"] = [
          { name: "ChatGPT", url: "https://chat.openai.com", description: "General AI Assistant" },
          { name: "Google Gemini", url: "https://gemini.google.com", description: "Advanced AI Model" }
      ];
  }

  // Sort tools alphabetically within each category
  Object.keys(groupedTools).forEach(category => {
      groupedTools[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return { steps, tools: groupedTools, workflow };
};

// --- Sub-component for Tool Preview with Loading State ---
const ToolPreview: React.FC<{ label: string; content: string; image?: string; context?: string }> = ({ label, content, image, context }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate thinking/analyzing time
    const timer = setTimeout(() => setIsLoading(false), 1000 + Math.random() * 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-3 w-full max-w-2xl animate-fade-in">
        <div className="relative rounded-lg overflow-hidden bg-[#0d1117] border border-slate-800 ring-1 ring-white/5 transition-all duration-500 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm">
                <div className="flex items-center">
                    <div className={`mr-2 p-1 rounded ${isLoading ? 'bg-indigo-500/10' : 'bg-indigo-500/20'}`}>
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                        {label}
                    </span>
                </div>
                {isLoading && (
                    <div className="flex items-center space-x-2 bg-slate-800/50 px-2 py-1 rounded-full border border-slate-700/50">
                        <span className="text-[10px] text-indigo-300 font-medium animate-pulse">Analyzing...</span>
                        <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
                    </div>
                )}
            </div>
            
            {/* Context Section - Visually Distinct */}
            {!isLoading && context && (
                 <div className="bg-slate-900/40 border-b border-slate-800/50">
                     <div className="px-4 py-3 flex items-start gap-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-2 border-amber-500/50">
                        <div className="bg-amber-500/10 p-1.5 rounded-full mt-0.5 flex-shrink-0">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-extrabold text-amber-500/90 uppercase tracking-wider mb-1 block">
                                Strategy Insight
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                {context}
                            </p>
                        </div>
                     </div>
                 </div>
            )}

            {/* Content Body */}
            <div className="p-4 overflow-x-auto relative min-h-[80px] bg-gradient-to-b from-[#0d1117] to-[#161b22]">
                {isLoading ? (
                    <div className="space-y-2.5 animate-pulse opacity-60 max-w-md">
                         <div className="h-2 bg-slate-700/50 rounded w-3/4"></div>
                         <div className="h-2 bg-slate-700/50 rounded w-1/2"></div>
                         <div className="h-2 bg-slate-700/50 rounded w-5/6"></div>
                         <div className="h-2 bg-slate-700/30 rounded w-full mt-4"></div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <pre className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap selection:bg-indigo-500/30">
                            {content}
                        </pre>
                        {image && (
                            <div className="mt-4 rounded-lg overflow-hidden border border-slate-700/50 shadow-md group relative">
                                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
                                <img 
                                    src={image} 
                                    alt={label} 
                                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-[1.02]" 
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

const Blueprint: React.FC<BlueprintProps> = ({ id, onBack }) => {
  const item = DATA.find(d => d.id === id);
  
  // State for progress tracking
  const [completedSubSteps, setCompletedSubSteps] = useState<Set<string>>(new Set());
  const [userCoreActions, setUserCoreActions] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate blueprint data only once per item
  const blueprintData: IBlueprint = useMemo(() => {
    if (!item) return { steps: [], tools: {}, workflow: [] };
    return generateDetailedBlueprint(item);
  }, [item]);

  // Load progress and favorites from localStorage
  useEffect(() => {
    if (item) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Load progress
      const savedProgress = localStorage.getItem(`blueprint-progress-${item.id}`);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          setCompletedSubSteps(new Set(parsed));
        } catch (e) {
          console.error("Failed to load progress", e);
        }
      }

      // Load User Core Actions
      const savedCoreActions = localStorage.getItem(`blueprint-core-actions-${item.id}`);
      if (savedCoreActions) {
         try { setUserCoreActions(new Set(JSON.parse(savedCoreActions))); } catch (e) {}
      }

      // Load favorites
      const favorites = JSON.parse(localStorage.getItem('blueprint-favorites') || '[]');
      setIsFavorite(favorites.includes(item.id));

      setIsLoaded(true);
    }
  }, [item]);

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded && item) {
      localStorage.setItem(`blueprint-progress-${item.id}`, JSON.stringify(Array.from(completedSubSteps)));
      localStorage.setItem(`blueprint-core-actions-${item.id}`, JSON.stringify(Array.from(userCoreActions)));
    }
  }, [completedSubSteps, userCoreActions, isLoaded, item]);

  const toggleSubStep = (stepId: string) => {
    const newSet = new Set(completedSubSteps);
    if (newSet.has(stepId)) {
      newSet.delete(stepId);
    } else {
      newSet.add(stepId);
    }
    setCompletedSubSteps(newSet);
  };

  const toggleUserCoreAction = (stepId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(userCoreActions);
    if (newSet.has(stepId)) {
        newSet.delete(stepId);
    } else {
        newSet.add(stepId);
    }
    setUserCoreActions(newSet);
  };

  const toggleStepCompletion = (step: BlueprintStep) => {
    const newSet = new Set(completedSubSteps);
    const stepIds = step.subSteps.map(s => s.id);
    const allComplete = stepIds.every(id => newSet.has(id));

    if (allComplete) {
        stepIds.forEach(id => newSet.delete(id));
    } else {
        stepIds.forEach(id => newSet.add(id));
    }
    setCompletedSubSteps(newSet);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = () => {
    if (!item) return;
    const favorites = JSON.parse(localStorage.getItem('blueprint-favorites') || '[]');
    let newFavorites;
    if (favorites.includes(item.id)) {
        newFavorites = favorites.filter((fid: string) => fid !== item.id);
        setIsFavorite(false);
    } else {
        newFavorites = [...favorites, item.id];
        setIsFavorite(true);
    }
    localStorage.setItem('blueprint-favorites', JSON.stringify(newFavorites));
  };

  const calculateProgress = () => {
    const total = blueprintData.steps.reduce((acc, step) => acc + step.subSteps.length, 0);
    if (total === 0) return 0;
    return Math.round((completedSubSteps.size / total) * 100);
  };

  // Get Related Ideas
  const relatedIdeas = useMemo(() => {
    if (!item) return [];
    // Filter by category, exclude current, limit to 4
    return DATA.filter(d => d.category === item.category && d.id !== item.id)
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 4);
  }, [item]);

  if (!item) return <div className="p-10 text-center text-white">Item not found</div>;

  const progress = calculateProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-slide-up pb-24">
      
      {/* Enhanced Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
            <button 
                onClick={onBack}
                className="flex items-center text-slate-300 hover:text-white transition-all group px-4 py-2.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 font-medium"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <div className="h-6 w-px bg-slate-700 mx-1 hidden md:block"></div>
            <button
                onClick={toggleFavorite}
                className={`flex items-center px-4 py-2.5 rounded-xl transition-all border font-medium ${isFavorite ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/50 shadow-lg shadow-yellow-500/20' : 'text-slate-400 border-slate-700 hover:bg-slate-800/80 hover:text-white hover:border-slate-600'}`}
            >
                <Star className={`w-4 h-4 mr-2 transition-all ${isFavorite ? 'fill-yellow-400 scale-110' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
            </button>
        </div>

        <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-700/50 shadow-xl self-start md:self-auto">
            <div className="w-40 h-2.5 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700 shadow-lg shadow-emerald-500/50" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-sm font-bold text-emerald-400">{progress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* Enhanced Header Card */}
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
             {/* Animated Background Elements */}
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Cpu className="w-80 h-80 text-indigo-400 animate-pulse" />
             </div>
             <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
             <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 mb-5 uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    {item.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 mb-5 leading-tight">{item.idea}</h1>
                <p className="text-slate-300 text-xl leading-relaxed max-w-3xl font-light">{item.description}</p>
             </div>
          </div>

          {/* Enhanced Detailed Checklist Steps */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-lg">
                    <CheckSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-black text-white">Action Plan</h2>
            </div>
            
            {blueprintData.steps.map((step, idx) => {
              const isStepComplete = step.subSteps.every(s => completedSubSteps.has(s.id));
              
              return (
              <div key={step.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl transition-all hover:border-indigo-500/30 hover:shadow-indigo-500/10 backdrop-blur-sm">
                {/* Enhanced Step Header */}
                <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-6 border-b border-slate-700/50 flex items-start md:items-center justify-between backdrop-blur-sm">
                    <div>
                        <h3 className="text-2xl font-black text-white flex items-center">
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-base font-black mr-4 shadow-xl shadow-indigo-900/50">
                                {idx + 1}
                            </span>
                            {step.title}
                        </h3>
                        <p className="text-slate-400 text-base mt-2 ml-14 font-light">{step.description}</p>
                    </div>
                    <button
                        onClick={() => toggleStepCompletion(step)}
                        className={`
                            ml-4 flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200
                            ${isStepComplete 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-700 hover:text-white'}
                        `}
                    >
                        {isStepComplete ? 'Unmark All' : 'Mark All'}
                    </button>
                </div>

                {/* Sub Steps Checklist */}
                <div className="p-2 md:p-5 bg-slate-900/30">
                    <div className="space-y-1">
                        {step.subSteps.map((subStep) => {
                            const isChecked = completedSubSteps.has(subStep.id);
                            const isToolStep = !!subStep.tool;
                            const isUserCore = userCoreActions.has(subStep.id);
                            
                            return (
                                <div 
                                    key={subStep.id} 
                                    className={`flex flex-col p-4 rounded-xl transition-all cursor-pointer group 
                                        ${isChecked ? 'bg-gradient-to-r from-emerald-900/20 to-green-900/10 border border-emerald-500/20' : 'hover:bg-slate-800/50 border border-transparent hover:border-slate-700'} 
                                        ${isUserCore ? 'border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 shadow-[0_0_20px_-3px_rgba(234,179,8,0.2)]' : ''}
                                    `}
                                    onClick={() => toggleSubStep(subStep.id)}
                                >
                                    <div className="flex items-start">
                                      <div className={`mt-0.5 mr-4 flex-shrink-0 transition-colors ${isChecked ? 'text-emerald-500' : isUserCore ? 'text-yellow-500' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                          {isChecked ? <CheckCircle className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                                      </div>
                                      <div className="flex-grow flex flex-col md:flex-row md:items-start justify-between gap-3">
                                          <div className="flex flex-col gap-1 w-full">
                                              <div className="flex items-center gap-2 flex-wrap">
                                                  {isToolStep ? (
                                                      <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
                                                          <Hammer className="w-3 h-3 mr-1.5" /> Recommended Tool
                                                      </span>
                                                  ) : (
                                                      <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700/50 text-slate-400 border border-slate-600/50 uppercase tracking-wide">
                                                          <Zap className="w-3 h-3 mr-1.5" /> Core Action
                                                      </span>
                                                  )}

                                                  {/* Core Action Toggle */}
                                                  <button
                                                      onClick={(e) => toggleUserCoreAction(subStep.id, e)}
                                                      className={`
                                                          p-1 rounded-md transition-all duration-300 border
                                                          ${isUserCore 
                                                              ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20' 
                                                              : 'text-slate-600 border-transparent hover:text-yellow-500/70 hover:bg-slate-700'}
                                                      `}
                                                      title={isUserCore ? "Unmark as Priority Core Action" : "Mark as Priority Core Action"}
                                                  >
                                                      <Star className={`w-3 h-3 ${isUserCore ? 'fill-yellow-400' : ''}`} />
                                                  </button>

                                                  <span className={`text-base font-medium transition-colors ${isChecked ? 'text-slate-500 line-through decoration-slate-600' : isUserCore ? 'text-yellow-100' : 'text-slate-200'}`}>
                                                      {subStep.text}
                                                  </span>
                                              </div>

                                              {/* Tool Output Preview */}
                                              {subStep.preview && (
                                                <ToolPreview 
                                                    label={subStep.preview.label} 
                                                    content={subStep.preview.content} 
                                                    image={subStep.preview.image} 
                                                    context={subStep.aiPromptContext}
                                                />
                                              )}
                                          </div>
                                          
                                          <div className="flex flex-wrap gap-2 md:flex-col md:items-end flex-shrink-0 md:ml-2 mt-1 md:mt-0">
                                            {subStep.tool && (
                                                <a 
                                                    href={subStep.tool.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()} // Prevent checking box when clicking link
                                                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-slate-700 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all border border-slate-600 hover:border-indigo-500 whitespace-nowrap shadow-sm justify-center"
                                                >
                                                    Use {subStep.tool.name} <ExternalLink className="w-3 h-3 ml-1.5" />
                                                </a>
                                            )}
                                            
                                            {subStep.tool && subStep.preview && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(subStep.preview!.content, subStep.id);
                                                    }}
                                                    className={`
                                                        inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all border whitespace-nowrap shadow-sm justify-center
                                                        ${copiedId === subStep.id
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'}
                                                    `}
                                                >
                                                    {copiedId === subStep.id ? (
                                                        <>Copied <Check className="w-3 h-3 ml-1.5" /></>
                                                    ) : (
                                                        <>Copy Prompt <Copy className="w-3 h-3 ml-1.5" /></>
                                                    )}
                                                </button>
                                            )}
                                          </div>
                                      </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Enhanced Visual Workflow */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl p-10 backdrop-blur-sm shadow-2xl">
             <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                    <Layers className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-3xl font-black text-white">Process Overview</h2>
            </div>
            <WorkflowVisualizer steps={blueprintData.steps} completedSubSteps={completedSubSteps} />
          </div>

        </div>

        {/* Sidebar (Right) - Sticky */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Enhanced Toolkit Card */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-black text-white mb-6 flex items-center">
                    <div className="p-1.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg mr-3">
                        <Wrench className="w-5 h-5 text-indigo-400" />
                    </div>
                    Toolkit
                </h3>
                
                <div className="space-y-6">
                {Object.entries(blueprintData.tools).map(([category, tools]) => (
                    <div key={category}>
                        <div className="flex items-center mb-3">
                            <Wrench className="w-3.5 h-3.5 text-slate-500 mr-2" />
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {category}
                            </h4>
                        </div>
                        <div className="space-y-3">
                            {tools.map((tool, idx) => (
                                <a 
                                key={idx}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 group backdrop-blur-sm"
                                >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-slate-200 group-hover:text-indigo-400">{tool.name}</span>
                                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
                                </div>
                                <span className="text-xs text-slate-500 line-clamp-2">{tool.description}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Related Opportunities Card */}
            {relatedIdeas.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-black text-white mb-5 flex items-center">
                    <div className="p-1.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg mr-3">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    Related
                </h3>
                <div className="space-y-3">
                    {relatedIdeas.map((related) => (
                        <a 
                            key={related.id}
                            href={`#idea/${related.id}`}
                            className="block p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:bg-slate-800/80 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-300 group backdrop-blur-sm"
                        >
                            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 mb-1 leading-tight">
                                {related.idea}
                            </h4>
                             <div className="flex items-center text-xs text-slate-500 group-hover:text-slate-400">
                                <span>View Blueprint</span>
                                <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            )}

            {/* Enhanced Motivation / Tip Card */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                <h4 className="text-indigo-300 font-black mb-3 flex items-center text-lg">
                    <div className="p-1.5 bg-indigo-500/20 rounded-lg mr-2">
                        <Save className="w-4 h-4" />
                    </div>
                    Pro Tip
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                    Your progress is saved automatically. Bookmark this page to continue your journey anytime.
                </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blueprint;