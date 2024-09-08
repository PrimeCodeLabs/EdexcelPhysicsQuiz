import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useProgress } from "../hooks/useProgress";
import { motion } from "framer-motion";
import { edexcelPhysicsQuestions } from "../utils/questions";

export default function Home() {
  const [name, setName] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const router = useRouter();
  const [progress] = useProgress("physicsProgress");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
      setShowQuiz(true);
    }
  }, []);

  const startQuiz = () => {
    if (name) {
      localStorage.setItem("userName", name);
      router.push(
        `/quiz${
          selectedSubtopic ? `?subtopic=${selectedSubtopic}` : "?subtopic=all"
        }`
      );
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQuiz(true);
  };

  const subtopics = Array.from(
    new Set(edexcelPhysicsQuestions.map((q) => q.subtopic))
  );

  const renderProgressBySubtopic = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(progress).map(([subtopic, { correct, total }]) => (
          <motion.div
            key={subtopic}
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold mb-2">{subtopic}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(correct / total) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(correct / total) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <p className="text-sm">
              {correct} / {total} correct
            </p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="text-center">
        {!showQuiz ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleNameSubmit}
            className="mb-8"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border-2 border-gray-300 p-2 rounded-lg mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </motion.form>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8">Welcome, {name}!</h1>
            <p className="mb-8 text-xl">
              Test your knowledge on challenging questions.
            </p>
            <div className="mb-4">
              <select
                value={selectedSubtopic}
                onChange={(e) => setSelectedSubtopic(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-lg"
              >
                <option value="all">All Subtopics</option>
                {subtopics.map((subtopic) => (
                  <option key={subtopic} value={subtopic}>
                    {subtopic}
                  </option>
                ))}
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
              onClick={startQuiz}
            >
              Start Quiz
            </motion.button>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Progress by Subtopic:
              </h2>
              {renderProgressBySubtopic()}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
