import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Импортируем наши локальные данные
import { localBooks, localRecommendations } from "../mockData";

// Импорт компонентов интерфейса
import ScrollToTop from "../components/booklist/ScrollToTop";
import GrainOverlay from "../components/booklist/GrainOverlay";
import DustParticles from "../components/booklist/DustParticles";
import HeroHeader from "../components/booklist/HeroHeader";
import BookCard from "../components/booklist/BookCard";
import SectionDivider from "../components/booklist/SectionDivider";
import RecommendationForm from "../components/booklist/RecommendationForm";
import RecommendationCard from "../components/booklist/RecommendationCard";

// Твои личные данные от Sheetson
const API_KEY = '6_w0njCMS0pGhSY-nc2U7l9L-5_16qCmU_MDqSTi7Vid-HJ_aWzqBJqqq9Q';
const SPREADSHEET_ID = '1M6thLwpRMwnZYAHwCGYoFmT72pyo3dlmU41SehVhK-M';
const SHEET_NAME = 'book-recommendations';

const PAGE_SIZE = 15;

export default function Home() {
  const [books] = useState(localBooks);
  // Изначально показываем локальные рекомендации, пока грузятся новые из таблицы
  const [recommendations, setRecommendations] = useState(localRecommendations);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 📥 1. Загружаем сохраненные книги из Google Таблицы при старте сайта
  useEffect(() => {
    const fetchUrl = `https://api.sheetson.com/v2/sheets/${SHEET_NAME}?apiKey=${API_KEY}&spreadsheetId=${SPREADSHEET_ID}`;
    
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          // Приводим данные из таблицы к нужному формату (добавляем id)
          const cloudRecs = data.results.map((item, index) => ({
            id: item.id || `cloud-${index}`,
            name: item.name,
            book_title: item.book_title,
            book_author: item.book_author,
            text: item.text,
            created_date: item.created_date
          }));
          
          // Объединяем: новые из таблицы (перевернутые, чтобы свежие сверху) + твои дефолтные локальные
          setRecommendations([...cloudRecs.reverse(), ...localRecommendations]);
        }
      })
      .catch((err) => console.error("Ошибка загрузки рекомендаций:", err));
  }, []);

  // 📤 2. Функция отправки новой рекомендации в Google Таблицу
  const handleNewRec = (newRecData) => {
    const newRecommendation = {
      name: newRecData.name || "Аноним",
      book_title: newRecData.book_title || "",
      book_author: newRecData.book_author || "",
      text: newRecData.text || newRecData.recommendation || "",
      created_date: new Date().toISOString()
    };

    const postUrl = `https://api.sheetson.com/v2/sheets/${SHEET_NAME}?apiKey=${API_KEY}&spreadsheetId=${SPREADSHEET_ID}`;

    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecommendation),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось сохранить строку");
        return res.json();
      })
      .then((savedData) => {
        // Добавляем сгенерированный id, чтобы React не ругался при рендере ключей
        const finalRec = {
          ...newRecommendation,
          id: savedData.id || `rec-${Date.now()}`
        };
        // Мгновенно отображаем карточку сверху на экране
        setRecommendations((prev) => [finalRec, ...prev]);
      })
      .catch((err) => console.error("Ошибка записи в таблицу:", err));
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "hsl(222,28%,9%)" }}>
      {/* Фоновые атмосферные свечения */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(38,90%,62%) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(210,80%,65%) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(180,60%,55%) 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      <GrainOverlay />
      <DustParticles />

      {/* Основной контент */}
      <div className="relative z-20 max-w-2xl mx-auto px-5 md:px-8">
        <HeroHeader />

        {/* Список Книг */}
        <section className="pb-8">
          <div className="space-y-3">
            {books.slice(0, visibleCount).map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>

          {visibleCount < books.length && (
            <div className="flex flex-col items-center mt-8 gap-2">
              <p className="text-xs tracking-widest uppercase" style={{ color: "hsl(220,10%,45%)" }}>
                Показано {visibleCount} из {books.length}
              </p>
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, books.length))}
                className="mt-2 px-8 py-3 rounded-full border border-white/10 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:border-amber-400/40 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  color: "hsl(38,90%,62%)",
                }}
              >
                Показать ещё
              </button>
              <button
                onClick={() => {
                  setVisibleCount(books.length);
                  setTimeout(() => document.getElementById("recommend")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                className="text-xs underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
                style={{ color: "hsl(220,10%,42%)" }}
              >
                Перейти к форме рекомендации →
              </button>
            </div>
          )}
        </section>

        {/* Секция формы */}
        <div id="recommend">
          <SectionDivider
            title="Рекомендации"
            subtitle="Вы можете добавить свою рекомендацию"
          />
        </div>

        <section className="pb-12">
          <RecommendationForm onSubmitted={handleNewRec} />
        </section>

        {/* Список рекомендаций от пользователей */}
        {recommendations.length > 0 && (
          <section className="pb-20">
            <div className="mb-6">
              <p className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase">
                Рекомендации от читателей
              </p>
            </div>
            <div className="px-2">
              <AnimatePresence>
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} rec={rec} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        <ScrollToTop />
        
        {/* Футер */}
        <footer className="border-t border-white/[0.04] py-12 text-center">
          <p className="text-xs text-muted-foreground/40 tracking-widest uppercase">
            Aitbek Samatov — {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}