export interface ChatLogNode {
  id: string;
  timestamp: string;
  userPrompt: string;
  responseLength: number;
  status: 'SUCCESS' | 'RATE_LIMITED' | 'PIPELINE_DROP';
}

// Global server-side virtual runtime log array buffer
export const globalChatRegistry: ChatLogNode[] = [
  {
    id: "LOG-9821",
    timestamp: "18:35:12",
    userPrompt: "Manish ka resume dikhao aur skills batao",
    responseLength: 245,
    status: "SUCCESS"
  },
  {
    id: "LOG-9822",
    timestamp: "18:39:01",
    userPrompt: "What is his experience in PL/SQL?",
    responseLength: 189,
    status: "SUCCESS"
  }
];