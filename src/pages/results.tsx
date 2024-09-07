// src/pages/results.tsx

import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Question } from "../utils/types";
import { motion } from "framer-motion";

export default function Results() {
  const router = useRouter();

  // Use consistent keys to access the stored data
  const [questions] = useLocalStorage<Question[]>("quizQuestions", []);
  const [userAnswers] = useLocalStorage<number[]>("quizAnswers", []);

  const score = userAnswers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index]?.correctAnswer ? 1 : 0);
  }, 0);

  const answeredQuestions = questions.slice(0, userAnswers.length);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          Quiz Results
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-xl text-center"
        >
          You scored {score} out of {questions.length}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white shadow-lg rounded-lg p-6 mb-8 max-h-[60vh] overflow-y-auto"
        >
          {answeredQuestions.map((question, index) => (
            <motion.div
              key={index}
              className="mb-6 border-b pb-4 last:border-b-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <p className="font-semibold mb-2">
                {index + 1}. {question.text}
              </p>
              <p
                className={
                  userAnswers[index] === question.correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Your answer: {JSON.parse(question.choices)[userAnswers[index]]}
              </p>
              <p className="text-green-600">
                Correct answer:{" "}
                {JSON.parse(question.choices)[question.correctAnswer]}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </motion.button>
      </div>
    </Layout>
  );
}
