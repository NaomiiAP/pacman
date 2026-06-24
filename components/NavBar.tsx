"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXP", href: "#experience" },
    { name: "HACKATHONS", href: "#hackathons" },
    { name: "EDU", href: "#education" },
    { name: "PLAY", href: "#playground" },
];

export default function NavBar() {
    const [active, setActive] = useState("HOME");

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-white border-b-8 border-black shadow-[0_8px_0_rgba(0,0,0,1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-black font-black text-3xl tracking-tighter uppercase bg-brutal-yellow px-3 py-1 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all">
                            NAOMI
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setActive(item.name)}
                                    className={`px-4 py-2 text-md font-bold uppercase border-4 transition-all duration-200 ${active === item.name
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-transparent hover:border-black hover:bg-brutal-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"
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
