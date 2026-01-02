'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Laptop, Gamepad2, Wrench } from 'lucide-react';

const categories = [
  { name: 'Smartphones', icon: Smartphone, count: '8,500+', slug: 'smartphones', color: 'cyan' },
  { name: 'Tablettes', icon: Tablet, count: '2,200+', slug: 'tablettes', color: 'blue' },
  { name: 'Ordinateurs', icon: Laptop, count: '3,100+', slug: 'ordinateurs', color: 'indigo' },
  { name: 'Consoles', icon: Gamepad2, count: '1,400+', slug: 'consoles', color: 'purple' },
  { name: 'Outils', icon: Wrench, count: '450+', slug: 'outils', color: 'orange' },
];

export default function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trouve ta pièce par catégorie
          </h2>
          <p className="text-muted-foreground">Plus de 15 000 références en stock</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/boutique/${cat.slug}`}
                className="group flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:border-cyan-500/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <cat.icon className="w-7 h-7 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                <span className="text-sm text-muted-foreground">{cat.count}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
