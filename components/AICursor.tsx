"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function AICursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef2 = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Optimized mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Handle hover states
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && typeof target.closest === 'function') {
      if (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.classList?.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Handle click states
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Smooth cursor animation
  const animateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // Smooth following with easing
    cursorRef2.current.x += (mouseRef.current.x - cursorRef2.current.x) * 0.15;
    cursorRef2.current.y += (mouseRef.current.y - cursorRef2.current.y) * 0.15;

    // Update cursor position
    cursor.style.transform = `translate(${cursorRef2.current.x - 20}px, ${cursorRef2.current.y - 20}px)`;
    cursorDot.style.transform = `translate(${mouseRef.current.x - 4}px, ${mouseRef.current.y - 4}px)`;

    animationRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Start animation
    animationRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp, animateCursor]);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          mixBlendMode: 'difference'
        }}
      >
        {/* Outer ring */}
        <div className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
          isHovering 
            ? 'border-cyan-400 bg-cyan-400/10' 
            : 'border-white/50'
        } ${isClicking ? 'bg-cyan-400/30' : ''}`}>
          {/* Inner scanning ring */}
          <div className={`absolute inset-1 rounded-full border transition-all duration-300 ${
            isHovering 
              ? 'border-purple-400 animate-spin' 
              : 'border-white/30'
          }`} style={{
            borderStyle: 'dashed',
            animationDuration: '2s'
          }}></div>
          
          {/* Center dot indicators */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
              isHovering ? 'bg-cyan-400 scale-150' : 'bg-white/70'
            }`}></div>
          </div>
        </div>

        {/* AI scanning lines */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -rotate-45 transition-all duration-300 ${
            isHovering ? 'animate-spin' : ''
          }`} style={{
            width: '200%',
            height: '2px',
            top: '50%',
            left: '-50%',
            animationDuration: '1s'
          }}></div>
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-all duration-100 ${
          isClicking ? 'scale-150' : 'scale-100'
        }`}
      >
        <div className={`w-full h-full rounded-full transition-all duration-200 ${
          isHovering 
            ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
            : 'bg-white'
        }`}></div>
      </div>
    </>
  );
}
