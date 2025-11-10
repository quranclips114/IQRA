import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressData {
  completedLessons: {
    beginner: string[];
    intermediate: string[];
  };
  quizScores: {
    beginner: number[];
    intermediate: number[];
  };
  stars: number;
  badges: string[];
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: string;
  level: number;
  xp: number;
}

interface ProgressContextType {
  progress: ProgressData;
  markLessonComplete: (level: string, lessonId: string) => void;
  addQuizScore: (level: 'beginner' | 'intermediate', score: number) => void;
  updateLastVisited: (page: string) => void;
  getCompletionPercentage: (level: string) => number;
  getBestScore: (level: 'beginner' | 'intermediate') => number;
  addStars: (amount: number) => void;
  addBadge: (badge: string) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

const defaultProgress: ProgressData = {
  completedLessons: {
    beginner: [],
    intermediate: [],
  },
  quizScores: {
    beginner: [],
    intermediate: [],
  },
  stars: 0,
  badges: [],
  currentStreak: 0,
  longestStreak: 0,
  lastVisitDate: new Date().toDateString(),
  level: 1,
  xp: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem('quranLearningProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all required properties exist
        setProgress({
          ...defaultProgress,
          ...parsed,
          completedLessons: {
            beginner: parsed.completedLessons?.beginner || [],
            intermediate: parsed.completedLessons?.intermediate || [],
          },
          quizScores: {
            beginner: parsed.quizScores?.beginner || [],
            intermediate: parsed.quizScores?.intermediate || [],
          },
          badges: parsed.badges || [],
        });
      } catch (e) {
        console.error('Failed to parse progress data');
        setProgress(defaultProgress);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quranLearningProgress', JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (level: string, lessonId: string) => {
    setProgress((prev) => {
      const levelKey = level as keyof typeof prev.completedLessons;
      const currentLessons = prev.completedLessons?.[levelKey] || [];
      
      if (!currentLessons.includes(lessonId)) {
        const newProgress = {
          ...prev,
          completedLessons: {
            ...prev.completedLessons,
            [level]: [...currentLessons, lessonId],
          },
        };
        return newProgress;
      }
      return prev;
    });
  };

  const addQuizScore = (level: 'beginner' | 'intermediate', score: number) => {
    setProgress((prev) => {
      const currentScores = prev.quizScores?.[level] || [];
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [level]: [...currentScores, score],
        },
      };
    });
  };

  const updateLastVisited = (page: string) => {
    setProgress((prev) => ({
      ...prev,
      lastVisitDate: new Date().toDateString(),
    }));
  };

  const getCompletionPercentage = (level: string) => {
    const totals = {
      beginner: 28, // 28 letters
      intermediate: 12, // 12 words
    };
    const levelKey = level as keyof typeof progress.completedLessons;
    const completed = progress.completedLessons[levelKey]?.length || 0;
    const total = totals[levelKey] || 1;
    return Math.round((completed / total) * 100);
  };

  const getBestScore = (level: 'beginner' | 'intermediate') => {
    const scores = progress.quizScores?.[level] || [];
    return scores.length > 0 ? Math.max(...scores) : 0;
  };

  const addStars = (amount: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + amount,
    }));
  };

  const addBadge = (badge: string) => {
    setProgress((prev) => {
      const currentBadges = prev.badges || [];
      if (!currentBadges.includes(badge)) {
        return {
          ...prev,
          badges: [...currentBadges, badge],
        };
      }
      return prev;
    });
  };

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const updateStreak = () => {
    setProgress((prev) => {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (prev.lastVisitDate === today) {
        return prev;
      }
      
      const newStreak = prev.lastVisitDate === yesterday ? prev.currentStreak + 1 : 1;
      
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastVisitDate: today,
      };
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        addQuizScore,
        updateLastVisited,
        getCompletionPercentage,
        getBestScore,
        addStars,
        addBadge,
        addXP,
        updateStreak,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
