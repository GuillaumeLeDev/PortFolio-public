/**
 * CircuitTraces
 *
 * Composant canvas qui anime des traits lumineux se déplaçant en angles droits,
 * imitant les pistes d'un circuit imprimé ou des flux de données réseau.
 *
 * Props :
 *   color   {string}  Couleur hexadécimale des traits   (défaut : '#00FFFF')
 *   count   {number}  Nombre de traits actifs simultanément (défaut : 18)
 *   style   {object}  Styles supplémentaires sur le <canvas>
 *   className {string}
 */

import { useEffect, useRef } from 'react';

/* ── Directions cardinales ──────────────────────────────────────────────── */
const DIRS = [
  { dx: 1,  dy: 0  }, // droite
  { dx: -1, dy: 0  }, // gauche
  { dx: 0,  dy: 1  }, // bas
  { dx: 0,  dy: -1 }, // haut
];

/** Tourne à 90° (gauche ou droite aléatoire). */
function turn90(dir) {
  // Perpendiculaires : [(-dy, dx), (dy, -dx)]
  const perp = [
    { dx: -dir.dy, dy:  dir.dx },
    { dx:  dir.dy, dy: -dir.dx },
  ];
  return perp[Math.random() < 0.5 ? 0 : 1];
}

/** #RRGGBB → [r, g, b] */
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [0, 255, 255];
}

/* ── Création d'un trait ────────────────────────────────────────────────── */
function makeTrace(w, h) {
  const dir = DIRS[Math.floor(Math.random() * 4)];
  const x   = Math.random() * w;
  const y   = Math.random() * h;
  return {
    x, y, dir,
    trail:     [{ x, y }],
    birth:     performance.now(),
    life:      2000 + Math.random() * 3000,  // 2 – 5 s (ms)
    speed:     90  + Math.random() * 110,    // px / s
    maxLen:    55  + Math.floor(Math.random() * 70),
    // distance restante avant le prochain virage (px)
    nextTurn:  40  + Math.random() * 120,
    traveled:  0,
  };
}

/* ── Composant ──────────────────────────────────────────────────────────── */
export default function CircuitTraces({
  color     = '#00FFFF',
  count     = 18,
  style,
  className,
}) {
  const canvasRef = useRef(null);
  // Ref mutable pour la couleur → la closure de l'animation voit toujours la valeur courante
  const rgbRef = useRef(hexToRgb(color));

  // Met à jour la ref quand la prop change, sans relancer l'animation
  useEffect(() => {
    rgbRef.current = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const traces = [];
    let rafId;
    let lastT   = null;

    // Dimensions logiques (CSS pixels) — mises à jour par le ResizeObserver
    const dim = { w: 0, h: 0 };

    /* ── Resize ──────────────────────────────────────────────────────────── */
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      dim.w = rect.width;
      dim.h = rect.height;
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
      // setTransform remet le contexte à zéro PUIS applique le scale DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Boucle d'animation ──────────────────────────────────────────────── */
    function frame(t) {
      // dt limité à 50 ms pour éviter les sauts après un onglet en veille
      const dt = lastT !== null ? Math.min((t - lastT) / 1000, 0.05) : 0;
      lastT = t;

      const { w, h } = dim;
      if (!w || !h) { rafId = requestAnimationFrame(frame); return; }

      /* ── Spawn ─────────────────────────────────────────────────────────── */
      while (traces.length < count) traces.push(makeTrace(w, h));

      /* ── Mise à jour ───────────────────────────────────────────────────── */
      for (let i = traces.length - 1; i >= 0; i--) {
        const tr = traces[i];

        // Fin de vie → suppression (sera remplacé au prochain spawn)
        if (t - tr.birth >= tr.life) {
          traces.splice(i, 1);
          continue;
        }

        const dist = tr.speed * dt;
        tr.x        += tr.dir.dx * dist;
        tr.y        += tr.dir.dy * dist;
        tr.traveled += dist;

        // Rebond sur les bords : on force un virage perpendiculaire
        let bounced = false;
        if (tr.x <= 0 || tr.x >= w) {
          tr.x   = Math.max(0, Math.min(w, tr.x));
          tr.dir = tr.dir.dy === 0 ? DIRS[2 + Math.floor(Math.random() * 2)] : tr.dir;
          bounced = true;
        }
        if (tr.y <= 0 || tr.y >= h) {
          tr.y   = Math.max(0, Math.min(h, tr.y));
          tr.dir = tr.dir.dx === 0 ? DIRS[Math.floor(Math.random() * 2)] : tr.dir;
          bounced = true;
        }

        // Virage aléatoire après avoir parcouru `nextTurn` pixels
        if (!bounced && tr.traveled >= tr.nextTurn) {
          if (Math.random() < 0.7) tr.dir = turn90(tr.dir); // 70 % tourne, 30 % continue
          tr.traveled = 0;
          tr.nextTurn = 30 + Math.random() * 130;
        }

        // Ajout du point courant à la traînée
        tr.trail.push({ x: tr.x, y: tr.y });
        if (tr.trail.length > tr.maxLen) tr.trail.shift();
      }

      /* ── Rendu ─────────────────────────────────────────────────────────── */
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      const [r, g, b] = rgbRef.current;

      // ── Passe 1 : halo extérieur (glow large et doux) ──────────────────
      ctx.lineWidth   = 9;
      ctx.shadowColor = `rgb(${r},${g},${b})`;
      ctx.shadowBlur  = 22;

      for (const tr of traces) {
        const lifeRatio = 1 - (lastT - tr.birth) / tr.life;
        const pts = tr.trail;
        if (pts.length < 2) continue;

        for (let i = 1; i < pts.length; i++) {
          const a = (i / pts.length) * lifeRatio * 0.18;
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.stroke();
        }
      }

      // ── Passe 2 : lueur intermédiaire ──────────────────────────────────
      ctx.lineWidth  = 3;
      ctx.shadowBlur = 10;

      for (const tr of traces) {
        const lifeRatio = 1 - (lastT - tr.birth) / tr.life;
        const pts = tr.trail;
        if (pts.length < 2) continue;

        for (let i = 1; i < pts.length; i++) {
          const a = (i / pts.length) * lifeRatio * 0.5;
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.stroke();
        }
      }

      // ── Passe 3 : cœur net et lumineux ─────────────────────────────────
      ctx.lineWidth  = 1.2;
      ctx.shadowBlur = 4;

      for (const tr of traces) {
        const lifeRatio = 1 - (lastT - tr.birth) / tr.life;
        const pts = tr.trail;
        if (pts.length < 2) continue;

        for (let i = 1; i < pts.length; i++) {
          const a = (i / pts.length) * lifeRatio;
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.stroke();
        }
      }

      // ── Passe 4 : tête (point blanc très brillant) ─────────────────────
      ctx.shadowBlur = 30;

      for (const tr of traces) {
        const lifeRatio = 1 - (lastT - tr.birth) / tr.life;
        if (lifeRatio <= 0) continue;
        const pts  = tr.trail;
        const head = pts[pts.length - 1];

        // Halo couleur
        ctx.beginPath();
        ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${r},${g},${b},${lifeRatio * 0.55})`;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.fill();

        // Point blanc (centre chaud)
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(255,255,255,${lifeRatio})`;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.shadowBlur  = 14;
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // monté une seule fois — la couleur est lue en closure via `rgb`

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width:   '100%',
        height:  '100%',
        ...style,
      }}
    />
  );
}
