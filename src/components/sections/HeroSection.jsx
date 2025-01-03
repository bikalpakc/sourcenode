import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Share2, Shield, Zap } from "lucide-react";

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

      <section id="features" className="mt-[6rem] py-20 relative">
        <div className="absolute inset-0 " />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-gray-100"
          >
            Why Choose SourceNode?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={<BrainCircuit className="w-12 h-12 text-blue-400" />}
              title="Decentralized Thinking"
              description="Your ideas, distributed across a network of minds. No central authority, just pure collaboration."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-green-400" />}
              title="Secure & Private"
              description="End-to-end encryption ensures your ideas remain yours until you choose to share them."
            />
            <FeatureCard
              icon={<Share2 className="w-12 h-12 text-purple-400" />}
              title="Seamless Sharing"
              description="Share your thoughts with ease. Connect with like-minded individuals across the globe."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-400" />}
              title="Rapid Ideation"
              description="Watch your ideas evolve in real-time as the community contributes and refines concepts."
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

//Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default HeroSection;
