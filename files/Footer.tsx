'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, MapPin, Award } from 'lucide-react';

const footerLinks = {
  repair: {
    title: 'Réparer',
    links: [
      { name: 'Pièces iPhone', href: '/boutique/iphone' },
      { name: 'Pièces Samsung', href: '/boutique/samsung' },
      { name: 'Pièces Consoles', href: '/boutique/consoles' },
      { name: 'Outils', href: '/boutique/outils' },
    ],
  },
  learn: {
    title: 'Apprendre',
    links: [
      { name: 'Cours Gratuits', href: '/cours' },
      { name: 'Masterclass', href: '/masterclass' },
      { name: 'Assistance Visio', href: '/visio' },
      { name: 'Certifications', href: '/certifications' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Garantie', href: '/garantie' },
      { name: 'Retours', href: '/retours' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-slate-900" />
              </div>
              <span className="font-bold text-lg">JeRépareMonTelephone</span>
            </div>
            <p className="text-background/60 text-sm mb-4">
              La clinique digitale de vos appareils. Pièces détachées + Formation IA.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Atelier à Metz depuis 2011</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-background/60">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-background transition">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">Label QualiRepar</span>
            </div>
            <span className="text-sm text-background/40">iA-Groupe © 2025</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-background/40">
            <Link href="/cgv" className="hover:text-background transition">
              CGV
            </Link>
            <Link href="/mentions-legales" className="hover:text-background transition">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-background transition">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
