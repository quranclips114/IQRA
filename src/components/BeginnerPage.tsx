import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { Button } from './ui/button';
import { AudioButton } from './AudioButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, CheckCircle2, Star, Sparkles, Trophy, Zap } from 'lucide-react';
import { Progress } from './ui/progress';

interface BeginnerPageProps {
  onNavigate: (page: string) => void;
}

const arabicLetters = [
  { letter: 'ا', name: 'Alif', sound: 'a', id: 'alif' },
  { letter: 'ب', name: 'Ba', sound: 'b', id: 'ba' },
  { letter: 'ت', name: 'Ta', sound: 't', id: 'ta' },
  { letter: 'ث', name: 'Tha', sound: 'th', id: 'tha' },
  { letter: 'ج', name: 'Jeem', sound: 'j', id: 'jeem' },
  { letter: 'ح', name: 'Ha', sound: 'h', id: 'ha' },
  { letter: 'خ', name: 'Kha', sound: 'kh', id: 'kha' },
  { letter: 'د', name: 'Dal', sound: 'd', id: 'dal' },
  { letter: 'ذ', name: 'Dhal', sound: 'dh', id: 'dhal' },
  { letter: 'ر', name: 'Ra', sound: 'r', id: 'ra' },
  { letter: 'ز', name: 'Zay', sound: 'z', id: 'zay' },
  { letter: 'س', name: 'Seen', sound: 's', id: 'seen' },
  { letter: 'ش', name: 'Sheen', sound: 'sh', id: 'sheen' },
  { letter: 'ص', name: 'Sad', sound: 's', id: 'sad' },
  { letter: 'ض', name: 'Dad', sound: 'd', id: 'dad' },
  { letter: 'ط', name: 'Ta', sound: 't', id: 'ta2' },
  { letter: 'ظ', name: 'Dha', sound: 'dh', id: 'dha' },
  { letter: 'ع', name: 'Ayn', sound: 'a', id: 'ayn' },
  { letter: 'غ', name: 'Ghayn', sound: 'gh', id: 'ghayn' },
  { letter: 'ف', name: 'Fa', sound: 'f', id: 'fa' },
  { letter: 'ق', name: 'Qaf', sound: 'q', id: 'qaf' },
  { letter: 'ك', name: 'Kaf', sound: 'k', id: 'kaf' },
  { letter: 'ل', name: 'Lam', sound: 'l', id: 'lam' },
  { letter: 'م', name: 'Meem', sound: 'm', id: 'meem' },
  { letter: 'ن', name: 'Noon', sound: 'n', id: 'noon' },
  { letter: 'ه', name: 'Ha', sound: 'h', id: 'ha2' },
  { letter: 'و', name: 'Waw', sound: 'w', id: 'waw' },
  { letter: 'ي', name: 'Ya', sound: 'y', id: 'ya' },
];

export const BeginnerPage: React.FC<BeginnerPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { progress, markLessonComplete, getCompletionPercentage, addStars, addXP, addBadge } = useProgress();
  const [showCelebration, setShowCelebration] = useState(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null);

  const handleLetterClick = (letterId: string) => {
    const wasCompleted = isCompleted(letterId);
    
    if (!wasCompleted) {
      markLessonComplete('beginner', letterId);
      addStars(5);
      addXP(10);
      setRecentlyCompleted(letterId);
      
      // Check for badges
      const currentCompleted = progress.completedLessons?.beginner || [];
      const newCompletedCount = currentCompleted.length + 1;
      if (newCompletedCount === 1) {
        addBadge('first_letter');
      } else if (newCompletedCount === 10) {
        addBadge('ten_letters');
      } else if (newCompletedCount === 28) {
        addBadge('alphabet_master');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      
      setTimeout(() => setRecentlyCompleted(null), 2000);
    }
  };

  const isCompleted = (letterId: string) => {
    return progress.completedLessons?.beginner?.includes(letterId) || false;
  };

  const completionPercentage = getCompletionPercentage('beginner');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <Card className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 border-4 border-yellow-400 shadow-2xl p-8 max-w-md mx-4 animate-bounce">
            <CardContent className="text-center">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-yellow-800 mb-4">{t('achievement')}</h2>
              <p className="text-2xl text-yellow-700 mb-2">Alphabet Master!</p>
              <p className="text-lg text-yellow-600">You learned all 28 letters! Amazing!</p>
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
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')} 
            className="mb-4 hover:bg-emerald-100 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-emerald-700 mb-2 flex items-center gap-3 animate-slide-in-right">
                <span className="text-5xl animate-bounce-soft">🌟</span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t('beginner')}
                </span>
              </h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                {t('clickToHear')}
              </p>
            </div>
            
            <Card className="bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 border-2 border-emerald-300 shadow-xl lg:w-80 hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-emerald-800 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-emerald-600" />
                    {t('progress')}
                  </span>
                  <span className="text-2xl font-bold text-emerald-700">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3 shadow-inner" />
                <div className="mt-3 text-center text-sm text-emerald-700">
                  {progress.completedLessons?.beginner?.length || 0} / {arabicLetters.length} {t('completed')}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Letters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mb-12">
          {arabicLetters.map((item, index) => {
            const completed = isCompleted(item.id);
            const isRecent = recentlyCompleted === item.id;
            
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:scale-110 hover:-translate-y-2 animate-fade-in ${
                  completed 
                    ? 'bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 border-2 border-emerald-400 shadow-lg' 
                    : 'bg-gradient-to-br from-white to-emerald-50 border-2 border-emerald-200'
                } ${isRecent ? 'animate-pulse-glow' : ''}`}
                onClick={() => handleLetterClick(item.id)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                </div>

                {/* Star reward animation */}
                {isRecent && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="text-4xl animate-bounce">+5⭐</div>
                  </div>
                )}

                {completed && (
                  <div className="absolute top-2 right-2 z-10 animate-bounce-soft">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full p-1 shadow-lg">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2 relative">
                  <CardTitle className="text-7xl font-amiri text-emerald-700 group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300">
                    {item.letter}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 space-y-2 relative">
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <AudioButton text={item.letter} size="sm" variant="ghost" />
                </CardContent>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${completed ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-emerald-400/50 to-teal-400/50'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </Card>
            );
          })}
        </div>

        {/* Tips and Progress section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-20 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-emerald-700 text-2xl">
                <Zap className="h-6 w-6 text-emerald-600" />
                {t('learningTips')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              {[t('tip1'), t('tip2'), t('tip3'), t('tip4')].map((tip, i) => (
                <p key={i} className="flex items-start gap-3 animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="text-2xl flex-shrink-0">{['🎯', '🗣️', '⭐', '🎮'][i]}</span>
                  <span className="text-gray-700">{tip}</span>
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-white border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                  <p className="text-4xl mb-3 animate-bounce-soft">🎉</p>
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
