'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, ExternalLink, Users, MessageSquare } from 'lucide-react';

export default function Kaggle() {
  const awards = [
    {
      id: 1,
      title: 'Community Competition Host',
      logo: '/images/kaggle-community-host.svg',
      certificateUrl: 'https://www.kaggle.com/certification/badges/komilparmar/81', // Replace with actual certificate URL
      description: 'Hosted "Students ML Playground Series S1E1" for IITG peers—inspired by Kaggle\'s evergreen Playground Series.',
      details: [
        'Conducted multiple interactive webinars covering everything: Kaggle basics, EDA, visualization, model comparison, ensembling, overfitting, and tons of best practices',
        'Demonstrated how smart EDA can make a simple model outperform complex ones',
        'Live coding sessions, complete notebook walkthroughs, and discussions with top rankers',
        'Teaching style: real-world analogies, interactive, and beginner-friendly'
      ],
      icon: Users
    },
    {
      id: 2,
      title: 'Discussions Legacy Expert',
      logo: '/images/kaggle-discussions-expert.svg',
      certificateUrl: 'https://www.kaggle.com/certification/badges/komilparmar/97', // Replace with actual certificate URL
      highestRank: 508,
      description: 'Achieved Expert tier in Discussions track before it was removed (2016-2025).',
      details: [
        'Demonstrates my passion for experimenting and sharing insights',
        'Active in discussing, learning, and teaching others on Kaggle forums',
        'ML isn\'t rule-based—there\'s always something new to discover',
        'Happy to share, review, rectify, and fight for my hypotheses (even the unreasonable ones)'
      ],
      icon: MessageSquare
    }
  ];

  const competitions = [
    {
      id: 1,
      name: 'Predict Calorie Expenditure', // Replace with actual competition name
      rank: '14/4316', // Replace with actual rank
      image: '/images/competition-1-header.png',
      leaderboardUrl: 'https://www.kaggle.com/competitions/playground-series-s5e5/leaderboard' // Replace with actual leaderboard URL
    },
    {
      id: 2,
      name: 'MAP - Charting Student Math Misunderstandings', // Replace with actual competition name
      rank: '487/1857', // Replace with actual rank
      image: '/images/competition-2-header.png',
      leaderboardUrl: 'https://www.kaggle.com/competitions/map-charting-student-math-misunderstandings/leaderboard' // Replace with actual leaderboard URL
    },
    {
      id: 3,
      name: 'NeurIPS - Open Polymer Prediction 2025', // Replace with actual competition name
      rank: '565/2240', // Replace with actual rank
      image: '/images/competition-3-header.png',
      leaderboardUrl: 'https://www.kaggle.com/competitions/neurips-open-polymer-prediction-2025/leaderboard' // Replace with actual leaderboard URL
    }
  ];

  return (
    <section id="kaggle" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-600 mb-4">
            <Trophy className="w-4 h-4" />
            Kaggle Achievements
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            Competing, Learning, Teaching
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From hosting competitions to earning expert status—here's how I've contributed
            to the Kaggle community while constantly experimenting and learning.
          </p>
        </motion.div>

        {/* Awards Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-8 flex items-center gap-3">
            <Award className="w-8 h-8" />
            Kaggle Awards
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Award Logo and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-xl border-2 border-gray-200 bg-white flex-shrink-0"
                    style={{
                      backgroundImage: `url(${award.logo})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {award.title}
                      {award.highestRank && (
                        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                          Rank {award.highestRank}
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-700 font-medium">{award.description}</p>
                  </div>
                </div>

                {/* Details */}
                <ul className="space-y-3 mb-6">
                  {award.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <award.icon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Certificate Link */}
                <a
                  href={award.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  View Certificate <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitions Section */}
        <div>
          <h3 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-8 flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            Competition Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {competitions.map((competition, index) => (
              <motion.a
                key={competition.id}
                href={competition.leaderboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
              >
                {/* Competition Header Image */}
                <div
                  className="w-full h-48 bg-gray-100"
                  style={{
                    backgroundImage: `url(${competition.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* Competition Info */}
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {competition.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{competition.rank}</span>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl italic text-gray-600 max-w-4xl mx-auto border-l-4 border-blue-500 pl-6 py-2">
            "ML is not a rule-based field. At every point, there's something new to discover
            that you'll most likely never find in existing resources. I'm happy to share, review,
            rectify, and fight for my hypotheses—even the unreasonable ones."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
