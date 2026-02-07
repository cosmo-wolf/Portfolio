import { Code, Database, Layers, Smartphone } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend',
      color: 'cyan',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js']
    },
    {
      icon: Layers,
      title: 'Backend',
      color: 'blue',
      skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'Express']
    },
    {
      icon: Database,
      title: 'Database',
      color: 'purple',
      skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Prisma']
    },
    {
      icon: Smartphone,
      title: 'Tools & Others',
      color: 'pink',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'bg-cyan-500/10 text-cyan-400',
      blue: 'bg-blue-500/10 text-blue-400',
      purple: 'bg-purple-500/10 text-purple-400',
      pink: 'bg-pink-500/10 text-pink-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className={`mb-4 p-3 rounded-lg ${getColorClasses(category.color)} inline-block`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
