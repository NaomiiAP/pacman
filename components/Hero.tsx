"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-black">
            {/* Maze Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%232121DE' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Animated Pacman Chase */}
            <div className="absolute top-32 w-full overflow-hidden z-0">
                <motion.div
                    className="flex items-center gap-8"
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    {/* Pacman */}
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-pacman-yellow rounded-full animate-chomp relative">
                        <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-black rounded-full" />
                    </div>

                    {/* Ghosts */}
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-ghost-red rounded-t-full relative animate-bounce">
                        <div className="flex justify-center gap-1 pt-3">
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-1" /></div>
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-0.5" /></div>
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-between px-0.5">
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                        </div>
                    </div>

                    <div className="w-8 h-8 md:w-12 md:h-12 bg-ghost-pink rounded-t-full relative animate-bounce delay-75">
                        <div className="flex justify-center gap-1 pt-3">
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-1" /></div>
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-0.5" /></div>
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-between px-0.5">
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                        </div>
                    </div>

                    <div className="w-8 h-8 md:w-12 md:h-12 bg-ghost-cyan rounded-t-full relative animate-bounce delay-150">
                        <div className="flex justify-center gap-1 pt-3">
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-1" /></div>
                            <div className="w-2.5 h-2.5 bg-white rounded-full"><div className="w-1 h-1 bg-blue-700 rounded-full ml-0.5" /></div>
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-between px-0.5">
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                            <div className="w-2 h-2 bg-black rounded-full -mb-1" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="z-10 space-y-8 mt-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-ghost-cyan font-vt323 text-2xl md:text-3xl tracking-wider mb-4 animate-pulse"
                >

                </motion.h2>

                <div className="border-4 border-double border-maze-blue p-8 bg-black/80 shadow-[0_0_20px_rgba(33,33,222,0.6)]">
                    <h1 className="font-arcade text-3xl md:text-5xl lg:text-7xl leading-tight text-pacman-yellow drop-shadow-[4px_4px_0_rgba(168,0,0,0.8)] mb-4">
                        NAOMI ANDREA PEREIRA
                    </h1>
                    <div className="overflow-hidden whitespace-nowrap border-r-4 border-ghost-pink animate-[typing_3.5s_steps(40,end)_infinite,blink-caret_0.75s_step-end_infinite] inline-block">
                        <p className="font-arcade text-xs md:text-sm text-ghost-pink tracking-widest">
                            FULL STACK DEVELOPER | AI ENTHUSIAST
                        </p>
                    </div>
                </div>

                {/* Score display removed */}
            </div>
        </section>
    );
}
