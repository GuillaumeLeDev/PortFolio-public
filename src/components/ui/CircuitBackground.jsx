/**
 * CircuitBackground
 *
 * Composant de fond animé "circuit imprimé" — à placer une seule fois
 * dans la page principale, en dehors du flux de contenu.
 *
 * Il se positionne en `fixed`, couvre tout l'écran et ne capture
 * aucun événement (pointer-events: none), donc le contenu reste
 * entièrement interactif.
 *
 * ─── Configuration rapide ────────────────────────────────────────────
 *
 *   <CircuitBackground />                        // valeurs par défaut
 *   <CircuitBackground color="#3b82f6" count={25} opacity={0.6} />
 *
 * Props :
 *   color      {string}   Couleur hex des traces       (défaut : '#3b82f6')
 *   count      {number}   Nombre de traces simultanées (défaut : 22)
 *   opacity    {number}   Opacité globale du canvas    (défaut : 0.5)
 *   bgColor    {string}   Couleur de fond de la page   (défaut : '#ffffff')
 *
 * ─────────────────────────────────────────────────────────────────────
 */

import CircuitTraces from './CircuitTraces';

export default function CircuitBackground({
  color   = '#3b82f6',   // bleu portfolio
  count   = 22,
  opacity = 0.5,
  bgColor = '#ffffff',
}) {
  return (
    <>
      {/* Couleur de fond appliquée sur <html> via un div fixed */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          backgroundColor: bgColor,
          zIndex:        -20,
          pointerEvents: 'none',
        }}
      />

      {/* Canvas d'animation */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        -10,
          pointerEvents: 'none',
          opacity,
        }}
      >
        <CircuitTraces color={color} count={count} />
      </div>
    </>
  );
}
