import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
  hasSpikes?: boolean;
  vx: number;
  vy: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export function GalaxySky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Parallax mouse position
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Generate Stars with cosmic drift velocity
    let stars: Star[] = [];
    const starColors = ['#ffffff', '#bae6fd', '#e0e7ff', '#fef08a', '#c084fc', '#38bdf8', '#7dd3fc'];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 4000), 300);
      for (let i = 0; i < count; i++) {
        const radius = Math.random() < 0.82 ? Math.random() * 1.3 + 0.4 : Math.random() * 2.3 + 1.2;
        // Directional cosmic drift: slow diagonal drift across space
        const speed = Math.random() * 0.35 + 0.12;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.035 + 0.01,
          phase: Math.random() * Math.PI * 2,
          hasSpikes: radius > 2.0 && Math.random() > 0.35,
          vx: speed,
          vy: (Math.random() - 0.45) * 0.18,
        });
      }
    };

    initStars();

    // Shooting Stars / Meteors
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (meteors.length < 3) {
        meteors.push({
          x: Math.random() * (width * 0.85) + width * 0.05,
          y: Math.random() * (height * 0.35),
          length: Math.random() * 90 + 60,
          speed: Math.random() * 9 + 7,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          active: true,
        });
      }
    };

    let meteorSpawnTimer = 0;
    let time = 0;

    // Animation Loop
    const render = () => {
      time += 1;

      // Smooth mouse easing for depth parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const parallaxX = (mouseX / width - 0.5) * 25;
      const parallaxY = (mouseY / height - 0.5) * 25;

      ctx.clearRect(0, 0, width, height);

      // 1. Moving & Breathing Deep-Space Cosmic Nebulae
      const nebulaShift1X = Math.sin(time * 0.0008) * (width * 0.08);
      const nebulaShift1Y = Math.cos(time * 0.0007) * (height * 0.06);

      const nebula1 = ctx.createRadialGradient(
        width * 0.72 + nebulaShift1X + parallaxX * 0.4,
        height * 0.28 + nebulaShift1Y + parallaxY * 0.4,
        15,
        width * 0.72 + nebulaShift1X,
        height * 0.28 + nebulaShift1Y,
        width * 0.55
      );
      nebula1.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      nebula1.addColorStop(0.35, 'rgba(99, 102, 241, 0.09)');
      nebula1.addColorStop(0.7, 'rgba(147, 51, 234, 0.04)');
      nebula1.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebulaShift2X = Math.cos(time * 0.0006) * (width * 0.07);
      const nebulaShift2Y = Math.sin(time * 0.0008) * (height * 0.05);

      const nebula2 = ctx.createRadialGradient(
        width * 0.22 + nebulaShift2X - parallaxX * 0.3,
        height * 0.58 + nebulaShift2Y - parallaxY * 0.3,
        25,
        width * 0.22 + nebulaShift2X,
        height * 0.58 + nebulaShift2Y,
        width * 0.5
      );
      nebula2.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      nebula2.addColorStop(0.4, 'rgba(30, 58, 138, 0.08)');
      nebula2.addColorStop(0.8, 'rgba(14, 165, 233, 0.03)');
      nebula2.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 2. Continuous Moving Sun (Orbital Celestial Trajectory)
      // The sun glides smoothly along an orbital path across the sky
      const sunSpeed = 0.00045;
      const sunAngle = time * sunSpeed;
      const sunOrbitRadiusX = width * 0.38;
      const sunOrbitRadiusY = height * 0.12;
      const sunBaseCenterX = width * 0.52;
      const sunBaseCenterY = height * 0.22;

      const sunX = sunBaseCenterX + Math.cos(sunAngle) * sunOrbitRadiusX + parallaxX * 0.6;
      const sunY = sunBaseCenterY + Math.sin(sunAngle * 2) * sunOrbitRadiusY + parallaxY * 0.6;
      const sunRadius = Math.min(width * 0.032, 40);

      // Pulsing Sun Corona Flare
      const coronaPulse = 1 + 0.08 * Math.sin(time * 0.03);
      const coronaGradient = ctx.createRadialGradient(
        sunX,
        sunY,
        sunRadius * 0.4,
        sunX,
        sunY,
        sunRadius * 4.6 * coronaPulse
      );
      coronaGradient.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      coronaGradient.addColorStop(0.2, 'rgba(251, 191, 36, 0.5)');
      coronaGradient.addColorStop(0.45, 'rgba(56, 189, 248, 0.28)');
      coronaGradient.addColorStop(0.75, 'rgba(99, 102, 241, 0.12)');
      coronaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coronaGradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 4.6 * coronaPulse, 0, Math.PI * 2);
      ctx.fill();

      // Radiant Core of Sun
      const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.35, '#fef08a');
      sunCore.addColorStop(0.75, '#f59e0b');
      sunCore.addColorStop(1, '#0284c7');
      ctx.fillStyle = sunCore;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Solar Rays Spikes
      const rayAngle = time * 0.006;
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(rayAngle);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.38)';
      ctx.lineWidth = 1.6;

      const rayLength = sunRadius * (3.2 + 0.4 * Math.sin(time * 0.04));
      ctx.beginPath();
      // Primary 4-point cross
      ctx.moveTo(-rayLength, 0);
      ctx.lineTo(rayLength, 0);
      ctx.moveTo(0, -rayLength);
      ctx.lineTo(0, rayLength);
      // Secondary 45-deg cross
      const diagRay = rayLength * 0.65;
      ctx.moveTo(-diagRay, -diagRay);
      ctx.lineTo(diagRay, diagRay);
      ctx.moveTo(-diagRay, diagRay);
      ctx.lineTo(diagRay, -diagRay);
      ctx.stroke();
      ctx.restore();

      // 3. Continuous Moving Crescent Moon (Complementary Celestial Orbit)
      // Moving in harmony opposite to the sun along its cosmic arc
      const moonAngle = sunAngle + Math.PI;
      const moonX = sunBaseCenterX + Math.cos(moonAngle) * sunOrbitRadiusX - parallaxX * 0.5;
      const moonY = sunBaseCenterY + Math.sin(moonAngle * 2 + Math.PI * 0.5) * sunOrbitRadiusY - parallaxY * 0.5;
      const moonRadius = Math.min(width * 0.026, 32);

      // Moon Glowing Atmospheric Halo
      const moonPulse = 1 + 0.06 * Math.cos(time * 0.025);
      const moonHalo = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.7,
        moonX,
        moonY,
        moonRadius * 3.2 * moonPulse
      );
      moonHalo.addColorStop(0, 'rgba(224, 242, 254, 0.55)');
      moonHalo.addColorStop(0.35, 'rgba(186, 230, 253, 0.25)');
      moonHalo.addColorStop(0.7, 'rgba(96, 165, 250, 0.09)');
      moonHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 3.2 * moonPulse, 0, Math.PI * 2);
      ctx.fill();

      // Draw Detailed Glowing Crescent Moon
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2, false);
      ctx.fillStyle = '#f8fafc';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 20;
      ctx.fill();

      // Cut out inner body to sculpt crescent
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(moonX + moonRadius * 0.52, moonY - moonRadius * 0.22, moonRadius * 0.88, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();

      // Craters on illuminated crescent rim
      ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.3, moonY - moonRadius * 0.1, moonRadius * 0.14, 0, Math.PI * 2);
      ctx.arc(moonX - moonRadius * 0.4, moonY + moonRadius * 0.3, moonRadius * 0.16, 0, Math.PI * 2);
      ctx.fill();

      // 4. Moving Galaxy Star Stream
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Star cosmic drift movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen boundaries seamlessly
        if (star.x > width + 20) star.x = -20;
        if (star.x < -20) star.x = width + 20;
        if (star.y > height + 20) star.y = -20;
        if (star.y < -20) star.y = height + 20;

        // Twinkle
        star.phase += star.twinkleSpeed;
        const currentAlpha = 0.3 + 0.7 * Math.abs(Math.sin(star.phase));

        const sx = star.x + parallaxX * (star.radius * 0.2);
        const sy = star.y + parallaxY * (star.radius * 0.2);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point cross spikes on prominent stars
        if (star.hasSpikes && currentAlpha > 0.6) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.7;
          const spikeLen = star.radius * 3.6;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;

      // 5. Shooting Stars / Meteors Update & Draw
      meteorSpawnTimer++;
      if (meteorSpawnTimer > 150) {
        spawnMeteor();
        meteorSpawnTimer = 0;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        meteorGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        meteorGrad.addColorStop(0.65, `rgba(224, 242, 254, ${m.alpha * 0.65})`);
        meteorGrad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha})`);

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Glowing meteor core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Advance
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.013;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
