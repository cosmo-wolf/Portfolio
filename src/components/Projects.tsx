import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { smoothSpring } from '../lib/motion';

const FEATURED_PROJECT = {
  title: 'Unified E-Commerce & Task Management Suite',
  description:
    'A comprehensive full-stack application integrating high-performance shopping features with a professional Kanban task management system. Built with React, TypeScript, and Tailwind CSS for maximum scalability.',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Full-Stack'],
  image:
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="featured-projects" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothSpring}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          Featured Project
        </motion.h2>

        <TiltCard className="group" style={{ perspective: 1200 }}>
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothSpring}
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/20"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="relative overflow-hidden h-56 sm:h-64 md:h-72"
              style={{ transform: 'translateZ(20px)' }}
            >
              <img
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
            </div>

            <div
              className="p-8 sm:p-10 bg-white/[0.03] backdrop-blur-sm"
              style={{ transform: 'translateZ(16px)' }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                {FEATURED_PROJECT.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {FEATURED_PROJECT.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {FEATURED_PROJECT.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Prominent CTA buttons — replace href with real URLs when ready */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]"
                >
                  <ExternalLink className="w-6 h-6" />
                  Live Demo
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all hover:scale-[1.02]"
                >
                  <Github className="w-6 h-6" />
                  Source Code
                </a>
              </div>
            </div>
          </motion.article>
        </TiltCard>
      </div>
    </section>
  );
}
