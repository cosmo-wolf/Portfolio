import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0e1a] via-[#0f1729] to-[#050814]"></div>
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />

        <footer className="py-8 text-center border-t border-white/10">
          <p className="text-gray-400">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
