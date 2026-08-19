import React, { useEffect, useRef } from 'react';

const Globe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    const points = [];
    const numPoints = 120;
    const radius = 150;

    // Generate coordinates on a sphere
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        color: Math.random() > 0.4 ? '#0891b2' : '#4f46e5', // cyan / indigo (light theme optimized)
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      angleY = deltaX * 0.01;
      angleX = deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const rotateX = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = point.y * cos - point.z * sin;
      const z = point.y * sin + point.z * cos;
      return { ...point, y, z };
    };

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      return { ...point, x, z };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Light Sphere ambient glow
      const glowGrad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, radius + 40);
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      glowGrad.addColorStop(0.8, 'rgba(99, 102, 241, 0.04)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(width/2, height/2, radius + 40, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Reset velocity to auto rotation
      if (!isDragging) {
        angleX += (0.001 - angleX) * 0.05;
        angleY += (0.003 - angleY) * 0.05;
      }

      // Rotate and project points
      const projected = points.map((p, index) => {
        let rotated = rotateX(p, angleX);
        rotated = rotateY(rotated, angleY);
        points[index] = rotated;

        const fov = 350;
        const scale = fov / (fov + rotated.z);
        const projX = rotated.x * scale + width / 2;
        const projY = rotated.y * scale + height / 2;

        return { x: projX, y: projY, z: rotated.z, color: rotated.color };
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.08)'; // Darker link lines for light theme visibility
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          if (p1.z < 0 && p2.z < 0) {
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw points
      projected.forEach((p) => {
        const alpha = Math.min(1, Math.max(0.15, (radius - p.z) / (radius * 2)));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.z < 0 ? 3.5 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto', cursor: 'grab' }}>
      <canvas ref={canvasRef} style={{ display: 'block', borderRadius: '50%' }} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          borderRadius: '50%',
          pointerEvents: 'none',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.05) inset',
        }}
      />
    </div>
  );
};

export default Globe;
