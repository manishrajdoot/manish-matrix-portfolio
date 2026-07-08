import { NextResponse } from 'next/server';
import { aiContext } from '@/data/aiContext';
import { globalChatRegistry } from '@/data/analyticsStore';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// OFFLINE MODE NODE: Please configure OpenRouter AI_API_KEY in env layers.` 
      });
    }

    // Transforming messages to absolute OpenRouter protocol standard mesh
    const openRouterMessages = [
      {
        role: 'system',
        content: aiContext.systemPrompt
      },
      ...messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    // Hitting OpenRouter with a high-availability model to bypass structural traffic queues
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://manishrajdoot.com", 
        "X-Title": "Manish Rajdoot Matrix Portfolio"
      },
      body: JSON.stringify({
        // 🚀 ROUTING UPGRADE: Switched to high-availability free tier endpoint to completely smash spike demands
        model: "openchat/openchat-7b:free",
        messages: openRouterMessages,
        temperature: 0.7,
        max_tokens: 2048 
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]?.message?.content) {
      const aiResponse = data.choices[0].message.content;

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
      // Log failure frame tracking inside storage block
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
        content: `// OPENROUTER ROUTE ERROR: ${data.error.message || 'Transmission declined.'}` 
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