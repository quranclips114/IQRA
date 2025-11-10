import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageToggle } from './components/LanguageToggle';
import { HomePage } from './components/HomePage';
import { BeginnerPage } from './components/BeginnerPage';
import { IntermediatePage } from './components/IntermediatePage';
import { TajweedPage } from './components/TajweedPage';
import { PronunciationMistakesPage } from './components/PronunciationMistakesPage';
import { QuizPage } from './components/QuizPage';
import { TeacherSlideshowPage } from './components/TeacherSlideshowPage';

type Page = 'home' | 'beginner' | 'intermediate' | 'tajweed' | 'mistakes' | 'quiz' | 'teacher';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'beginner':
        return <BeginnerPage onNavigate={setCurrentPage} />;
      case 'intermediate':
        return <IntermediatePage onNavigate={setCurrentPage} />;
      case 'tajweed':
        return <TajweedPage onNavigate={setCurrentPage} />;
      case 'mistakes':
        return <PronunciationMistakesPage onNavigate={setCurrentPage} />;
      case 'quiz':
        return <QuizPage onNavigate={setCurrentPage} />;
      case 'teacher':
        return <TeacherSlideshowPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-white">
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-blue-500/5"></div>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setCurrentPage('home')}
              >
                {/* Logo with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="text-white text-2xl">📚</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    Arabic Learning
                  </h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="animate-pulse">✨</span>
                    Learn Letters & Words
                  </p>
                </div>
              </div>
              <LanguageToggle />
            </div>
          </header>
          <main>{renderPage()}</main>
        </div>
      </ProgressProvider>
    </LanguageProvider>
  );
}
