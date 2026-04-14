import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  // Fermeture sur touche Échap
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Blocage du scroll body pendant l'ouverture
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    // Backdrop — clic en dehors = fermeture
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      {/* Panneau modale — stopPropagation pour ne pas fermer au clic intérieur */}
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermeture */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image */}
        {project.image && (
          <div
            className="w-full bg-gray-50 rounded-2xl mb-6 flex items-center justify-center"
            style={{ aspectRatio: '16/9', padding: '12px' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-full object-contain"
              style={{ display: 'block' }}
            />
          </div>
        )}

        {/* En-tête */}
        <div className="flex items-start justify-between pr-10 mb-1">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
        </div>
        <p className="text-sm font-medium text-blue-500 mb-4">{project.subtitle}</p>

        {/* Description complète */}
        <p className="text-gray-600 leading-relaxed mb-5">{project.description}</p>

        {/* Points clés */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">✓</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Lien GitHub */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          Voir sur GitHub
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
