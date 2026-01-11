import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing icons
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
// Achievements removed
import Hackathons from "@/components/Hackathons";
import Education from "@/components/Education";

import PacmanGame from "@/components/PacmanGame";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pacman-yellow selection:text-black">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* Achievements removed */}
      <Hackathons />
      <Education />
      <PacmanGame />

      {/* Footer / Game Over */}
      <footer className="py-12 bg-gray-900 border-t-8 border-double border-red-900 text-center">
        <p className="font-arcade text-3xl text-red-600 animate-pulse mb-4">GAME OVER</p>
        <p className="font-vt323 text-gray-500">© 2026 Naomi Andrea Pereira.</p>
        <div className="mt-6 flex justify-center gap-6">
          <Link href="https://github.com/Naomiiap" target="_blank" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub size={32} />
          </Link>
          {/* Add other socials here later if needed */}
        </div>
      </footer>
    </main>
  );
}
