import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

async function sendRavenEmail(args: { name: string; email: string; projectType?: string; budget?: string; timeline?: string; description: string }) {
  const safeName = escapeHtml(args.name)
  const safeEmail = escapeHtml(args.email)
  const safeType = args.projectType ? escapeHtml(args.projectType) : ""
  const safeBudget = args.budget ? escapeHtml(args.budget) : ""
  const safeTimeline = args.timeline ? escapeHtml(args.timeline) : ""
  const safeDesc = escapeHtml(args.description)

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
  })

  const teamHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">RYX</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">New Inquiry via RAVEN AI</p>
      <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;">${date} IST</p>
    </div>

    <!-- Main Content -->
    <div style="background:#ffffff;padding:0;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">

      <!-- RAVEN Badge -->
      <div style="padding:20px 32px 0;">
        <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;">
          <p style="margin:0;font-size:13px;color:#92400e;font-weight:600;">⚡ Collected via RAVEN chatbot</p>
        </div>
      </div>

      <!-- Client Info Section -->
      <div style="padding:20px 32px 20px;">
        <h2 style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#7c3aed;">Client Information</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">Full Name</td>
            <td style="padding:10px 0;color:#111827;font-size:15px;font-weight:600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;">Email</td>
            <td style="padding:10px 0;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#7c3aed;text-decoration:none;font-weight:500;">${safeEmail}</a></td>
          </tr>
        </table>
      </div>

      <!-- Divider -->
      <div style="border-top:1px solid #f3f4f6;margin:0 32px;"></div>

      <!-- Project Details Section -->
      <div style="padding:20px 32px;">
        <h2 style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#7c3aed;">Project Details</h2>

        ${safeType || safeBudget || safeTimeline ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:10px 0;margin:0 -10px 16px;">
          <tr>
            ${safeType ? `
            <td style="background:#f5f3ff;border:1px solid #ede9fe;border-radius:10px;padding:14px 18px;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Service</p>
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">${safeType}</p>
            </td>` : ""}
            ${safeBudget ? `
            <td style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:10px;padding:14px 18px;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Budget</p>
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">${safeBudget}</p>
            </td>` : ""}
            ${safeTimeline ? `
            <td style="background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;padding:14px 18px;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Timeline</p>
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">${safeTimeline}</p>
            </td>` : ""}
          </tr>
        </table>` : `<p style="color:#9ca3af;font-size:13px;font-style:italic;margin:0 0 16px;">No service/budget/timeline specified</p>`}
      </div>

      <!-- Divider -->
      <div style="border-top:1px solid #f3f4f6;margin:0 32px;"></div>

      <!-- Message Section -->
      <div style="padding:20px 32px 28px;">
        <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#7c3aed;">Project Description</h2>
        <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:18px 20px;">
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.8;white-space:pre-wrap;">${safeDesc}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #f3f4f6;">
        <p style="margin:0 0 12px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Quick Actions</p>
        <div>
          <a href="mailto:${safeEmail}" style="display:inline-block;padding:10px 20px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;margin-right:8px;">Reply to ${safeName}</a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">This inquiry was collected via RAVEN AI on the RYX website</p>
    </div>
  </div>
</body>
</html>`

  const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%);padding:36px 32px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">RYX</h1>
      <p style="color:rgba(255,255,255,0.9);margin:12px 0 0;font-size:18px;font-weight:600;">Thanks for reaching out, ${safeName}!</p>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;">

      <p style="color:#374151;font-size:15px;line-height:1.8;margin:0 0 20px;">
        We've received your project details via RAVEN, our AI assistant, and our team is already reviewing it. You can expect a detailed response within <strong>24 hours</strong>.
      </p>

      <!-- What you submitted -->
      <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:12px;padding:20px;margin:0 0 24px;">
        <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#7c3aed;">Your Inquiry Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${safeType ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:100px;">Service</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeType}</td></tr>` : ""}
          ${safeBudget ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Budget</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeBudget}</td></tr>` : ""}
          ${safeTimeline ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Timeline</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeTimeline}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;vertical-align:top;">Message</td><td style="padding:6px 0;color:#374151;font-size:13px;line-height:1.6;">${safeDesc.length > 200 ? safeDesc.substring(0, 200) + "..." : safeDesc}</td></tr>
        </table>
      </div>

      <!-- What happens next -->
      <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#7c3aed;">What Happens Next?</h3>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td width="40" style="padding:0 12px 16px 0;vertical-align:top;">
            <div style="width:28px;height:28px;background:#f5f3ff;border:1px solid #ede9fe;border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#7c3aed;">1</div>
          </td>
          <td style="padding:0 0 16px 0;vertical-align:top;">
            <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">We review your requirements</p>
            <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Our team analyzes your project needs and prepares a tailored approach.</p>
          </td>
        </tr>
        <tr>
          <td width="40" style="padding:0 12px 16px 0;vertical-align:top;">
            <div style="width:28px;height:28px;background:#f5f3ff;border:1px solid #ede9fe;border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#7c3aed;">2</div>
          </td>
          <td style="padding:0 0 16px 0;vertical-align:top;">
            <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">Free discovery call</p>
            <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">We schedule a call to discuss your vision, goals, and technical requirements.</p>
          </td>
        </tr>
        <tr>
          <td width="40" style="padding:0 12px 24px 0;vertical-align:top;">
            <div style="width:28px;height:28px;background:#f5f3ff;border:1px solid #ede9fe;border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#7c3aed;">3</div>
          </td>
          <td style="padding:0 0 24px 0;vertical-align:top;">
            <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">Detailed proposal & timeline</p>
            <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">You receive a comprehensive proposal with scope, timeline, and transparent pricing.</p>
          </td>
        </tr>
      </table>

      <!-- Contact Info -->
      <div style="border-top:1px solid #f3f4f6;padding-top:20px;">
        <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Need to reach us sooner?</strong></p>
        <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.8;">
          Email: <a href="mailto:ryxdevsolution@gmail.com" style="color:#7c3aed;text-decoration:none;">ryxdevsolution@gmail.com</a><br>
          Phone: <a href="tel:+918667258008" style="color:#7c3aed;text-decoration:none;">+91 86672 58008</a><br>
          Hours: Mon–Sat, 9am–6pm IST
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 0;">
      <p style="margin:0 0 4px;font-size:13px;color:#6b7280;font-weight:600;">RYX — Building Digital Products That Matter</p>
      <p style="margin:0;font-size:11px;color:#9ca3af;">You received this because you submitted an inquiry via RAVEN AI at ryx.dev</p>
    </div>
  </div>
</body>
</html>`

  // Send both emails
  await transporter.sendMail({
    from: `"RYX Website" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: args.email,
    subject: `🤖 RAVEN Inquiry from ${args.name}${args.projectType ? ` [${args.projectType}]` : ""}`,
    html: teamHtml,
  })

  await transporter.sendMail({
    from: `"RYX Team" <${process.env.SMTP_USER}>`,
    to: args.email,
    subject: `We received your inquiry, ${args.name} — RYX`,
    html: clientHtml,
  })
}

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  })
}

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

    const response = await getOpenAI().chat.completions.create({
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
        // Send email to team + client
        try {
          await sendRavenEmail(args)
        } catch (emailErr) {
          console.error("RAVEN email send failed:", emailErr)
        }

        // Build a summary message for the user
        const parts = [`Project: ${args.description}`]
        if (args.projectType) parts.push(`Type: ${args.projectType}`)
        if (args.budget) parts.push(`Budget: ${args.budget}`)
        if (args.timeline) parts.push(`Timeline: ${args.timeline}`)

        const contactMessage = `${args.name}, I've got everything. Let me fill that in for you.`

        // Get a follow-up response from the model
        const followUp = await getOpenAI().chat.completions.create({
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
