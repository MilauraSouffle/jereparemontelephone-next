# MASTER STEERING FILE : JeRépareMonTelephone.fr (JRMT)

**Code Projet** : JRMT-OMEGA  
**Version** : 3.0 (Production Ready)  
**Statut** : Constitution Immuable  
**Propriétaires** : Direction Générale (Metz)  
**Dernière MAJ** : Décembre 2025

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

---

## 2. STACK TECHNIQUE & ARCHITECTURE

### 2.1 Stack Principale

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| **Framework** | Next.js | 15.x | App Router, Server Components, Performance |
| **Styling** | Tailwind CSS | 4.x | Utility-first, Design System cohérent |
| **Components** | Shadcn/UI + Radix | Latest | Accessibilité native, Headless |
| **Animation** | Framer Motion | 11.x | Layout animations, Gestures |
| **Scroll** | Lenis | 1.x | Smooth scroll premium |
| **Backend** | Supabase | Latest | Auth, DB, Storage, Realtime |
| **Vector DB** | pgvector | - | RAG pour assistant "Ed" |
| **Paiements** | Stripe | Latest | Subscriptions + One-shot |
| **Hosting** | Vercel | - | Edge functions, Preview deployments |

### 2.2 Architecture des Dossiers

```
/app
├── (shop)/                    # Groupe : Mode "Je Répare"
│   ├── page.tsx              # Landing Shop
│   ├── produits/
│   │   ├── [category]/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Fiche produit
│   ├── diagnostic/
│   │   └── page.tsx          # Diagnostic IA
│   ├── panier/
│   │   └── page.tsx          # Panier + Checkout
│   └── checkout/
│       └── page.tsx          # Stripe Checkout
│
├── (academy)/                 # Groupe : Mode "J'Apprends"
│   ├── page.tsx              # Landing Académie
│   ├── cours/
│   │   ├── [category]/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Page cours
│   └── masterclass/
│       └── page.tsx
│
├── (auth)/                    # Authentification
│   ├── connexion/
│   ├── inscription/
│   └── mon-compte/
│       ├── commandes/
│       ├── garage/           # Dashboard Family Care
│       └── abonnement/
│
├── api/                       # API Routes
│   ├── diagnostic/
│   ├── products/
│   ├── stripe/
│   │   ├── webhook/
│   │   └── create-session/
│   └── ed/                   # Assistant RAG
│       └── chat/
│
└── layout.tsx                # Root Layout

/components
├── ui/                       # Shadcn components
├── shop/                     # Composants e-commerce
├── academy/                  # Composants éducation
├── shared/                   # Header, Footer, etc.
└── ed/                       # Assistant "Ed"

/lib
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── types.ts              # Types générés
├── stripe/
├── utils/
└── constants.ts

/specs                        # Spécifications détaillées
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
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10,2)
);

-- Cours (Académie)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id), -- Lié à une pièce
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  level TEXT CHECK (level IN ('debutant', 'intermediaire', 'expert')),
  duration_minutes INT,
  video_url TEXT,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE course_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT,
  duration_seconds INT,
  chapter_order INT NOT NULL
);

-- Documents pour RAG (Assistant Ed)
CREATE TABLE ed_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),       -- OpenAI embeddings
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche vectorielle
CREATE INDEX ON ed_documents USING ivfflat (embedding vector_cosine_ops);
```

### 2.4 Row Level Security (RLS)

```sql
-- Activer RLS sur toutes les tables sensibles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view own devices"
  ON user_devices FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 3. DESIGN SYSTEM : "CLINICAL CYBER"

### 3.1 Philosophie
L'identité visuelle est **fonctionnelle** : elle inspire la précision médicale, la confiance, la technologie avancée.

**Mots-clés** : Propre, Lumineux, Précis, Futuriste, Rassurant

### 3.2 Palette de Couleurs

```css
:root {
  /* Surfaces */
  --surface-primary: #F8F9FA;      /* Off-White Mat */
  --surface-secondary: #FFFFFF;    /* Blanc Pur */
  --surface-elevated: #FFFFFF;     /* Cards */
  --surface-dark: #0F172A;         /* Footer, Dark sections */
  
  /* Accents */
  --accent-cyan: #00F0FF;          /* CTA primaires, Mode Shop */
  --accent-cyan-glow: rgba(0, 240, 255, 0.3);
  --accent-violet: #7000FF;        /* Mode Académie */
  --accent-violet-glow: rgba(112, 0, 255, 0.3);
  
  /* Sémantiques */
  --success: #10B981;              /* En stock, Validé */
  --warning: #F59E0B;              /* Attention, Stock bas */
  --error: #EF4444;                /* Erreur, Rupture */
  --info: #3B82F6;                 /* Information */
  
  /* Texte */
  --text-primary: #0F172A;         /* Slate 900 */
  --text-secondary: #64748B;       /* Slate 500 */
  --text-muted: #94A3B8;           /* Slate 400 */
  --text-inverse: #FFFFFF;
  
  /* Bordures */
  --border-light: #E2E8F0;         /* Slate 200 */
  --border-glass: rgba(255, 255, 255, 0.4);
}
```

### 3.3 Typographie

```css
/* Font Stack */
--font-sans: 'Inter', 'Geist Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Échelle */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */

