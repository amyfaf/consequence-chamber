import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { senderEmail, senderName, giftTitle, giftEmoji } = await request.json();

  await resend.emails.send({
    from: "The Consequence Chamber <onboarding@resend.dev>",
    to: senderEmail,
    subject: "🎰 Your roulette was just spun.",
    html: `
      <div style="background:#080808;padding:40px;font-family:Georgia,serif;color:#f0ebe0;max-width:500px;margin:0 auto;border-radius:12px;">
        <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#d4a843;margin-bottom:8px;">The Consequence Chamber</p>
        <h1 style="font-size:28px;font-weight:600;margin-bottom:16px;color:#f0ebe0;">The trigger was pulled.</h1>
        <p style="font-size:14px;color:rgba(240,235,224,0.6);line-height:1.7;margin-bottom:24px;">
          Someone just spun your roulette. The chamber has delivered its verdict.
        </p>
        <div style="background:#1a1710;border:1px solid rgba(212,168,67,0.35);border-radius:10px;padding:24px;text-align:center;margin-bottom:24px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(240,235,224,0.3);margin-bottom:8px;">Verdict</p>
          <p style="font-size:2.5rem;margin-bottom:8px;">${giftEmoji}</p>
          <p style="font-size:1.25rem;color:#f0ebe0;font-weight:600;margin:0;">${giftTitle}</p>
        </div>
        <p style="font-size:11px;color:rgba(240,235,224,0.25);text-align:center;line-height:1.7;">
          Accountability has been assigned.<br/>Built for dramatic accountability & luxury reparations.
        </p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}