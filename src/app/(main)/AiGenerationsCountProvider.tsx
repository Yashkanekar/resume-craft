"use client";

import { createContext, useContext, useState } from "react";

type AIGenContextType = {
  aiGenerationsCount: number;
  setAiGenerationsCount: React.Dispatch<React.SetStateAction<number>>;
};

export const AiGenerationsCountContext = createContext<
  AIGenContextType | undefined
>({
  aiGenerationsCount: 0,
  setAiGenerationsCount: () => {},
});

export function AiGenerationsCountProvider({
  children,
  noOfAiGenerations,
}: {
  children: React.ReactNode;
  noOfAiGenerations: number;
}) {
  const [aiGenerationsCount, setAiGenerationsCount] =
    useState(noOfAiGenerations);
  return (
    <AiGenerationsCountContext.Provider
      value={{ aiGenerationsCount, setAiGenerationsCount }}
    >
      {children}
    </AiGenerationsCountContext.Provider>
  );
}

export function useAiGenerationsCount() {
  const context = useContext(AiGenerationsCountContext);
  if (context === undefined) {
    throw new Error(
      "useAiGenerationsCount must be used within a AiGenerationsCountProvider",
    );
  }
  return context;
}
