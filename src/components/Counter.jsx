import React, { useState, useEffect } from 'react';

const Counter = ({ target, duration = 1500, trigger = false }) => {
  const [count, setCount] = useState(target);

  useEffect(() => {
    // Parse the number from strings like "$420M+", "40+", "99.8%", "65k+"
    const cleanStr = target.replace(/[^0-9.]/g, '');
    const targetValue = parseFloat(cleanStr);
    if (isNaN(targetValue)) {
      setCount(target);
      return;
    }

    const isDecimal = target.includes('.');
    const prefix = target.startsWith('$') ? '$' : '';
    const suffix = target.replace(/[0-9.$]/g, ''); // Extract "M+", "+", "%", "k+"

    if (!trigger) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    let animationFrameId;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = start + easeProgress * (targetValue - start);

      if (isDecimal) {
        setCount(`${prefix}${currentValue.toFixed(1)}${suffix}`);
      } else {
        setCount(`${prefix}${Math.floor(currentValue)}${suffix}`);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, trigger]);

  return <span>{count}</span>;
};

export default Counter;
