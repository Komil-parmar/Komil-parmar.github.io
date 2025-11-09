'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-visible pt-20 pb-16 px-6">
      {/* Background Portrait Image */}
      <div
        className="absolute top-0 right-0 w-[60%] h-screen bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/five_year_old_rm.jpg)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="max-w-[1200px] w-full relative z-10">
        <div className="w-full md:w-[40%] pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <Sparkles className="w-12 h-12 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
              Hey, I'm Komil.
              <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-600 font-medium mt-4">
                I build ML models and break things (for learning).
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-[600px]">
              20-year-old machine learning enthusiast from Gujarat who ditched traditional college
              to learn faster on my own terms. TensorFlow certified, Kaggle competitor, and
              perpetually curious about what makes AI tick.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl group"
              >
                Read My Story
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#flashcards"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all hover:-translate-y-1"
              >
                Quick Learn ⚡
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
