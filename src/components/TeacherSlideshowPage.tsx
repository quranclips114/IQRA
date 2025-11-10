import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize, Shuffle, List, Volume2 } from 'lucide-react';
import { Switch } from './ui/switch';
import { AudioButton } from './AudioButton';

interface TeacherSlideshowPageProps {
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

export const TeacherSlideshowPage: React.FC<TeacherSlideshowPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [randomOrder, setRandomOrder] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [displayLetters, setDisplayLetters] = useState(arabicLetters);
  const [slideshowStarted, setSlideshowStarted] = useState(false);

  // Shuffle letters when random order is toggled
  useEffect(() => {
    if (randomOrder) {
      const shuffled = [...arabicLetters].sort(() => Math.random() - 0.5);
      setDisplayLetters(shuffled);
      setCurrentIndex(0);
    } else {
      setDisplayLetters(arabicLetters);
      setCurrentIndex(0);
    }
  }, [randomOrder]);

  // Auto-play slideshow
  useEffect(() => {
    if (isPlaying && slideshowStarted) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= displayLetters.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000); // 3 seconds per slide

      return () => clearInterval(interval);
    }
  }, [isPlaying, displayLetters.length, slideshowStarted]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!slideshowStarted) return;
      
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === ' ') {
        e.preventDefault();
        // Trigger audio play
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, displayLetters, slideshowStarted]);

  const handleNext = useCallback(() => {
    if (currentIndex < displayLetters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, displayLetters.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const startSlideshow = () => {
    setSlideshowStarted(true);
    setCurrentIndex(0);
    if (autoPlay) {
      setIsPlaying(true);
    }
  };

  const currentLetter = displayLetters[currentIndex];

  if (!slideshowStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="mb-6 animate-fade-in">
            <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-3 hover:bg-purple-100 hover:scale-105 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToHome')}
            </Button>
            
            <h1 className="text-purple-700 mb-2 flex items-center gap-3 animate-slide-in-right">
              <span className="text-4xl animate-bounce-soft">🎓</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t('teacherSlideshow')}
              </span>
            </h1>
            <p className="text-gray-600">{t('teacherSlideshowDesc')}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Settings Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-700 text-xl">{t('slideshowMode')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Order Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-inner">
                  <div className="flex items-center gap-3">
                    {randomOrder ? <Shuffle className="h-5 w-5 text-purple-600" /> : <List className="h-5 w-5 text-purple-600" />}
                    <div>
                      <p className="font-semibold text-purple-900 text-sm">
                        {randomOrder ? t('randomOrder') : t('alphabeticOrder')}
                      </p>
                      <p className="text-xs text-purple-600">
                        {randomOrder ? 'Shuffle letters randomly' : 'Follow A-Z order'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={randomOrder}
                    onCheckedChange={setRandomOrder}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                {/* Auto-play Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-inner">
                  <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-purple-900 text-sm">{t('autoPlay')}</p>
                      <p className="text-xs text-purple-600">Automatically advance every 3 seconds</p>
                    </div>
                  </div>
                  <Switch
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Instructions Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-700 text-xl flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  {t('teacherInstructions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-lg">⌨️</span>
                  {t('teacherInstruction1')}
                </p>
                <p className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-lg">🔊</span>
                  {t('teacherInstruction2')}
                </p>
                <p className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-lg">⏯️</span>
                  {t('teacherInstruction3')}
                </p>
                <p className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-lg">🔀</span>
                  {t('teacherInstruction4')}
                </p>
              </CardContent>
            </Card>

            {/* Start Button */}
            <Button
              onClick={startSlideshow}
              className="w-full py-6 text-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
              size="lg"
            >
              <Play className="mr-3 h-6 w-6" />
              {t('startSlideshow')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Slideshow View
  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Close/Exit Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={() => setSlideshowStarted(false)}
          variant="ghost"
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('stopSlideshow')}
        </Button>
      </div>

      {/* Fullscreen Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Letter Display */}
      <div className="flex items-center justify-center h-screen p-4">
        <div className="text-center animate-fade-in">
          {/* Letter */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
            <div className="relative text-[12rem] md:text-[16rem] font-amiri text-white drop-shadow-2xl leading-none animate-bounce-soft">
              {currentLetter.letter}
            </div>
          </div>

          {/* Letter Name */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {currentLetter.name}
          </h2>

          {/* Audio Button */}
          <div className="flex justify-center mb-4">
            <div className="scale-125">
              <AudioButton 
                text={currentLetter.letter} 
                size="lg"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/50 shadow-2xl px-6 py-4"
              />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="text-white/80 text-xl">
            {currentIndex + 1} / {displayLetters.length}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center gap-4 z-50">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white disabled:opacity-30"
          size="lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-6 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white"
          size="lg"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === displayLetters.length - 1}
          className="px-4 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white disabled:opacity-30"
          size="lg"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / displayLetters.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
