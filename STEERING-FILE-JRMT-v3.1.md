# MASTER STEERING FILE : JeRépareMonTelephone.fr (JRMT)

**Code Projet** : JRMT-OMEGA  
**Version** : 3.1 (Next.js Migration)  
**Statut** : Constitution Immuable  
**Propriétaires** : Direction Générale (Metz)  
**Dernière MAJ** : Janvier 2026

---

## ⚠️ INSTRUCTION SUPRÊME POUR L'IA

Ce document est la **source unique de vérité**. Il fusionne la vision stratégique (Business) et l'exigence technique (Stack). Toute génération de code doit s'y conformer strictement.

**Règle d'or** : En cas de doute, consulter ce fichier AVANT de coder.

---

## 1. VISION & IDENTITÉ

### 1.1 Le Positionnement
| Élément | Valeur |
|---------|--------|
| **Nom** | JeRépareMonTelephone.fr (JRMT) |
| **Tagline** | "La Clinique Digitale de vos Appareils" |
| **Mission** | Premier écosystème "Phygital" de Souveraineté Technologique |
| **Promesse** | Fusionner E-commerce (Hardware) et EdTech (Software) |

### 1.2 L'Ancrage Physique (Différenciateur Clé)
- **Atelier** : Metz, actif depuis 2011
- **Label** : QualiRepar (certification officielle)
- **Groupe** : iA-Groupe (ex-iFonAssist)
- **Usage Marketing** : Mentionner systématiquement dans le Header et Footer

### 1.3 Le Modèle "Shadow Catalog"
```
┌─────────────────────────────────────────────────────────────┐
│                    FLUX PRODUITS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  UTOPYA (Grossiste)                                         │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────┐     ┌─────────────────────────────┐       │
│  │ TOP 20/80   │     │      LONGUE TRAÎNE         │       │
│  │ Stock Metz  │     │      Flux Tendu            │       │
│  │ (Rotation   │     │      (Commande à la        │       │
│  │  rapide)    │     │       demande)             │       │
│  └─────────────┘     └─────────────────────────────┘       │
│       │                        │                            │
│       └────────────┬───────────┘                            │
│                    ▼                                        │
│              CLIENT FINAL                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Règles de gestion** :
- **Stock Metz** : iPhone (toutes générations), Samsung Galaxy S/A, batteries universelles
- **Flux tendu** : Modèles rares, consoles anciennes, pièces spécifiques
- **Seuil de réapprovisionnement** : Alerte à 5 unités restantes (Top 20)

### 1.4 Stratégie de Synchronisation (Anti-Latence)
Pour éviter de dépendre de l'API Utopya en temps réel (latence) :
1. **Ingestion :** Cron Job nocturne (3h00 matin) qui met à jour stocks et prix Utopya dans notre DB Supabase.
2. **Buffer Stock :** Le Front-end lit uniquement notre DB Supabase (Lecture < 50ms).
3. **Check Out :** Vérification API Utopya en temps réel uniquement au moment de la validation du panier (pour éviter l'overselling).

---

## 2. STACK TECHNIQUE & ARCHITECTURE

### 2.1 Stack Principale

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| **Framework** | Next.js (App Router) | 15.x | SSR/SSG pour SEO, Server Components, API Routes |
| **Styling** | Tailwind CSS | 4.x | Utility-first, Design System cohérent |
| **Components** | Shadcn/UI + Radix | Latest | Accessibilité native, Headless |
| **Animation** | Framer Motion | 11.x | Layout animations, Gestures |
| **Scroll** | Lenis | 1.x | Smooth scroll premium |
| **Backend** | Supabase | Latest | Auth, DB, Storage, Realtime |
| **Vector DB** | pgvector | - | RAG pour assistant "Ed" |
| **Paiements** | Stripe | Latest | Subscriptions + One-shot |
| **Hosting** | Vercel | - | Edge functions, Preview deployments |

### 2.2 Architecture des Dossiers (Next.js App Router)

```
/src
├── app/
│   ├── (shop)/                    # Groupe : Mode "Je Répare"
│   │   ├── page.tsx              # Landing Shop
│   │   ├── produits/
│   │   │   └── [category]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx  # Fiche produit
│   │   ├── diagnostic/
│   │   │   └── page.tsx          # Diagnostic IA
│   │   └── panier/
│   │       └── page.tsx          # Panier + Checkout
│   │
│   ├── (academy)/                 # Groupe : Mode "J'Apprends"
│   │   ├── page.tsx              # Landing Académie
│   │   └── cours/
│   │       └── [slug]/
│   │           └── page.tsx      # Page cours
│   │
│   ├── (auth)/                    # Authentification
│   │   ├── connexion/
│   │   ├── inscription/
│   │   └── mon-compte/
│   │       ├── commandes/
│   │       ├── garage/           # Dashboard Family Care
│   │       └── abonnement/
│   │
│   ├── api/                       # API Routes
│   │   ├── diagnostic/
│   │   ├── products/
│   │   ├── stripe/
│   │   │   ├── webhook/
│   │   │   └── create-session/
│   │   └── ed/                   # Assistant RAG
│   │       └── chat/
│   │
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Landing (/)
│   ├── globals.css               # Design System CSS
│   └── not-found.tsx             # 404
│
├── components/
│   ├── ui/                       # Shadcn components
│   ├── hero/                     # Hero Curtain Reveal
│   ├── sections/                 # TrustBar, HowItWorks, etc.
│   ├── shop/                     # Composants e-commerce
│   ├── academy/                  # Composants éducation
│   ├── layout/                   # Header, Footer
│   └── ed/                       # Assistant "Ed"
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts              # Types générés
│   ├── stripe/
│   ├── utils.ts
│   └── constants.ts
│
└── specs/                        # Spécifications détaillées
    ├── diagnostic-flow.md
    ├── product-schema.md
    ├── family-care.md
    └── ed-assistant.md
