import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useProgress } from "../hooks/useProgress";
import { edexcelPhysicsQuestions } from "../utils/questions";
import { shuffleArray } from "../utils/helpers";
import { Question } from "../utils/types";
import { motion } from "framer-motion";

export default function Quiz() {
  const router = useRouter();
  const { subtopic } = router.query;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useLocalStorage<number[]>(
    `quizAnswers`,
    []
  );
  const [quizQuestions, setQuizQuestions] = useLocalStorage<Question[]>(
    `quizQuestions`,
    []
  );
  const [progress, updateProgress] = useProgress("physicsProgress");

  useEffect(() => {
    if (questions.length === 0 && subtopic !== undefined) {
      // Filter questions by subject, level, and exam board
      let filteredQuestions = edexcelPhysicsQuestions.filter(
        (q) =>
          q.subject === "Physics" &&
          q.level === "IGCSE" &&
          q.examBoard === "Edexcel"
      );

      // Check if a specific subtopic is selected
      if (subtopic && typeof subtopic === "string" && subtopic !== "all") {
        filteredQuestions = filteredQuestions.filter(
          (q) => q.subtopic === subtopic
        );
      }

      // Shuffle and select 10 random questions from the filtered pool
      const selectedQuestions = shuffleArray(filteredQuestions).slice(0, 10);
      console.log(selectedQuestions);
      setQuestions(selectedQuestions);
      setQuizQuestions(selectedQuestions);
      setUserAnswers([]);
    }
  }, [questions.length, subtopic, setQuizQuestions, setUserAnswers]);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    updateProgress(currentQuestion.subtopic, isCorrect);

    setUserAnswers((prev: number[]) => [...prev, answerIndex]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      router.push(`/results`);
    }
  };

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Loading...
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
          />
        </motion.div>
      </div>
    </Layout>
  );
}
