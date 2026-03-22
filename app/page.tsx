"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [particles, setParticles] = useState<any[]>([]);

  const scenes = [
    { title: "|| श्री गणेशाय नमः ||", sub: "A Beautiful Beginning" },
    { title: "Poonam ❤️ Rahul", sub: "Are Getting Married" },
    { title: "Haldi & Mehendi", sub: "19 April 2026" },
    { title: "Wedding Day 💍", sub: "20 April 2026" },
  ];

  // ✅ SAFE PARTICLES (no window error)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const arr = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2,
      }));

      setParticles(arr);
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative text-white flex items-center justify-center">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600" />

      {/* ✨ Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            width: p.size,
            height: p.size,
          }}
          initial={{ x: p.x, y: p.y }}
          animate={{
            y: [p.y, p.y - 100, p.y],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* 🟢 START SCREEN */}
      {!start && (
        <motion.div
          onClick={() => setStart(true)}
          className="cursor-pointer px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30"
          whileTap={{ scale: 0.9 }}
        >
          Tap to open →
        </motion.div>
      )}

      {/* 📱 SLIDES */}
      <AnimatePresence mode="wait">
        {start && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute text-center"
          >
            <h1 className="text-3xl font-bold mb-2">
              {scenes[step].title}
            </h1>
            <p className="text-lg opacity-80">
              {scenes[step].sub}
            </p>

            {/* 👉 NEXT BUTTON (last page pe nahi) */}
            {step < scenes.length - 1 && (
              <button
                onClick={() => setStep(step + 1)}
                className="mt-6 px-5 py-2 bg-white text-black rounded-full"
              >
                Next →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}