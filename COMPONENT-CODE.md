# Complete Component Code

Copy and paste these into their respective files in the `components/` folder.

## components/About.tsx

```typescript
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
```

## components/POV.tsx

```typescript
export default function POV() {
  const posts = [
    {
      category: 'Announcement',
      date: 'Recent',
      title: 'Why I\'m Building in Public',
      excerpt: 'I\'ve decided to share everything I\'m learning, building, and breaking. Why? Because the best way to learn is to teach...',
      featured: true
    },
    {
      category: 'Hot Take',
      date: 'This Week',
      title: 'College Isn\'t For Everyone (And That\'s OK)',
      excerpt: 'Controversial? Maybe. True? Absolutely. Here\'s why choosing self-learning over a CS degree was the best decision...'
    },
    {
      category: 'Tutorial',
      date: 'Coming Soon',
      title: 'Meta-Learning From Scratch',
      excerpt: 'Breaking down my meta-learning repository piece by piece. If you\'ve ever wanted to understand how to teach AI...'
    }
  ];

  return (
    <section id="pov" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
            POV: My Takes & Updates
          </h2>
          <p className="text-gray-600 text-lg">Thoughts, announcements, and hot takes on ML, learning, and life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className={`bg-white border-2 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all ${
                post.featured ? 'md:col-span-2 bg-gradient-to-br from-gray-50 to-white' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a href="#" className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all">
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## components/Projects.tsx

```typescript
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
```

## components/Contact.tsx

```typescript
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const contacts = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'komilparmar57@gmail.com',
      href: 'mailto:komilparmar57@gmail.com'
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: 'GitHub',
      value: '@Komil-parmar',
      href: 'https://github.com/Komil-parmar'
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: 'LinkedIn',
      value: 'Komil Parmar',
      href: 'https://www.linkedin.com/in/komil-parmar-488967243/'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6">
          Let's Connect
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Got a project idea? Want to collaborate? Just want to chat about ML?
          Hit me up—I'm always down to talk shop.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8 hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 transition-all"
            >
              <div className="mb-4">{contact.icon}</div>
              <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
              <p className="text-gray-300 text-sm">{contact.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## components/Footer.tsx

```typescript
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400">
          © 2024 Komil Parmar. Built with curiosity and lots of coffee ☕
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/Komil-parmar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/komil-parmar-488967243/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:komilparmar57@gmail.com" className="hover:text-gray-300 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
```

Save each component in its own file in the `components/` directory!
