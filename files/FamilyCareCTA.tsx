'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Home, Video, BadgeCheck, Shield, ArrowRight } from 'lucide-react';

const features = [
  { icon: Home, title: 'Garage Famille', desc: 'Tous vos appareils' },
  { icon: Video, title: 'Visio Illimitée', desc: 'Accès prioritaire' },
  { icon: BadgeCheck, title: '-15% permanent', desc: 'Sur tout le catalogue' },
  { icon: Shield, title: 'Anti-Casse', desc: 'On finit si vous bloquez' },
];

export default function FamilyCareCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 max-w-5xl mx-auto"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full filter blur-[100px]" />
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-6">
              <Package className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Nouveau : Family Care</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Protégez tous les appareils
              <br />
              de votre foyer
            </h3>

            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Un seul abonnement pour gérer l'état de santé de tous vos appareils. Assistance
              illimitée, remises permanentes, et garantie anti-casse.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {features.map(({ icon: Icon, title, desc }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{title}</div>
                    <div className="text-gray-500 text-xs">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/family-care"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl font-semibold hover:opacity-90 transition glow-cyan"
              >
                Découvrir Family Care
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div>
                <div className="text-2xl font-bold text-white">
                  9,90€<span className="text-base font-normal text-gray-400">/mois</span>
                </div>
                <div className="text-sm text-gray-500">Sans engagement</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
