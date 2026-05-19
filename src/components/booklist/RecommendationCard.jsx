import { motion } from "framer-motion";

export default function RecommendationCard({ rec, index }) {
  // Проверяем все возможные ключи (и с префиксом book_, и чистые title/author)
  const title = rec.book_title || rec.title || "Без названия";
  const author = rec.book_author || rec.author || "Автор не указан";
  const name = rec.name || rec.recommender_name || rec.username || "Аноним";
  const text = rec.text || rec.description || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
      className="py-4 border-b border-white/[0.04] last:border-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* Название книги (крупный текст) */}
          <h3 className="text-sm md:text-base text-foreground/90 font-medium">
            {title}
          </h3>
          {/* Автор книги (мелкий текст под названием) */}
          <p className="mt-0.5 text-xs text-muted-foreground tracking-wider uppercase">
            {author}
          </p>
          {/* Текст рекомендации (если есть) */}
          {text && <p className="mt-2 text-xs text-muted-foreground/70">{text}</p>}
        </div>
        {/* Имя того, кто порекомендовал */}
        <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase shrink-0 pt-1">
          от {name}
        </span>
      </div>
    </motion.div>
  );
}