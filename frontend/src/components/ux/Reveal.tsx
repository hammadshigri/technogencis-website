'use client';

import { ComponentProps, PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type MotionDivProps = ComponentProps<typeof motion.div>;

type RevealProps = PropsWithChildren<
  MotionDivProps & {
    delay?: number;
    y?: number;
    once?: boolean;
  }
>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = PropsWithChildren<
  MotionDivProps & {
    className?: string;
    once?: boolean;
    delayChildren?: number;
    staggerChildren?: number;
  }
>;

export function Stagger({
  children,
  className,
  once = true,
  delayChildren = 0.05,
  staggerChildren = 0.06,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = PropsWithChildren<
  MotionDivProps & { className?: string }
>;

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
