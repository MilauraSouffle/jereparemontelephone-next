'use client';

import React from 'react';

interface MarqueeBandProps {
  text: string;
  reverse?: boolean;
}

export default function MarqueeBand({ text, reverse = false }: MarqueeBandProps) {
  const content = Array(10).fill(text).join(' ✦ ');

  return (
    <div className="bg-foreground py-4 overflow-hidden">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className="text-background text-sm font-semibold tracking-[0.2em] uppercase mx-4">
          {content} ✦
        </span>
        <span className="text-background text-sm font-semibold tracking-[0.2em] uppercase mx-4">
          {content} ✦
        </span>
      </div>
    </div>
  );
}
