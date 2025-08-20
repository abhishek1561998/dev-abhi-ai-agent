"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

export default function AIMouseTracker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef(0);
  const [isActive, setIsActive] = useState(false);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!isActive) setIsActive(true);
  }, [isActive]);

  // Create particle with subtle AI-style properties
  const createParticle = useCallback((x: number, y: number) => {
    return {
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      life: 0,
      maxLife: 40 + Math.random() * 20,
      size: 1 + Math.random() * 1.5,
      opacity: 0.4 + Math.random() * 0.3
    };
  }, []);

  // Optimized animation loop
  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Throttle to 60fps
    if (currentTime - lastTimeRef.current < 16.67) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    // Clear canvas with subtle fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add new particles (more subtle)
    if (isActive && Math.random() < 0.08) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98; // Friction
      particle.vy *= 0.98;

      const lifeRatio = particle.life / particle.maxLife;
      const alpha = particle.opacity * (1 - lifeRatio);

      if (alpha > 0.01) {
        // Subtle AI-style glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.6})`);
        gradient.addColorStop(0.7, `rgba(168, 85, 247, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle core particle
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      }
      return false;
    });

    // Draw subtle cursor glow
    if (isActive) {
      const glowSize = 20 + Math.sin(currentTime * 0.003) * 5;
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, glowSize
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.1)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Subtle scanning rings (less frequent)
      if (Math.random() < 0.02) {
        const ringRadius = (currentTime * 0.05) % 30;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 - ringRadius / 100})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Continue animation if particles exist or mouse is active
    if (particlesRef.current.length > 0 || isActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isActive, createParticle]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', updateCanvasSize, { passive: true });

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.5
      }}
    />
  );
}
