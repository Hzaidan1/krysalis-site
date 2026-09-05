import { NextRequest, NextResponse } from "next/server";

// Sends contact form submissions to CONTACT_TO_EMAIL using the Resend API.
// Requires RESEND_API_KEY (and ideally a verified sending domain) set as
// environment variables wherever this is deployed — see .env.local.example.
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Honeypot — a hidden field real users never fill in. If it has a
    // value, silently accept without sending (basic spam protection).
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const required = ["name", "org", "email", "projectType", "description", "timeframe"];
    for (const field of required) {
      if (!data[field] || !String(data[field]).trim()) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "admin@krysalismedia.co.uk";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set — email was not sent.");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const bodyHtml = `
      <h2>New enquiry from krysalismedia.co.uk</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Brand/Org:</strong> ${data.org}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Project type:</strong> ${data.projectType}</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <p><strong>Timeframe:</strong> ${data.timeframe}</p>
      <p><strong>Budget:</strong> ${data.budget || "—"}</p>
      <p><strong>Links:</strong> ${data.links || "—"}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Krysalis Website <onboarding@resend.dev>", // swap once domain is verified in Resend
        to: [toEmail],
        reply_to: data.email,
        subject: `New project enquiry from ${data.name}`,
        html: bodyHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return NextResponse.json(
        { ok: false, error: "Failed to send" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}
