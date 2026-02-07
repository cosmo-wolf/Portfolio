import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DOT_SIZE = 6;
const TRAIL_SIZE = 32;

/** Spring for trailing circle: buttery smooth, no sharp feel */
const cursorSpring = { stiffness: 150, damping: 30 };

export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const trailX = useMotionValue(-1000);
  const trailY = useMotionValue(-1000);
  const trailXSpring = useSpring(trailX, cursorSpring);
  const trailYSpring = useSpring(trailY, cursorSpring);
  const trailDisplayX = useTransform(trailXSpring, (v) => v - TRAIL_SIZE / 2);
  const trailDisplayY = useTransform(trailYSpring, (v) => v - TRAIL_SIZE / 2);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      trailX.set(e.clientX);
      trailY.set(e.clientY);
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
  }, [isTouch, isVisible, trailX, trailY]);

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
      {/* Trailing circle - Framer Motion spring (stiffness 150, damping 30) for smooth follow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white/30 bg-white/5"
        style={{
          width: TRAIL_SIZE,
          height: TRAIL_SIZE,
          x: trailDisplayX,
          y: trailDisplayY,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />
    </>
  );
}
