import { useEffect, useRef } from 'react';

export function ProfessionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle ambient network data points
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 45);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Clean deep dark obsidian cybersecurity background
      ctx.fillStyle = '#070a08';
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle ambient emerald & mint depth illumination
      const radialGlow1 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        20,
        width * 0.8,
        height * 0.2,
        width * 0.5
      );
      radialGlow1.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      radialGlow1.addColorStop(0.5, 'rgba(5, 150, 105, 0.03)');
      radialGlow1.addColorStop(1, 'rgba(7, 10, 8, 0)');
      ctx.fillStyle = radialGlow1;
      ctx.fillRect(0, 0, width, height);

      const radialGlow2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.7,
        30,
        width * 0.2,
        height * 0.7,
        width * 0.45
      );
      radialGlow2.addColorStop(0, 'rgba(132, 204, 22, 0.05)');
      radialGlow2.addColorStop(0.6, 'rgba(6, 78, 59, 0.02)');
      radialGlow2.addColorStop(1, 'rgba(7, 10, 8, 0)');
      ctx.fillStyle = radialGlow2;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle connecting security network telemetry lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        ctx.fillStyle = `rgba(52, 211, 153, ${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes with faint telemetry trace
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 130) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Precision micro-grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
