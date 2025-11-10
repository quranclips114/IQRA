import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { LevelCard } from './LevelCard';
import { Card, CardContent } from './ui/card';
import { BookOpen, BookA, AlertCircle, HelpCircle, Sparkles, Trophy, Flame, Award, Presentation } from 'lucide-react';
import { Progress } from './ui/progress';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { progress, getCompletionPercentage, updateStreak } = useProgress();

  useEffect(() => {
    updateStreak();
  }, []);

  const levels = [
    {
      id: 'beginner',
      title: t('beginner'),
      description: t('beginnerDesc'),
      icon: BookA,
      color: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600',
      progress: getCompletionPercentage('beginner'),
    },
    {
      id: 'intermediate',
      title: t('intermediate'),
      description: t('intermediateDesc'),
      icon: BookOpen,
      color: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600',
      progress: getCompletionPercentage('intermediate'),
    },
    {
      id: 'tajweed',
      title: t('tajweed'),
      description: t('tajweedDesc'),
      icon: Sparkles,
      color: 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600',
      progress: 0,
    },
    {
      id: 'mistakes',
      title: t('mistakes'),
      description: t('mistakesDesc'),
      icon: AlertCircle,
      color: 'bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600',
      progress: 0,
    },
    {
      id: 'quiz',
      title: t('quiz'),
      description: t('quizDesc'),
      icon: HelpCircle,
      color: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600',
      progress: 0,
    },
    {
      id: 'teacher',
      title: t('teacherSlideshow'),
      description: t('teacherSlideshowDesc'),
      icon: Presentation,
      color: 'bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600',
      progress: 0,
    },
  ];

  const totalProgress = Math.round(
    (getCompletionPercentage('beginner') + 
     getCompletionPercentage('intermediate')) / 2
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with Islamic patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-15 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%2310b981' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          {/* Main icon with glow effect */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-3xl blur-2xl opacity-50 animate-pulse-glow"></div>
              <div className="relative inline-flex items-center justify-center p-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                <BookA className="h-20 w-20 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <h1 className="mb-4 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm animate-slide-in-right">
            {t('welcomeTitle')}
          </h1>
          <p className="text-gray-600 text-2xl mb-6 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
            {t('welcomeSubtitle')}
          </p>
          
          {/* Islamic decoration */}
          <div className="flex justify-center gap-6 text-3xl opacity-30 mb-4">
            <span className="animate-bounce-soft">☪️</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '0.4s' }}>📿</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '0.6s' }}>✨</span>
            <span className="animate-bounce-soft" style={{ animationDelay: '0.8s' }}>☪️</span>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          {/* Stars */}
          <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 hover:scale-105 transition-all shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-2 animate-bounce-soft">⭐</div>
              <div className="text-3xl font-bold text-yellow-700">{progress.stars}</div>
              <p className="text-xs text-yellow-600">{t('stars')}</p>
            </CardContent>
          </Card>

          {/* Level */}
          <Card className="bg-gradient-to-br from-purple-100 to-violet-100 border-2 border-purple-300 hover:scale-105 transition-all shadow-lg">
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-600 animate-bounce-soft" />
              <div className="text-3xl font-bold text-purple-700">{progress.level}</div>
              <p className="text-xs text-purple-600">{t('level')}</p>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 hover:scale-105 transition-all shadow-lg">
            <CardContent className="pt-6 text-center">
              <Flame className="h-8 w-8 mx-auto mb-2 text-orange-600 animate-bounce-soft" />
              <div className="text-3xl font-bold text-orange-700">{progress.currentStreak}</div>
              <p className="text-xs text-orange-600">{t('streak')}</p>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300 hover:scale-105 transition-all shadow-lg">
            <CardContent className="pt-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-emerald-600 animate-bounce-soft" />
              <div className="text-3xl font-bold text-emerald-700">{progress.badges?.length || 0}</div>
              <p className="text-xs text-emerald-600">{t('badges')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress Card */}
        {totalProgress > 0 && (
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <Card className="bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border-2 border-emerald-300 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-emerald-800 text-2xl flex items-center gap-2">
                    <span className="text-3xl animate-bounce-soft">🎯</span>
                    {t('progress')}
                  </h3>
                  <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {totalProgress}%
                  </span>
                </div>
                <Progress value={totalProgress} className="h-4 shadow-inner" />
                <p className="text-sm text-gray-600 mt-4 text-center font-medium">
                  {totalProgress === 100 ? '🎉 ' + t('perfect') : '💪 ' + t('keepGoing')}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Level cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {levels.map((level, index) => (
            <div 
              key={level.id} 
              className="relative group animate-fade-in flex"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-1">
                <LevelCard
                  title={level.title}
                  description={level.description}
                  icon={level.icon}
                  color={level.color}
                  onClick={() => onNavigate(level.id)}
                  buttonText={t('startLearning')}
                />
              </div>
              {level.progress > 0 && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full px-4 py-2 shadow-xl border-4 border-white group-hover:scale-125 transition-transform duration-300 z-10 animate-bounce-soft">
                  <span className="font-bold text-lg">{level.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bismillah card */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-3xl blur-xl opacity-50"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-emerald-100 hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
              <CardContent className="p-10">
                <div className="mb-4 text-6xl animate-bounce-soft">🕌</div>
                <p className="text-4xl md:text-5xl text-gray-800 mb-4 font-amiri leading-relaxed">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </p>
                <p className="text-gray-600 text-lg font-medium">{t('bismillah')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center gap-12 text-5xl opacity-15">
          <span className="animate-float">⭐</span>
          <span className="animate-float" style={{ animationDelay: '0.5s' }}>🌙</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>⭐</span>
        </div>
      </div>
    </div>
  );
};
