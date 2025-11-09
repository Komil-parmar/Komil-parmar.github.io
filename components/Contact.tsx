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
