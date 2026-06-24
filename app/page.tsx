import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing icons
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Hackathons from "@/components/Hackathons";
import Education from "@/components/Education";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-black selection:bg-brutal-yellow selection:text-black">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Hackathons />
      <Education />
      <Playground />

      {/* Brutalist Footer */}
      <footer className="py-12 bg-brutal-yellow border-t-8 border-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-black drop-shadow-[4px_4px_0_#fff]">
            Let's Connect
          </h2>
          <p className="font-bold text-xl mb-8 bg-black text-white px-4 py-2 inline-block -rotate-2">
            © {new Date().getFullYear()} Naomi Andrea Pereira.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="https://github.com/Naomiiap" target="_blank" className="brutal-card p-4 rounded-full hover:bg-brutal-cyan hover:scale-110 transition-transform">
              <FaGithub size={32} />
            </Link>
            {/* Add other socials here later if needed */}
          </div>
        </div>
      </footer>
    </main>
  );
}