```

### 2.3 Base de Données (Supabase)

```sql
-- TABLES PRINCIPALES

-- Appareils (référentiel)
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,           -- Apple, Samsung, etc.
  model TEXT NOT NULL,           -- iPhone 15 Pro Max
  series TEXT,                   -- iPhone 15
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  release_year INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Produits (pièces détachées)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES devices(id),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_ht DECIMAL(10,2) NOT NULL,
  price_ttc DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  quality_tier TEXT CHECK (quality_tier IN ('origine', 'premium', 'compatible', 'infinity')),
  difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
  repair_time_minutes INT,
  is_active BOOLEAN DEFAULT true,
  utopya_ref TEXT,              -- Référence fournisseur
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catégories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id),
  icon TEXT,
  display_order INT DEFAULT 0
);

-- Diagnostic Flow (arbre de décision)
CREATE TABLE diagnostic_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_order INT NOT NULL,
  question TEXT NOT NULL,
  device_type TEXT,             -- smartphone, tablet, console, computer
  parent_step_id UUID REFERENCES diagnostic_steps(id),
  recommended_product_id UUID REFERENCES products(id),
  is_final BOOLEAN DEFAULT false
);

CREATE TABLE diagnostic_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id UUID REFERENCES diagnostic_steps(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  next_step_id UUID REFERENCES diagnostic_steps(id),
  icon TEXT
);

-- Utilisateurs (extension de auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'coup_de_main', 'family_care')),
  subscription_ends_at TIMESTAMPTZ,
  is_pro BOOLEAN DEFAULT false,
  company_name TEXT,
  vat_number TEXT,              -- TVA Intra (B2B)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Garage Famille (appareils utilisateur)
CREATE TABLE user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id),
  nickname TEXT,                -- "iPhone de Maman"
  serial_number TEXT,
  imei TEXT,
  health_score INT CHECK (health_score BETWEEN 0 AND 100),
  last_diagnostic_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commandes
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_ht DECIMAL(10,2),
  total_ttc DECIMAL(10,2),
  shipping_address JSONB,
  stripe_session_id TEXT,
  has_visio_option BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

-- Cours
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  level TEXT CHECK (level IN ('debutant', 'intermediaire', 'expert')),
  duration_minutes INT,
  is_premium BOOLEAN DEFAULT false,
  video_url TEXT,
  thumbnail_url TEXT,
  device_id UUID REFERENCES devices(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL,
  duration_seconds INT,
  video_timestamp INT           -- Seconde de début dans la vidéo
);

-- Documents Ed (RAG)
CREATE TABLE ed_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),       -- OpenAI embedding
  source_type TEXT,             -- 'faq', 'tutorial', 'product', 'policy'
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche vectorielle
CREATE INDEX ON ed_documents USING ivfflat (embedding vector_cosine_ops);
```

### 2.4 Row Level Security (RLS)

```sql
-- Profils : lecture/écriture uniquement pour l'utilisateur
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Appareils utilisateur : accès propriétaire uniquement
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own devices"
  ON user_devices FOR ALL
  USING (auth.uid() = user_id);

