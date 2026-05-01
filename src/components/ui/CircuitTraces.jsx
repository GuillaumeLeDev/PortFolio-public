import { useEffect, useRef } from 'react';

const DIRS = [
  { dx: 1,  dy: 0  },
  { dx: -1, dy: 0  },
  { dx: 0,  dy: 1  },
  { dx: 0,  dy: -1 },
];

function turn90(dir) {
  const perp = [
    { dx: -dir.dy, dy:  dir.dx },
    { dx:  dir.dy, dy: -dir.dx },
  ];
  return perp[Math.random() < 0.5 ? 0 : 1];
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [0, 255, 255];
}

function makeTrace(w, h) {
  const dir = DIRS[Math.floor(Math.random() * 4)];
  const x   = Math.random() * w;
  const y   = Math.random() * h;
  return {
    x, y, dir,
    trail:    [{ x, y }],
    birth:    performance.now(),
    life:     2000 + Math.random() * 3000,
    speed:    90  + Math.random() * 110,
    maxLen:   55  + Math.floor(Math.random() * 70),
    nextTurn: 40  + Math.random() * 120,
    traveled: 0,
  };
}

// Dessine la traînée avec un gradient approximé par N_BUCKETS tranches.
// Donne le même rendu que le per-segment original avec ~10x moins de draw calls.
const N_BUCKETS = 10;

function drawTrailBuckets(ctx, tr, t, r, g, b, alphaScale) {
  const pts = tr.trail;
  if (pts.length < 2) return;
  const lifeRatio = 1 - (t - tr.birth) / tr.life;
  const n = pts.length - 1;
  const step = Math.max(1, Math.ceil(n / N_BUCKETS));

  for (let s = 0; s < n; s += step) {
    const end = Math.min(s + step, n);
    // alpha du milieu du bucket — identique visuellement au per-segment
    const a = ((s + step * 0.5) / n) * lifeRatio * alphaScale;
    if (a < 0.004) continue;
    ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
    ctx.beginPath();
    ctx.moveTo(pts[s].x, pts[s].y);
    for (let i = s + 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }
}

export default function CircuitTraces({
  color     = '#00FFFF',
  count     = 22,
  style,
  className,
}) {
  const canvasRef = useRef(null);
  const rgbRef    = useRef(hexToRgb(color));

  useEffect(() => { rgbRef.current = hexToRgb(color); }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const traces = [];
    let rafId;
    let lastT  = null;
    let paused = false;

    const dim = { w: 0, h: 0 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      dim.w = rect.width;
      dim.h = rect.height;
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onVisibility() {
      paused = document.hidden;
      if (!paused) {
        lastT = null;
        rafId = requestAnimationFrame(frame);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    function frame(t) {
      if (paused) return;

      const dt = lastT !== null ? Math.min((t - lastT) / 1000, 0.05) : 0;
      lastT = t;

      const { w, h } = dim;
      if (!w || !h) { rafId = requestAnimationFrame(frame); return; }

      while (traces.length < count) traces.push(makeTrace(w, h));

      for (let i = traces.length - 1; i >= 0; i--) {
        const tr = traces[i];
        if (t - tr.birth >= tr.life) { traces.splice(i, 1); continue; }

        const dist = tr.speed * dt;
        tr.x        += tr.dir.dx * dist;
        tr.y        += tr.dir.dy * dist;
        tr.traveled += dist;

        let bounced = false;
        if (tr.x <= 0 || tr.x >= w) {
          tr.x   = Math.max(0, Math.min(w, tr.x));
          tr.dir = { dx: -tr.dir.dx, dy: tr.dir.dy };
          bounced = true;
        }
        if (tr.y <= 0 || tr.y >= h) {
          tr.y   = Math.max(0, Math.min(h, tr.y));
          tr.dir = { dx: tr.dir.dx, dy: -tr.dir.dy };
          bounced = true;
        }

        if (!bounced && tr.traveled >= tr.nextTurn) {
          if (Math.random() < 0.7) tr.dir = turn90(tr.dir);
          tr.traveled = 0;
          tr.nextTurn = 30 + Math.random() * 130;
        }

        tr.trail.push({ x: tr.x, y: tr.y });
        if (tr.trail.length > tr.maxLen) tr.trail.shift();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      const [r, g, b] = rgbRef.current;

      // ── Passe 1 : halo large ──────────────────────────────────────────
      ctx.lineWidth   = 9;
      ctx.shadowColor = `rgb(${r},${g},${b})`;
      ctx.shadowBlur  = 22;
      for (const tr of traces) drawTrailBuckets(ctx, tr, t, r, g, b, 0.18);

      // ── Passe 2 : lueur intermédiaire ─────────────────────────────────
      ctx.lineWidth  = 3;
      ctx.shadowBlur = 10;
      for (const tr of traces) drawTrailBuckets(ctx, tr, t, r, g, b, 0.5);

      // ── Passe 3 : cœur net ────────────────────────────────────────────
      ctx.lineWidth  = 1.2;
      ctx.shadowBlur = 4;
      for (const tr of traces) drawTrailBuckets(ctx, tr, t, r, g, b, 1.0);

      // ── Passe 4 : tête lumineuse ──────────────────────────────────────
      ctx.shadowBlur = 30;
      for (const tr of traces) {
        const lifeRatio = 1 - (t - tr.birth) / tr.life;
        if (lifeRatio <= 0) continue;
        const head = tr.trail[tr.trail.length - 1];

        ctx.beginPath();
        ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${r},${g},${b},${lifeRatio * 0.55})`;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(255,255,255,${lifeRatio})`;
        ctx.shadowBlur  = 14;
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
