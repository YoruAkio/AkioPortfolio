import { motion } from "framer-motion";
import Lottie from "lottie-react";
import catAnimation from "../../public/cat-animation.json";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="relative w-96 h-96 mx-auto mb-8">
          <Lottie
            animationData={catAnimation}
            loop={true}
            className="w-96 h-96"
          />
        </div>

        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-purple-300 mb-2">
            Oops! Page not found
          </h2>
          <p className="text-gray-400">
            Looks like our cat knocked over the matcha latte on this page...
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          Return Home
        </motion.button>
      </motion.div>
    </div>
  );
}