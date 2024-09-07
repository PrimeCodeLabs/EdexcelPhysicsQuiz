import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  score: number;
  totalQuestions: number;
  paper: 1 | 2;
}

export default function ResultsSummary({
  score,
  totalQuestions,
  paper,
}: Props) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <p className="text-xl mb-4">
        Paper {paper}: You scored {score} out of {totalQuestions}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <motion.div
          className="bg-green-600 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <p className="text-2xl font-semibold mb-8">{percentage.toFixed(1)}%</p>
      <Link href="/">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Try Again
        </motion.a>
      </Link>
    </motion.div>
  );
}
