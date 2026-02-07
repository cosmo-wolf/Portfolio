import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Layers, Smartphone } from 'lucide-react';
import { smoothSpring } from '../lib/motion';

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend',
    color: 'cyan',
    value: 88,
    level: 'Proficient',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
  },
  {
    icon: Layers,
    title: 'Backend',
    color: 'blue',
    value: 85,
    level: 'Advanced',
    skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'Express'],
  },
  {
    icon: Database,
    title: 'Database',
    color: 'purple',
    value: 82,
    level: 'Advanced',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Prisma'],
  },
  {
    icon: Smartphone,
    title: 'Tools & Others',
    color: 'pink',
    value: 80,
    level: 'Advanced',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest'],
  },
];

const LANGUAGE_EXCELLENCE_PERCENT = 87;

const colorMap = {
  cyan: { stroke: 'rgb(34, 211, 238)', glow: 'rgba(34, 211, 238, 0.5)', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  blue: { stroke: 'rgb(59, 130, 246)', glow: 'rgba(59, 130, 246, 0.5)', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  purple: { stroke: 'rgb(168, 85, 247)', glow: 'rgba(168, 85, 247, 0.5)', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  pink: { stroke: 'rgb(236, 72, 153)', glow: 'rgba(236, 72, 153, 0.5)', bg: 'bg-pink-500/10', text: 'text-pink-400' },
};

function CircularGauge({
  value,
  colorKey,
  inView,
  title,
  level,
  Icon,
  skills,
}: {
  value: number;
  colorKey: keyof typeof colorMap;
  inView: boolean;
  title: string;
  level: string;
  Icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}) {
  const colors = colorMap[colorKey];
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={smoothSpring}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (value / 100) * circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset: circumference - (value / 100) * circumference } : {}}
              transition={smoothSpring}
              style={{
                filter: `drop-shadow(0 0 6px ${colors.glow})`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`w-8 h-8 ${colors.text}`} />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <span className="absolute top-4 right-4 px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-cyan-300 border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Level: {level}
        </span>
        <ul className="space-y-1 mt-2">
          {skills.slice(0, 3).map((skill) => (
            <li key={skill} className="text-gray-400 text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothSpring}
          className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          Skills & Technologies
        </motion.h2>

        {/* Language Excellence bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothSpring}
          className="mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium text-white">Language Excellence</span>
            <span className="text-sm text-gray-400">Room to grow</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${LANGUAGE_EXCELLENCE_PERCENT}%` }}
              viewport={{ once: true }}
              transition={smoothSpring}
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Strong foundation with consistent learning — currently around {LANGUAGE_EXCELLENCE_PERCENT}%.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <CircularGauge
              key={category.title}
              value={category.value}
              colorKey={category.color as keyof typeof colorMap}
              inView={inView}
              title={category.title}
              level={category.level}
              Icon={category.icon}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
