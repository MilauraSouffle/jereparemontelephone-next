'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  Wrench,
  GraduationCap,
  Smartphone,
  Tablet,
  Gamepad2,
  MapPin,
  Award,
} from 'lucide-react';

/**
 * HERO "CURTAIN REVEAL" - JeRépareMonTelephone.fr
 *
 * Comportement :
 * 1. À l'arrivée : Image plein écran uniquement (aucun contenu)
 * 2. Premier scroll : L'image recule (scale + blur), le contenu apparaît
 * 3. Le scroll est "verrouillé" pendant la transition
 * 4. Une fois révélé : Navigation normale
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  heroImage: 'https://ik.imagekit.io/bupjuxqi6/BackGround%20Hero%20Jereparemontel.webp',
  revealThreshold: 80,
  transitionDuration: 0.8,
  imageScaleEnd: 0.85,
  imageBlurEnd: 12,
  imageOpacityEnd: 0.15,
};

// ============================================
// TYPES
// ============================================
interface HeroCurtainRevealProps {
  onModeChange?: (mode: 'repair' | 'learn') => void;
}

// ============================================
// COMPONENT
// ============================================
export default function HeroCurtainReveal({ onModeChange }: HeroCurtainRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [mode, setMode] = useState<'repair' | 'learn'>('repair');
  const [searchQuery, setSearchQuery] = useState('');
  const accumulatedScroll = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ============================================
  // SCROLL LOCK LOGIC
  // ============================================
  useEffect(() => {
    if (!scrollLocked) return;

    const handleWheel = (e: WheelEvent) => {
      if (isRevealed) return;

      e.preventDefault();

      if (e.deltaY > 0) {
        accumulatedScroll.current += e.deltaY;
      }

      if (accumulatedScroll.current >= CONFIG.revealThreshold) {
        setIsRevealed(true);
        setScrollLocked(false);
        accumulatedScroll.current = 0;
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isRevealed) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isRevealed) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 50) {
        setIsRevealed(true);
        setScrollLocked(false);
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollLocked, isRevealed]);

  useEffect(() => {
    if (isRevealed) {
      document.body.style.overflow = '';
    }
  }, [isRevealed]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleModeChange = (newMode: 'repair' | 'learn') => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  const handleSkipIntro = () => {
    setIsRevealed(true);
    setScrollLocked(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isRepairMode = mode === 'repair';

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="relative">
      {/* ============================================ */}
      {/* LAYER 1: BACKGROUND IMAGE (Fixed) */}
      {/* ============================================ */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          scale: isRevealed ? CONFIG.imageScaleEnd : 1,
          opacity: isRevealed ? CONFIG.imageOpacityEnd : 1,
        }}
        transition={{
          duration: CONFIG.transitionDuration,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          filter: isRevealed ? `blur(${CONFIG.imageBlurEnd}px)` : 'blur(0px)',
        }}
      >
        <Image
          src={CONFIG.heroImage}
          alt="JeRépareMonTelephone.fr - Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      {/* ============================================ */}
      {/* LAYER 2: INTRO CONTENT (Before Reveal) */}
      {/* ============================================ */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Logo */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                JeRépare<span className="font-light">MonTelephone</span>
                <span className="text-cyan-400">.fr</span>
              </h1>
            </motion.div>

            {/* Stats Sidebar */}
            <motion.div
              className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-8 md:right-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { value: '15K+', label: 'PIÈCES' },
                { value: '98%', label: 'SATISFACTION' },
                { value: '24h', label: 'LIVRAISON' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-right"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 tracking-[0.2em] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                Scroll pour découvrir
              </span>
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-sm"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            {/* Skip Button */}
            <button
              onClick={handleSkipIntro}
              className="absolute bottom-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm rounded-full hover:bg-white/20 transition border border-white/20"
            >
              Passer l'intro →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* LAYER 3: MAIN CONTENT (After Reveal) */}
      {/* ============================================ */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: isRevealed ? 1 : 0,
          y: isRevealed ? 0 : 60,
        }}
        transition={{
          duration: CONFIG.transitionDuration,
          delay: isRevealed ? 0.1 : 0,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        <div className="min-h-screen bg-background">
          {/* ============================================ */}
          {/* HEADER */}
          {/* ============================================ */}
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="font-bold text-foreground">JeRépare</span>
                    <span className="font-light text-muted-foreground">MonTelephone</span>
                    <span className="text-cyan-500 font-bold">.fr</span>
                  </div>
                </Link>

                {/* Trust Badges */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                    <MapPin className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm text-muted-foreground">Atelier à Metz</span>
                    <span className="text-xs text-muted-foreground/60">depuis 2011</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 rounded-full">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                      QualiRepar
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/compte"
                  className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-foreground/90 transition"
                >
                  Mon compte
                </Link>
              </div>
            </div>
          </header>

          {/* ============================================ */}
          {/* HERO SECTION */}
          {/* ============================================ */}
          <section className="pt-12 pb-16 md:pt-16 md:pb-20">
            <div className="container mx-auto px-4">
              {/* Morphing Switch */}
              <div className="flex justify-center mb-10">
                <div className="relative bg-muted p-1.5 rounded-2xl inline-flex">
                  <motion.div
                    className="absolute top-1.5 bottom-1.5 rounded-xl"
                    initial={false}
                    animate={{
                      left: isRepairMode ? '6px' : '50%',
                      right: isRepairMode ? '50%' : '6px',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      background: isRepairMode
                        ? 'linear-gradient(135deg, #00F0FF, #00C4CC)'
                        : 'linear-gradient(135deg, #7000FF, #9333EA)',
                      boxShadow: isRepairMode
                        ? '0 4px 20px rgba(0, 240, 255, 0.4)'
                        : '0 4px 20px rgba(112, 0, 255, 0.4)',
                    }}
                  />

                  <button
                    onClick={() => handleModeChange('repair')}
                    className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                      isRepairMode ? 'text-slate-900' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Wrench className="w-5 h-5" />
                    <span>Je Répare</span>
                  </button>

                  <button
                    onClick={() => handleModeChange('learn')}
                    className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                      !isRepairMode ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>J'Apprends</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="max-w-4xl mx-auto text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                      {isRepairMode ? (
                        <>
                          Répare ton téléphone{' '}
                          <span className="text-gradient-cyan">toi-même</span>
                        </>
                      ) : (
                        <>
                          Deviens un <span className="text-gradient-violet">expert</span> de la
                          réparation
                        </>
                      )}
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                      {isRepairMode
                        ? 'La bonne pièce, le bon tuto, et un tech en visio si tu bloques.'
                        : "Masterclass, assistance visio et certification. Apprends à réparer n'importe quel appareil."}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Search Bar (Repair Mode) */}
                {isRepairMode && (
                  <motion.form
                    onSubmit={handleSearch}
                    className="relative max-w-xl mx-auto mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-card border border-border rounded-2xl p-2 flex items-center gap-2 shadow-lg">
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="iPhone 15, Galaxy S24, iPad Pro..."
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-semibold whitespace-nowrap text-base hover:opacity-90 transition-opacity glow-cyan"
                      >
                        Trouver ma pièce
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* CTA (Learn Mode) */}
                {!isRepairMode && (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/cours"
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all hover:opacity-90 glow-violet"
                      style={{
                        background: 'linear-gradient(135deg, #7000FF, #9333EA)',
                      }}
                    >
                      <GraduationCap className="w-5 h-5" />
                      Voir les cours
                    </Link>
                  </motion.div>
                )}

                {/* Quick Access */}
                {isRepairMode && (
                  <motion.div
                    className="flex items-center justify-center gap-3 flex-wrap mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-muted-foreground text-sm">Populaires :</span>
                    {[
                      { name: 'iPhone', icon: Smartphone, slug: 'iphone' },
                      { name: 'Samsung', icon: Smartphone, slug: 'samsung' },
                      { name: 'iPad', icon: Tablet, slug: 'ipad' },
                      { name: 'Console', icon: Gamepad2, slug: 'console' },
                    ].map(({ name, icon: Icon, slug }) => (
                      <Link
                        key={name}
                        href={`/appareil/${slug}`}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-muted border border-border text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Stats Cards */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { value: '15K+', label: 'Pièces en stock' },
                  { value: '24h', label: 'Expédition' },
                  { value: '2011', label: 'Depuis' },
                  { value: '4.8/5', label: 'Satisfaction' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-5 bg-card rounded-2xl border border-border"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
