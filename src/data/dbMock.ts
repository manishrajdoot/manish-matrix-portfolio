export interface MockProject {
  id: number;
  name: string;
  category: string;
  latency_ms: number;
  status: 'optimized' | 'pending_index' | 'deprecated';
}

export const mockDatabase: MockProject[] = [
  { id: 1, name: 'Matrix-AI Core', category: 'LLM Engine', latency_ms: 12, status: 'optimized' },
  { id: 2, name: 'Wear M Brand Graphics', category: 'Apparel UI', latency_ms: 45, status: 'optimized' },
  { id: 3, name: 'Phonebook Diary PWA', category: 'Web App', latency_ms: 88, status: 'pending_index' },
  { id: 4, name: 'MicroStart Platform', category: 'SaaS Framework', latency_ms: 18, status: 'optimized' },
  { id: 5, name: 'Legacy Core Logs', category: 'Archive', latency_ms: 240, status: 'deprecated' }
];