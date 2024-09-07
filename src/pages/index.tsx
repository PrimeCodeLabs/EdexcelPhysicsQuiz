import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useProgress } from "../hooks/useProgress";
import { motion } from "framer-motion";

export default function Home() {
  const [paper, setPaper] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
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
      router.push(`/quiz?paper=${paper}`);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQuiz(true);
  };

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
              Test your knowledge on challenging questions for Paper 1 and 2.
            </p>
            <div className="mb-8">
              <button
                className={`mr-4 px-4 py-2 rounded-full ${
                  paper === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setPaper(1)}
              >
                Paper 1
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  paper === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setPaper(2)}
              >
                Paper 2
              </button>
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
