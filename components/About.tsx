export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            My Story (The Unconventional Path)
          </h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            Look, I'm not going to bore you with the typical "I've been coding since I was 5" story.
            My journey's been all over the place—and honestly, that's what makes it interesting.
          </p>

          <h3 className="text-2xl font-bold mt-12 mb-4">How I Got Here</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Started in class 8 making 3D models (thought I'd be the next Pixar animator),
            pivoted to ethical hacking in class 9 (yes, I was that kid), and finally found my
            calling in machine learning by class 10. Completed my first AI course while still
            in high school, got my <strong>TensorFlow Developer Certification</strong> at 18,
            and then made the biggest decision of my life.
          </p>

          <div className="bg-white border-2 border-black rounded-xl p-8 my-8">
            <h3 className="text-xl font-bold mb-4">The College Decision 🎓 ❌</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instead of going to college and spending 4 years learning chemistry and physics
              (which, let's be real, I don't need for ML), I chose to teach myself. Why?
              Because I can learn faster without the fluff. While my peers are memorizing
              formulas they'll never use, I'm building models, competing on Kaggle, and
              actually doing the work.
            </p>
            <p className="italic text-gray-600 border-l-4 border-black pl-4">
              "I'm confident I'll catch up faster at home than most college students"
            </p>
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4">What I'm About</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            I'm from Vadodara, Gujarat—20 years old and completely obsessed with making
            machines learn things. My GitHub is filled with meta-learning experiments
            (because teaching AI how to learn is way cooler than just teaching it tasks),
            and I've placed in the top 10% on multiple Kaggle competitions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            {[
              { icon: '🎓', title: 'TensorFlow Developer Certificate', desc: 'Earned in 2022 - DeepMind certified' },
              { icon: '🤖', title: 'Google IT Automation', desc: 'Professional Certificate' },
              { icon: '🏅', title: 'TensorFlow: Advanced', desc: 'DeepMind specialization' },
            ].map((cred, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{cred.icon}</div>
                <h4 className="font-bold text-lg mb-2">{cred.title}</h4>
                <p className="text-sm text-gray-600">{cred.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4">My Stack</h3>
          <div className="space-y-4 mb-8">
            <div>
              <h4 className="font-semibold mb-2 text-gray-600">Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-black hover:text-white transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-600">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['PyCharm', 'VS Code', 'GitHub', 'Jupyter'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-black hover:text-white transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
