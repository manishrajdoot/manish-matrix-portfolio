import { NextResponse } from 'next/server';
import { aiContext } from '@/data/aiContext';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// OFFLINE MODE NODE: Please configure AI_API_KEY in Vercel env.` 
      });
    }

    // Modern structure message pairing using audited active models standard
    const contextualMessages = [
      {
        role: 'user',
        parts: [{ text: `System Instruction Baseline: ${aiContext.systemPrompt}\n\nAcknowledge this system baseline and reply to the user conversation accordingly.` }]
      },
      {
        role: 'model',
        parts: [{ text: `UNDERSTOOD. Matrix-AI protocols activated. Ready to assist according to Manish Rajdoot's profile data.` }]
      },
      ...messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    ];

    const geminiPayload = {
      contents: contextualMessages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    };

    // FIXED LOCK: Explicitly hitting the live verified audited model path
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ role: "assistant", content: aiResponse });
    } 
    
    if (data.error) {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// GOOGLE API ERROR: ${data.error.message || 'Authentication declined.'}` 
      });
    }

    return NextResponse.json({ 
      role: "assistant", 
      content: `// SYSTEM ERROR: Dynamic matrix mapping frame lost.` 
    });

  } catch (error) {
    return NextResponse.json({ error: "Pipeline translation dropped matrix frame." }, { status: 500 });
  }
}