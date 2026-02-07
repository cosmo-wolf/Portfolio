import { User, Briefcase, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          About Me
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="mb-6 p-4 rounded-lg bg-cyan-500/10 inline-block">
              <User className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Who I Am</h3>
            <p className="text-gray-300 leading-relaxed">
              Passionate developer with 5+ years of experience building web applications.
              I love turning ideas into reality through clean, efficient code.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 inline-block">
              <Briefcase className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">What I Do</h3>
            <p className="text-gray-300 leading-relaxed">
              Full-stack development, API design, database architecture, and UI/UX implementation.
              Focused on creating scalable and maintainable solutions.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="mb-6 p-4 rounded-lg bg-purple-500/10 inline-block">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">My Approach</h3>
            <p className="text-gray-300 leading-relaxed">
              Detail-oriented and collaborative. I believe in writing code that's not just functional,
              but also readable and maintainable for the long term.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
