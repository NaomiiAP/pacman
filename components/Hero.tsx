"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-brutal-cyan border-b-8 border-black pt-20">
            {/* Brutalist geometric shapes in background */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-brutal-pink border-8 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-full animate-[spin_10s_linear_infinite] opacity-50 hidden md:block"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-brutal-yellow border-8 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] rotate-12 opacity-50 hidden md:block"></div>

            <div className="z-10 mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="bg-white border-8 border-black p-8 md:p-12 shadow-[16px_16px_0_rgba(0,0,0,1)] rotate-[-2deg] max-w-4xl mx-auto"
                >
                    <h1 className="font-black text-5xl md:text-7xl lg:text-8xl leading-none text-black uppercase tracking-tighter mb-6">
                        Naomi Andrea<br />Pereira
                    </h1>
                    
                    <div className="inline-block bg-brutal-yellow border-4 border-black px-6 py-3 shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-2 mb-6">
                        <p className="font-bold text-xl md:text-3xl text-black uppercase tracking-widest m-0">
                            Full Stack Developer
                        </p>
                    </div>
                    <br />
                    <div className="inline-block bg-brutal-pink border-4 border-black px-6 py-3 shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-1">
                        <p className="font-bold text-xl md:text-3xl text-black uppercase tracking-widest m-0">
                            AI/ML Engineer
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 w-full max-w-[100vw] overflow-hidden bg-black py-4 border-y-4 border-black -rotate-1 relative left-1/2 -translate-x-1/2 shadow-[0_8px_0_#f472b6]"
                >
                    <div className="flex w-max animate-marquee">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-brutal-yellow font-black text-2xl mx-4 uppercase whitespace-nowrap">
                                OPEN TO WORK • LET'S BUILD SOMETHING • 
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
