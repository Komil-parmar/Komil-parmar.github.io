import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import POV from "@/components/POV";
import Projects from "@/components/Projects";
import WebinarsCarousel from "@/components/WebinarsCarousel";
import Flashcards from "@/components/Flashcards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Marquee />
      <About />
      <POV />
      <Projects />
      <WebinarsCarousel />
      <Flashcards />
      <Contact />
      <Footer />
    </main>
  );
}