-- Commandes : lecture propriétaire
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 3. DESIGN SYSTEM : "CLINICAL CYBER"

### 3.1 Palette de Couleurs

```css
:root {
  /* Surfaces */
  --surface-primary: #F8F9FA;      /* Off-White mat */
  --surface-card: #FFFFFF;
  --surface-elevated: #FFFFFF;
  
  /* Accents */
  --accent-cyan: #00F0FF;          /* Mode Shop - Cyan Électrique */
  --accent-violet: #7000FF;        /* Mode Academy - Violet Profond */
  --accent-emerald: #10B981;       /* Success / QualiRepar */
  
  /* Text */
  --text-primary: #0F172A;         /* Slate 900 */
  --text-secondary: #64748B;       /* Slate 500 */
  --text-muted: #94A3B8;           /* Slate 400 */
  
  /* Semantic */
  --error: #EF4444;
  --warning: #F59E0B;
  --success: #10B981;
}
```

### 3.2 Effets Visuels

**Glassmorphism** :
```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
```

**Glow Effects** :
```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3),
              0 0 40px rgba(0, 240, 255, 0.1);
}

.glow-violet {
  box-shadow: 0 0 20px rgba(112, 0, 255, 0.3),
              0 0 40px rgba(112, 0, 255, 0.1);
}
```

### 3.3 Typography

| Usage | Font | Weight | Size |
|-------|------|--------|------|
| Headings | Inter | 700 | 2rem - 4rem |
| Body | Inter | 400 | 1rem |
| Labels | Inter | 500 | 0.875rem |
| Code | JetBrains Mono | 400 | 0.875rem |

**Tracking** : `-0.02em` sur les titres pour un aspect premium.

### 3.4 Composants Standards

**Buttons** :
```tsx
// Primary
className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-semibold glow-cyan"

// Secondary
className="bg-muted text-foreground px-6 py-3 rounded-xl font-medium hover:bg-accent"

// Ghost
className="text-muted-foreground hover:text-foreground px-4 py-2"
```

**Cards** :
```tsx
className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all"
```

---

## 4. UX & FONCTIONNALITÉS CLÉS

### 4.1 Le Hero "Curtain Reveal" (Effet Waaow)

**Comportement** :
1. À l'arrivée : Image plein écran, aucun contenu visible
2. Premier scroll : Scroll BLOQUÉ, image recule (scale 0.85 + blur 12px)
3. Contenu apparaît en fade-in depuis le bas
4. Une fois révélé : Scroll débloqué, navigation normale

**Code Pattern** :
```tsx
const [isRevealed, setIsRevealed] = useState(false);
const [scrollLocked, setScrollLocked] = useState(true);

// Bloquer le scroll et accumuler
useEffect(() => {
  if (!scrollLocked) return;
  
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    accumulatedScroll.current += e.deltaY;
    
    if (accumulatedScroll.current >= 80) {
      setIsRevealed(true);
      setScrollLocked(false);
    }
  };
  
  document.body.style.overflow = 'hidden';
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  return () => {
    document.body.style.overflow = '';
    window.removeEventListener('wheel', handleWheel);
  };
}, [scrollLocked]);
```

**Contrainte Mobile (Critical UX)** : 
Sur mobile (viewport < 768px), utiliser un swipe up pour déclencher la révélation au lieu de l'accumulation de scroll (évite les saccades liées à la barre d'URL dynamique iOS/Android).

### 4.2 Le Morphing Switch

**Position** : Sticky en haut, sous le Header, visible en permanence après le reveal.

**Comportement** :
- Clic sur "Je Répare" → URL `/shop`, palette Cyan
- Clic sur "J'Apprends" → URL `/academy`, palette Violet
- Animation spring sur le background indicator
- Tout le contenu de la page se transforme (pas de rechargement)

### 4.3 Le Diagnostic IA

**Flow utilisateur** :
```
Étape 1: Type d'appareil
  └── Smartphone | Tablette | Console | Ordinateur

Étape 2: Marque / Modèle
  └── [Sélecteur filtré par type]

Étape 3: Symptôme principal
  └── Écran cassé | Batterie faible | Ne charge plus | N'allume plus | Autre

Étape 4: Précision (si nécessaire)
  └── [Questions conditionnelles selon symptôme]

Résultat:
  └── Produit recommandé + Confiance % + Difficulté + Temps estimé + Lien cours
```

**Fallback** : "Pas sûr ? Parle à Ed, notre assistant."

### 4.4 L'Assistant "Ed" (RAG)

