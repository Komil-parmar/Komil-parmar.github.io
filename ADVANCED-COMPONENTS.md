# Advanced Components - Carousel & Flashcards

## components/WebinarsCarousel.tsx

This uses embla-carousel for smooth, touch-enabled carousel.

```typescript
'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';
import { webinarsData } from '@/data/webinars';

export default function WebinarsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="webinars" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            Webinars & Talks
          </h2>
          <p className="text-gray-600 text-lg">Sharing knowledge with the community</p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={selectedIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={selectedIndex === webinarsData.length - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {webinarsData.map((webinar, index) => (
                <div
                  key={webinar.id}
                  className={`flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] transition-all duration-500 ${
                    index === selectedIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                  }`}
                >
                  <div className="bg-white border-2 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                    {/* Image */}
                    <div className="h-72 bg-gradient-to-br from-purple-500 to-indigo-600 relative">
                      <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 relative">
                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

                      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {webinar.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {webinar.attendees} attendees
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
                        {webinar.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {webinar.description}
                      </p>

                      <a
                        href={webinar.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all relative z-10"
                      >
                        Read more on LinkedIn →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {webinarsData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all rounded-full ${
                  index === selectedIndex
                    ? 'w-8 h-3 bg-black'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## components/Flashcards.tsx

Interactive flashcard component with flip animations.

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
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
    <section id="flashcards" className="py-24 px-6 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            Quick Learn: ML Flashcards
          </h2>
          <p className="text-purple-100 text-lg">Bite-sized knowledge drops about machine learning</p>
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <motion.div
            className="relative h-[400px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-white text-black rounded-2xl p-8 shadow-2xl flex flex-col justify-between"
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
              className="absolute inset-0 bg-white text-black rounded-2xl p-8 shadow-2xl flex flex-col justify-between"
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
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white hover:bg-white/30 border-2 border-white/50'
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
```

## Installation Note

Make sure to install all dependencies:

```bash
npm install embla-carousel-react framer-motion lucide-react
```

Both components are fully interactive with:
- ✅ Touch/swipe support (carousel)
- ✅ Keyboard navigation
- ✅ Smooth animations
- ✅ Category filtering (flashcards)
- ✅ Flip animation (flashcards)
- ✅ Responsive design

Copy these into their respective files and you're good to go!
