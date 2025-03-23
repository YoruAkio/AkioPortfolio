import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import Head from "next/head";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen w-full bg-gray-900 p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Bento Box Grid Layout */}
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 auto-rows-auto">
            
            {/* Header Box - Spans full width */}
            <motion.div 
              className="col-span-full bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ aspectRatio: '6/1' }}
            >
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text"
              >
                404
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2"
              >
                Page not found
              </motion.p>
            </motion.div>
            
            {/* Animation Box - Responsive feature box */}
            <motion.div 
              className="col-span-full sm:col-span-5 lg:col-span-8 bg-gray-800/70 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 relative backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ aspectRatio: '4/3' }}
            >
              {typeof window !== "undefined" && (
                <Lottie
                  animationData={require("../../public/cat-animation.json")}
                  loop={true}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
            
            {/* Message Box - Resizes based on available space */}
            <motion.div 
              className="col-span-full sm:col-span-3 lg:col-span-4 bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-700/30 backdrop-blur-sm flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ minHeight: '150px' }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-purple-300 mb-2 sm:mb-3">
                Oops!
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-4">
                Looks like our cat knocked over the matcha latte on this page...
              </p>
            </motion.div>
            
            {/* Button Box - Auto-adjusts size */}
            <motion.div 
              className="col-span-2 sm:col-span-4 lg:col-span-4 bg-gray-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 flex items-center justify-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm sm:text-base rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Return Home
              </motion.button>
            </motion.div>
            
            {/* Decorative Elements - Shows on larger screens, scales with container */}
            <motion.div 
              className="col-span-2 sm:col-span-4 lg:col-span-4 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-purple-500/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ minHeight: '100px' }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-2 sm:h-3 w-2 sm:w-3 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="h-1.5 sm:h-2 w-20 sm:w-32 bg-purple-400/30 rounded-full"></div>
              </div>
              <div className="mt-2 sm:mt-3 grid grid-cols-3 gap-1 sm:gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 sm:h-8 bg-purple-400/10 rounded-md"></div>
                ))}
              </div>
            </motion.div>
            
            {/* Another Decorative Element - Responsive sizing */}
            <motion.div 
              className="col-span-4 sm:col-span-4 lg:col-span-4 bg-gray-800/60 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ minHeight: '100px' }}
            >
              <div className="flex justify-between items-center">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-base sm:text-lg text-purple-300">?</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Error Code: 404</div>
              </div>
              <div className="mt-3 sm:mt-4 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}