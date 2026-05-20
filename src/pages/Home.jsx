import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { localBooks, localRecommendations } from "../mockData";

import ScrollToTop from "../components/booklist/ScrollToTop";
import GrainOverlay from "../components/booklist/GrainOverlay";
import DustParticles from "../components/booklist/DustParticles";
import HeroHeader from "../components/booklist/HeroHeader";
import BookCard from "../components/booklist/BookCard";
import SectionDivider from "../components/booklist/SectionDivider";
import RecommendationForm from "../components/booklist/RecommendationForm";
import RecommendationCard from "../components/booklist/RecommendationCard";

const API_KEY = '6_w0njCMS0pGhSY-nc2U7l9L-5_16qCmU_MDqSTi7Vid-HJ_aWzqBJqqq9Q';
const SPREADSHEET_ID = '1dIcCOuzz_HOKNNmngqsPgSobZugttsmrvIEyr43eHZ0';
const SHEET_NAME = 'Sheet1';

const PAGE_SIZE = 15;

export default function Home() {
  const [books] = useState(localBooks);
  const [recommendations, setRecommendations] = useState(localRecommendations);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 📥 Скачиваем данные при открытии сайта
  useEffect(() => {
    const fetchUrl = `https://api.sheetson.com/v2/sheets/${SHEET_NAME}?apiKey=${API_KEY}&spreadsheetId=${SPREADSHEET_ID}`;
    
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          const cloudRecs = data.results.map((item, index) => ({
            id: item.id || `cloud-${index}-${Date.now()}`,
            name: item.name || "Аноним",
            book_title: item.book_title || "Без названия",
            book_author: item.book_author || "Автор не указан"
          }));
          
          // Показываем новые облачные сверху + старые локальные снизу
          setRecommendations([...cloudRecs.reverse(), ...localRecommendations]);
        }
      })
      .catch((err) => console.error("Ошибка загрузки рекомендаций из Sheetson:", err));
  }, []);

  // 📤 Отправляем строго 3 твоих поля в Google Таблицу
  const handleNewRec = (newRecData) => {
    const newRecommendation = {
      name: newRecData.name || "Аноним",
      book_title: newRecData.book_title || "",
      book_author: newRecData.book_author || ""
    };

    const postUrl = `https://api.sheetson.com/v2/sheets/${SHEET_NAME}?apiKey=${API_KEY}&spreadsheetId=${SPREADSHEET_ID}`;

    return fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecommendation),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось сохранить строку на сервере");
        return res.json();
      })
      .then((savedData) => {
        const finalRec = {
          ...newRecommendation,
          id: savedData.id || `rec-${Date.now()}`
        };
        // Добавляем на экран
        setRecommendations((prev) => [finalRec, ...prev]);
      })
      .catch((err) => {
        console.error("Ошибка записи в таблицу:", err);
        throw err;
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "hsl(222,28%,9%)" }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(38,90%,62%) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, hsl(210,80%,65%) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(180,60%,55%) 0%, transparent 70%)", filter: "blur(100px)" }} />
      </div>

      <GrainOverlay />
      <DustParticles />

      <div className="relative z-20 max-w-2xl mx-auto px-5 md:px-8">
        <HeroHeader />

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
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", color: "hsl(38,90%,62%)" }}
              >
                Показать ещё
              </button>
            </div>
          )}
        </section>

        <div id="recommend">
          <SectionDivider title="Рекомендации" subtitle="Вы можете добавить свою рекомендацию" />
        </div>

        <section className="pb-12">
          <RecommendationForm onSubmitted={handleNewRec} />
        </section>

        {recommendations && recommendations.length > 0 && (
          <section className="pb-20">
            <div className="mb-6">
              <p className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase">
                Рекомендации от читателей ({recommendations.length})
              </p>
            </div>
            <div className="px-2">
              <AnimatePresence>
                {recommendations.map((rec, i) => (
                  <RecommendationCard key={rec.id || `rec-${i}`} rec={rec} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        <ScrollToTop />
        
        <footer className="border-t border-white/[0.04] py-12 text-center">
          <p className="text-xs text-muted-foreground/40 tracking-widest uppercase">
            Aitbek Samatov — {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}