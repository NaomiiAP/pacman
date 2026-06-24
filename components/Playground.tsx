"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const STICKERS = [
  { id: 1, text: "WOW", color: "bg-brutal-yellow", rotate: -12, x: 50, y: 50 },
  { id: 2, text: "COOL!", color: "bg-brutal-pink", rotate: 8, x: 200, y: 150 },
  { id: 3, text: "DRAG ME", color: "bg-brutal-cyan", rotate: -6, x: 100, y: 250 },
  { id: 4, text: "100%", color: "bg-brutal-green", rotate: 15, x: 300, y: 50 },
];

export default function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="py-20 px-4 bg-brutal-blue border-b-8 border-black relative overflow-hidden" id="playground">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white drop-shadow-[4px_4px_0_#000]">
            Playground
          </h2>
          <p className="text-xl md:text-2xl font-bold mt-4 bg-white text-black inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0_#000] rotate-1">
            Drag these stickers around!
          </p>
        </div>

        <div 
          ref={containerRef}
          className="w-full h-[400px] md:h-[500px] bg-white border-8 border-black shadow-[16px_16px_0_#000] relative overflow-hidden pattern-dots"
          style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}
        >
          {STICKERS.map((sticker) => (
            <motion.div
              key={sticker.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              initial={{ x: sticker.x, y: sticker.y, rotate: sticker.rotate }}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 10 }}
              className={`absolute cursor-grab active:cursor-grabbing px-6 py-4 border-4 border-black shadow-[8px_8px_0_#000] font-black text-2xl md:text-4xl uppercase ${sticker.color}`}
            >
              {sticker.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
