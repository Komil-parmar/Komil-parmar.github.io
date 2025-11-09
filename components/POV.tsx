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
