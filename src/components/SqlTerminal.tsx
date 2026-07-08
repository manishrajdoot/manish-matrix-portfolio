'use client';

import React, { useState } from 'react';

export default function SqlTerminal() {
  const [query, setQuery] = useState('SELECT * FROM manish_projects WHERE status = \'optimized\';');
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<any[]>([]);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sql-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      
      setTerminalLogs((prev) => [
        {
          timestamp: new Date().toLocaleTimeString(),
          query,
          executionType: data.executionType,
          latencyMs: data.latencyMs,
          rowsAffected: data.rowsAffected,
          payload: data.data,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Terminal framework sync drop.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-black border border-green-500/30 rounded-lg font-mono text-xs text-green-400 shadow-2xl shadow-green-900/20">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-green-500/20 pb-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-green-500/70 font-semibold pl-2">MANISH-MATRIX // SQL_ANALYZE_CORE_v1.0</span>
        </div>
        <span className="text-green-500/40">SECURE SHELL</span>
      </div>

      {/* Input Area */}
      <div className="bg-green-950/10 p-3 border border-green-500/10 rounded mb-4">
        <p className="text-green-500/60 mb-2">// ENTER CORE SQL SEQUENCE HERE:</p>
        <div className="flex items-center space-x-2">
          <span className="text-green-500 font-bold">matrix_db#</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono caret-green-500 focus:ring-0"
            placeholder="Type SQL query..."
          />
          <button
            onClick={handleExecute}
            disabled={loading}
            className="px-4 py-1 bg-green-500 text-black font-bold uppercase tracking-wider rounded hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {loading ? 'RUNNING...' : 'EXECUTE'}
          </button>
        </div>
      </div>

      {/* Output Stream */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {terminalLogs.length === 0 ? (
          <p className="text-green-500/40 italic">// Terminal idle. Awaiting compilation signal loop...</p>
        ) : (
          terminalLogs.map((log, index) => (
            <div key={index} className="p-3 bg-green-950/5 border-l-2 border-green-500/50 space-y-2">
              <div className="flex justify-between text-green-500/60 text-[10px]">
                <span>TIMESTAMP: {log.timestamp}</span>
                <span>STATUS: STABLE_SYNC</span>
              </div>
              <p className="text-yellow-400 font-semibold">&gt; {log.query}</p>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-1 border-y border-green-500/10 text-[11px] text-green-400/80">
                <div>SCAN TYPE: <span className="text-green-300 font-bold">{log.executionType}</span></div>
                <div>LATENCY: <span className="text-green-300 font-bold">{log.latencyMs} ms</span></div>
                <div>ROWS FETCHED: <span className="text-green-300 font-bold">{log.rowsAffected}</span></div>
              </div>

              {/* Data Table Array Dump */}
              <div className="overflow-x-auto pt-1">
                <table className="w-full text-[11px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-green-500/20 text-green-500/70">
                      <th className="py-1">ID</th>
                      <th>PROJECT_NAME</th>
                      <th>CATEGORY</th>
                      <th>LATENCY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.payload?.map((row: any) => (
                      <tr key={row.id} className="hover:bg-green-500/5 text-green-200/90">
                        <td className="py-1 text-green-500/50">{row.id}</td>
                        <td className="font-semibold">{row.name}</td>
                        <td>{row.category}</td>
                        <td className="text-yellow-500/80">{row.latency_ms}ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}