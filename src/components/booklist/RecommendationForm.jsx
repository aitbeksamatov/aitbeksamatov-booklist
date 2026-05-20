import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";

export default function RecommendationForm({ onSubmitted }) {
  const [form, setForm] = useState({ book_title: "", book_author: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.book_title || !form.book_author || !form.name) return;
    
    setSubmitting(true);

    try {
      await onSubmitted({
        book_title: form.book_title,
        book_author: form.book_author,
        name: form.name
      });

      setSubmitting(false);
      setSubmitted(true);
      setForm({ book_title: "", book_author: "", name: "" });
      
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div
        className="rounded-2xl p-6 md:p-10 border border-white/[0.07]"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-7">
          {[
            { key: "book_title", label: "Название книги", placeholder: "Название" },
            { key: "book_author", label: "Автор", placeholder: "Автор книги" },
            { key: "name", label: "Ваше имя", placeholder: "Как вас зовут" },
          ].map((field) => (
            <div key={field.key}>
              <label
                className="block text-[10px] tracking-[0.2em] uppercase mb-2.5 font-medium"
                style={{ color: "hsl(38,70%,60%)" }}
              >
                {field.label}
              </label>
              <input
                type="text"
                value={form[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full bg-transparent border-0 border-b pb-3 text-sm md:text-base focus:outline-none transition-colors duration-300"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "hsl(45,20%,88%)" }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(38,90%,62%)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                required
              />
            </div>
          ))}

          <div className="pt-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "hsl(220,10%,62%)" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <Check className="w-4 h-4" style={{ color: "hsl(38,90%,62%)" }} />
                  </div>
                  <span>Спасибо! Ваша рекомендация добавлена</span>
                </motion.div>
              ) : (
                <motion.button
                  key="button"
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-3.5 rounded-lg text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, hsl(38,90%,62%) 0%, hsl(32,85%,55%) 100%)", color: "hsl(222,28%,10%)", boxShadow: "0 4px 24px rgba(200,155,70,0.25)" }}
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Добавить</span>
                      <Plus className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </motion.div>
  );
}