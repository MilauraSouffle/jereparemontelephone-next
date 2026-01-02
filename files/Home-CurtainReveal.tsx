import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Smartphone, 
  Tablet, 
  ChevronDown, 
  MapPin, 
  Truck, 
  CheckCircle, 
  Video, 
  Wrench,
  GraduationCap,
  Package,
  Star,
  ArrowRight,
  Gamepad2,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroBackground1984 from '@/assets/hero-background-1984.webp';
import { devices } from '@/data/mockData';
import MarqueeBand from '@/components/ui/MarqueeBand';
import FadeInSection from '@/components/ui/FadeInSection';

/**
 * HOME PAGE - JeRépareMonTelephone.fr
 * 
 * Hero "Curtain Reveal" :
 * 1. Arrivée : Image plein écran, aucun contenu visible
 * 2. Premier scroll : Image recule (scale + blur), contenu apparaît
 * 3. Le scroll est BLOQUÉ pendant la transition
 * 4. Après reveal : Navigation normale
 * 
 * @version 2.0 - Curtain Reveal
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  // Seuil de scroll pour déclencher la révélation (en pixels accumulés)
  revealThreshold: 80,
  
  // Durée des animations (en secondes)
  transitionDuration: 0.8,
  
  // Paramètres visuels de l'image au reveal
  imageScaleEnd: 0.85,
  imageBlurEnd: 12,
  imageOpacityEnd: 0.2,
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ============================================
  // ÉTATS
  // ============================================
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [mode, setMode] = useState<'repair' | 'learn'>('repair');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchHint, setShowSearchHint] = useState(false);
  
  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const accumulatedScroll = useRef(0);

  // ============================================
  // GESTION DU SCROLL VERROUILLÉ (Curtain Reveal)
  // ============================================
  useEffect(() => {
    if (!scrollLocked) return;

    const handleWheel = (e: WheelEvent) => {
      if (isRevealed) return;
      
      // Bloquer le scroll natif
      e.preventDefault();
      
      // Accumuler le scroll (seulement vers le bas)
      if (e.deltaY > 0) {
        accumulatedScroll.current += e.deltaY;
      }
      
      // Si on dépasse le seuil, révéler
      if (accumulatedScroll.current >= CONFIG.revealThreshold) {
        setIsRevealed(true);
        setScrollLocked(false);
        accumulatedScroll.current = 0;
      }
    };

    // Gestion du touch (mobile)
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRevealed) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isRevealed) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // Swipe vers le haut = révéler
      if (deltaY > 50) {
        setIsRevealed(true);
        setScrollLocked(false);
      }
    };

    // Bloquer le scroll natif
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

  // Débloquer le scroll une fois révélé
  useEffect(() => {
    if (isRevealed) {
      document.body.style.overflow = '';
    }
  }, [isRevealed]);

  // ============================================
  // HANDLERS
  // ============================================
  useEffect(() => {
    const handleFocusSearch = () => {
      setShowSearchHint(true);
      searchInputRef.current?.focus();
    };
    
    window.addEventListener('focusHeroSearch', handleFocusSearch);
    
    if (location.state?.focusSearch) {
      setTimeout(handleFocusSearch, 100);
    }
    
    return () => window.removeEventListener('focusHeroSearch', handleFocusSearch);
  }, [location.state]);

  const handleStartClick = () => {
    if (searchQuery.trim()) {
      const matchedDevice = devices.find(d => 
        d.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedDevice) {
        navigate(`/device/${matchedDevice.id}`);
      } else {
        navigate('/trouver', { state: { query: searchQuery } });
      }
    } else {
      setShowSearchHint(true);
      searchInputRef.current?.focus();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartClick();
  };

  const handleSkipIntro = () => {
    setIsRevealed(true);
    setScrollLocked(false);
  };

  const isRepairMode = mode === 'repair';

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-background">
      
      {/* ============================================ */}
      {/* LAYER 1 : IMAGE HERO (Fixed, avec effet curtain) */}
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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackground1984})`,
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      {/* ============================================ */}
      {/* LAYER 2 : CONTENU INITIAL (Avant reveal) */}
      {/* ============================================ */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo minimaliste en haut */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                JeRépare<span className="font-light">MonTelephone</span>
                <span className="text-primary">.fr</span>
              </h1>
            </motion.div>

            {/* Stats sidebar - Style AURA */}
            <motion.div 
              className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { value: '12K+', label: 'RÉPARATIONS' },
                { value: '98%', label: 'SATISFACTION' },
                { value: '24h', label: 'LIVRAISON' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-right"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-white/60 tracking-[0.2em] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator centré en bas */}
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
                className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            {/* Bouton Skip (accessibilité) */}
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
      {/* LAYER 3 : CONTENU PRINCIPAL (Après reveal) */}
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
        {/* Background surface */}
        <div className="min-h-screen bg-background">
          
          {/* ============================================ */}
          {/* HERO CONTENT */}
          {/* ============================================ */}
          <section className="pt-24 pb-12 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4">
              
              {/* ============================================ */}
              {/* MORPHING SWITCH */}
              {/* ============================================ */}
              <div className="flex justify-center mb-10">
                <div className="relative bg-muted p-1.5 rounded-2xl inline-flex">
                  {/* Background animé */}
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
                        ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
                        : 'linear-gradient(135deg, #7000FF, #9333EA)',
                      boxShadow: isRepairMode
                        ? '0 4px 20px hsl(var(--primary) / 0.4)'
                        : '0 4px 20px rgba(112, 0, 255, 0.4)',
                    }}
                  />

                  {/* Bouton Réparer */}
                  <button
                    onClick={() => setMode('repair')}
                    className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                      isRepairMode ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Wrench className="w-5 h-5" />
                    <span>Je Répare</span>
                  </button>

                  {/* Bouton Apprendre */}
                  <button
                    onClick={() => setMode('learn')}
                    className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                      !isRepairMode ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>J'Apprends</span>
                  </button>
                </div>
              </div>

              {/* ============================================ */}
              {/* TITRE & SOUS-TITRE */}
              {/* ============================================ */}
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
                          <span className="text-primary">toi-même</span>
                        </>
                      ) : (
                        <>
                          Deviens un{' '}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                            expert
                          </span>{' '}
                          de la réparation
                        </>
                      )}
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                      {isRepairMode
                        ? 'La bonne pièce, le bon tuto, et un tech en visio si tu bloques.'
                        : 'Masterclass, assistance visio et certification. Apprends à réparer n\'importe quel appareil.'}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* ============================================ */}
                {/* SEARCH BAR (Mode Repair) */}
                {/* ============================================ */}
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
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchHint(false);
                          }}
                          placeholder="iPhone 13, Galaxy S21, iPad Pro..."
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={handleStartClick} 
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold whitespace-nowrap text-base hover:bg-primary/90 transition-colors"
                      >
                        Trouver ma pièce
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* CTA pour mode Learn */}
                {!isRepairMode && (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/cours"
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, #7000FF, #9333EA)',
                        boxShadow: '0 4px 30px rgba(112, 0, 255, 0.3)',
                      }}
                    >
                      <GraduationCap className="w-5 h-5" />
                      Voir les cours
                    </Link>
                    <Link
                      to="/visio"
                      className="flex items-center gap-2 px-6 py-4 text-muted-foreground font-medium hover:text-foreground transition"
                    >
                      <Video className="w-5 h-5" />
                      Assistance visio
                    </Link>
                  </motion.div>
                )}

                {/* Quick Access Brands */}
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
                        to={`/device/${slug}`}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-muted border border-border text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* ============================================ */}
              {/* STATS CARDS */}
              {/* ============================================ */}
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
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ============================================ */}
          {/* TRUST BAR */}
          {/* ============================================ */}
          <section className="py-6 border-y border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Atelier à Metz depuis 2011</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Livraison 24h</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Label QualiRepar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-primary" />
                  <span>Aide visio 29€</span>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* MARQUEE BAND */}
          {/* ============================================ */}
          <MarqueeBand text="LE PROCESSUS" />

          {/* ============================================ */}
          {/* COMMENT ÇA MARCHE */}
          {/* ============================================ */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <FadeInSection>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                      Comment ça marche
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                      Pas besoin d'être un expert. On t'accompagne de A à Z.
                    </p>
                  </div>
                </FadeInSection>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { num: 1, title: "Identifie la panne", desc: "Notre diagnostic en 3 questions trouve la bonne pièce pour ton modèle." },
                    { num: 2, title: "Reçois ta pièce", desc: "Livraison express depuis notre atelier de Metz. Pièce testée, garantie." },
                    { num: 3, title: "Répare avec nos tutos", desc: "Vidéo pas-à-pas incluse. Besoin d'aide ? Appelle un tech en visio." }
                  ].map((step, index) => (
                    <FadeInSection key={step.num} delay={index * 0.1}>
                      <div className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                          {step.num}
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* CATÉGORIES */}
          {/* ============================================ */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <FadeInSection>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Trouve ta pièce par catégorie
                  </h2>
                  <p className="text-muted-foreground">
                    Plus de 15 000 références en stock
                  </p>
                </div>
              </FadeInSection>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
                {[
                  { name: 'Smartphones', icon: Smartphone, count: '8,500+', slug: 'smartphones' },
                  { name: 'Tablettes', icon: Tablet, count: '2,200+', slug: 'tablettes' },
                  { name: 'Ordinateurs', icon: Laptop, count: '3,100+', slug: 'ordinateurs' },
                  { name: 'Consoles', icon: Gamepad2, count: '1,400+', slug: 'consoles' },
                  { name: 'Outils', icon: Wrench, count: '450+', slug: 'outils' },
                ].map((cat, index) => (
                  <FadeInSection key={cat.name} delay={index * 0.1}>
                    <Link
                      to={`/boutique/${cat.slug}`}
                      className="group flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <cat.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                      <span className="text-sm text-muted-foreground">{cat.count}</span>
                    </Link>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* FAMILY CARE CTA */}
          {/* ============================================ */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 max-w-5xl mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[100px]" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full filter blur-[100px]" />
                </div>

                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary font-medium">Nouveau : Family Care</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Protégez tous les appareils de votre foyer
                    </h3>
                    
                    <p className="text-gray-400 mb-6">
                      Un seul abonnement : Garage Famille, -15% permanent, Visio illimitée, et garantie anti-casse.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Link
                        to="/family-care"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition"
                      >
                        Découvrir Family Care
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <div className="text-center sm:text-left">
                        <div className="text-2xl font-bold text-white">9,90€<span className="text-base font-normal text-gray-400">/mois</span></div>
                        <div className="text-sm text-gray-500">Sans engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default Home;