**Identité** :
- Nom : Ed (diminutif d'Edouard)
- Persona : Twin numérique du fondateur, ingénieur, sweat à capuche tech
- Ton : Expert mais accessible, jamais condescendant

**Architecture** :
```
User Question
    │
    ▼
OpenAI Embedding
    │
    ▼
pgvector Similarity Search (top 5 docs)
    │
    ▼
GPT-4 + System Prompt + Context
    │
    ▼
Formatted Response
```

**UI** : FAB en bas à droite, ouvre un drawer/modal de chat.

### 4.5 Family Care (Abonnement)

**Offres** :
| Tier | Prix | Inclus |
|------|------|--------|
| Coup de Main | 29€ one-shot | 1 visio 30min avec technicien |
| Family Care | 9.90€/mois | Garage (10 appareils), Visio illimitée, -15%, Masterclass, Anti-Casse |

**Garage Dashboard** :
- Cards par appareil avec health score (0-100%)
- Dernière date de diagnostic
- Alertes proactives ("Batterie à 78%, envisagez un remplacement")

---

## 5. SEO & PERFORMANCE

### 5.1 Structure URLs

```
/                                   # Landing
/boutique                           # Catalogue
/boutique/smartphones               # Catégorie
/boutique/smartphones/apple         # Sous-catégorie
/boutique/smartphones/apple/iphone-15-pro-ecran-lcd  # Produit

/academie                           # Landing cours
/academie/cours/remplacement-ecran-iphone-15

/diagnostic                         # Outil diagnostic

/family-care                        # Page abonnement
```

**Meta par page** :
```tsx
// Produit
export const metadata = {
  title: "Écran LCD iPhone 15 Pro | Pièce Origine | JRMT",
  description: "Écran LCD iPhone 15 Pro qualité origine. Livraison 24h depuis Metz. Tuto vidéo inclus. Label QualiRepar.",
  openGraph: {
    images: ['/og/ecran-iphone-15-pro.jpg'],
  },
};
```

### 5.2 Performance Targets

| Métrique | Cible | Priorité |
|----------|-------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | 🔴 Critique |
| FID (First Input Delay) | < 100ms | 🔴 Critique |
| CLS (Cumulative Layout Shift) | < 0.1 | 🟡 Important |
| TTI (Time to Interactive) | < 3.5s | 🟡 Important |

**Optimisations obligatoires** :
- Images : `next/image` avec `priority` sur above-the-fold
- Fonts : `next/font` avec `display: swap`
- Composants lourds : `dynamic()` avec `ssr: false`
- 3D/Spline : Lazy-load uniquement desktop, désactivé mobile

### 5.3 Structured Data (JSON-LD)

```json
// Produit
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Écran LCD iPhone 15 Pro",
  "brand": "JRMT",
  "offers": {
    "@type": "Offer",
    "price": "189.90",
    "priceCurrency": "EUR",
    "availability": "InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124"
  }
}

// Organisation
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JeRépareMonTelephone.fr",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Metz",
    "addressCountry": "FR"
  },
  "foundingDate": "2011"
}
```

---

## 6. ANALYTICS & TRACKING

### 6.1 Events à tracker

| Event | Trigger | Paramètres |
|-------|---------|------------|
| `page_view` | Chaque page | path, referrer |
| `diagnostic_start` | Clic sur "Lancer Diagnostic" | device_type |
| `diagnostic_complete` | Fin du diagnostic | result_product_id, confidence |
| `product_view` | Vue fiche produit | product_id, category |
| `add_to_cart` | Ajout panier | product_id, price, quantity |
| `checkout_start` | Début checkout | cart_value, items_count |
| `purchase` | Paiement validé | order_id, total, items |
| `course_start` | Début d'un cours | course_id, is_premium |
| `course_complete` | Fin d'un cours | course_id, duration_watched |
| `ed_conversation` | Message à Ed | intent, has_answer |
| `subscription_start` | Souscription abonnement | tier, price |

### 6.2 Stack Analytics

- **Vercel Analytics** : Web Vitals automatiques
- **PostHog** : Events custom + Funnels + Session replay
- **Google Analytics 4** : Backup + E-commerce enhanced

---

## 7. SÉCURITÉ & ERREURS

### 7.1 Gestion des Erreurs

**Pattern global** :
```tsx
// Error Boundary par section
<ErrorBoundary fallback={<SectionError />}>
  <ProductGrid />
</ErrorBoundary>

// Toast pour erreurs non-critiques
toast.error("Impossible de charger les produits. Réessayez.");

// Pages error custom
/app/error.tsx
/app/not-found.tsx
```

**Messages utilisateur** :
- Jamais de stack traces
- Toujours une action possible ("Réessayer", "Contacter le support")
- Ton rassurant, pas de panique

### 7.2 Sécurité

| Mesure | Implémentation |
|--------|----------------|
| Auth | Supabase Auth (JWT) |
| CSRF | Automatique via Next.js |
| XSS | React escape par défaut |
| SQL Injection | Supabase client (paramétré) |
| Rate Limiting | Vercel Edge + Upstash |
| Secrets | Variables d'environnement Vercel |

---

## 8. ACCESSIBILITÉ (a11y)

### 8.1 Standards

- **Niveau cible** : WCAG 2.1 AA
- **Navigation clavier** : Tous les éléments interactifs focusables
- **Screen readers** : Labels ARIA sur composants custom
- **Contraste** : Minimum 4.5:1 (texte), 3:1 (UI)

### 8.2 Checklist par composant

- [ ] Focus visible sur tous les boutons/liens
- [ ] `aria-label` sur icônes sans texte
- [ ] `role` approprié sur composants custom
- [ ] `alt` sur toutes les images (descriptif ou vide si décoratif)
- [ ] Structure heading logique (h1 → h2 → h3)
- [ ] Skip links en haut de page

---

## 9. WORKFLOW DE DÉVELOPPEMENT

### 9.1 Règles pour l'IA (Kiro/Claude)

1. **Lire avant de coder** : Toujours consulter ce Steering File et `/specs` pour les features complexes
2. **Types first** : Définir les types Supabase avant les composants
3. **Server Components par défaut** : `'use client'` uniquement si nécessaire
4. **Performance** : Pas de 3D sans lazy-load, pas de vidéo autoplay mobile
5. **Accessibilité** : Tester au clavier avant de valider

### 9.2 Structure d'un Ticket

```markdown
## Feature: [NOM]

### Contexte
[Pourquoi cette feature]

### Spec
[Lien vers /specs/xxx.md]

### Critères d'acceptation
- [ ] Critère 1
- [ ] Critère 2

### Design
[Lien Figma ou description]

### Notes techniques
[Contraintes, dépendances]
```

### 9.3 Git Flow

```
main ────────────────────────────────────────▶
       │                    │
       │ feature/xxx        │ hotfix/yyy
       ▼                    ▼
   ────●────●────●──────────●────▶ merge
```

- **main** : Production (Vercel auto-deploy)
- **feature/*** : Nouvelles features (PR obligatoire)
- **hotfix/*** : Corrections urgentes

---

## 10. CHECKLIST DE LANCEMENT

### 10.1 Avant mise en prod

- [ ] Variables d'environnement configurées (Vercel)
- [ ] Stripe en mode Live
- [ ] DNS configuré (jereparemontelephone.fr → Vercel)
- [ ] SSL actif
- [ ] Analytics configurés
- [ ] Emails transactionnels testés
- [ ] Backup BDD automatique (Supabase)
- [ ] Monitoring uptime (Better Uptime / Checkly)

### 10.2 Post-lancement

- [ ] Test commande réelle (achat + livraison)
- [ ] Test abonnement (cycle complet)
- [ ] Test diagnostic sur 10 pannes différentes
- [ ] Audit Lighthouse > 90 sur toutes les pages
- [ ] Test mobile (iOS Safari + Android Chrome)

---

## ANNEXES

### A. Contacts Clés

| Rôle | Contact |
|------|---------|
| Direction | [À compléter] |
| Tech Lead | [À compléter] |
| Support Utopya | [À compléter] |

### B. Ressources Externes

- Utopya (Fournisseur) : https://www.utopya.fr/
- Supabase Docs : https://supabase.com/docs
- Stripe Docs : https://stripe.com/docs
- Next.js Docs : https://nextjs.org/docs
- Framer Motion : https://www.framer.com/motion/

### C. Glossaire

| Terme | Définition |
|-------|------------|
| Shadow Catalog | Catalogue miroir du fournisseur |
| Phygital | Fusion physique + digital |
| RAG | Retrieval-Augmented Generation |
| LCP | Largest Contentful Paint |
| QualiRepar | Label français de qualité réparation |
| Curtain Reveal | Animation Hero avec scroll bloqué |

---

**FIN DU DOCUMENT**

*Ce Steering File est vivant. Toute modification majeure doit être validée par la Direction.*
