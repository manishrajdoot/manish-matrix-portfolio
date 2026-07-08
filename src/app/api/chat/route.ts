import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        role: "assistant", 
        content: `// OFFLINE MODE NODE: Please configure AI_API_KEY in Vercel env.` 
      });
    }

    // Direct network audit call to Google Model Service to pull active IDs
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.AI_API_KEY}`,
      { method: 'GET' }
    );

    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      // Extraction map for names that support content generation
      const activeModels = data.models
        .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m: any) => m.name.replace('models/', ''))
        .join(', ');

      return NextResponse.json({ 
        role: "assistant", 
        content: `📡 LIVE MODELS AUDIT SUCCESS! Copy any name from here and tell me: [ ${activeModels} ]` 
      });
    }

    return NextResponse.json({ 
      role: "assistant", 
      content: `// REJECTION: ${JSON.stringify(data)}` 
    });

  } catch (error) {
    return NextResponse.json({ error: "Pipeline map crash." }, { status: 500 });
  }
}