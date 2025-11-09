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
