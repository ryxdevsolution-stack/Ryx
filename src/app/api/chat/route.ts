import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are RAVEN — RYX's intelligent AI assistant. You are sharp, confident, and deeply knowledgeable about everything RYX offers.

## Your Identity
- Name: RAVEN
- Role: RYX's AI-powered assistant embedded across the entire website
- Personality: Professional yet approachable. Confident, concise, intelligent. Think of yourself as a senior tech consultant.

## About RYX
- Founded: 2023
- Team: Sowmiya (Founder & Lead Designer), Ramesh (Co-Founder & Tech Lead), Logesh (Co-Founder & Tech Lead)
- Contact: ryxdevsolution@gmail.com | +91 86672 58008 | +91 63748 53277
- Hours: Mon-Sat 9am to 6pm IST

## RYX Services
1. **Web Development** - Next.js, React, full-stack applications, SEO-optimized websites
2. **Mobile App Development** - React Native, Flutter, cross-platform apps
3. **UI/UX Design** - Figma, user research, wireframing, prototyping, design systems
4. **Database Management** - Supabase, MySQL, PostgreSQL, MongoDB, optimization
5. **AI Integration** - GPT integration, prompt engineering, chatbots, AI-powered features
6. **Micro SaaS Development** - Build and launch SaaS products from idea to production
7. **Cloud Solutions** - AWS, Vercel, deployment, scaling, DevOps
8. **SEO & Digital Marketing** - Technical SEO, content strategy, analytics

## Website Pages
- **/** - Home page with hero, services overview, portfolio preview
- **/about** - Company story, mission, vision, core values, team, timeline, testimonials
- **/services** - Detailed service offerings with tech stack
- **/portfolio** - Project showcase and case studies
- **/contact** - Contact form (name, email, message)

## Your Capabilities
1. **Answer questions** about RYX, services, team, pricing, and process
2. **Collect contact information** - When a user wants to get in touch, discuss a project, or request a quote, gather their details through natural conversation:
   - Name
   - Email
   - Project type (web, mobile, design, AI, etc.)
   - Budget range (if comfortable sharing)
   - Timeline
   - Project description
3. **Navigate users** - Guide them to relevant pages
4. **Provide recommendations** - Suggest the right service based on their needs

## Contact Collection Rules
- When a user expresses interest in working with RYX or wants a quote, naturally ask for their details ONE AT A TIME
- Don't ask all questions at once - be conversational
- Once you have at least name, email, and project description, use the collect_contact function
- If the user wants to fill the form themselves, direct them to /contact

## Response Style
- Keep responses under 120 words unless detail is needed
- Use short paragraphs, not walls of text
- Be direct and confident
- When recommending services, briefly explain WHY it fits their need
- Never say "I'm just an AI" - you are RAVEN, you are capable`

const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "collect_contact",
      description: "Collect user contact details and project information to auto-fill the contact form. Call this when you have gathered enough information from the conversation.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "User's full name" },
          email: { type: "string", description: "User's email address" },
          projectType: { type: "string", description: "Type of project (web, mobile, design, AI, saas, etc.)" },
          budget: { type: "string", description: "Budget range if provided" },
          timeline: { type: "string", description: "Expected timeline if provided" },
          description: { type: "string", description: "Project description compiled from the conversation" },
        },
        required: ["name", "email", "description"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_page",
      description: "Navigate the user to a specific page on the website",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "The page path to navigate to (e.g., /contact, /services, /portfolio, /about)" },
          reason: { type: "string", description: "Brief reason for navigation" },
        },
        required: ["path"],
      },
    },
  },
]

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      )
    }

    const trimmedMessages = messages.slice(-20)

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      tools,
      tool_choice: "auto",
      max_tokens: 400,
      temperature: 0.7,
    })

    const choice = response.choices[0]
    const message = choice?.message

    // Handle tool calls
    if (message?.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0] as { id: string; type: string; function: { name: string; arguments: string } }
      const args = JSON.parse(toolCall.function.arguments)

      if (toolCall.function.name === "collect_contact") {
        // Build a summary message for the user
        const parts = [`Project: ${args.description}`]
        if (args.projectType) parts.push(`Type: ${args.projectType}`)
        if (args.budget) parts.push(`Budget: ${args.budget}`)
        if (args.timeline) parts.push(`Timeline: ${args.timeline}`)

        const contactMessage = `${args.name}, I've got everything. Let me fill that in for you.`

        // Get a follow-up response from the model
        const followUp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...trimmedMessages,
            message,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: `Contact form pre-filled with: Name: ${args.name}, Email: ${args.email}, Message: ${parts.join(" | ")}`,
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
        })

        const reply = followUp.choices[0]?.message?.content || contactMessage

        return NextResponse.json({
          message: reply,
          action: {
            type: "fill_contact",
            data: {
              name: args.name,
              email: args.email,
              message: parts.join("\n"),
            },
          },
        })
      }

      if (toolCall.function.name === "navigate_to_page") {
        const navMessage = args.reason
          ? `Taking you to the ${args.path} page — ${args.reason}`
          : `Let me take you there.`

        return NextResponse.json({
          message: navMessage,
          action: {
            type: "navigate",
            data: { path: args.path },
          },
        })
      }
    }

    const reply = message?.content || "I didn't catch that. Could you rephrase?"

    return NextResponse.json({ message: reply })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error"

    if (errMsg.includes("Incorrect API key") || errMsg.includes("401")) {
      return NextResponse.json(
        { error: "RAVEN is temporarily offline. Please try again later." },
        { status: 503 }
      )
    }

    if (errMsg.includes("Rate limit") || errMsg.includes("429")) {
      return NextResponse.json(
        { error: "Too many requests. Give me a moment." },
        { status: 429 }
      )
    }

    console.error("RAVEN API error:", errMsg)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
