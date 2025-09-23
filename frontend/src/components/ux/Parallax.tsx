'use client';

import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

// Ensure client-only rendering (avoids SSR/no-window issues)
const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then((m) => m.ParallaxProvider),
  { ssr: false }
);
const Parallax = dynamic(
  () => import('react-scroll-parallax').then((m) => m.Parallax),
  { ssr: false }
);

export function ParallaxWrapper({ children }: PropsWithChildren<{}>) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}

export function ParallaxItem({
  children,
  y = [-15, 15],
  className,
}: PropsWithChildren<{ y?: [number, number]; className?: string }>) {
  return (
    <Parallax translateY={y} className={className}>
      {children}
    </Parallax>
  );
}

export default ParallaxWrapper;
