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

    // Fixed strict array part layout for system instructions
    const geminiPayload = {
      contents: messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      systemInstruction: {
        parts: [{ text: aiContext.systemPrompt }] // Strict block matrix
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    );

    const data = await response.json();
    
    // Safety handling if Gemini structure gives candidate mismatch
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ role: "assistant", content: aiResponse });
    } else {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// API ERROR: System response block was empty. Check key activation.` 
      });
    }

  } catch (error) {
    return NextResponse.json({ error: "Pipeline translation dropped matrix frame." }, { status: 500 });
  }
}