import { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  durationMs?: number;
}

export function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.12,
  direction = 'up',
  durationMs = 700,
}: RevealOnScrollProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    delayMs,
    rootMargin: '0px 0px -40px 0px',
    freezeOnceVisible: true,
  });

  const getTransformStyle = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 36px, 0) scale(0.98)';
      case 'down':
        return 'translate3d(0, -36px, 0) scale(0.98)';
      case 'left':
        return 'translate3d(36px, 0, 0) scale(0.98)';
      case 'right':
        return 'translate3d(-36px, 0, 0) scale(0.98)';
      case 'none':
        return 'translate3d(0, 0, 0) scale(0.98)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyle(),
        transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