/* Tracking (lettres serrées sur titres) */
--tracking-tight: -0.025em;
--tracking-normal: 0;
```

### 3.4 Effets & Matériaux

```css
/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* Glow Effects */
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3),
              0 0 40px rgba(0, 240, 255, 0.1);
}

.glow-violet {
  box-shadow: 0 0 20px rgba(112, 0, 255, 0.3),
              0 0 40px rgba(112, 0, 255, 0.1);
}

/* Ombres */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### 3.5 Composants Standards

| Composant | Border Radius | Padding | Notes |
|-----------|---------------|---------|-------|
| Button Primary | 12px | 16px 24px | Gradient cyan, glow on hover |
| Button Secondary | 12px | 16px 24px | Border only, fill on hover |
| Card | 16px | 24px | Shadow-md, border light |
| Card Elevated | 24px | 32px | Shadow-xl, pour CTAs |
| Input | 12px | 12px 16px | Border on focus: cyan |
| Modal | 24px | 32px | Centered, backdrop blur |
| Badge | 8px | 4px 12px | Small, colored bg |

---

## 4. UX & FONCTIONNALITÉS CLÉS

### 4.1 Le Hero "Cinematic Reveal" (Effet Waaow)

**Concept** : L'utilisateur est immergé dans une image/vidéo plein écran. En scrollant, l'interface "émerge" par le bas.

**Séquence d'animation** :
1. **État Initial (scroll = 0)** : 
   - Image/Vidéo HD plein écran (aspect labo futuriste, lumière cyan)
   - Zéro UI visible (sauf logo discret)
   - Indicateur "Scroll" animé en bas

2. **Scroll 0% → 30%** :
   - L'image commence à `scale(0.95)` et `blur(2px)`
   - Le Header apparaît en `translateY` depuis le haut

3. **Scroll 30% → 60%** :
   - L'image continue de reculer `scale(0.85)`
   - Le Morphing Switch apparaît
   - Le contenu principal remonte

4. **Scroll 60% → 100%** :
   - L'image est "derrière" l'interface (`scale(0.7)`, `blur(8px)`)
   - Interface complètement visible
   - L'image reste en sticky derrière comme "texture"

**Code Pattern** :
```tsx
const { scrollYProgress } = useScroll();
const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
const blur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
```

### 4.2 Le Morphing Switch

**Position** : Sticky en haut, sous le Header, visible en permanence après le reveal.

**Comportement** :
- Clic sur "Je Répare" → URL `/shop`, palette Cyan
- Clic sur "J'Apprends" → URL `/academy`, palette Violet
- Transition : `layout` animation Framer Motion (le fond "glisse")

**États visuels** :
```
┌─────────────────────────────────────┐
│  [🛠️ Je Répare]  |  J'Apprends 🎓   │  ← Mode Shop (Cyan actif)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Je Répare 🛠️  |  [J'Apprends 🎓]  │  ← Mode Academy (Violet actif)
└─────────────────────────────────────┘
```

### 4.3 L'Assistant "Ed"

