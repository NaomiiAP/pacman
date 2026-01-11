"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXP", href: "#experience" },
    { name: "ACHIEVEMENTS", href: "#achievements" },
    { name: "HACKATHONS", href: "#hackathons" },
    { name: "EDU", href: "#education" },
];

export default function NavBar() {
    const [active, setActive] = useState("HOME");

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-black/80 border-b-2 border-maze-blue backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-pacman-yellow font-arcade text-lg tracking-widest hover:text-white transition-colors">
                            NAOMI
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActive(item.name)}
                                    className={`px-3 py-2 rounded-md text-sm font-arcade transition-colors duration-200 ${active === item.name
                                        ? "text-pacman-yellow animate-pulse"
                                        : "text-gray-300 hover:text-ghost-cyan hover:bg-white/10"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
