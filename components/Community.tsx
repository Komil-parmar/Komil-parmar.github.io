'use client';

import { motion } from 'framer-motion';
import { Users, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Community() {
  return (
    <section id="community" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[40%_60%] gap-12 items-center">
          {/* Left: Community Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Placeholder for community logo */}
              <div className="w-full h-full bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-gray-200">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🧠</div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
                    Meta Learners
                  </h3>
                  <p className="text-gray-300 text-lg">Learning to Learn</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white border-2 border-black rounded-2xl px-6 py-4 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <div>
                    <p className="text-2xl font-bold">100+</p>
                    <p className="text-sm text-gray-600">Members</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Join Our Community
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight">
              Meta Learners: We are Learning to Learn
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed">
              A small, informal WhatsApp community where we share AI and ML resources,
              discuss cutting-edge concepts, and grow together. But here's the twist—we
              don't just learn tools, we learn <strong>how to learn</strong>.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white rounded-lg p-3 mt-1">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Active Discussions</h3>
                  <p className="text-gray-600">
                    Timely AI/ML updates, news, competitions, and deep-dive discussions
                    on concepts that matter. All the webinars above were conducted by or
                    in collaboration with this community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white rounded-lg p-3 mt-1">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Learn to Adapt</h3>
                  <p className="text-gray-600">
                    We focus on meta-learning—learning to learn and adapt to revolutionary
                    technologies in tech, rather than just mastering existing tools. Stay
                    ahead of the curve, not behind it.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-white rounded-lg p-3 mt-1">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">100+ Like-Minded Learners</h3>
                  <p className="text-gray-600">
                    Join a growing community of ML enthusiasts, self-learners, and curious
                    minds who believe in continuous learning and knowledge sharing.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-bold mb-4">Want to Join?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This is a small, informal community focused on genuine learning and
                discussion. If you're passionate about AI/ML and want to be part of
                this journey, reach out to me on LinkedIn!
              </p>
              <a
                href="https://www.linkedin.com/in/komil-parmar-488967243/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Connect on LinkedIn →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
