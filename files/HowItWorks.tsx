'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: 1,
    title: 'Identifie la panne',
    desc: 'Notre diagnostic en 3 questions trouve la bonne pièce pour ton modèle.',
  },
  {
    num: 2,
    title: 'Reçois ta pièce',
    desc: 'Livraison express depuis notre atelier de Metz. Pièce testée, garantie.',
  },
  {
    num: 3,
    title: 'Répare avec nos tutos',
    desc: "Vidéo pas-à-pas incluse. Besoin d'aide ? Appelle un tech en visio.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pas besoin d'être un expert. On t'accompagne de A à Z.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-500 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
