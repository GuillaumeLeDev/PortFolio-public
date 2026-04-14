import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Cpu, FolderOpen, Mail, ArrowUpRight, FileText } from 'lucide-react';
import { profil, experiences, competences, projets } from './data';


const Styles = {
  // Mise en page globale
  PageContainer: "bg-[#f5f5f5] min-h-screen text-[#333333] font-sans selection:bg-gray-200",
  ContentWrapper: "max-w-4xl mx-auto px-6 py-20",
  SectionDivider: "border-gray-200 mb-12 opacity-60",
  //TEst repo ecole + test debug git 
  // Navigation
  NavContainer: "fixed top-6 left-1/2 -translate-x-1/2 z-50",
  NavInner: "flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 ring-1 ring-gray-200/50",
  NavButton: "p-3 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-all",
  NavContactBtn: "flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-black hover:scale-105 transition-all shadow-lg shadow-gray-200",

  // Textes et Titres
  H1: "text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900",
  H2_Section: "text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3", // Titre de section (ex: PROJETS)
  TextBody: "text-gray-600 leading-relaxed", 
  
  // Cartes 
  CardBase: "bg-white border border-gray-100 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-200",
  
  // Boutons du Footer
  BtnPrimary: "inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl shadow-gray-200",
  BtnSecondary: "inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 hover:border-gray-300 shadow-sm"
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
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={Styles.PageContainer}>
      
      {/* HEADER*/}
      <nav className={Styles.NavContainer}>
        <div className={Styles.NavInner}>
          <button onClick={() => scrollToSection('home')} className={Styles.NavButton} title="Accueil">
            <Home size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => scrollToSection('about')} className={Styles.NavButton} title="Présentation">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => scrollToSection('experience')} className={Styles.NavButton} title="Expériences">
            <Briefcase size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => scrollToSection('skills')} className={Styles.NavButton} title="Compétences">
            <Cpu size={20} strokeWidth={1.5} />
          </button>
          <button onClick={() => scrollToSection('projects')} className={Styles.NavButton} title="Projets">
            <FolderOpen size={20} strokeWidth={1.5} />
          </button>
          
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          
          <button onClick={() => scrollToSection('contact')} className={Styles.NavContactBtn}>
            <Mail size={16} />
            <span>Me contacter</span>
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className={Styles.ContentWrapper}>
        
        {/* ACCUEIL */}
        <section id="home" className="mb-16 pt-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Disponible pour une alternance (Dev Web / Data)
              </span>
            </div>
            <h1 className={Styles.H1}>
              {profil.nom}
            </h1>
            <p className="text-2xl text-gray-500 font-light max-w-xl">
              {profil.titre}
            </p>
          </FadeIn>
        </section>

        {/* PRÉSENTATION */}
        <section id="about" className="mb-16">
          <FadeIn delay={0.2}>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              À propos
            </h2>
            <p className={`${Styles.TextBody} text-lg max-w-2xl whitespace-pre-line`}>
              {profil.bio}
              <br/><br/>
              {profil.description}
            </p>
          </FadeIn>
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

          <div className="space-y-8 max-w-3xl">
            {experiences.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 0.1}>
                
                <div className={`${Styles.CardBase} group rounded-3xl p-8 cursor-default`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {exp.titre}
                    </h3>
                    <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 mt-2 sm:mt-0 group-hover:bg-white group-hover:border-gray-200 transition-colors">
                      {exp.date}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    {exp.entreprise}
                  </div>
                  <p className={`${Styles.TextBody} whitespace-pre-line`}>
                    {exp.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <hr className={Styles.SectionDivider} />

        {/* STACK / COMPÉTENCES */}
        <section id="skills" className="mb-16">
          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Technologies
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {competences.map((skill, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                {/* Carte compétence */}
                <div className={`${Styles.CardBase} rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group cursor-default h-full`}>
                  
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 p-2">
                    {skill.image && skill.image !== "./" ? (
                      <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xl font-bold text-gray-400">?</span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">
                    {skill.name}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <hr className={Styles.SectionDivider} />

        {/* PROJETS */}
        <section id="projects" className="mb-16">
          <FadeIn>
            <h2 className={Styles.H2_Section}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Projets Sélectionnés
            </h2>
          </FadeIn>

          <div className="grid gap-12 max-w-3xl">
            {projets.map((projet, index) => (
              <FadeIn key={projet.id} delay={index * 0.1}>
                <a href={projet.lien} target="_blank" rel="noreferrer" className="block group relative">
                  {/* Carte Projet */}
                  <div className={`${Styles.CardBase} rounded-3xl p-6`}>
                    
                    <div className="absolute top-8 right-8 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg z-10">
                      <ArrowUpRight size={20} />
                    </div>

                    {projet.image && (
                      <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                        <img src={projet.image} alt={projet.titre} className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"/>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{projet.titre}</h3>
                    <p className={`${Styles.TextBody} mb-5`}>{projet.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {projet.technos.map(tech => (
                        <span key={tech} className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg group-hover:bg-gray-100 transition-colors">{tech}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="pt-20 pb-10 border-t border-gray-200">
          <FadeIn>
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Prêt à collaborer ?</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Je suis actuellement à la recherche d'opportunités en tant que Data Analyst.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={`mailto:${profil.contact}`} className={Styles.BtnPrimary}>
                  <Mail size={20} />
                  Envoyer un email
                </a>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className={Styles.BtnSecondary}>
                  <FileText size={20} />
                  Voir mon CV
                </a>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-12">© 2024 {profil.nom}.</p>
          </FadeIn>
        </footer>

      </div>
    </div>
  );
}

export default App;