'use client';

import React from 'react';
import { MapPin, Truck, CheckCircle, Video } from 'lucide-react';

const trustItems = [
  { icon: MapPin, text: 'Atelier à Metz depuis 2011' },
  { icon: Truck, text: 'Livraison 24h' },
  { icon: CheckCircle, text: 'Label QualiRepar' },
  { icon: Video, text: 'Aide visio 29€' },
];

export default function TrustBar() {
  return (
    <section className="py-6 border-y border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
          {trustItems.map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-cyan-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
