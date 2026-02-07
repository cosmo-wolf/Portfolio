import { useEffect, useState, useRef } from 'react';

const DOT_SIZE = 6;
const TRAIL_SIZE = 32;
const TRAIL_SMOOTH = 0.12;

export default function SpotlightCursor() {
  const positionRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const trailRef = useRef({ x: -1000, y: -1000 });
  const [trail, setTrail] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    document.body.classList.add('cursor-none');

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove('cursor-none');
    };
  }, [isTouch, isVisible]);

  // Single RAF loop: trailing circle lerps toward cursor for smooth float
  useEffect(() => {
    if (isTouch) return;

    let rafId: number;

    const updateTrail = () => {
      const pos = positionRef.current;
      const tx = trailRef.current.x;
      const ty = trailRef.current.y;
      const dx = pos.x - tx;
      const dy = pos.y - ty;
      trailRef.current = {
        x: tx + dx * TRAIL_SMOOTH,
        y: ty + dy * TRAIL_SMOOTH,
      };
      setTrail({ ...trailRef.current });
      rafId = requestAnimationFrame(updateTrail);
    };

    rafId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(rafId);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Minimalist dot - follows cursor directly */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-normal"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          transform: `translate(${position.x - DOT_SIZE / 2}px, ${position.y - DOT_SIZE / 2}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
        }}
      />
      {/* Trailing circle - smooth, floating behind */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white/30 bg-white/5"
        style={{
          width: TRAIL_SIZE,
          height: TRAIL_SIZE,
          transform: `translate(${trail.x - TRAIL_SIZE / 2}px, ${trail.y - TRAIL_SIZE / 2}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
          willChange: 'transform',
        }}
      />
    </>
  );
}
