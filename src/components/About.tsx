import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  User,
  Briefcase,
  Award,
  Code2,
  Database,
  Layers,
  Smartphone,
  Cpu,
  Globe,
  Terminal,
} from 'lucide-react';

const ABOUT_TEXT =
  "I'm a self-taught developer with over 2 years of experience building web applications. I turned my curiosity into code—learning from documentation, courses, and countless hours of practice. I love turning ideas into reality through clean, efficient code and am passionate about full-stack development, API design, and creating scalable, maintainable solutions.";

const TECH_ICONS = [
  { Icon: Code2, name: 'React' },
  { Icon: Layers, name: 'Node' },
  { Icon: Database, name: 'DB' },
  { Icon: Cpu, name: 'TS' },
  { Icon: Globe, name: 'Web' },
  { Icon: Terminal, name: 'CLI' },
];

function Typewriter({ text, start }: { text: string; start: boolean }) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    if (done) {
      setDisplay(text);
      return;
    }
    if (display.length >= text.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDisplay(text.slice(0, display.length + 1));
    }, 28);
    return () => clearTimeout(t);
  }, [start, text, display, done]);

  return (
    <span>
      {display}
      {start && display.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [typewriterStart, setTypewriterStart] = useState(false);

  useEffect(() => {
    if (!textInView) return;
    const t = setTimeout(() => setTypewriterStart(true), 400);
    return () => clearTimeout(t);
  }, [textInView]);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          About Me
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
          {/* Live Status - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden flex items-center justify-center p-6"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
              <span className="text-xl font-semibold text-white">Available for Hire</span>
            </div>
          </motion.div>

          {/* Who I Am - small tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
          >
            <div className="mb-3 p-3 rounded-lg bg-cyan-500/10 inline-block">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Who I Am</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Self-taught dev with 2+ years building things that work.
            </p>
          </motion.div>

          {/* What I Do - small tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
          >
            <div className="mb-3 p-3 rounded-lg bg-blue-500/10 inline-block">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">What I Do</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-stack, APIs, databases, and UI/UX.
            </p>
          </motion.div>

          {/* Typewriter block - full width */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8"
          >
            <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
              <Typewriter text={ABOUT_TEXT} start={typewriterStart} />
            </p>
          </motion.div>

          {/* Tech Stack - floating icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {TECH_ICONS.map(({ Icon, name }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -8, scale: 1.1 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-colors cursor-default"
                >
                  <Icon className="w-8 h-8 text-cyan-400" />
                  <span className="text-xs text-gray-400">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
