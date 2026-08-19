import React, { useEffect, useRef } from 'react';

const ThreeDCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle settings
    const particleCount = Math.min(60, Math.floor((width * height) / 20000));
    const particles = [];
    const connectionDistance = 150;

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      radius: 200,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width; // 3D depth
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#4f46e5' : '#0891b2'; // indigo / cyan
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Wrap around in 3D
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (this.z < 0 || this.z > width) this.vz *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= dx * force * 0.015;
            this.y -= dy * force * 0.015;
          }
        }
      }

      draw(ctx) {
        const fov = 350;
        const scale = fov / (fov + this.z * 0.25);
        const projX = (this.x - width / 2) * scale + width / 2;
        const projY = (this.y - height / 2) * scale + height / 2;
        const projR = this.radius * scale;

        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.5, projR), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.min(0.6, Math.max(0.05, scale * 0.4));
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // Draw connections
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const fov = 350;
          const scale1 = fov / (fov + p1.z * 0.25);
          const scale2 = fov / (fov + p2.z * 0.25);
          const x1 = (p1.x - width / 2) * scale1 + width / 2;
          const y1 = (p1.y - height / 2) * scale1 + height / 2;
          const x2 = (p2.x - width / 2) * scale2 + width / 2;
          const y2 = (p2.y - height / 2) * scale2 + height / 2;

          const dist = Math.hypot(x2 - x1, y2 - y1);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - dist / connectionDistance) * 1.0;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent', /* Changed to transparent so body background controls theme color */
      }}
    />
  );
};

export default ThreeDCanvas;
