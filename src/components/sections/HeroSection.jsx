import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <div className="absolute top-1/2 left-1/2  gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem] opacity-20"></div>
      <section className="relative mt-[7rem] container mx-auto  px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-6xl font-extrabold mb-6 bg-clip-text text-gray-100"
        >
          Got an Idea? Let it Grow
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto"
        >
          Secure, grow, and share your ideas effortlessly on the blockchain with
          unmatched speed and simplicity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
          >
            Get Started
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default HeroSection;
