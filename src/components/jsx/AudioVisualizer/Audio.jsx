import { useEffect, useRef } from 'react';

export default function AudioVisualizer() {
  const canvasRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const numBars = 64;
    const barWidth = 4;
    const gap = 2;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    barsRef.current = Array.from({ length: numBars }, () => ({
      height: Math.random() * 100 + 20,
      targetHeight: Math.random() * 100 + 20,
      velocity: 0
    }));

    let animationId;
    
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      barsRef.current.forEach((bar, i) => {
        const spring = 0.01;
        const damping = 0.9;
        const force = (bar.targetHeight - bar.height) * spring;
        bar.velocity = (bar.velocity + force) * damping;
        bar.height += bar.velocity;

        if (Math.random() < 0.02) {
          bar.targetHeight = Math.random() * 100 + 20;
        }

        const x = i * (barWidth + gap) + (width - (numBars * (barWidth + gap))) / 2;
        const barHeight = (bar.height / 120) * height * 0.8;
        const y = height / 2 - barHeight / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        
        const intensity = bar.height / 120;
        if (intensity > 0.7) {
          gradient.addColorStop(0, '#ff6b00');
          gradient.addColorStop(0.5, '#ff8533');
          gradient.addColorStop(1, '#ffa366');
        } else if (intensity > 0.4) {
          gradient.addColorStop(0, '#ff8533');
          gradient.addColorStop(0.5, '#ffa366');
          gradient.addColorStop(1, '#ffb380');
        } else {
          gradient.addColorStop(0, '#ffa366');
          gradient.addColorStop(0.5, '#ffb380');
          gradient.addColorStop(1, '#ffc299');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x, y, barWidth, 3);

        ctx.globalAlpha = 0.2;
        const reflectionGradient = ctx.createLinearGradient(x, y + barHeight, x, y + barHeight + 20);
        reflectionGradient.addColorStop(0, '#ff8533');
        reflectionGradient.addColorStop(1, 'rgba(255, 107, 0, 0)');
        ctx.fillStyle = reflectionGradient;
        ctx.fillRect(x, y + barHeight, barWidth, 20);
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-orange-500/10 pointer-events-none blur-xl"></div>
    </div>
  );
}