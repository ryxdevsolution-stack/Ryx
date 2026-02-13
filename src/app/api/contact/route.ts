import { NextRequest, NextResponse } from "next/server"
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, service, budget, timeline, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = phone ? escapeHtml(phone) : ""
    const safeCompany = company ? escapeHtml(company) : ""
    const safeService = service ? escapeHtml(service) : ""
    const safeBudget = budget ? escapeHtml(budget) : ""
    const safeTimeline = timeline ? escapeHtml(timeline) : ""
    const safeMessage = escapeHtml(message)

    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    })

    // ── Email to RYX Team ──
    const teamEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">RYX</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">New Project Inquiry Received</p>
      <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;">${date} IST</p>
    </div>

    <!-- Main Content -->
    <div style="background:#ffffff;padding:0;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">

      <!-- Client Info Section -->
      <div style="padding:28px 32px 20px;">
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
          ${safePhone ? `
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;">Phone</td>
            <td style="padding:10px 0;color:#111827;font-size:15px;"><a href="tel:${safePhone}" style="color:#111827;text-decoration:none;">${safePhone}</a></td>
          </tr>` : ""}
          ${safeCompany ? `
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;">Company</td>
            <td style="padding:10px 0;color:#111827;font-size:15px;font-weight:500;">${safeCompany}</td>
          </tr>` : ""}
        </table>
      </div>

      <!-- Divider -->
      <div style="border-top:1px solid #f3f4f6;margin:0 32px;"></div>

      <!-- Project Details Section -->
      <div style="padding:20px 32px;">
        <h2 style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#7c3aed;">Project Details</h2>

        ${safeService || safeBudget || safeTimeline ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:10px 0;margin:0 -10px 16px;">
          <tr>
            ${safeService ? `
            <td style="background:#f5f3ff;border:1px solid #ede9fe;border-radius:10px;padding:14px 18px;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Service</p>
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">${safeService}</p>
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
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.8;white-space:pre-wrap;">${safeMessage}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #f3f4f6;">
        <p style="margin:0 0 12px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Quick Actions</p>
        <div>
          <a href="mailto:${safeEmail}" style="display:inline-block;padding:10px 20px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;margin-right:8px;">Reply to ${safeName}</a>
          ${safePhone ? `<a href="tel:${safePhone}" style="display:inline-block;padding:10px 20px;background:#111827;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Call ${safeName}</a>` : ""}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px 0 0;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">This email was sent from the RYX website contact form</p>
    </div>
  </div>
</body>
</html>`

    // ── Confirmation Email to Client ──
    const clientEmail = `
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
        We've received your project inquiry and our team is already reviewing it. You can expect a detailed response within <strong>24 hours</strong>.
      </p>

      <!-- What you submitted -->
      <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:12px;padding:20px;margin:0 0 24px;">
        <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#7c3aed;">Your Inquiry Summary</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${safeService ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:100px;">Service</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeService}</td></tr>` : ""}
          ${safeBudget ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Budget</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeBudget}</td></tr>` : ""}
          ${safeTimeline ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Timeline</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${safeTimeline}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;vertical-align:top;">Message</td><td style="padding:6px 0;color:#374151;font-size:13px;line-height:1.6;">${safeMessage.length > 200 ? safeMessage.substring(0, 200) + "..." : safeMessage}</td></tr>
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
      <p style="margin:0;font-size:11px;color:#9ca3af;">You received this because you submitted an inquiry at ryx.dev</p>
    </div>
  </div>
</body>
</html>`

    // Send email to RYX team
    await transporter.sendMail({
      from: `"RYX Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `🔔 New Project Inquiry from ${name}${company ? ` — ${company}` : ""}${service ? ` [${service}]` : ""}`,
      html: teamEmail,
    })

    // Send confirmation to the client
    await transporter.sendMail({
      from: `"RYX Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your inquiry, ${name} — RYX`,
      html: clientEmail,
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    console.error("Contact email error:", errMsg)
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    )
  }
}
