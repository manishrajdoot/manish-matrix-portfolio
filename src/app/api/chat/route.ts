import { NextResponse } from 'next/server';
import { aiContext } from '@/data/aiContext';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Yahan hum system prompt context ko payload matrix ke sath secure blend kar rahe hain
    const apiPayload = {
      model: "gpt-4o-mini", // Ya jo bhi model aap deploy karna chahein
      messages: [
        { role: "system", content: aiContext.systemPrompt },
        ...messages
      ],
      temperature: 0.7,
    };

    // Note: Local test ke liye agar API key na ho toh ye fallback dummy simulation output dega
    if (!process.env.AI_API_KEY) {
      const lastUserMessage = messages[messages.length - 1]?.content || "";
      return NextResponse.json({ 
        role: "assistant", 
        content: `// OFFLINE MODE NODE: Received vector instruction "${lastUserMessage}". (Please configure AI_API_KEY in Vercel env to active network uplink!)` 
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify(apiPayload),
    });

    const data = await response.json();
    return NextResponse.json({
      role: "assistant",
      content: data.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json({ error: "Pipeline translation dropped matrix frame." }, { status: 500 });
  }
}