'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { flashcardsData } from '@/data/flashcards';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [category, setCategory] = useState<'all' | 'basics' | 'deep-learning' | 'meta-learning'>('all');

  const filteredCards = category === 'all'
    ? flashcardsData
    : flashcardsData.filter(card => card.category === category);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleCategoryChange = (newCategory: typeof category) => {
    setCategory(newCategory);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <section id="flashcards" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            Quick Learn: ML Flashcards
          </h2>
          <p className="text-gray-600 text-lg">Bite-sized knowledge drops about machine learning</p>
        </div>

        {/* Flashcard */}
        <div className="mb-8" style={{ perspective: '1000px' }}>
          <motion.div
            className="relative h-[400px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-white text-black rounded-2xl p-8 shadow-2xl border-2 flex flex-col justify-between"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div>
                <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-6">
                  Question
                </span>
                <p className="text-2xl font-medium leading-relaxed">
                  {currentCard?.question}
                </p>
              </div>
              <button className="w-full py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Flip to Answer
              </button>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-white text-black rounded-2xl p-8 shadow-2xl border-2 flex flex-col justify-between"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div>
                <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-6">
                  Answer
                </span>
                <p className="text-lg leading-relaxed">
                  {currentCard?.answer}
                </p>
              </div>
              <button className="w-full py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Back to Question
              </button>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-white border-2 text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="font-semibold text-lg">
            {currentIndex + 1} / {filteredCards.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="bg-white border-2 text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { value: 'all', label: 'All Topics' },
            { value: 'basics', label: 'ML Basics' },
            { value: 'deep-learning', label: 'Deep Learning' },
            { value: 'meta-learning', label: 'Meta-Learning' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value as typeof category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                category === cat.value
                  ? 'bg-black text-white'
                  : 'bg-white border-2 text-black hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
