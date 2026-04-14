import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, FileText, Github, Linkedin, FolderOpen } from 'lucide-react';
import { projects, projectCategories } from './data/projects';
import { skills, levelColors } from './data/skills';
import { experiences, education } from './data/experience';
import { config } from './data/config';


const Styles = {
  PageContainer: "bg-[#f5f5f5] min-h-screen text-[#333333] font-sans selection:bg-gray-200",
  ContentWrapper: "max-w-4xl mx-auto px-6 py-20",
  SectionDivider: "border-gray-200 mb-12 opacity-60",

H1: "text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900",
  H2_Section: "text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3",
  TextBody: "text-gray-600 leading-relaxed",

  CardBase: "bg-white border border-gray-100 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-200",

  BtnPrimary: "inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl shadow-gray-200",
  BtnSecondary: "inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 hover:border-gray-300 shadow-sm"
};

const levelStyle = {
  "intermédiaire": "bg-green-50 text-green-700 border-green-200",
  "notions": "bg-blue-50 text-blue-700 border-blue-200",
  "en cours": "bg-orange-50 text-orange-700 border-orange-200",
  "à venir": "bg-gray-100 text-gray-500 border-gray-200"
};

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);


function App() {
  const [activeFilter, setActiveFilter] = useState("Tous");

const filteredProjects = activeFilter === "Tous"
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className={Styles.PageContainer}>


      <div className={Styles.ContentWrapper}>

        {/* HERO */}
        <section id="home" className="mb-16 pt-10">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {config.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className={Styles.H1}>{config.name}</h1>
            <p className="text-xl text-gray-500 font-light max-w-2xl mb-8">
              {config.title}
            </p>
            <p className={`${Styles.TextBody} text-lg max-w-2xl mb-8`}>
              {config.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('projects')} className={Styles.BtnPrimary}>
                <FolderOpen size={20} />
                {config.cta.primary}
              </button>
              <a href={config.cta.cvPath} target="_blank" rel="noopener noreferrer" className={Styles.BtnSecondary}>
                <FileText size={20} />
                {config.cta.secondary}
              </a>
            </div>
          </FadeIn>
        </section>

        {/* À PROPOS */}
        <section id="about" className="mb-16">
          <FadeIn delay={0.2}>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              À propos
            </h2>
            <p className={`${Styles.TextBody} text-lg max-w-2xl whitespace-pre-line`}>
              {config.about}
            </p>
          </FadeIn>
        </section>

        <hr className={Styles.SectionDivider} />

        {/* COMPÉTENCES */}
        <section id="skills" className="mb-16">
          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Compétences Techniques
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-2">
            {skills.map((category, index) => (
              <FadeIn key={category.category} delay={index * 0.08}>
                <div className={`${Styles.CardBase} rounded-3xl p-6`}>
                  <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item.name}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${levelStyle[item.level] || levelStyle["notions"]}`}
                        title={item.level}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {/* Légende niveaux */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {Object.entries(levelStyle).map(([level, style]) => (
                <span key={level} className={`text-xs font-medium px-3 py-1 rounded-full border ${style}`}>
                  {level}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        <hr className={Styles.SectionDivider} />

        {/* PROJETS */}
        <section id="projects" className="mb-16">
          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Projets Réseau
            </h2>
          </FadeIn>

          {/* Filtres */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                    activeFilter === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-10 max-w-3xl mx-auto">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <a href={project.github} target="_blank" rel="noreferrer" className="block group relative">
                  <div className={`${Styles.CardBase} rounded-3xl p-8 ${project.featured ? "border-l-4 border-l-blue-400" : ""}`}>

                    <div className="absolute top-8 right-8 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg z-10">
                      <ArrowUpRight size={20} />
                    </div>

                    <div className="flex items-start justify-between mb-1 pr-12">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-blue-500 mb-3">{project.subtitle}</p>
                    <p className={`${Styles.TextBody} mb-5`}>{project.description}</p>

                    {/* Points clés */}
                    <ul className="space-y-1 mb-5">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg group-hover:bg-gray-100 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        <hr className={Styles.SectionDivider} />

        {/* EXPÉRIENCES */}
        <section id="experience" className="mb-16">
          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Expériences
            </h2>
          </FadeIn>
          <div className="space-y-6 max-w-3xl mx-auto mb-12">
            {experiences.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 0.1}>
                <div className={`${Styles.CardBase} group rounded-3xl p-8 cursor-default`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 mt-2 sm:mt-0 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                    {exp.company} — {exp.location}
                  </div>
                  {exp.highlight && (
                    <div className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-block mb-4">
                      {exp.highlight}
                    </div>
                  )}
                  <ul className="space-y-1 mt-3">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className={`${Styles.TextBody} flex items-start gap-2`}>
                        <span className="text-gray-300 mt-1">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Formation
            </h2>
          </FadeIn>
          <div className="space-y-6 max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <FadeIn key={edu.id} delay={index * 0.1}>
                <div className={`${Styles.CardBase} group rounded-3xl p-8 cursor-default`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {edu.degree}
                    </h3>
                    <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 mt-2 sm:mt-0 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    {edu.school} — {edu.location}
                  </div>
                  <ul className="space-y-1">
                    {edu.bullets.map((b, i) => (
                      <li key={i} className={`${Styles.TextBody} flex items-start gap-2`}>
                        <span className="text-gray-300 mt-1">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <footer id="contact" className="pt-20 pb-10 border-t border-gray-200">
          <FadeIn>
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">{config.footerCTA}</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {config.footerSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`mailto:${config.email}`} className={Styles.BtnPrimary}>
                  <Mail size={20} />
                  Envoyer un email
                </a>
                <a href={config.cta.cvPath} target="_blank" rel="noopener noreferrer" className={Styles.BtnSecondary}>
                  <FileText size={20} />
                  Télécharger mon CV
                </a>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <a href={config.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 transition-all">
                  <Github size={20} />
                </a>
                <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-12">© {config.year} {config.name}.</p>
          </FadeIn>
        </footer>

      </div>
    </div>
  );
}

export default App;
