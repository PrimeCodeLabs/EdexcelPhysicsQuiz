// src/hooks/useProgress.ts

import { useState, useEffect } from "react";
import { UserProgress } from "../utils/types";

export function useProgress(
  key: string
): [UserProgress, (subtopic: string, isCorrect: boolean) => void] {
  const [progress, setProgress] = useState<UserProgress>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem(key);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, [key]);

  const updateProgress = (subtopic: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (!newProgress[subtopic]) {
        newProgress[subtopic] = { correct: 0, total: 0 };
      }
      newProgress[subtopic].total += 1;
      if (isCorrect) {
        newProgress[subtopic].correct += 1;
      }
      localStorage.setItem(key, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  return [progress, updateProgress];
}
