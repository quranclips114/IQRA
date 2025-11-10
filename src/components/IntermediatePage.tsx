import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { Button } from './ui/button';
import { AudioButton } from './AudioButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, CheckCircle2, Star, Sparkles, Trophy, Gift } from 'lucide-react';
import { Progress } from './ui/progress';

interface IntermediatePageProps {
  onNavigate: (page: string) => void;
}

const practiceWords = [
  { arabic: 'اَلْحَمْدُ', transliteration: 'Al-Hamdu', meaning: { en: 'The Praise', nl: 'De Lof', tr: 'Hamd' }, category: 'basicWords', id: 'alhamdu' },
  { arabic: 'لِلَّهِ', transliteration: 'Lillah', meaning: { en: 'To Allah', nl: 'Aan Allah', tr: 'Allah\'a' }, category: 'basicWords', id: 'lillah' },
  { arabic: 'رَبِّ', transliteration: 'Rabbi', meaning: { en: 'Lord', nl: 'Heer', tr: 'Rab' }, category: 'basicWords', id: 'rabbi' },
  { arabic: 'الْعَالَمِينَ', transliteration: 'Al-Alameen', meaning: { en: 'Of the Worlds', nl: 'Van de Werelden', tr: 'Alemlerin' }, category: 'basicWords', id: 'alameen' },
  { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahman', meaning: { en: 'The Most Gracious', nl: 'De Meest Genadevolle', tr: 'Rahman' }, category: 'namesOfAllah', id: 'rahman' },
  { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raheem', meaning: { en: 'The Most Merciful', nl: 'De Meest Barmhartige', tr: 'Rahim' }, category: 'namesOfAllah', id: 'raheem' },
  { arabic: 'مَالِكِ', transliteration: 'Maliki', meaning: { en: 'Master', nl: 'Meester', tr: 'Malik' }, category: 'basicWords', id: 'maliki' },
  { arabic: 'يَوْمِ الدِّينِ', transliteration: 'Yawmi Ad-Deen', meaning: { en: 'Day of Judgment', nl: 'Dag des Oordeels', tr: 'Din Günü' }, category: 'phrases', id: 'yawmideen' },
  { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', meaning: { en: 'You alone', nl: 'Jij alleen', tr: 'Yalnız Sen' }, category: 'phrases', id: 'iyyaka' },
  { arabic: 'نَعْبُدُ', transliteration: "Na'budu", meaning: { en: 'We worship', nl: 'Wij aanbidden', tr: 'İbadet ederiz' }, category: 'basicWords', id: 'nabudu' },
  { arabic: 'نَسْتَعِينُ', transliteration: "Nasta'een", meaning: { en: 'We seek help', nl: 'Wij zoeken hulp', tr: 'Yardım dileriz' }, category: 'basicWords', id: 'nastaeen' },
  { arabic: 'اهْدِنَا', transliteration: 'Ihdina', meaning: { en: 'Guide us', nl: 'Leid ons', tr: 'Bizi doğru yola ilet' }, category: 'basicWords', id: 'ihdina' },
];

export const IntermediatePage: React.FC<IntermediatePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { progress, markLessonComplete, getCompletionPercentage, addStars, addXP, addBadge } = useProgress();
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleWordClick = (wordId: string) => {
    const wasCompleted = isCompleted(wordId);
    
    if (!wasCompleted) {
      markLessonComplete('intermediate', wordId);
      addStars(10);
      addXP(20);
      setRecentlyCompleted(wordId);
      
      // Check for category completion badges
      const currentCompleted = progress.completedLessons?.intermediate || [];
      const newCompletedCount = currentCompleted.length + 1;
      const word = practiceWords.find(w => w.id === wordId);
      
      if (word && word.category === 'basicWords') {
        const basicWordsCompleted = practiceWords
          .filter(w => w.category === 'basicWords' && currentCompleted.includes(w.id))
          .length + 1;
        if (basicWordsCompleted === practiceWords.filter(w => w.category === 'basicWords').length) {
          addBadge('basic_words_master');
        }
      }
      
      if (newCompletedCount === practiceWords.length) {
        addBadge('word_master');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      
      setTimeout(() => setRecentlyCompleted(null), 2000);
    }
  };

  const isCompleted = (wordId: string) => {
    return progress.completedLessons?.intermediate?.includes(wordId) || false;
  };

  const completionPercentage = getCompletionPercentage('intermediate');

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      basicWords: t('basicWords'),
      namesOfAllah: t('namesOfAllah'),
      phrases: t('phrases'),
    };
    return categoryMap[category] || category;
  };

  const categories = ['basicWords', 'namesOfAllah', 'phrases'];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <Card className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border-4 border-blue-400 shadow-2xl p-8 max-w-md mx-4 animate-bounce">
            <CardContent className="text-center">
              <div className="text-8xl mb-4">🎊</div>
              <h2 className="text-4xl font-bold text-blue-800 mb-4">{t('achievement')}</h2>
              <p className="text-2xl text-blue-700 mb-2">Word Master!</p>
              <p className="text-lg text-blue-600">You mastered all Quranic words! Incredible!</p>
              <div className="mt-6 flex justify-center gap-2">
                <span className="text-4xl animate-bounce-soft">⭐</span>
                <span className="text-4xl animate-bounce-soft" style={{ animationDelay: '0.1s' }}>⭐</span>
                <span className="text-4xl animate-bounce-soft" style={{ animationDelay: '0.2s' }}>⭐</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4 hover:bg-blue-100 hover:scale-105 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-blue-700 mb-2 flex items-center gap-3 animate-slide-in-right">
                <span className="text-5xl animate-bounce-soft">📚</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t('intermediate')}
                </span>
              </h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                {t('clickToHear')}
              </p>
            </div>
            
            <Card className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border-2 border-blue-300 shadow-xl lg:w-80 hover:shadow-2xl transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-800 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    {t('progress')}
                  </span>
                  <span className="text-2xl font-bold text-blue-700">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3 shadow-inner" />
                <div className="mt-3 text-center text-sm text-blue-700">
                  {progress.completedLessons?.intermediate?.length || 0} / {practiceWords.length} {t('completed')}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {categories.map((category, catIndex) => (
          <div key={category} className="mb-10 animate-fade-in" style={{ animationDelay: `${catIndex * 0.1}s` }}>
            <h2 className="mb-6 text-blue-600 text-2xl flex items-center gap-3">
              <span className="text-4xl">
                {category === 'basicWords' ? '📖' : category === 'namesOfAllah' ? '✨' : '💬'}
              </span>
              {getCategoryName(category)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceWords
                .filter((word) => word.category === category)
                .map((word, index) => {
                  const completed = isCompleted(word.id);
                  const isRecent = recentlyCompleted === word.id;
                  
                  return (
                    <Card 
                      key={index} 
                      className={`hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:scale-105 hover:-translate-y-2 relative overflow-hidden ${
                        completed 
                          ? 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border-2 border-blue-400 shadow-lg' 
                          : 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200'
                      } ${isRecent ? 'animate-pulse-glow' : ''}`}
                      onClick={() => handleWordClick(word.id)}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                      </div>

                      {/* Star reward animation */}
                      {isRecent && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="text-4xl font-bold animate-bounce">+10⭐</div>
                        </div>
                      )}

                      {completed && (
                        <div className="absolute top-3 right-3 z-10 animate-bounce-soft">
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-1.5 shadow-lg">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <CardHeader>
                        <CardTitle className="text-5xl font-arabic text-blue-800 text-center dir-rtl group-hover:scale-110 transition-transform duration-300">
                          {word.arabic}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-3">
                          <p className="text-gray-700 text-lg font-medium">{word.transliteration}</p>
                          <p className="text-sm text-gray-600">{word.meaning[language]}</p>
                          <AudioButton text={word.arabic} size="default" />
                        </div>
                      </CardContent>

                      {/* Bottom accent */}
                      <div className={`absolute bottom-0 left-0 w-full h-1 ${completed ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-blue-400/50 to-indigo-400/50'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Tips and Stats section */}
        <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full opacity-20 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-700 text-2xl">
                <Gift className="h-6 w-6 text-blue-600" />
                {t('practiceTips')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              {[t('practiceTip1'), t('practiceTip2'), t('practiceTip3'), t('practiceTip4')].map((tip, i) => (
                <p key={i} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{['👂', '🔤', '🌟', '💪'][i]}</span>
                  <span className="text-gray-700">{tip}</span>
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-white border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full opacity-20 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-700 text-2xl">
                <Trophy className="h-6 w-6 text-amber-600" />
                {t('yourStats')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-xl text-center shadow-inner">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500 fill-yellow-500" />
                  <div className="text-3xl font-bold text-yellow-700">{progress.stars}</div>
                  <p className="text-xs text-gray-600">{t('stars')}</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl text-center shadow-inner">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-3xl font-bold text-purple-700">{progress.level}</div>
                  <p className="text-xs text-gray-600">{t('level')}</p>
                </div>
              </div>
              
              {completionPercentage === 100 && (
                <div className="text-center p-6 bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-100 rounded-2xl shadow-inner animate-pulse-glow">
                  <p className="text-4xl mb-3 animate-bounce-soft">🎊</p>
                  <p className="text-amber-800 font-bold text-xl">{t('perfect')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
