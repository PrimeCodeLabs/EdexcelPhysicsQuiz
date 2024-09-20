import { useState } from "react";
import { Question } from "../utils/types";

interface Props {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  currentQuestionIndex: number;
}

export default function QuestionCard({ question, onAnswer }: Props) {
  const [showHint, setShowHint] = useState(false);
  const choices = JSON.parse(question.choices);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{question.text}</h2>
      <div className="space-y-2 mb-4">
        {choices.map((choice: string, index: number) => (
          <button
            key={index}
            className="w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            onClick={() => onAnswer(index)}
          >
            {choice}
          </button>
        ))}
      </div>
      {question.hint && (
        <div className="mt-4">
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          {showHint && (
            <div className="mt-2 p-3 bg-yellow-100 rounded-lg">
              <p className="text-sm text-gray-700">{question.hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
