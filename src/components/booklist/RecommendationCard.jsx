import { motion } from "framer-motion";

export default function RecommendationCard({ rec, index = 0 }) {
  // Задаем значение по умолчанию index = 0, если он не передан извне
  const title = rec.book_title || rec.title || "Без названия";
  const author = rec.book_author || rec.author || "Автор не указан";
  const name = rec.name || rec.recommender_name || rec.username || "Аноним";
  const text = rec.text || rec.description || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      // Теперь delay гарантированно отработает без ошибок NaN
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
      className="py-4 border-b border-white/[0.04] last:border-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* Название книги */}
          <h3 className="text-sm md:text-base text-white/90 font-medium">
            {title}
          </h3>
          {/* Автор книги */}
          <p className="mt-0.5 text-xs text-muted-foreground tracking-wider uppercase">
            {author}
          </p>
          {/* Текст рекомендации */}
          {text && <p className="mt-2 text-xs text-muted-foreground/70 leading-relaxed">{text}</p>}
        </div>
        {/* Имя отправителя */}
        <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase shrink-0 pt-1">
          от {name}
        </span>
      </div>
    </motion.div>
  );
}