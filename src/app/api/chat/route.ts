import { NextResponse } from 'next/server';
import { aiContext } from '@/data/aiContext';
import { globalChatRegistry } from '@/data/analyticsStore';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// OFFLINE MODE NODE: Please configure AI_API_KEY in Vercel env.` 
      });
    }

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
        maxOutputTokens: 2048, // Unlocked long response frame capacity
      }
    };

    // FIXED STANDARD PATH: Pointing strictly to 1.5-flash to avoid dynamic query token limits drops
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const aiResponse = data.candidates[0].content.parts[0].text;

      // 🛡️ BACKGROUND INTERCEPT MESH: Logging current user prompt metadata securely
      const userText = messages[messages.length - 1]?.content || "Unknown Node";
      globalChatRegistry.unshift({
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        userPrompt: userText.length > 60 ? userText.substring(0, 60) + "..." : userText,
        responseLength: aiResponse.length,
        status: 'SUCCESS'
      });

      return NextResponse.json({ role: "assistant", content: aiResponse });
    } 
    
    if (data.error) {
      // Log failure frame tracking
      const userText = messages[messages.length - 1]?.content || "Unknown Node";
      globalChatRegistry.unshift({
        id: `ERR-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        userPrompt: userText.length > 60 ? userText.substring(0, 60) + "..." : userText,
        responseLength: 0,
        status: 'PIPELINE_DROP'
      });

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