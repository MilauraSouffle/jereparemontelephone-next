import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  GraduationCap, 
  MapPin, 
  Award, 
  Search,
  Scan,
  ChevronRight,
  Play,
  Users,
  Shield,
  Wrench,
  Battery,
  Monitor,
  Cpu,
  Phone,
  Tablet,
  Gamepad2,
  Laptop,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Zap,
  HeartPulse,
  Video,
  BadgeCheck,
  Home,
  ShoppingCart,
  User,
  Menu,
  X
} from 'lucide-react';

// ============================================
// DESIGN TOKENS - CLINICAL CYBER
// ============================================
const colors = {
  white: '#FFFFFF',
  grayLight: '#F8F9FA',
  grayMid: '#E9ECEF',
  graySteel: '#6C757D',
  grayDark: '#343A40',
  cyanElectric: '#00F0FF',
  cyanGlow: 'rgba(0, 240, 255, 0.3)',
  violetLaser: '#7000FF',
  violetGlow: 'rgba(112, 0, 255, 0.3)',
  success: '#10B981',
  warning: '#F59E0B',
};

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function JeRepareTelephone() {
  const [mode, setMode] = useState('repair'); // 'repair' | 'learn'
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRepairMode = mode === 'repair';
  const accentColor = isRepairMode ? colors.cyanElectric : colors.violetLaser;
  const glowColor = isRepairMode ? colors.cyanGlow : colors.violetGlow;

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.cyanElectric}, ${colors.violetLaser})`,
                  boxShadow: `0 4px 20px ${glowColor}`
                }}
              >
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-gray-900 text-lg">JeRépare</span>
                <span className="font-light text-gray-500 text-lg">MonTelephone</span>
                <span className="text-cyan-500 font-bold">.fr</span>
              </div>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-gray-600">Atelier à Metz</span>
                <span className="text-xs text-gray-400">depuis 2011</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <Award className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-emerald-700 font-medium">QualiRepar</span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Catalogue</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Diagnostic</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Cours</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">Family Care</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                <ShoppingCart className="w-5 h-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition">
                <User className="w-5 h-5 text-gray-500" />
              </button>
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <nav className="px-4 py-4 space-y-2">
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Catalogue</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Diagnostic</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Cours</a>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Family Care</a>
                <div className="flex items-center gap-2 px-4 py-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm text-gray-600">Atelier à Metz depuis 2011</span>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================ */}
      {/* MORPHING SWITCH - THE WAAOW FEATURE */}
      {/* ============================================ */}
      <section className="relative py-8 md:py-12">
        {/* Background Glow Effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isRepairMode 
              ? `radial-gradient(ellipse at 50% 0%, ${colors.cyanGlow} 0%, transparent 50%)`
              : `radial-gradient(ellipse at 50% 0%, ${colors.violetGlow} 0%, transparent 50%)`
          }}
          transition={{ duration: 0.8 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* The Switch */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="relative bg-gray-100 p-1.5 rounded-2xl inline-flex">
              {/* Sliding Background */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-xl"
                initial={false}
                animate={{
                  left: isRepairMode ? '6px' : '50%',
                  right: isRepairMode ? '50%' : '6px',
                  background: isRepairMode 
                    ? `linear-gradient(135deg, ${colors.cyanElectric}, #00C4CC)`
                    : `linear-gradient(135deg, ${colors.violetLaser}, #9333EA)`,
                  boxShadow: isRepairMode 
                    ? `0 4px 20px ${colors.cyanGlow}, 0 0 40px ${colors.cyanGlow}`
                    : `0 4px 20px ${colors.violetGlow}, 0 0 40px ${colors.violetGlow}`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              {/* Repair Button */}
              <button
                onClick={() => setMode('repair')}
                className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                  isRepairMode ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Wrench className="w-5 h-5" />
                <span className="text-sm md:text-base">Je Répare</span>
              </button>

              {/* Learn Button */}
              <button
                onClick={() => setMode('learn')}
                className={`relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-colors ${
                  !isRepairMode ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm md:text-base">J'Apprends</span>
              </button>
            </div>
          </div>

          {/* ============================================ */}
          {/* HERO CONTENT - MORPHS BASED ON MODE */}
          {/* ============================================ */}
          <AnimatePresence mode="wait">
            {isRepairMode ? (
              <motion.div
                key="repair-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                  La <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400">Clinique Digitale</span>
                  <br />de votre Smartphone
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 md:mb-10">
                  Diagnostiquez votre panne en 30 secondes, trouvez la pièce exacte, 
                  et réparez vous-même avec nos guides experts.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    onClick={() => setShowDiagnostic(true)}
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    style={{ boxShadow: `0 4px 30px ${colors.cyanGlow}` }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Scan className="w-5 h-5" />
                    <span>Lancer le Diagnostic IA</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <button className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:text-gray-900 transition">
                    <Search className="w-5 h-5" />
                    <span>Rechercher une pièce</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="learn-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                  L'<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">Académie</span>
                  <br />de la Réparation
                </h1>
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 md:mb-10">
                  Devenez autonome avec nos Masterclass guidées par IA. 
                  Du débutant au pro, apprenez à réparer comme un technicien certifié.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    style={{ boxShadow: `0 4px 30px ${colors.violetGlow}` }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>Découvrir les Cours</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <button className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:text-gray-900 transition">
                    <Video className="w-5 h-5" />
                    <span>Assistance Visio</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================ */}
      {/* DIAGNOSTIC IA MODAL */}
      {/* ============================================ */}
      <AnimatePresence>
        {showDiagnostic && (
          <DiagnosticModal 
            onClose={() => {
              setShowDiagnostic(false);
              setDiagnosticStep(0);
            }}
            step={diagnosticStep}
            setStep={setDiagnosticStep}
          />
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* CONTENT SECTIONS - MORPH BASED ON MODE */}
      {/* ============================================ */}
      <AnimatePresence mode="wait">
        {isRepairMode ? (
          <motion.div
            key="repair-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Device Categories */}
            <DeviceCategoriesSection />
            
            {/* Featured Products */}
            <FeaturedProductsSection />
            
            {/* Family Care CTA */}
            <FamilyCareCTA />
          </motion.div>
        ) : (
          <motion.div
            key="learn-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* AI Avatar Welcome */}
            <AvatarWelcomeSection />
            
            {/* Course Categories */}
            <CourseCategoriesSection />
            
            {/* Family Care CTA */}
            <FamilyCareCTA />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">JeRépareMonTelephone</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                La clinique digitale de vos appareils. Pièces détachées + Formation IA.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Atelier à Metz depuis 2011</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Réparer</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Pièces iPhone</a></li>
                <li><a href="#" className="hover:text-white transition">Pièces Samsung</a></li>
                <li><a href="#" className="hover:text-white transition">Pièces Consoles</a></li>
                <li><a href="#" className="hover:text-white transition">Outils</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Apprendre</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Cours Gratuits</a></li>
                <li><a href="#" className="hover:text-white transition">Masterclass</a></li>
                <li><a href="#" className="hover:text-white transition">Assistance Visio</a></li>
                <li><a href="#" className="hover:text-white transition">Certifications</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Garantie</a></li>
                <li><a href="#" className="hover:text-white transition">Retours</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-900/50 rounded-full">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">Label QualiRepar</span>
              </div>
              <span className="text-sm text-gray-500">iA-Groupe © 2025</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">CGV</a>
              <a href="#" className="hover:text-white transition">Mentions légales</a>
              <a href="#" className="hover:text-white transition">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// DIAGNOSTIC MODAL COMPONENT
// ============================================
function DiagnosticModal({ onClose, step, setStep }) {
  const diagnosticFlow = [
    {
      question: "Quel type d'appareil souhaitez-vous réparer ?",
      options: [
        { icon: Phone, label: "Smartphone", value: "smartphone" },
        { icon: Tablet, label: "Tablette", value: "tablet" },
        { icon: Laptop, label: "Ordinateur", value: "computer" },
        { icon: Gamepad2, label: "Console", value: "console" },
      ]
    },
    {
      question: "Quelle est la marque ?",
      options: [
        { icon: Smartphone, label: "Apple", value: "apple" },
        { icon: Smartphone, label: "Samsung", value: "samsung" },
        { icon: Smartphone, label: "Huawei", value: "huawei" },
        { icon: Smartphone, label: "Xiaomi", value: "xiaomi" },
        { icon: Smartphone, label: "Autre", value: "other" },
      ]
    },
    {
      question: "Quel est le problème principal ?",
      options: [
        { icon: Monitor, label: "Écran cassé / HS", value: "screen" },
        { icon: Battery, label: "Batterie faible", value: "battery" },
        { icon: Cpu, label: "Ne s'allume plus", value: "power" },
        { icon: Zap, label: "Ne charge plus", value: "charging" },
        { icon: Phone, label: "Autre problème", value: "other" },
      ]
    },
    {
      question: "L'écran affiche-t-il quelque chose ?",
      options: [
        { icon: CheckCircle2, label: "Oui, avec des lignes/taches", value: "partial" },
        { icon: X, label: "Non, écran noir total", value: "black" },
        { icon: Monitor, label: "Oui mais tactile HS", value: "touch" },
      ]
    }
  ];

  const currentStep = diagnosticFlow[step];
  const isLastStep = step >= diagnosticFlow.length - 1;

  const handleOptionClick = (value) => {
    if (isLastStep) {
      // Show result
      setStep(99); // Result step
    } else {
      setStep(step + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 99 ? (
          // Result View
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Diagnostic Terminé !</h3>
            <p className="text-gray-500 mb-6">Notre IA a identifié votre panne</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <div className="flex items-center gap-2 text-sm text-cyan-600 font-medium mb-2">
                <HeartPulse className="w-4 h-4" />
                <span>Diagnostic</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Écran LCD iPhone 13</h4>
              <p className="text-sm text-gray-500 mb-4">Remplacement recommandé : Bloc écran complet avec tactile</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">89,90€</span>
                  <span className="text-sm text-gray-400 ml-2">TTC</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>En stock</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold rounded-xl hover:shadow-lg transition"
              >
                Ajouter au panier
              </button>
              <button 
                className="w-full py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
              >
                Voir le cours de réparation
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Confiance du diagnostic : 94% • Basé sur vos réponses
            </p>
          </div>
        ) : (
          // Question View
          <>
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-400">Étape {step + 1}/{diagnosticFlow.length}</span>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / diagnosticFlow.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-50 flex items-center justify-center">
                <Scan className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {currentStep.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentStep.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="flex flex-col items-center gap-2 p-4 md:p-6 bg-gray-50 hover:bg-cyan-50 border-2 border-transparent hover:border-cyan-200 rounded-2xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <option.icon className="w-8 h-8 text-gray-600" />
                  <span className="font-medium text-gray-700 text-sm md:text-base">{option.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Back Button */}
            {step > 0 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                ← Retour
              </button>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================
// DEVICE CATEGORIES SECTION
// ============================================
function DeviceCategoriesSection() {
  const categories = [
    { icon: Phone, label: "Smartphones", count: "2,450 pièces", color: "cyan" },
    { icon: Tablet, label: "Tablettes", count: "890 pièces", color: "blue" },
    { icon: Laptop, label: "Ordinateurs", count: "1,200 pièces", color: "indigo" },
    { icon: Gamepad2, label: "Consoles", count: "650 pièces", color: "purple" },
    { icon: Wrench, label: "Outils", count: "320 produits", color: "orange" },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Trouvez votre pièce par catégorie
          </h2>
          <p className="text-gray-500">Plus de 5,000 références en stock, expédiées depuis Metz</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <motion.a
              key={cat.label}
              href="#"
              className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-7 h-7 text-${cat.color}-500`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{cat.label}</h3>
              <span className="text-sm text-gray-400">{cat.count}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FEATURED PRODUCTS SECTION
// ============================================
function FeaturedProductsSection() {
  const products = [
    {
      name: "Écran LCD iPhone 15 Pro",
      quality: "Origine",
      price: "189,90",
      oldPrice: "229,90",
      difficulty: 3,
      inStock: true,
      image: "📱"
    },
    {
      name: "Batterie Samsung S24",
      quality: "Premium",
      price: "34,90",
      difficulty: 2,
      inStock: true,
      image: "🔋"
    },
    {
      name: "Connecteur Charge iPhone 14",
      quality: "Compatible",
      price: "24,90",
      difficulty: 4,
      inStock: true,
      image: "⚡"
    },
    {
      name: "Écran Nintendo Switch",
      quality: "Premium",
      price: "79,90",
      difficulty: 3,
      inStock: false,
      image: "🎮"
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Pièces les plus demandées
            </h2>
            <p className="text-gray-500">Cette semaine à Metz</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-cyan-500 font-medium hover:text-cyan-600 transition">
            Voir tout <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center text-6xl">
                {product.image}
                {/* Quality Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium ${
                  product.quality === 'Origine' ? 'bg-emerald-100 text-emerald-700' :
                  product.quality === 'Premium' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {product.quality}
                </div>
                {/* Stock Badge */}
                {!product.inStock && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                    Précommande
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                {/* Difficulty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">Difficulté :</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full ${i <= product.difficulty ? 'bg-cyan-400' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900">{product.price}€</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">{product.oldPrice}€</span>
                    )}
                  </div>
                  <button className="p-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded-xl transition">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-cyan-500 font-medium">
            Voir tout le catalogue <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// AVATAR WELCOME SECTION (LEARN MODE)
// ============================================
function AvatarWelcomeSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Avatar */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-8xl md:text-9xl shadow-2xl"
              style={{ boxShadow: `0 20px 60px ${colors.violetGlow}` }}
            >
              🤖
            </div>
            {/* Status Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-lg">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Alta • En ligne</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Bonjour, je suis <span className="text-violet-600">Alta</span> 👋
              </h2>
              <p className="text-lg text-gray-500 mb-6 max-w-xl">
                Votre professeur virtuel. Je vous guide pas à pas dans chaque réparation, 
                avec des cours interactifs adaptés à votre niveau.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>+200 cours disponibles</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Quiz de validation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Certificats de réussite</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COURSE CATEGORIES SECTION (LEARN MODE)
// ============================================
function CourseCategoriesSection() {
  const courses = [
    {
      title: "Remplacement Écran iPhone",
      level: "Débutant",
      duration: "25 min",
      lessons: 8,
      students: 1420,
      rating: 4.9,
      image: "📱"
    },
    {
      title: "Changement Batterie Samsung",
      level: "Débutant",
      duration: "15 min",
      lessons: 5,
      students: 890,
      rating: 4.8,
      image: "🔋"
    },
    {
      title: "Réparation Connecteur Lightning",
      level: "Intermédiaire",
      duration: "35 min",
      lessons: 12,
      students: 650,
      rating: 4.7,
      image: "⚡"
    },
    {
      title: "Microsoudure Avancée",
      level: "Expert",
      duration: "2h 30",
      lessons: 24,
      students: 210,
      rating: 4.9,
      image: "🔬"
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Masterclass Populaires
            </h2>
            <p className="text-gray-500">Apprenez à votre rythme, progressez vraiment</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-violet-500 font-medium hover:text-violet-600 transition">
            Voir tout <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-purple-50 flex items-center justify-center text-5xl">
                {course.image}
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-violet-600 ml-1" />
                  </div>
                </div>
                {/* Level Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium ${
                  course.level === 'Débutant' ? 'bg-emerald-100 text-emerald-700' :
                  course.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{course.title}</h3>
                
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>{course.lessons} leçons</span>
                  </div>
                </div>

                {/* Rating & Students */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-gray-900">{course.rating}</span>
                    <span className="text-gray-400 text-sm">({course.students})</span>
                  </div>
                  <button className="p-2 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-xl transition">
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FAMILY CARE CTA SECTION
// ============================================
function FamilyCareCTA() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full filter blur-3xl" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-6">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">Nouveau : Family Care</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Protégez tous les appareils
                <br />de votre foyer
              </h2>
              
              <p className="text-gray-400 text-lg mb-8 max-w-xl">
                Un seul abonnement pour gérer l'état de santé de tous vos appareils. 
                Assistance illimitée, remises permanentes, et garantie anti-casse.
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Home className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Garage Famille</div>
                    <div className="text-gray-500 text-sm">Tous vos appareils</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Video className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Visio Illimitée</div>
                    <div className="text-gray-500 text-sm">Accès prioritaire</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">-15% permanent</div>
                    <div className="text-gray-500 text-sm">Sur tout le catalogue</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Anti-Casse</div>
                    <div className="text-gray-500 text-sm">On finit si vous bloquez</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg"
                  style={{ boxShadow: `0 4px 30px ${colors.cyanGlow}` }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-5 h-5" />
                  <span>Découvrir Family Care</span>
                </motion.button>
                <div className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-white">9,90€<span className="text-base font-normal text-gray-400">/mois</span></div>
                  <div className="text-sm text-gray-500">Sans engagement</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Device Cards Stack */}
                <motion.div 
                  className="w-64 bg-white rounded-2xl p-4 shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">📱</div>
                    <div>
                      <div className="font-medium text-gray-900">iPhone de Maman</div>
                      <div className="text-sm text-emerald-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                        Santé : Excellente
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                  </div>
                </motion.div>

                <motion.div 
                  className="w-64 bg-white rounded-2xl p-4 shadow-2xl absolute -bottom-4 -right-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🎮</div>
                    <div>
                      <div className="font-medium text-gray-900">Switch des enfants</div>
                      <div className="text-sm text-amber-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-amber-400 rounded-full" />
                        Batterie : À surveiller
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
