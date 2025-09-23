'use client';

import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface KpiTileProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function KpiTile({ value, suffix = '', label }: KpiTileProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [started, setStarted] = useState(false);

  if (inView && !started) setStarted(true);

  return (
    <div
      ref={ref}
      className="rounded-xl border p-6 text-center bg-gradient-to-br from-primary/5 to-card"
    >
      <div
        className="text-3xl font-bold text-primary"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {started ? <CountUp end={value} duration={1.4} suffix={suffix} /> : 0}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
