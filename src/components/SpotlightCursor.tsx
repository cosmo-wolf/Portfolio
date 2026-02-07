import { useEffect, useState } from 'react';

const SPOTLIGHT_SIZE = 280;
const CURSOR_SIZE = 8;

export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
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

  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-cyan-400/80 bg-cyan-400/20 mix-blend-normal transition-transform duration-75"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          transform: `translate(${position.x - CURSOR_SIZE / 2}px, ${position.y - CURSOR_SIZE / 2}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Spotlight circle - inverts colors underneath */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-transform duration-100"
        style={{
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          transform: `translate(${position.x - SPOTLIGHT_SIZE / 2}px, ${position.y - SPOTLIGHT_SIZE / 2}px)`,
          opacity: isVisible ? 1 : 0,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          mixBlendMode: 'difference',
          boxShadow: '0 0 80px 40px rgba(34, 211, 238, 0.12)',
        }}
      />
    </>
  );
}
