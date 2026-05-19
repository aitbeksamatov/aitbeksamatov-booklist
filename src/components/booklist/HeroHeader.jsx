import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
// Импортируем локальный аватар из новой папки assets
import avatarImg from "../../assets/avatar.jpg";

export default function HeroHeader() {
  return (
    <header className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 flex flex-col items-center text-center">
      {/* Ambient glow behind portrait */}
      <div
        className="absolute top-4 w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38,90%,62%) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Author portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mb-8 z-10"
      >
        {/* Outer halo ring */}
        <div
          className="absolute -inset-3 rounded-full animate-pulse pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, hsl(38,90%,62%) 30%, transparent 60%, hsl(210,80%,65%) 80%, transparent 100%)",
            opacity: 0.25,
            animationDuration: "6s",
            filter: "blur(4px)",
          }}
        />
        <div
          className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(200,160,80,0.12)",
          }}
        >
          {/* Использована локальная переменная аватарки вместо ссылки base44 */}
          <img
            src={avatarImg}
            alt="Aitbek Samatov"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="z-10"
      >
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
          style={{ color: "hsl(45,20%,93%)" }}>
          AITBEK SAMATOV
        </h1>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
          style={{ color: "hsl(38,90%,68%)" }}>
          — <em className="italic">Book List</em>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-5 text-sm md:text-base tracking-widest uppercase font-light max-w-md z-10"
        style={{ color: "hsl(220,10%,55%)" }}
      >
        Личная коллекция книг, которые формируют мышление
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="mt-10 w-24 h-px z-10"
        style={{
          background: "linear-gradient(to right, transparent, hsl(38,90%,62%), transparent)",
          opacity: 0.4,
        }}
      />

      {/* CTA button — jump to recommendation form */}
      <motion.a
        href="#recommend"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="mt-8 z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:border-amber-400/40 hover:shadow-lg"
        style={{
          background: "rgba(255,255,255,0.04)",
          color: "hsl(38,90%,62%)",
        }}
      >
        <BookOpen className="w-3.5 h-3.5" />
        Рекомендовать книгу
      </motion.a>
    </header>
  );
}