**Identité** :
- Prénom : Ed (diminutif d'Edouard)
- Visuel : Avatar stylisé, ingénieur tech, hoodie, lunettes
- Personnalité : Expert bienveillant, jamais condescendant, précis

**Architecture RAG** :
```
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│ Question     │────▶│ Embedding       │────▶│ pgvector     │
│ Utilisateur  │     │ (OpenAI)        │     │ (Similarity) │
└──────────────┘     └─────────────────┘     └──────────────┘
                                                    │
                                                    ▼
┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│ Réponse      │◀────│ LLM (GPT-4)     │◀────│ Contexte     │
│ Formatée     │     │ + Prompt System │     │ (Top 5 docs) │
└──────────────┘     └─────────────────┘     └──────────────┘
```

**UI** :
- Bulle flottante (FAB) en bas à droite
- Badge "En ligne" avec pulse vert
- Chat drawer ou modal selon device
- Suggestions de questions rapides

**Prompt System** :
```
Tu es Ed, l'assistant technique de JeRépareMonTelephone.fr.
Tu es un ingénieur expert en réparation d'appareils électroniques.
Tu travailles avec l'équipe de l'atelier de Metz depuis 2011.

Règles :
- Réponds de manière précise et technique mais accessible
- Si tu ne sais pas, dis-le et suggère de contacter l'atelier
- Recommande toujours les pièces du catalogue JRMT quand pertinent
- Mentionne le label QualiRepar si on parle de qualité/confiance
- Propose l'assistance visio si la réparation semble complexe
```

### 4.4 Le Diagnostic IA (Entonnoir)

**Flux simplifié** :
```
Étape 1: Type d'appareil
    │
    ├── Smartphone ──▶ Étape 2a: Marque mobile
    ├── Tablette ────▶ Étape 2b: Marque tablette
    ├── Console ─────▶ Étape 2c: Type console
    └── Ordinateur ──▶ Étape 2d: Type ordi
    
Étape 2: Marque/Modèle
    │
    └── Sélection ──▶ Étape 3: Symptôme principal
    
Étape 3: Symptôme
    │
    ├── Écran cassé ────▶ Étape 4a: État écran
    ├── Batterie ───────▶ Étape 4b: Symptômes batterie
    ├── Ne charge plus ─▶ Résultat: Connecteur
    └── Autre ──────────▶ Chat avec Ed
    
Étape 4: Précision
    │
    └── Réponse ──▶ RÉSULTAT: Pièce recommandée + Confiance %
```

**Résultat** :
- Nom de la pièce recommandée
- Prix
- Niveau de difficulté (1-5 points)
- Temps estimé
- Lien vers le cours associé
- Bouton "Ajouter au panier"
- Option "Pas sûr ? Parler à Ed"

### 4.5 Family Care (Abonnement)

**Tiers** :

| Tier | Prix | Features |
|------|------|----------|
| **Free** | 0€ | Accès tutos basiques avec achat pièce |
| **Coup de Main** | 29€ (one-shot) | 1 session visio 30min avec technicien |
| **Family Care** | 9.90€/mois | Tout inclus (voir ci-dessous) |

**Family Care inclut** :
- Dashboard "Garage Famille" (jusqu'à 10 appareils)
- Visio illimitée avec techniciens
- -15% permanent sur tout le catalogue
- Accès Masterclass premium
- Garantie "Anti-Casse" : envoi gratuit à Metz si blocage
- Support prioritaire

**Dashboard Garage** :
```
┌─────────────────────────────────────────────────────────────┐
│  MON GARAGE FAMILLE                         [+ Ajouter]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ 📱 iPhone Maman │  │ 🎮 Switch Kids  │                  │
│  │ ████████░░ 85%  │  │ ██████░░░░ 62%  │                  │
│  │ ✓ Santé OK      │  │ ⚠ Batterie      │                  │
│  │ Dernier diag:   │  │ Dernier diag:   │                  │
│  │ il y a 2 sem.   │  │ il y a 3 mois   │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ 💻 MacBook Pro  │  │ 📱 Samsung Papa │                  │
│  │ █████████░ 92%  │  │ ███████░░░ 71%  │                  │
│  │ ✓ Santé OK      │  │ ✓ Santé OK      │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.6 Infinity Series (Produit Premium)

**Concept** : Batteries haute capacité avec technologie Silicium-Carbone.

**Angle Marketing** : "Upgrade" (amélioration) vs "Réparation" (remplacement à l'identique)

**UI Fiche Produit** :
```
┌─────────────────────────────────────────────────────────────┐
│  BATTERIE INFINITY - iPhone 15 Pro Max                      │
│  ═══════════════════════════════════════════════════════    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  CAPACITÉ COMPARÉE                                │     │
│  │                                                   │     │
│  │  Origine Apple    ████████████░░░░░░  3274 mAh   │     │
│  │  INFINITY Series  █████████████████░  4200 mAh   │     │
│  │                                      (+28%)       │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ✓ Technologie Silicium-Carbone                            │
│  ✓ +500 cycles de charge                                   │
│  ✓ Garantie 2 ans JRMT                                     │
│                                                             │
│  Prix : 59,90€ TTC        [AJOUTER AU PANIER]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.7 Marquee Separators

**Usage** : Séparer les sections principales avec une bande défilante.

**Style** :
- Fond : Noir (#0F172A)
- Texte : Blanc, Uppercase, Font-medium
- Séparateur entre items : Cyan (#00F0FF) ou étoile ✦
- Animation : Infinite scroll horizontal (60s pour un tour complet)

**Contenu type** :
```
ATELIER METZ DEPUIS 2011 ✦ LABEL QUALIREPAR ✦ SOUVERAINETÉ TECH ✦ EXPÉDITION 24H ✦ 15 000+ PIÈCES EN STOCK ✦
```

---

## 5. SEO & PERFORMANCE

### 5.1 Structure SEO

**URLs** :
```
/                                    # Landing principale
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

// Page 500 custom
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

1. **Lire avant de coder** : Toujours consulter `/specs` pour les features complexes
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

---

**FIN DU DOCUMENT**

*Ce Steering File est vivant. Toute modification majeure doit être validée par la Direction.*
