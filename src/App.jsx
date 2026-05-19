import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

// Компонент-заглушка для несуществующих страниц
const PageNotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <h1 className="text-xl font-semibold">404 - Страница не найдена</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App