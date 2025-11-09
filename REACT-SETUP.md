# React Portfolio Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Install Additional Tailwind Plugin
```bash
npm install tailwindcss-animate
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
personal-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── Navigation.tsx      # Sticky navigation bar
│   ├── Hero.tsx           # Hero section with portrait
│   ├── Marquee.tsx        # Animated marquee text
│   ├── About.tsx          # About/Story section
│   ├── POV.tsx            # POV/Blog cards
│   ├── Projects.tsx       # Projects showcase
│   ├── WebinarsCarousel.tsx  # Webinars carousel
│   ├── Flashcards.tsx     # Interactive flashcards
│   ├── Contact.tsx        # Contact section
│   └── Footer.tsx         # Footer
├── data/
│   ├── webinars.ts        # Webinars data (EDIT THIS)
│   └── flashcards.ts      # Flashcards data (EDIT THIS)
├── lib/
│   └── utils.ts           # Utility functions
├── public/
│   └── images/            # Add your images here
│       ├── five_year_old_rm.jpg
│       ├── webinar-*.jpg
│       └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Using shadcn/ui Components

To add shadcn/ui components:

```bash
npx shadcn-ui@latest init
```

Then add components as needed:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
```

## 📝 Components to Create

I've set up the structure. You'll need to create these components in the `components/` folder:

### components/Navigation.tsx
```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'My Story' },
    { href: '#pov', label: 'POV' },
    { href: '#projects', label: 'Projects' },
    { href: '#webinars', label: 'Webinars' },
    { href: '#flashcards', label: 'Learn' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#home" className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] hover:scale-105 transition-transform">
          KP
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

### components/Hero.tsx
```typescript
'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-visible pt-20 pb-16 px-6">
      {/* Background Portrait Image */}
      <div
        className="absolute top-0 right-0 w-[60%] h-screen bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/five_year_old_rm.jpg)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="max-w-[1200px] w-full relative z-10">
        <div className="w-[40%] pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <Sparkles className="w-12 h-12 animate-spin-slow" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
              Hey, I'm Komil.
              <span className="block text-3xl lg:text-4xl text-gray-600 font-medium mt-4">
                I build ML models and break things (for learning).
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-[600px]">
              20-year-old machine learning enthusiast from Gujarat who ditched traditional college
              to learn faster on my own terms. TensorFlow certified, Kaggle competitor, and
              perpetually curious about what makes AI tick.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Read My Story
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#flashcards"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all hover:-translate-y-1"
              >
                Quick Learn ⚡
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
```

### components/Marquee.tsx
```typescript
export default function Marquee() {
  const text = "Machine Learning ★ TensorFlow ★ PyTorch ★ Meta-Learning ★ Kaggle Competitor ★ Self-Taught Developer ★ ";

  return (
    <div className="relative z-10 bg-black text-white py-4 overflow-hidden border-y-2 border-black">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="pr-12 font-semibold">{text}</span>
        <span className="pr-12 font-semibold">{text}</span>
      </div>
    </div>
  );
}
```

## 📊 Data Management

All data is centralized in the `data/` folder:

### Edit Webinars (`data/webinars.ts`)
Simply add, remove, or reorder objects in the `webinarsData` array:

```typescript
{
  id: 6,
  title: "Your New Webinar",
  date: "April 2024",
  description: "Description here...",
  image: "/images/your-image.jpg",
  attendees: "300+",
  linkedInUrl: "https://www.linkedin.com/..."
}
```

### Edit Flashcards (`data/flashcards.ts`)
Add flashcards to the `flashcardsData` array:

```typescript
{
  id: 21,
  category: 'basics',
  question: "Your question?",
  answer: "Your answer here."
}
```

## 🖼️ Images

Place all images in `public/images/`:
- `five_year_old_rm.jpg` - Your portrait
- `webinar-*.jpg` - Webinar images
- Any other assets

Reference them in code as `/images/filename.jpg`

## 🎨 Styling with Tailwind

This project uses Tailwind CSS for styling. You can:
- Use utility classes directly in JSX
- Create custom classes in `globals.css`
- Add custom theme values in `tailwind.config.ts`

## 📦 Adding UI Libraries

### shadcn/ui (Recommended)
```bash
npx shadcn-ui@latest add [component-name]
```

### Aceternity UI
```bash
npm install @aceternity/ui
```

### Hero UI (Next UI)
```bash
npm install @nextui-org/react framer-motion
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Next Steps

1. Install dependencies: `npm install`
2. Create all component files in `components/` folder
3. Add your images to `public/images/`
4. Edit data in `data/webinars.ts` and `data/flashcards.ts`
5. Run `npm run dev`
6. Customize styling and add more UI components as needed

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Aceternity UI](https://ui.aceternity.com/)

## 💡 Tips

- Use `'use client'` directive for interactive components
- Data is in TypeScript files for type safety
- Images are optimized with Next.js Image component
- Animations use Framer Motion for smooth transitions
- Carousel uses embla-carousel for touch support

---

Need help? Check the Next.js docs or reach out!
