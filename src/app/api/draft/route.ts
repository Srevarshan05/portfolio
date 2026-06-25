import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { status: "error", message: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant helping a visitor draft an email to Sre Varshan (an AI/ML Engineer). Generate a professional email based on the user's prompt. You MUST return a JSON object with exactly two fields: 'subject' (a suitable email subject) and 'message' (the drafted email body). Do not include any explanations, greetings, or conversational filler in your outer response. Just return the JSON object."
          },
          {
            role: "user",
            content: `Prompt: ${prompt}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const contentText = data.choices[0].message.content;
      const content = JSON.parse(contentText);
      return NextResponse.json({
        status: "success",
        subject: content.subject || "",
        message: content.message || ""
      });
    } else {
      throw new Error(data.error?.message || "Failed to generate draft from Groq API");
    }

  } catch (error: any) {
    console.error("AI Draft Generation Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to generate draft" },
      { status: 500 }
    );
  }
}
