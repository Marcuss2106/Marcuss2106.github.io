
import React from 'react';
import type { Skill } from '../types';
import GlowCard from './GlowCard';

const skillsData: Skill[] = [
  { name: 'Python' },
  { name: 'React' },
  { name: 'Java' },
  { name: 'GraphQL' },
  { name: 'REST APIs' },
  { name: 'Git & GitHub' },
  { name: 'CI/CD' },
  { name: 'C++' },
  { name: 'TypeScript' },
  { name: 'Tailwind CSS' },
  { name: 'FastAPI' },
  { name: 'RedwoodJS' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-12">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skillsData.map((skill) => (
          <GlowCard
            key={skill.name}
            className="p-4 text-center flex items-center justify-center"
          >
            <span className="text-sm font-medium text-slate-300 group-hover:text-purple-300 transition-colors">
                {skill.name}
            </span>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

export default Skills;
