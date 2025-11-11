'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Award, Zap, Shield, Brain } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'THOR: Traffic Hazard Optimization and Rescue',
      tagline: 'CV-Based Intelligent Traffic Reduction System',
      icon: Zap,
      image: '/images/thor-project.png', // Add your project image
      description: 'An intelligent Traffic Reduction System that automatically takes the best action depending on live traffic using CCTV feeds. Automatically detects emergency vehicles like ambulances and clears their path to hospitals in advance through an interconnected system.',
      highlights: [
        'Fine-tuned YOLO model on custom toy car dataset',
        'Collected and augmented own data - learned the critical importance of augmentation',
        'Built physical model of roads and traffic circles for live demo',
        'Connected phone (CCTV) to laptop via WiFi for real-time feed processing',
        'Developed UI with live statistics and traffic analytics',
        'Won multiple inter-school and district level competitions',
        'Started in Class 11, left for juniors to improve before graduating'
      ],
      technologies: ['YOLO', 'Computer Vision', 'Real-time Processing', 'Custom Dataset', 'Hardware Integration'],
      achievements: ['🏆 Multiple inter-school wins', '🏆 District level winner'],
      github: '#', // Add your GitHub link if available
      demo: '#', // Add demo link if available
      year: 'Class 11-12'
    },
    {
      id: 2,
      title: 'S.H.I.E.L.D.: Security and Home Intrusion Eradication & Defense',
      tagline: 'Cost-Friendly High-Tech Home Security Suite',
      icon: Shield,
      image: '/images/shield-project.png', // Add your project image
      description: 'A suite of cost-friendly, high-tech innovations to protect homes using an invisible barrier system. Features anonymous alert triggers and laser-based intrusion detection.',
      highlights: [
        'Modified pen with embedded diode - looks exactly like a regular pen',
        'Wearable anonymous alert trigger: blocks light source with fingers for SOS',
        'Smart enough to avoid false triggers from environmental lighting changes',
        'Button to disable trigger within a short period for false alarm prevention',
        'Dual-mode: Wearable SOS device AND home laser-based alert system',
        'Laser-based intrusion detection: place pen anywhere, point laser from other end',
        'Compact and anonymous design - main differentiator',
        'Built for Defence-based inter-school competition - Won 2nd rank among ~21 schools'
      ],
      technologies: ['IoT', 'Hardware Hacking', 'Embedded Systems', 'Circuit Design', 'Alert Systems'],
      achievements: ['🥈 2nd place among 21 schools', '🛡️ Defence innovation award'],
      github: '#', // Add your GitHub link if available
      demo: '#', // Add demo link if available
      year: 'High School'
    },
    {
      id: 3,
      title: 'Meta-Learning from Scratch',
      tagline: 'Learning How to Learn - Modular Implementation Research',
      icon: Brain,
      image: '/images/meta-learning-project.png', // Add your project image
      description: 'A comprehensive, modular collection of meta-learning implementations built entirely from scratch. Designed for clarity, deep understanding, and experimentation before relying on high-level libraries.',
      highlights: [
        'Built popular meta-learning algorithms from first principles',
        'Modular architecture for easy experimentation and customization',
        'Extensive documentation explaining the "why" behind each design choice',
        'Includes MAML, Prototypical Networks, and more',
        'Focus on understanding fundamentals before using frameworks',
        'Active open-source project with community contributions',
        'Used for teaching and demonstrating meta-learning concepts',
        'Demonstrates commitment to deep learning (pun intended) over surface-level knowledge'
      ],
      technologies: ['PyTorch', 'Meta-Learning', 'MAML', 'Research', 'From Scratch'],
      achievements: ['⭐ Open source', '📚 Educational resource'],
      github: 'https://github.com/Komil-parmar/meta-learning-from-scratch',
      demo: 'https://github.com/Komil-parmar/meta-learning-from-scratch',
      year: 'Ongoing'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Featured Projects
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            What I've Built
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From high school hardware hacks to deep learning research—projects that solve
            real problems and push my understanding to the limits.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group">
                  <div
                    className="w-full aspect-video rounded-2xl border-2 border-gray-200 shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Icon overlay for projects without images */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-sm">
                      <project.icon className="w-32 h-32 text-white/90" />
                    </div>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-4 right-4 bg-white border-2 border-black rounded-xl px-4 py-2 shadow-lg">
                    <p className="font-bold text-sm">{project.year}</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold mb-4">
                  <project.icon className="w-4 h-4" />
                  {project.tagline}
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
                  {project.title}
                </h3>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3">Key Highlights:</h4>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 5).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-black font-bold mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black text-white text-sm rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.achievements.map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-yellow-50 border-2 border-yellow-200 text-yellow-800 text-sm rounded-xl font-bold"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-50 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 inline-block">
            <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
            <p className="text-gray-600 mb-6 max-w-xl">
              Check out my GitHub for more projects, experiments, and contributions to
              the ML community.
            </p>
            <a
              href="https://github.com/Komil-parmar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              Visit My GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
