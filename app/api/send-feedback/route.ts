import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { rating, feedback, code } = await request.json();

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  await resend.emails.send({
    from: "The Consequence Chamber <onboarding@resend.dev>",
    to: "afurusho105@gmail.com",
    subject: `${stars} New Feedback — Consequence Chamber`,
    html: `
      <div style="background:#080808;padding:40px;font-family:Georgia,serif;color:#f0ebe0;max-width:500px;margin:0 auto;border-radius:12px;">
        <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#d4a843;margin-bottom:8px;">The Consequence Chamber</p>
        <h1 style="font-size:24px;font-weight:600;margin-bottom:16px;">New User Feedback</h1>
        <div style="background:#1a1710;border:1px solid rgba(212,168,67,0.35);border-radius:10px;padding:20px;margin-bottom:20px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(240,235,224,0.3);margin-bottom:8px;">Rating</p>
          <p style="font-size:2rem;color:#d4a843;margin-bottom:4px;">${stars}</p>
          <p style="font-size:14px;color:#d4a843;">${rating} / 5 stars</p>
        </div>
        ${feedback ? `
        <div style="background:#1a1710;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px;margin-bottom:20px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(240,235,224,0.3);margin-bottom:8px;">Feedback</p>
          <p style="font-size:14px;color:#f0ebe0;line-height:1.7;">${feedback}</p>
        </div>
        ` : ""}
        <p style="font-size:11px;color:rgba(240,235,224,0.25);">Roulette code: ${code || "unknown"}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
