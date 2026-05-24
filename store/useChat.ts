import { create } from "zustand";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatStore {
  messages: Message[];
  addUserMessage: (content: string) => void;
  addAssistantMessage: (content: string) => void;
  clear: () => void;
}

export const useChat = create<ChatStore>((set) => ({
  messages: [],
  addUserMessage: (content) =>
    set((s) => ({ messages: [...s.messages, { role: "user", content }] })),
  addAssistantMessage: (content) =>
    set((s) => ({ messages: [...s.messages, { role: "assistant", content }] })),
  clear: () => set({ messages: [] }),
}));
