import Head from "next/head";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({
  children,
  title = "Edexcel Physics Quiz",
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Test your Edexcel physics knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          {children}
        </motion.div>
      </main>

      <footer className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} Edexcel Physics Quiz. All rights reserved.
      </footer>
    </div>
  );
}
