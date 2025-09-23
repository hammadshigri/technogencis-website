'use client';

import { PropsWithChildren } from 'react';

export function AvatarCard({ name, title }: { name: string; title: string }) {
  return (
    <div className="rounded-xl border p-4 relative overflow-hidden group">
      <div className="w-20 h-20 rounded-full bg-muted mb-3 border" />
      <div className="font-medium">{name}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm">
        View Profile
      </div>
    </div>
  );
}

export default AvatarCard;
