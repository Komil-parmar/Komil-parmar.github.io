import { ExternalLink } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            What I'm Building
          </h2>
          <p className="text-gray-600 text-lg">Open-source projects and experiments</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border-2 rounded-xl p-8 hover:shadow-xl hover:border-black transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold">meta-learning-from-scratch</h3>
              <a
                href="https://github.com/Komil-parmar/meta-learning-from-scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A modular collection of meta-learning implementations designed for clarity
              and experimentation. Built from scratch to understand the fundamentals
              before using high-level libraries.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Meta-Learning', 'PyTorch', 'Research'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 border text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-dashed rounded-xl p-8 opacity-70">
            <h3 className="text-2xl font-bold mb-4">More projects coming soon...</h3>
            <p className="text-gray-600">
              Currently working on some exciting ML experiments. Check back soon or
              follow me on GitHub to stay updated!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
