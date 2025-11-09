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
