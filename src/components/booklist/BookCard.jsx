import { motion } from "framer-motion";

const statusConfig = {
  essential: { label: "Essential", dotClass: "bg-amber-400", textClass: "text-amber-400/80" },
  currently_reading: { label: "Reading now", dotClass: "bg-emerald-400", textClass: "text-emerald-400/80" },
  on_list: { label: "On List", dotClass: "bg-blue-400", textClass: "text-blue-400/80" },
  // Для книг без статуса мы просто ничего не будем показывать
  completed: { label: "", dotClass: "", textClass: "" },
};

export default function BookCard({ book, index = 0 }) {
  // Безопасное получение статуса (если поля нет, используем completed)
  const status = statusConfig[book.status] || statusConfig.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative"
    >
      <div
        className="relative px-6 py-5 md:px-8 md:py-6 rounded-xl 
        backdrop-blur-xl
        border border-white/[0.07]
        transition-all duration-500
        hover:border-amber-400/20
        hover:shadow-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)"
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/30 transition-all duration-500" />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-lg md:text-xl leading-snug tracking-tight"
              style={{ color: "hsl(45,20%,93%)" }}>
              {book.title || "Без названия"}
            </h3>
            <p className="mt-1.5 text-xs md:text-sm tracking-widest uppercase font-light"
              style={{ color: "hsl(220,10%,58%)" }}>
              {book.author || "Автор неизвестен"}
            </p>
          </div>

          {/* Отображаем статус только если он задан */}
          {status.label && (
            <div className="flex items-center gap-2 shrink-0 pt-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${status.dotClass} animate-pulse`}
                style={{ animationDuration: "3s" }}
              />
              <span className={`text-[10px] tracking-widest uppercase ${status.textClass}`}>
                {status.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}