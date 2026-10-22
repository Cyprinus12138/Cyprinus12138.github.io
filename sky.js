/* A small, entirely procedural evening sky. No textures or network requests. */
(() => {
  'use strict';

  const canvas = document.getElementById('sky-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return; // The stage's CSS gradient remains a useful fallback.

  const stage = canvas.closest('.sky-stage') || canvas.parentElement;
  const toggle = document.getElementById('motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const storageKey = 'sky-motion-paused';
  const frameInterval = 1000 / 30;
  let storedPreference = null;
  try { storedPreference = localStorage.getItem(storageKey); } catch (_) { /* Private browsing. */ }
  let paused = reducedMotion.matches || storedPreference === 'true';
  let inView = true;
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let atmosphere;
  let clouds = [];
  let stars = [];
  let frameId = 0;
  let resizeTimer = 0;
  let previousFrame = 0;
  let previousDraw = 0;
  let elapsed = 0;
  let meteor = null;
  let nextMeteor = 11;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, amount) => a + (b - a) * amount;
  const smoothstep = (a, b, value) => {
    const t = clamp((value - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  function randomGenerator(seed) {
    return () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  // Value noise is evaluated only while constructing a small cached cloud map.
  function noiseGenerator(seed) {
    const random = randomGenerator(seed);
    const values = new Float32Array(256 * 256);
    for (let i = 0; i < values.length; i += 1) values[i] = random();
    return (x, y) => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);
      const x0 = ix & 255;
      const x1 = (ix + 1) & 255;
      const y0 = (iy & 255) * 256;
      const y1 = ((iy + 1) & 255) * 256;
      return lerp(lerp(values[y0 + x0], values[y0 + x1], sx),
        lerp(values[y1 + x0], values[y1 + x1], sx), sy);
    };
  }

  function makeCanvas(w, h) {
    const layer = document.createElement('canvas');
    layer.width = Math.ceil(w);
    layer.height = Math.ceil(h);
    return layer;
  }

  function ellipseGlow(ctx, x, y, rx, ry, stops) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx, ry);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    stops.forEach(([position, color]) => glow.addColorStop(position, color));
    ctx.fillStyle = glow;
    ctx.fillRect(-1, -1, 2, 2);
    ctx.restore();
  }

  function buildAtmosphere() {
    const layer = makeCanvas(width, height);
    const ctx = layer.getContext('2d');
    const mobile = width <= 800;
    const base = ctx.createLinearGradient(width * 0.48, 0, width * 0.36, height);
    base.addColorStop(0, '#080f29');
    base.addColorStop(0.30, '#101830');
    base.addColorStop(0.58, '#171c35');
    base.addColorStop(0.83, '#222038');
    base.addColorStop(1, '#0d1528');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    // The remaining warmth belongs to the figures. Leave the title's sky
    // almost unlit, especially above the illustration in the mobile layout.
    ellipseGlow(ctx, width * (mobile ? .40 : .22), height * (mobile ? .79 : .75),
      width * (mobile ? .74 : .40), height * (mobile ? .22 : .34), [
      [0, 'rgba(235, 123, 76, .72)'], [.28, 'rgba(203, 84, 87, .46)'],
      [.64, 'rgba(119, 53, 91, .18)'], [1, 'rgba(76, 36, 103, 0)']
    ]);
    ellipseGlow(ctx, width * (mobile ? .37 : .21), height * (mobile ? .82 : .81),
      width * (mobile ? .58 : .31), height * (mobile ? .14 : .21), [
      [0, 'rgba(255, 191, 110, .80)'], [.28, 'rgba(240, 140, 79, .52)'],
      [.65, 'rgba(214, 92, 88, .15)'], [1, 'rgba(213, 66, 94, 0)']
    ]);

    // A distant, nearly invisible coast grounds the composition without
    // competing with the foreground illustration.
    const coast = ctx.createLinearGradient(0, height * 0.91, 0, height);
    coast.addColorStop(0, 'rgba(8, 17, 32, 0)');
    coast.addColorStop(.48, 'rgba(8, 17, 32, .34)');
    coast.addColorStop(1, '#080e20');
    ctx.fillStyle = coast;
    ctx.fillRect(0, height * 0.91, width, height * 0.09);
    return layer;
  }

  function buildCloudLayer(seed, level) {
    const w = Math.round(clamp(width * 0.64, 480, 1100));
    const h = Math.round(clamp(height * 0.44, 280, 420));
    const layer = makeCanvas(w, h);
    const ctx = layer.getContext('2d');
    const pixels = ctx.createImageData(w, h);
    const noise = noiseGenerator(seed);
    const data = pixels.data;

    for (let y = 0; y < h; y += 1) {
      const ny = y / h;
      for (let x = 0; x < w; x += 1) {
        const nx = x / w;
        // Stretched, gently tilted strata give the sunset long wispy clouds.
        const warp = noise(nx * 3.2 + 13, ny * 3.8 + 7);
        const u = nx * (5.6 + level) + warp * 0.55;
        const v = ny * (28 + level * 7) - nx * 4.1 + warp * 1.7;
        const broad = noise(u, v);
        const fine = noise(u * 2.12 + 5, v * 2.12 + 31);
        const detail = noise(u * 4.3 + 17, v * 4.3 + 11);
        const field = broad * .64 + fine * .26 + detail * .10;
        const cover = smoothstep(.27, .75, noise(nx * 3.6 + 49, ny * 2.3 + 11));
        const density = smoothstep(.48 + level * .018, .79, field) * cover;
        const middle = smoothstep(.02, .25, ny) * (1 - smoothstep(.78, 1, ny));
        const edge = smoothstep(0, .07, nx) * (1 - smoothstep(.93, 1, nx));
        const warm = clamp((1 - nx) * .8 + ny * .44 - .2, 0, 1);
        const highlight = smoothstep(.60, .84, field) * warm;
        const i = (y * w + x) * 4;
        data[i] = Math.round(lerp(104, 225, warm) + highlight * 22);
        data[i + 1] = Math.round(lerp(72, 104, warm) + highlight * 22);
        data[i + 2] = Math.round(lerp(154, 118, warm));
        data[i + 3] = Math.round(density * middle * edge * (level === 0 ? 95 : 70));
      }
    }
    ctx.putImageData(pixels, 0, 0);
    return { image: layer, level };
  }

  function buildStars() {
    const random = randomGenerator(481516);
    const mobile = width <= 800;
    const count = Math.round(clamp(width * height / 9800, 48, 145));
    const result = [];
    for (let i = 0; i < count; i += 1) {
      const x = random();
      // A slight downward bias leaves more breathing room in the upper sky.
      const y = .06 + Math.pow(random(), .65) * .73;
      // Stars disappear naturally into the bright western dusk.
      const darkness = clamp(.90 - y * .94 + x * .43, .08, 1);
      if (random() > darkness) continue;
      const upperQuiet = lerp(mobile ? .10 : .28, 1, smoothstep(.40, .65, y));
      const textQuiet = !mobile && x > .51 && y > .17 && y < .68 ? .28 : 1;
      result.push({
        x, y,
        radius: .32 + Math.pow(random(), 3) * .76,
        alpha: (.23 + random() * .38) * darkness * upperQuiet * textQuiet,
        phase: random() * Math.PI * 2,
        speed: .35 + random() * .55,
        warm: random() > .78,
        cross: false
      });
    }
    // One guiding star above the figures, away from both text compositions.
    result.push({
      x: mobile ? .84 : .40,
      y: mobile ? .58 : .32,
      radius: 1.1,
      alpha: .53,
      phase: 0,
      speed: .48,
      warm: true,
      cross: true
    });
    return result;
  }

  function drawStars(time) {
    stars.forEach(star => {
      const x = star.x * width + pointer.x * (star.cross ? 3 : 1.5);
      const y = star.y * height + pointer.y * (star.cross ? 3 : 1.5);
      const twinkle = .78 + Math.sin(time * star.speed + star.phase) * .22;
      context.globalAlpha = star.alpha * twinkle;
      context.fillStyle = star.warm ? '#ffe4bf' : '#d8e5ff';
      context.beginPath();
      context.arc(x, y, star.radius, 0, Math.PI * 2);
      context.fill();
      if (star.cross) {
        const length = star.radius * (4.5 + twinkle);
        context.globalAlpha = star.alpha * twinkle * .58;
        context.beginPath();
        context.moveTo(x, y - length);
        context.quadraticCurveTo(x + .8, y - .8, x + length * .7, y);
        context.quadraticCurveTo(x + .8, y + .8, x, y + length);
        context.quadraticCurveTo(x - .8, y + .8, x - length * .7, y);
        context.quadraticCurveTo(x - .8, y - .8, x, y - length);
        context.fill();
      }
    });
    context.globalAlpha = 1;
  }

  function drawMeteor(time) {
    if (time >= nextMeteor && !meteor) {
      const mobile = width <= 800;
      meteor = {
        start: time,
        x: width * (mobile ? .75 + Math.random() * .12 : .28 + Math.random() * .14),
        y: height * (mobile ? .60 + Math.random() * .05 : .11 + Math.random() * .10),
        distance: clamp(width * .13, 70, 160),
        duration: 1.25 + Math.random() * .35
      };
      nextMeteor = time + 10 + Math.random() * 8;
    }
    if (!meteor) return;
    const progress = (time - meteor.start) / meteor.duration;
    if (progress >= 1) {
      meteor = null;
      return;
    }
    const x = meteor.x - meteor.distance * progress;
    const y = meteor.y + meteor.distance * progress * .44;
    const tail = Math.min(progress * meteor.distance, 44);
    const opacity = Math.sin(Math.PI * progress) * .38;
    const gradient = context.createLinearGradient(x, y, x + tail, y - tail * .44);
    gradient.addColorStop(0, `rgba(247, 237, 219, ${opacity})`);
    gradient.addColorStop(.18, `rgba(208, 216, 255, ${opacity * .64})`);
    gradient.addColorStop(1, 'rgba(208, 216, 255, 0)');
    context.strokeStyle = gradient;
    context.lineWidth = 1.1;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + tail, y - tail * .44);
    context.stroke();
  }

  function draw(time) {
    if (!atmosphere) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.globalAlpha = 1;
    context.drawImage(atmosphere, 0, 0, width, height);
    drawStars(time);

    const mobile = width <= 800;
    clouds.forEach(({ image, level }) => {
      const drift = Math.sin(time * (.015 + level * .006) + level * 1.6) * (16 + level * 8);
      const y = height * (mobile ? .63 + level * .09 : .48 + level * .12)
        + Math.sin(time * .012 + level) * 3;
      context.globalAlpha = level === 0 ? .43 : .30;
      context.drawImage(image, -width * .09 + drift + pointer.x * (3 + level),
        y + pointer.y * 2, width * (mobile ? 1.18 : .82),
        height * (mobile ? .28 - level * .06 : .42 - level * .09));
    });
    context.globalAlpha = 1;
    if (!paused) drawMeteor(time);
  }

  function canAnimate() {
    return !paused && !document.hidden && inView;
  }

  function tick(now) {
    frameId = 0;
    if (!canAnimate()) return;
    if (!previousFrame) previousFrame = previousDraw = now;
    const delta = now - previousFrame;
    if (delta >= frameInterval) {
      // Hidden/offscreen time never turns into an animation jump on return.
      elapsed += Math.min(now - previousDraw, 100) / 1000;
      previousDraw = now;
      previousFrame = now - (delta % frameInterval);
      pointer.x += (pointer.targetX - pointer.x) * .035;
      pointer.y += (pointer.targetY - pointer.y) * .035;
      draw(elapsed);
    }
    frameId = requestAnimationFrame(tick);
  }

  function syncAnimation() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    previousFrame = 0;
    previousDraw = 0;
    if (canAnimate()) frameId = requestAnimationFrame(tick);
  }

  function publishMotionState() {
    if (toggle) toggle.setAttribute('aria-pressed', String(paused));
    stage.dataset.motion = paused ? 'paused' : 'playing';
    window.dispatchEvent(new CustomEvent('sky-motion-change', { detail: { paused } }));
  }

  function setPaused(value, persist) {
    paused = value;
    meteor = null;
    if (persist) {
      try { localStorage.setItem(storageKey, String(paused)); } catch (_) { /* No storage. */ }
    }
    publishMotionState();
    draw(elapsed);
    syncAnimation();
  }

  function resize() {
    const bounds = stage.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(bounds.width));
    const nextHeight = Math.max(1, Math.round(bounds.height));
    const nextRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    if (atmosphere && width === nextWidth && height === nextHeight && pixelRatio === nextRatio) return;
    width = nextWidth;
    height = nextHeight;
    pixelRatio = nextRatio;
    canvas.width = Math.ceil(width * pixelRatio);
    canvas.height = Math.ceil(height * pixelRatio);
    atmosphere = buildAtmosphere();
    clouds = [buildCloudLayer(1729, 0), buildCloudLayer(7385, 1)];
    stars = buildStars();
    meteor = null;
    draw(elapsed);
    syncAnimation();
  }

  function scheduleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  }

  if (toggle) toggle.addEventListener('click', () => setPaused(!paused, true));
  document.addEventListener('visibilitychange', syncAnimation);
  reducedMotion.addEventListener('change', event => {
    // A change made in the operating system should take effect immediately.
    if (event.matches) setPaused(true, false);
  });
  stage.addEventListener('pointermove', event => {
    if (paused || !finePointer.matches) return;
    const bounds = stage.getBoundingClientRect();
    pointer.targetX = clamp(((event.clientX - bounds.left) / width - .5) * 2, -1, 1);
    pointer.targetY = clamp(((event.clientY - bounds.top) / height - .5) * 2, -1, 1);
  }, { passive: true });
  stage.addEventListener('pointerleave', () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleResize).observe(stage);
  }
  window.addEventListener('resize', scheduleResize, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncAnimation();
    }, { rootMargin: '50px', threshold: 0 }).observe(stage);
  }
  resize();
  publishMotionState();
})();
