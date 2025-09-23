'use client';

import { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PopIn({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
