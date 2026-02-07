import { Code2, Github } from 'lucide-react';
import Magnetic from './Magnetic';

const GITHUB_URL = 'https://github.com/harshprogrmaer';
const EMAIL = 'harsh2412pro@gmail.com';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#050814]"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 inline-block p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          <Code2 className="w-16 h-16 text-cyan-400" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Hi, I'm HarshVardhan Sharma
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Crafting elegant solutions to complex problems.
          <br />
          Specialized in modern web technologies and scalable applications.
        </p>

        <div className="flex gap-4 justify-center mb-12 items-center flex-wrap">
          <Magnetic>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors hover:scale-110"
            >
              <Github className="w-6 h-6 text-gray-300" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              Email Me
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => scrollToSection('featured-projects')}
          className="px-8 py-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all"
        >
          View My Work
        </button>
      </div>
    </section>
  );
}
