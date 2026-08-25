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

    const emailAddress = email.trim();

    // Step 1: Create or retrieve the subscriber.
    const subscriberResponse = await fetch(
      "https://api.kit.com/v4/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({
          email_address: emailAddress,
        }),
      }
    );

    if (!subscriberResponse.ok) {
      const errorData = await subscriberResponse.text();
      console.error(
        "Kit subscriber creation error:",
        subscriberResponse.status,
        errorData
      );

      return NextResponse.json(
        { error: "Could not register this email address." },
        { status: 502 }
      );
    }

    const subscriberData = await subscriberResponse.json();
    const subscriberId = subscriberData.subscriber?.id;

    if (!subscriberId) {
      console.error("Kit did not return a subscriber ID.");
      return NextResponse.json(
        { error: "Could not register this email address." },
        { status: 502 }
      );
    }

    // Step 2: Add the subscriber to the Systemine newsletter form.
    const formResponse = await fetch(
      `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers/${subscriberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
      }
    );

    if (!formResponse.ok) {
      const errorData = await formResponse.text();
      console.error(
        "Kit form subscription error:",
        formResponse.status,
        errorData
      );

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