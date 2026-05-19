import { motion } from "framer-motion";

export default function SectionDivider({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center py-12 md:py-16"
    >
      <div
        className="w-16 h-px mx-auto mb-8"
        style={{ background: "linear-gradient(to right, transparent, hsl(38,90%,62%), transparent)", opacity: 0.35 }}
      />
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight"
          style={{ color: "hsl(45,20%,93%)" }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-sm tracking-wider font-light max-w-sm mx-auto"
          style={{ color: "hsl(220,10%,55%)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}