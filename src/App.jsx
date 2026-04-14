import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Github, Linkedin } from 'lucide-react';
import { projects, projectCategories } from './data/projects';
import { skills, levelColors } from './data/skills';
import { config } from './data/config';
import CircuitBackground from './components/ui/CircuitBackground';
import ProjectModal from './components/ui/ProjectModal';


const Styles = {
  PageContainer: "min-h-screen text-[#333333] font-sans selection:bg-gray-200",
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

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [flippedSkills, setFlippedSkills] = useState(new Set());

  function toggleSkillFlip(category) {
    setFlippedSkills(prev => {
      const next = new Set(prev);
      next.has(category) ? next.delete(category) : next.add(category);
      return next;
    });
  }

const filteredProjects = activeFilter === "Tous"
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className={Styles.PageContainer}>

      {/* ── Fond animé circuit imprimé ── */}
      <CircuitBackground
        color="#3b82f6"   // couleur des traces  → modifier ici
        count={22}        // nombre de traces    → modifier ici
        opacity={0.45}    // intensité globale   → modifier ici
        bgColor="#f5f5f5" // couleur de fond     → modifier ici
      />

      <div className={Styles.ContentWrapper} style={{ position: 'relative', zIndex: 1 }}>

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
              <a href={config.cta.cvPath} target="_blank" rel="noopener noreferrer" className={Styles.BtnPrimary}>
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
            {skills.map((category, index) => {
              const isFlipped = flippedSkills.has(category.category);
              const relatedProjects = projects.filter(p =>
                (category.relatedProjectIds || []).includes(p.id)
              );
              return (
                <FadeIn key={category.category} delay={index * 0.08}>
                  {/* Wrapper perspective + hover translate */}
                  <div
                    className="transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer"
                    style={{ perspective: '1000px' }}
                    onClick={() => toggleSkillFlip(category.category)}
                  >
                    {/* Conteneur flip 3D */}
                    <div
                      style={{
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* ── FACE AVANT ── */}
                      <div
                        className={`${Styles.CardBase} rounded-3xl p-6`}
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
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
                        {/* Hint discret */}
                        <p className="text-xs text-gray-300 mt-4 text-right select-none">
                          cliquer pour voir les projets →
                        </p>
                      </div>

                      {/* ── FACE ARRIÈRE ── */}
                      <div
                        className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex flex-col justify-between"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          position: 'absolute',
                          inset: 0,
                        }}
                      >
                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>{category.icon}</span>
                            Projets associés
                          </h3>
                          {relatedProjects.length > 0 ? (
                            <ul className="space-y-3">
                              {relatedProjects.map(p => (
                                <li key={p.id} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-0.5 text-xs">◆</span>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                                    <p className="text-xs text-gray-400">{p.subtitle}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400 italic">
                              Aucun projet associé pour l'instant.
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 mt-4 text-right select-none">
                          ← cliquer pour retourner
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
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

          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <div
                  className={`${Styles.CardBase} group rounded-3xl overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image ou fallback titre */}
                  {project.image ? (
                    <div
                      className="w-full bg-gray-50 border-b border-gray-100 flex items-center justify-center"
                      style={{ aspectRatio: '16/9', padding: '12px' }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ display: 'block' }}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center bg-gray-50 border-b border-gray-100 w-full"
                      style={{ aspectRatio: '16/9' }}
                    >
                      <span className="text-lg font-bold text-gray-400 text-center px-6 leading-snug">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Contenu résumé */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className={`${Styles.TextBody} text-sm whitespace-pre-line`}>{project.shortDescription}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Modale détail projet */}
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
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
