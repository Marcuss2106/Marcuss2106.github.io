// @ts-nocheck -- imperative DOM, canvas and GSAP code ported from the design mockup.
// Everything here runs once after React mounts the static markup (see App.tsx).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let started = false;

export function initSite(): void {
  if (started) return; // React StrictMode mounts effects twice in development
  started = true;

  const $ = id => document.getElementById(id);
  document.documentElement.lang = 'en';

  /* ---------- static content built in JS ---------- */
  // Quantum circuit: 5 wires, XY gates on pairs, score phase, mirrored XY gates.
  (function circuit() {
    const NS = 'http://www.w3.org/2000/svg', W = $('wires'), Gt = $('gates');
    const y = q => 40 + q * 50, X0 = 70, X1 = 570;
    const mk = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
    for (let q = 0; q < 5; q++) { mk('path', { class: 'draw', d: `M${X0} ${y(q)} H${X1}` }, W); const t = mk('text', { x: 50, y: y(q) + 4, 'text-anchor': 'end' }, W); t.textContent = 'q' + q; }
    const pairs = [[0, 1], [2, 3], [1, 2], [3, 4], [0, 2]];
    const gate = (x, q1, q2, label, ph) => {
      const g = mk('g', { class: 'g' }, Gt);
      if (q2 != null) { mk('line', { x1: x, y1: y(q1), x2: x, y2: y(q2), stroke: 'var(--paper)', 'stroke-width': 1.2 }, g); mk('rect', { class: 'gate', x: x - 17, y: y(q1) - 13, width: 34, height: 26 }, g); mk('rect', { class: 'gate', x: x - 17, y: y(q2) - 13, width: 34, height: 26 }, g); const a = mk('text', { class: 'gtext', x, y: y(q1) + 4 }, g); a.textContent = label; const b = mk('text', { class: 'gtext', x, y: y(q2) + 4 }, g); b.textContent = label; }
      else { mk('rect', { class: 'gate ph', x: x - 34, y: y(0) - 16, width: 68, height: y(4) - y(0) + 32 }, g); const t = mk('text', { class: 'gtext inv', x, y: (y(0) + y(4)) / 2 + 4 }, g); t.textContent = label; }
    };
    pairs.forEach(([a, b], i) => gate(110 + i * 38, a, b, 'XY'));
    gate(320, null, null, 'P(γ)', true);
    pairs.slice().reverse().forEach(([a, b], i) => gate(378 + i * 38, a, b, 'XY'));
    mk('text', { x: 186, y: 18, 'text-anchor': 'middle', fill: 'var(--fog)' }, Gt).textContent = 'M(β)';
    mk('text', { x: 454, y: 18, 'text-anchor': 'middle', fill: 'var(--fog)' }, Gt).textContent = 'M(β)ᵀ';
  })();

  // The exact `hexdump -C` output after: create data.bin A 1024; insert "hell" at offset 100 (1028 bytes).
  (function hexdump() {
    const bytes = new Array(1024).fill(0x41); bytes.splice(100, 0, 0x68, 0x65, 0x6c, 0x6c);
    const fmt = off => {
      const row = bytes.slice(off, off + 16), hot = p => p >= 100 && p < 104;
      const hex = row.map((b, i) => { const s = b.toString(16).padStart(2, '0'); return hot(off + i) ? `<span class="hl">${s}</span>` : s; });
      while (hex.length < 16) hex.push('  ');
      const asc = row.map((b, i) => { const c = String.fromCharCode(b); return hot(off + i) ? `<span class="hl">${c}</span>` : c; }).join('');
      return `<span class="o">${off.toString(16).padStart(8, '0')}</span>  ${hex.slice(0, 8).join(' ')}  ${hex.slice(8).join(' ')}  |${asc}|`;
    };
    // hexdump collapses repeated lines into "*"
    const out = ['<span class="o">$ hexdump -C data.bin</span>'];
    let prev = null, starred = false;
    for (let off = 0; off < bytes.length; off += 16) {
      const key = bytes.slice(off, off + 16).join(',');
      if (key === prev) { if (!starred) { out.push('*'); starred = true; } continue; }
      out.push(off === 0x60 ? `<span class="row-hl">${fmt(off)}</span>` : fmt(off)); prev = key; starred = false;
    }
    out.push(`<span class="o">${bytes.length.toString(16).padStart(8, '0')}</span>`);
    $('hex').innerHTML = out.join('\n');
  })();


  // Motion: full by default. Visitors can switch to reduced motion with the button in the bar (remembered per browser).
  let saved = null; try { saved = localStorage.getItem('motion'); } catch (e) {}
  const RM = saved === 'off';
  document.documentElement.classList.toggle('rm', RM);
  $('motion').textContent = RM ? 'Motion: reduced' : 'Motion: full';
  $('motion').addEventListener('click', () => { try { localStorage.setItem('motion', RM ? 'on' : 'off'); } catch (e) {} location.reload(); });

  // Hero backdrop: a 2D Ising model sampled with Metropolis updates (J = 1, periodic edges).
  // Scrolling through the hero cools it from just above the critical temperature (2.269) so domains grow.
  const ising = (function () {
    const cv = $('ising'), cx = cv.getContext('2d'), out = $('ireadout'), btn = $('ipause'), wrap = $('lat');
    const CELL = 9;
    let nx = 0, ny = 0, s = null, img = null, T = 2.6, vis = 0, sweeps = 0, running = true, onscreen = true, raf = 0, lastW = 0, frame = 0;
    let pa = 0, pb = 0;
    const setT = t => { T = t; pa = Math.exp(-4 / T); pb = Math.exp(-8 / T); };
    function init() {
      const w = wrap.clientWidth || innerWidth, h = wrap.clientHeight || innerHeight; lastW = w;
      nx = Math.ceil(w / CELL); ny = Math.ceil(h / CELL);
      s = new Int8Array(nx * ny); for (let i = 0; i < s.length; i++) s[i] = Math.random() < 0.5 ? 1 : -1;
      cv.width = nx; cv.height = ny; img = cx.createImageData(nx, ny); sweeps = 0;
    }
    function sweep() {
      const N = nx * ny;
      for (let k = 0; k < N; k++) {
        const i = (Math.random() * N) | 0, x = i % nx, y = (i / nx) | 0;
        const nb = s[y * nx + (x + 1) % nx] + s[y * nx + (x + nx - 1) % nx] + s[((y + 1) % ny) * nx + x] + s[((y + ny - 1) % ny) * nx + x];
        const dE = 2 * s[i] * nb;
        if (dE <= 0 || Math.random() < (dE === 4 ? pa : pb)) s[i] = -s[i];
      }
      sweeps++;
    }
    function render() {
      const d = img.data, k = vis;
      const ur = 24 + (58 - 24) * k, ug = 25 + (84 - 25) * k, ub = 28 + (110 - 28) * k;
      let m = 0;
      for (let i = 0; i < s.length; i++) {
        const up = s[i] > 0; m += s[i];
        d[i * 4] = up ? ur : 13; d[i * 4 + 1] = up ? ug : 13; d[i * 4 + 2] = up ? ub : 14; d[i * 4 + 3] = 255;
      }
      cx.putImageData(img, 0, 0);
      m /= s.length;
      out.textContent = `2D Ising · Metropolis · ${nx}×${ny} · T = ${T.toFixed(2)} · m = ${m < 0 ? '−' : '+'}${Math.abs(m).toFixed(2)} · sweep ${sweeps}`;
    }
    function loop() { raf = 0; if (!running || !onscreen) return; if (!RM || frame++ % 3 === 0) { sweep(); render(); } raf = requestAnimationFrame(loop); }
    const kick = () => { if (!raf && running && onscreen) raf = requestAnimationFrame(loop); };
    btn.addEventListener('click', () => { running = !running; btn.textContent = running ? 'Pause' : 'Play'; kick(); });
    // pause the simulation when the hero is not being rendered
    if ('contentVisibility' in document.documentElement.style) {
      wrap.addEventListener('contentvisibilityautostatechange', e => { onscreen = !e.skipped; kick(); });
    } else {
      new IntersectionObserver(es => { onscreen = es[0].isIntersecting; kick(); }, { rootMargin: '200px' }).observe(wrap);
    }
    addEventListener('resize', () => { if (Math.abs(wrap.clientWidth - lastW) > 40) { init(); render(); } });
    setT(T); init();
    render(); kick();
    // p in [0, 1]: scroll position through the pinned hero
    return { set(p) { setT(2.6 - 0.95 * p); vis = p; if (!running || !onscreen) render(); } };
  })();

  // Fields: one canvas, three live figures. Every number shown is computed here.
  const fields = (function () {
    const stage = $('fstage'), cv = $('fcan'), ctx = cv.getContext('2d'), read = $('fread'), figLab = $('ffig');
    const words = [...stage.querySelectorAll('.fw')], caps = [...stage.querySelectorAll('.f-caps p')], ticks = [...stage.querySelectorAll('.f-ticks b')];
    const FIG = ['Columbia, SC', 'fig. Bloch sphere', 'fig. Sobel |∇I|', 'fig. contrastive alignment'];
    const PAL = [
      null,
      { fg: '#ecebe6', dim: 'rgba(236,235,230,.22)', mid: 'rgba(236,235,230,.5)', acc: '#7fa8cf' },
      { fg: '#0d0d0e', dim: 'rgba(13,13,14,.2)', mid: 'rgba(13,13,14,.5)', acc: '#2d5c8c' },
      { fg: '#0d0d0e', dim: 'rgba(13,13,14,.22)', mid: 'rgba(13,13,14,.55)', acc: '#ecebe6' }];
    let W = 0, H = 0, dpr = 1, phase = -1, t = 0;

    // --- Sobel on the climbing photo
    const photo = new Image(); let photoDone; const photoReady = new Promise(r => photoDone = r); photo.src = 'holds.jpg';
    photo.addEventListener('error', () => photoDone());
    let gray = null, edge = null;
    photo.onload = () => {
      const w = photo.naturalWidth, h = photo.naturalHeight;
      const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
      x.drawImage(photo, 0, 0);
      try {
        const d = x.getImageData(0, 0, w, h).data, L = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) L[i] = 0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2];
        const g = x.createImageData(w, h), e = x.createImageData(w, h);
        for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
          const i = yy * w + xx, v = L[i];
          g.data.set([v, v, v, 255], i * 4);
          if (xx === 0 || yy === 0 || xx === w - 1 || yy === h - 1) { e.data.set([13, 13, 14, 0], i * 4); continue; }
          const p = (a, b) => L[(yy + b) * w + xx + a];
          const gx = -p(-1, -1) - 2 * p(-1, 0) - p(-1, 1) + p(1, -1) + 2 * p(1, 0) + p(1, 1);
          const gy = -p(-1, -1) - 2 * p(0, -1) - p(1, -1) + p(-1, 1) + 2 * p(0, 1) + p(1, 1);
          e.data.set([13, 13, 14, Math.min(255, Math.hypot(gx, gy) * 1.1)], i * 4);
        }
        const mkc = id => { const k = document.createElement('canvas'); k.width = w; k.height = h; k.getContext('2d').putImageData(id, 0, 0); return k; };
        gray = mkc(g); edge = mkc(e);
      } catch (err) { gray = photo; edge = null; }
      draw(); photoDone();
    };

    // --- Contrastive alignment: N image and N text embeddings on the unit circle, trained with a symmetric
    // InfoNCE loss (the CLIP objective) by plain gradient descent. Precomputed once; scroll scrubs through steps.
    const NCE = (() => {
      const N = 16, tau = 0.25, lr = 0.06, steps = 200;
      let r = 7; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
      const a = [], b = []; for (let i = 0; i < N; i++) { a.push(rnd() * Math.PI * 2); b.push(rnd() * Math.PI * 2); }
      const hist = [], loss = [];
      const sm = row => { const m = Math.max(...row), e = row.map(v => Math.exp(v - m)), z = e.reduce((x, y) => x + y); return e.map(v => v / z); };
      for (let t = 0; t <= steps; t++) {
        hist.push([a.slice(), b.slice()]);
        const S = a.map(ai => b.map(bj => Math.cos(ai - bj) / tau));
        const ga = new Array(N).fill(0), gb = new Array(N).fill(0); let L = 0;
        for (let i = 0; i < N; i++) { const pr = sm(S[i]); L -= Math.log(pr[i]); for (let j = 0; j < N; j++) { const g = (pr[j] - (i === j)) / N, d = Math.sin(a[i] - b[j]) / tau; ga[i] -= g * d; gb[j] += g * d; } }
        for (let j = 0; j < N; j++) { const pr = sm(S.map(row => row[j])); L -= Math.log(pr[j]); for (let i = 0; i < N; i++) { const g = (pr[i] - (i === j)) / N, d = Math.sin(a[i] - b[j]) / tau; ga[i] -= g * d; gb[j] += g * d; } }
        loss.push(L / (2 * N));
        for (let i = 0; i < N; i++) { a[i] -= lr * ga[i]; b[i] -= lr * gb[i]; }
      }
      return { N, tau, steps, hist, loss };
    })();

    function size() {
      const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); draw();
    }

    function bloch(P, u) {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36, az = -0.55, el = 0.32;
      const pr = (x, y, z) => { const X = x * Math.cos(az) - y * Math.sin(az), D = x * Math.sin(az) + y * Math.cos(az); return [cx + R * X, cy - R * (z * Math.cos(el) - D * Math.sin(el))]; };
      const curve = (fn, n = 96) => { ctx.beginPath(); for (let i = 0; i <= n; i++) { const [a, b] = pr(...fn(i / n * Math.PI * 2)); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); } ctx.stroke(); };
      ctx.lineWidth = 1; ctx.strokeStyle = P.mid; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = P.dim; curve(a => [Math.cos(a), Math.sin(a), 0]); curve(a => [Math.sin(a), 0, Math.cos(a)]); curve(a => [0, Math.sin(a), Math.cos(a)]);
      ctx.setLineDash([3, 5]); ctx.strokeStyle = P.mid;
      [[0, 0, 1], [1, 0, 0], [0, 1, 0]].forEach(([x, y, z]) => { const a = pr(-x, -y, -z), b = pr(x, y, z); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); });
      ctx.setLineDash([]);
      ctx.fillStyle = P.fg; ctx.font = '13px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      let q = pr(0, 0, 1); ctx.fillText('|0⟩', q[0], q[1] - 12); q = pr(0, 0, -1); ctx.fillText('|1⟩', q[0], q[1] + 22);
      q = pr(1.12, 0, 0); ctx.fillText('x', q[0], q[1] + 4); q = pr(0, 1.12, 0); ctx.fillText('y', q[0], q[1] + 4);
      // state path: θ from 0 to π, φ winds three times
      const st = s => [s * Math.PI, s * Math.PI * 6], vec = s => { const [th, ph] = st(s); return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; };
      ctx.strokeStyle = P.acc; ctx.lineWidth = 1.6; ctx.beginPath();
      const N = Math.max(1, Math.round(u * 400)); for (let i = 0; i <= N; i++) { const [a, b] = pr(...vec(u * i / N)); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); } ctx.stroke();
      const tip = pr(...vec(u)); ctx.strokeStyle = P.fg; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(...tip); ctx.stroke();
      ctx.fillStyle = P.acc; ctx.beginPath(); ctx.arc(tip[0], tip[1], 5, 0, Math.PI * 2); ctx.fill();
      const [th, ph] = st(u), p1 = Math.sin(th / 2) ** 2;
      read.textContent = `θ = ${th.toFixed(2)} rad   φ = ${(ph % (2 * Math.PI)).toFixed(2)} rad\nP(|1⟩) = sin²(θ/2) = ${p1.toFixed(3)}\n|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩`;
    }

    function sobel(P, u) {
      if (!gray) { read.textContent = 'loading image…'; return; }
      const iw = photo.naturalWidth, ih = photo.naturalHeight, sc = Math.min(W / iw, H * 0.86 / ih), dw = iw * sc, dh = ih * sc, ox = (W - dw) / 2, oy = (H - dh) / 2;
      const sx = ox + dw * u;
      ctx.drawImage(gray, ox, oy, dw, dh);
      if (edge) {
        ctx.save(); ctx.beginPath(); ctx.rect(ox, oy, sx - ox, dh); ctx.clip();
        ctx.fillStyle = '#ecebe6'; ctx.fillRect(ox, oy, dw, dh); ctx.drawImage(edge, ox, oy, dw, dh); ctx.restore();
      }
      ctx.fillStyle = P.acc; ctx.fillRect(sx - 1, oy - 14, 2, dh + 28);
      const ky = oy + dh * (0.5 + 0.34 * Math.sin(u * 18)), k = 14;
      ctx.strokeStyle = P.acc; ctx.lineWidth = 1.5; ctx.strokeRect(sx - 1.5 * k, ky - 1.5 * k, 3 * k, 3 * k);
      ctx.lineWidth = 0.75; ctx.beginPath(); for (let i = 1; i < 3; i++) { ctx.moveTo(sx - 1.5 * k + i * k, ky - 1.5 * k); ctx.lineTo(sx - 1.5 * k + i * k, ky + 1.5 * k); ctx.moveTo(sx - 1.5 * k, ky - 1.5 * k + i * k); ctx.lineTo(sx + 1.5 * k, ky - 1.5 * k + i * k); } ctx.stroke();
      read.textContent = `Gx = [ −1  0  +1 ]\n     [ −2  0  +2 ]\n     [ −1  0  +1 ]\ncolumn ${Math.round(u * iw)} / ${iw}`;
    }

    function embed(P, u) {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36, n = Math.round(u * NCE.steps), [A, B] = NCE.hist[n];
      const pt = (ang, rr = R) => [cx + rr * Math.cos(ang), cy - rr * Math.sin(ang)];
      ctx.lineWidth = 1; ctx.strokeStyle = P.mid; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = P.dim; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(cx - R - 20, cy); ctx.lineTo(cx + R + 20, cy); ctx.moveTo(cx, cy - R - 20); ctx.lineTo(cx, cy + R + 20); ctx.stroke(); ctx.setLineDash([]);
      let gap = 0;
      for (let i = 0; i < NCE.N; i++) {
        const pa = pt(A[i], R + 14), pb = pt(B[i], R - 14);
        const d = Math.abs((((A[i] - B[i]) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI); gap += d;
        ctx.strokeStyle = `rgba(13,13,14,${0.15 + 0.5 * Math.min(1, d)})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(...pa); ctx.quadraticCurveTo(cx, cy, ...pb); ctx.stroke();
        ctx.fillStyle = P.fg; ctx.fillRect(pa[0] - 5, pa[1] - 5, 10, 10);
        ctx.fillStyle = P.acc; ctx.strokeStyle = P.fg; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(pb[0], pb[1], 5.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.font = '12px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillStyle = P.fg;
      // legend sits in the top-left corner so it never meets the readout below
      ctx.fillRect(4, 6, 9, 9); ctx.fillText('image embedding', 20, 15);
      ctx.fillStyle = P.acc; ctx.beginPath(); ctx.arc(9, 30.5, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = P.fg; ctx.fillText('text embedding', 20, 35);
      read.textContent = `L = InfoNCE(image, text),  τ = ${NCE.tau}\nstep ${String(n).padStart(3, ' ')} / ${NCE.steps}   loss = ${NCE.loss[n].toFixed(3)}\nmean pair gap = ${(gap / NCE.N).toFixed(2)} rad`;
    }

    // intro: a contents strip for the three screens that follow, drawn in as you arrive
    function intro(u) {
      const cw = Math.min(W / 3.3, 210), r = cw * 0.32, cy = H / 2, x0 = W / 2 - cw;
      ctx.lineWidth = 1.4; ctx.font = '12px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      const k = i => Math.max(0, Math.min(1, u * 3 - i));
      [0, 1, 2].forEach(i => {
        const cx = x0 + i * cw, v = k(i);
        ctx.strokeStyle = 'rgba(236,235,230,' + (0.2 + 0.7 * v) + ')'; ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        if (i === 0) { ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * v); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * 0.6 * v, cy - r * 0.55 * v); }
        if (i === 1) { const L = 2 * r; ctx.rect(cx - r, cy - r, L, L); ctx.moveTo(cx - r + L * v, cy - r - 8); ctx.lineTo(cx - r + L * v, cy + r + 8); }
        if (i === 2) { ctx.arc(cx, cy, r, 0, Math.PI * 2); [0.6, 2.2, 3.6, 5.1].forEach((ang, q) => { const off = (1 - v) * (q % 2 ? 1.1 : -1.1); ctx.moveTo(cx + r * Math.cos(ang), cy - r * Math.sin(ang)); ctx.rect(cx + r * Math.cos(ang) - 4, cy - r * Math.sin(ang) - 4, 8, 8); ctx.moveTo(cx + r * 0.7 * Math.cos(ang + off) + 4, cy - r * 0.7 * Math.sin(ang + off)); ctx.arc(cx + r * 0.7 * Math.cos(ang + off), cy - r * 0.7 * Math.sin(ang + off), 4, 0, Math.PI * 2); }); }
        ctx.stroke();
        ctx.fillText(['quantum', 'vision', 'embeddings'][i], cx, cy + r + 32);
      });
      ctx.fillStyle = '#7fa8cf'; ctx.fillRect(x0 - cw / 2 + 10, cy + r + 46, (3 * cw - 20) * u, 1.5);
      read.textContent = 'next: three screens, three live figures';
    }

    function draw() {
      if (!W) return;
      const ph = Math.max(0, phase), P = PAL[ph], u = Math.min(1, t / 0.7);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      if (ph === 0) { intro(u); return; }
      [null, bloch, sobel, embed][ph](P, u);
    }
    function set(p) {
      const ph = Math.min(3, Math.floor(p * 4)), tt = Math.min(1, Math.max(0, p * 4 - ph));
      if (ph !== phase) {
        phase = ph; stage.dataset.phase = ph; document.body.classList.toggle('on-steel-f', ph === 3); figLab.textContent = FIG[ph];
        words.forEach((w, i) => { w.classList.toggle('on', i === ph); w.classList.toggle('past', i < ph); });
        caps.forEach((c, i) => c.classList.toggle('on', i === ph));
      }
      ticks.forEach((b, i) => b.style.transform = `scaleX(${i < ph ? 1 : i === ph ? tt : 0})`);
      t = tt; draw();
    }
    addEventListener('resize', size);
    if (document.fonts) document.fonts.ready.then(draw);
    size(); set(0);

    // Static version: one copy of the stage per screen, each drawn at its finished state.
    function stack() { photoReady.then(build); }
    function build() {
      const stages = [stage];
      for (let k = 1; k < 4; k++) {
        set((k + 0.72) / 4);
        const c = stage.cloneNode(true);
        c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
        const k2 = c.querySelector('canvas'); k2.width = cv.width; k2.height = cv.height; k2.getContext('2d').drawImage(cv, 0, 0);
        stages.push(c);
      }
      for (let k = stages.length - 1; k > 0; k--) stage.after(stages[k]);
      phase = -1; set(0.72 / 4); document.body.classList.remove('on-steel-f');
      stages.slice(1).forEach(c => c.querySelectorAll('.f-ticks').forEach(t => t.remove()));
      stage.querySelector('.f-ticks').remove();
    }
    return { set, size, stack };
  })();

  // copy email
  $('copy').addEventListener('click', () => {
    const b = $('copy'), t = $('email').textContent;
    const fallback = () => { const r = document.createRange(); r.selectNodeContents($('email')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected'; $('copystat').textContent = 'Email address selected'; };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => { b.textContent = 'Copied'; $('copystat').textContent = 'Email address copied'; setTimeout(() => b.textContent = 'Copy email', 1500); }, fallback); else fallback();
  });

  /* ---------- motion ---------- */
  const reduce = RM;
  if (reduce) {
    $('over').style.opacity = 1;
    fields.stack();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // smooth scroll
  let lenis = null;
  {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const id = a.getAttribute('href'); const t = id.length > 1 && document.querySelector(id); if (t) { e.preventDefault(); lenis.scrollTo(t); } }));
  }

  // cursor: a small square that grows into a link marker over anything clickable
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const c = document.createElement('div'); c.className = 'cur'; c.setAttribute('aria-hidden', 'true'); document.body.appendChild(c);
    const qx = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' }), qy = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); });
    document.querySelectorAll('a, button').forEach(a => { a.addEventListener('pointerenter', () => c.classList.add('big')); a.addEventListener('pointerleave', () => c.classList.remove('big')); });
  }

  // 1. hero: the name widens and parts while the lattice cools and brightens, then a line of copy lands
  const l1 = $('l1'), l2 = $('l2'), hv = { p: 0 };
  const htl = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=130%', scrub: 0.6, pin: true } });
  htl.to([l1, l2], { fontVariationSettings: '"wdth" 125', duration: 0.5, ease: 'none' }, 0)
     .to(l1, { xPercent: -45, duration: 1, ease: 'power1.in' }, 0.25)
     .to(l2, { xPercent: 45, duration: 1, ease: 'power1.in' }, 0.25)
     .to(hv, { p: 1, duration: 1.25, ease: 'none', onUpdate: () => ising.set(hv.p) }, 0)
     .fromTo('#over', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.95);

  // 2b. fields: pinned for three screens, one figure per screen
  // Four screens. Each screen's figure finishes 70% of the way through it; when scrolling stops inside
  // the plate, it settles on the nearest finished screen so you never rest between two.
  const fst = ScrollTrigger.create({ trigger: '#fields', start: 'top top', end: '+=400%', pin: true, scrub: true, onUpdate: s => fields.set(Math.min(0.9999, s.progress)), onToggle: s => { if (!s.isActive) document.body.classList.remove('on-steel-f'); }, onRefresh: () => fields.size() });
  const rests = [0, 1, 2, 3].map(k => (k + 0.72) / 4);
  let settling = false;
  ScrollTrigger.addEventListener('scrollEnd', () => {
    if (!lenis || settling || !fst.isActive) return;
    const p = fst.progress; if (p < 0.03 || p > 0.97) return;
    const r = rests.reduce((a, b) => Math.abs(b - p) < Math.abs(a - p) ? b : a);
    const y = fst.start + (fst.end - fst.start) * r;
    if (Math.abs(y - scrollY) < 6) return;
    settling = true; lenis.scrollTo(y, { duration: 0.8, easing: t => 1 - Math.pow(1 - t, 3), onComplete: () => { settling = false; } });
    setTimeout(() => { settling = false; }, 1200);
  });

  // headings rise out of a mask
  gsap.utils.toArray('[data-rise]').forEach(el => gsap.fromTo(el, { yPercent: 105 }, { yPercent: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }));

  // 3. horizontal reel (desktop), vertical stack on small screens
  const mm = gsap.matchMedia();
  mm.add('(min-width: 821px)', () => {
    const track = $('track');
    const dist = () => track.scrollWidth - innerWidth;
    const reel = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#work', start: 'top top', end: () => '+=' + dist(), scrub: 0.8, pin: true, invalidateOnRefresh: true } });
    const inPanel = (el, vars, start = 'left 75%', end = 'left 15%') => gsap.fromTo(el, vars.from, { ...vars.to, ease: 'none', scrollTrigger: { trigger: el.closest('[data-panel]') || el, containerAnimation: reel, start, end, scrub: true } });
    setupPanels(inPanel);
  });
  mm.add('(max-width: 820px)', () => {
    const inPanel = (el, vars) => gsap.fromTo(el, vars.from, { ...vars.to, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: true } });
    setupPanels(inPanel);
  });

  function setupPanels(inPanel) {
    // circuit wires draw, gates drop in
    document.querySelectorAll('#circuit .draw').forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; inPanel(p, { from: { strokeDashoffset: L }, to: { strokeDashoffset: 0 } }); });
    gsap.utils.toArray('#circuit .g').forEach((g, i) => inPanel(g, { from: { opacity: 0, y: -14 }, to: { opacity: 1, y: 0 } }, `left ${70 - i * 4}%`, `left ${40 - i * 3}%`));
    // pipeline strokes draw
    document.querySelectorAll('#pipe .d').forEach(p => { const L = p.getTotalLength ? p.getTotalLength() : 600; p.style.strokeDasharray = L; inPanel(p, { from: { strokeDashoffset: L }, to: { strokeDashoffset: 0 } }); });
    // screenshots: wide image first, then the overlapping one
    document.querySelectorAll('.shots').forEach(g => g.querySelectorAll('.cover').forEach((c, k) => inPanel(c, { from: { scaleX: 1 }, to: { scaleX: 0 } }, `left ${90 - k * 12}%`, `left ${45 - k * 12}%`)));
    // photo wipes open
    document.querySelectorAll('[data-wipe]').forEach(c => inPanel(c, { from: { scaleX: 1 }, to: { scaleX: 0 } }, 'left 100%', 'left 30%'));
    // hexdump scrolls up through the view
    inPanel($('hex'), { from: { yPercent: 25, opacity: .2 }, to: { yPercent: 0, opacity: 1 } });
    // headings widen on entry
    gsap.utils.toArray('.p-text h3').forEach(h => inPanel(h, { from: { fontVariationSettings: '"wdth" 62' }, to: { fontVariationSettings: '"wdth" 80' } }));
  }

  // 4. spec sheet: numbers rise out of their rows
  gsap.utils.toArray('[data-slide]').forEach(el => gsap.fromTo(el, { yPercent: 100 }, { yPercent: 0, ease: 'power3.out', scrollTrigger: { trigger: el.parentElement, start: 'top 92%', end: 'top 60%', scrub: 0.5 } }));

  // 3b. wins: covers lift off the photos, then the photos drift at different rates inside their frames
  gsap.utils.toArray('.win').forEach(w => {
    gsap.fromTo(w.querySelector('.cover'), { scaleY: 1 }, { scaleY: 0, duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: w, start: 'top 80%', toggleActions: 'play none none reverse' } });
    gsap.fromTo(w.querySelector('img'), { yPercent: -(+w.dataset.par) }, { yPercent: +w.dataset.par, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // 5. stacking cards: each one shrinks and dims as the next arrives
  const cards = gsap.utils.toArray('.card');
  cards.forEach((c, i) => {
    if (i === cards.length - 1) return;
    gsap.to(c, { scale: 0.94, filter: 'brightness(0.55)', ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 20%', scrub: true } });
  });

  gsap.utils.toArray('.lrow .role').forEach(r => gsap.fromTo(r, { fontVariationSettings: '"wdth" 62' }, { fontVariationSettings: '"wdth" 100', ease: 'none', scrollTrigger: { trigger: r, start: 'top 95%', end: 'top 55%', scrub: true } }));

  // 6. type rows move with scroll, opposite directions
  gsap.utils.toArray('.trow').forEach(r => { const d = +r.dataset.dir; gsap.fromTo(r, { xPercent: d < 0 ? 0 : -30 }, { xPercent: d < 0 ? -30 : 0, ease: 'none', scrollTrigger: { trigger: '.rows', start: 'top bottom', end: 'bottom top', scrub: true } }); });

  // 8. the steel sign-off opens as a circle from the bottom edge
  gsap.fromTo('.contact', { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 15%', scrub: true } });
  ScrollTrigger.create({ trigger: '.contact', start: 'top 40px', end: 'bottom top', toggleClass: { targets: document.body, className: 'on-steel' } });
  // sign-off lines slide in from opposite sides
  gsap.fromTo('.contact .big span:first-child', { xPercent: -12 }, { xPercent: 0, scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 30%', scrub: true } });
  gsap.fromTo('.contact .big .s2', { xPercent: 12 }, { xPercent: 0, scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 30%', scrub: true } });

  if (document.readyState === 'complete') ScrollTrigger.refresh();
  else addEventListener('load', () => ScrollTrigger.refresh());
}
