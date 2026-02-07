import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { smoothSpring } from '../lib/motion';

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_RADIUS = 120;

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
}

export default function Magnetic({ children, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, smoothSpring);
  const ySpring = useSpring(y, smoothSpring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < MAGNETIC_RADIUS) {
      const pull = 1 - distance / MAGNETIC_RADIUS;
      x.set(distX * MAGNETIC_STRENGTH * pull);
      y.set(distY * MAGNETIC_STRENGTH * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
