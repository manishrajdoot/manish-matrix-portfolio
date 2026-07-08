import { NextResponse } from 'next/server';
import { mockDatabase } from '@/data/dbMock';
import { globalChatRegistry } from '@/data/analyticsStore'; // Successfully synced analytical ledger

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const startTime = performance.now();
    
    if (!query || query.trim() === "") {
      return NextResponse.json({ error: "Empty pipeline stack. Send valid SQL sequence." }, { status: 400 });
    }

    const cleanQuery = query.toLowerCase().trim();
    let result: any[] = [...mockDatabase];
    let executionType = "TABLE SCAN";
    let message = "Query executed successfully over linear database block.";

    // 🛡️ SECRET LINK MATRIX LAYER: Intercepting query to fetch live tracking logs
    if (cleanQuery.includes('chat_logs')) {
      executionType = "ANALYTICS SYSTEM MEMORY SCAN";
      message = "Matrix core decrypted secure chat activity ledger frames successfully.";
      
      // Map global cache registers to output block structure
      result = globalChatRegistry.map(log => ({
        id: log.id,
        name: log.userPrompt, // Mapping custom dynamic text directly into rows safely
        category: `RESP_LEN: ${log.responseLength}B`,
        latency_ms: log.status === 'SUCCESS' ? 8 : 404
      }));
    } else {
      // Standard workflow rules (Filters / Sorting maps)
      if (cleanQuery.includes('where')) {
        executionType = "FILTER SCAN (INDEX RE-MAP)";
        if (cleanQuery.includes('optimized')) {
          result = mockDatabase.filter(p => p.status === 'optimized');
        } else if (cleanQuery.includes('deprecated')) {
          result = mockDatabase.filter(p => p.status === 'deprecated');
        } else if (cleanQuery.includes('pending_index')) {
          result = mockDatabase.filter(p => p.status === 'pending_index');
        }
      } else if (cleanQuery.includes('order by')) {
        executionType = "INDEX SORT OPERATION";
        result = [...mockDatabase].sort((a, b) => a.latency_ms - b.latency_ms);
      }
    }

    const endTime = performance.now();
    const latency = parseFloat((endTime - startTime).toFixed(4));

    return NextResponse.json({
      success: true,
      executionType,
      latencyMs: latency,
      rowsAffected: result.length,
      data: result,
      message
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal query buffer dropped matrix compilation frame." }, { status: 500 });
  }
}