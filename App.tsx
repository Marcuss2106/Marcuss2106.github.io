import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Connect from './components/Connect';
import Background from './components/Background';

const App: React.FC = () => {
  return (
    <div className="leading-relaxed text-slate-400 antialiased selection:bg-purple-300 selection:text-purple-900 min-h-screen">
      <Background />
      <div className="relative z-10">
        <Header />
        <main className="pt-24 lg:w-1/2 lg:py-24 mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex flex-col space-y-24">
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Connect />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;