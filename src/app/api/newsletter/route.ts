import { NextResponse } from "next/server";

const KIT_FORM_ID = "9843363";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.KIT_API_KEY;

    if (!apiKey) {
      console.error("KIT_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Newsletter service is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({
          email_address: email.trim(),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Kit API error:", response.status, errorData);

      return NextResponse.json(
        { error: "Could not subscribe this email address." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}