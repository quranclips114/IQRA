import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'nl' | 'tr';

interface Translations {
  [key: string]: {
    en: string;
    nl: string;
    tr: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { en: 'Home', nl: 'Home', tr: 'Ana Sayfa' },
  beginner: { en: 'Learn Letters', nl: 'Leer Letters', tr: 'Harf Öğren' },
  intermediate: { en: 'Learn Words', nl: 'Leer Woorden', tr: 'Kelime Öğren' },
  tajweed: { en: 'Tajweed Rules', nl: 'Tajweed Regels', tr: 'Tecvid Kuralları' },
  mistakes: { en: 'Common Mistakes', nl: 'Veelgemaakte Fouten', tr: 'Yaygın Hatalar' },
  quiz: { en: 'Quiz Challenge', nl: 'Quiz Uitdaging', tr: 'Sınav Mücadelesi' },
  teacherSlideshow: { en: 'Teacher Slideshow', nl: 'Leraar Diavoorstelling', tr: 'Öğretmen Slayt Gösterisi' },
  
  // Home page
  welcomeTitle: { en: 'Learn Arabic Letters & Words', nl: 'Leer Arabische Letters & Woorden', tr: 'Arap Harfleri ve Kelimeleri Öğren' },
  welcomeSubtitle: { en: 'Start your Quran learning journey!', nl: 'Begin je Koran leerreis!', tr: 'Kuran öğrenme yolculuğuna başla!' },
  startLearning: { en: 'Start Learning', nl: 'Begin met Leren', tr: 'Öğrenmeye Başla' },
  bismillah: { en: 'In the name of Allah, the Most Gracious, the Most Merciful', nl: 'In de naam van Allah, de Meest Genadevolle, de Meest Barmhartige', tr: 'Rahman ve Rahim olan Allah\'ın adıyla' },
  
  // Gamification
  yourStats: { en: 'Your Stats', nl: 'Jouw Statistieken', tr: 'İstatistikleriniz' },
  stars: { en: 'Stars', nl: 'Sterren', tr: 'Yıldızlar' },
  level: { en: 'Level', nl: 'Niveau', tr: 'Seviye' },
  streak: { en: 'Day Streak', nl: 'Dagstreak', tr: 'Gün Serisi' },
  badges: { en: 'Badges', nl: 'Badges', tr: 'Rozetler' },
  earnStars: { en: 'Earn stars by learning!', nl: 'Verdien sterren door te leren!', tr: 'Öğrenerek yıldız kazan!' },
  keepGoing: { en: 'Keep going! You\'re doing great!', nl: 'Ga door! Je doet het geweldig!', tr: 'Devam et! Harika gidiyorsun!' },
  
  // Level descriptions
  beginnerDesc: { en: 'Master all 28 Arabic letters with fun animations!', nl: 'Beheers alle 28 Arabische letters met leuke animaties!', tr: '28 Arap harfini eğlenceli animasyonlarla öğrenin!' },
  intermediateDesc: { en: 'Learn beautiful words from the Quran', nl: 'Leer prachtige woorden uit de Koran', tr: 'Kuran\'dan güzel kelimeleri öğrenin' },
  tajweedDesc: { en: 'Master the rules of proper Quran recitation', nl: 'Beheers de regels van correct Koran reciteren', tr: 'Doğru Kuran okuma kurallarında ustalaşın' },
  mistakesDesc: { en: 'Learn to avoid common pronunciation errors', nl: 'Leer veelgemaakte uitspraakfouten te vermijden', tr: 'Yaygın telaffuz hatalarından kaçınmayı öğrenin' },
  quizDesc: { en: 'Test your knowledge and earn stars!', nl: 'Test je kennis en verdien sterren!', tr: 'Bilginizi test edin ve yıldız kazanın!' },
  teacherSlideshowDesc: { en: 'Present letters to students in class', nl: 'Presenteer letters aan studenten in de klas', tr: 'Sınıfta öğrencilere harfleri gösterin' },
  
  // Beginner page
  arabicAlphabet: { en: 'Arabic Alphabet', nl: 'Arabisch Alfabet', tr: 'Arap Alfabesi' },
  clickToHear: { en: 'Click on letters to hear pronunciation', nl: 'Klik op letters om uitspraak te horen', tr: 'Telaffuzu duymak için harflere tıklayın' },
  learningTips: { en: 'Learning Tips', nl: 'Leertips', tr: 'Öğrenme İpuçları' },
  tip1: { en: '🎯 Click on each letter to hear how it sounds', nl: '🎯 Klik op elke letter om te horen hoe het klinkt', tr: '🎯 Her harfin nasıl ses çıkardığını duymak için tıklayın' },
  tip2: { en: '🗣️ Practice saying the letter out loud after hearing it', nl: '🗣️ Oefen de letter hardop uit te spreken nadat je het hebt gehoord', tr: '🗣️ Duyduktan sonra harfi yüksek sesle söyleme pratiği yapın' },
  tip3: { en: '⭐ Complete all letters to earn special badges!', nl: '⭐ Voltooi alle letters om speciale badges te verdienen!', tr: '⭐ Özel rozetler kazanmak için tüm harfleri tamamlayın!' },
  tip4: { en: '🎮 Take your time and enjoy learning!', nl: '🎮 Neem de tijd en geniet van het leren!', tr: '🎮 Acele etmeyin ve öğrenmenin tadını çıkarın!' },
  
  // Intermediate page
  practiceWords: { en: 'Quranic Words', nl: 'Koraanse Woorden', tr: 'Kurani Kelimeler' },
  basicWords: { en: 'Basic Words', nl: 'Basiswoorden', tr: 'Temel Kelimeler' },
  namesOfAllah: { en: 'Names of Allah', nl: 'Namen van Allah', tr: 'Allah\'ın İsimleri' },
  phrases: { en: 'Phrases', nl: 'Zinnen', tr: 'İfadeler' },
  practiceTips: { en: 'Practice Tips', nl: 'Oefentips', tr: 'Pratik İpuçları' },
  practiceTip1: { en: '👂 Listen to each word carefully', nl: '👂 Luister aandachtig naar elk woord', tr: '👂 Her kelimeyi dikkatlice dinleyin' },
  practiceTip2: { en: '🔤 Try to recognize the letters you learned', nl: '🔤 Probeer de letters te herkennen die je hebt geleerd', tr: '🔤 Öğrendiğiniz harfleri tanımaya çalışın' },
  practiceTip3: { en: '🌟 Earn bonus stars for completing word categories!', nl: '🌟 Verdien bonussterren voor het voltooien van woordcategorieën!', tr: '🌟 Kelime kategorilerini tamamlayarak bonus yıldızlar kazanın!' },
  practiceTip4: { en: '💪 Practice makes perfect!', nl: '💪 Oefening baart kunst!', tr: '💪 Pratik mükemmelleştirir!' },
  
  // Quiz
  selectLevel: { en: 'Select Quiz Level', nl: 'Selecteer Quiz Niveau', tr: 'Sınav Seviyesini Seçin' },
  score: { en: 'Score', nl: 'Score', tr: 'Puan' },
  submit: { en: 'Submit', nl: 'Verzenden', tr: 'Gönder' },
  nextQuestion: { en: 'Next Question', nl: 'Volgende Vraag', tr: 'Sonraki Soru' },
  restart: { en: 'Play Again', nl: 'Opnieuw Spelen', tr: 'Tekrar Oyna' },
  correct: { en: 'Correct!', nl: 'Correct!', tr: 'Doğru!' },
  incorrect: { en: 'Try again!', nl: 'Probeer opnieuw!', tr: 'Tekrar dene!' },
  finish: { en: 'Finish', nl: 'Voltooien', tr: 'Bitir' },
  quizCompleted: { en: 'Quiz Complete!', nl: 'Quiz Voltooid!', tr: 'Sınav Tamamlandı!' },
  yourScore: { en: 'Your score', nl: 'Jouw score', tr: 'Puanınız' },
  perfect: { en: 'Perfect! Amazing work! 🌟', nl: 'Perfect! Geweldig werk! 🌟', tr: 'Mükemmel! Harika iş! 🌟' },
  goodJob: { en: 'Great job! Keep practicing! 💪', nl: 'Goed gedaan! Blijf oefenen! 💪', tr: 'Aferin! Pratik yapmaya devam! 💪' },
  keepLearning: { en: 'Keep learning! You can do it! 🎯', nl: 'Blijf leren! Je kunt het! 🎯', tr: 'Öğrenmeye devam! Yapabilirsin! 🎯' },
  questionOf: { en: 'Question', nl: 'Vraag', tr: 'Soru' },
  of: { en: 'of', nl: 'van', tr: '/' },
  testLetters: { en: 'Test your knowledge of Arabic letters', nl: 'Test je kennis van Arabische letters', tr: 'Arap harfleri bilginizi test edin' },
  testWords: { en: 'Test your knowledge of Quranic words', nl: 'Test je kennis van Koraanse woorden', tr: 'Kurani kelimeler bilginizi test edin' },
  timedMode: { en: 'Timed Mode', nl: 'Tijdmodus', tr: 'Zamanlı Mod' },
  secondsPerQuestion: { en: 'seconds per question', nl: 'seconden per vraag', tr: 'soru başına saniye' },
  hint: { en: 'Hint', nl: 'Hint', tr: 'İpucu' },
  streak: { en: 'Streak', nl: 'Reeks', tr: 'Seri' },
  bestScore: { en: 'Best Score', nl: 'Beste Score', tr: 'En İyi Puan' },
  accuracy: { en: 'Accuracy', nl: 'Nauwkeurigheid', tr: 'Doğruluk' },
  bestStreak: { en: 'Best Streak', nl: 'Beste Reeks', tr: 'En İyi Seri' },
  questionsAvailable: { en: 'questions available', nl: 'vragen beschikbaar', tr: 'soru mevcut' },
  perQuiz: { en: 'per quiz', nl: 'per quiz', tr: 'sınav başına' },
  
  // Teacher Slideshow
  slideshowMode: { en: 'Slideshow Mode', nl: 'Diavoorstellingsmodus', tr: 'Slayt Modu' },
  alphabeticOrder: { en: 'Alphabetic Order', nl: 'Alfabetische Volgorde', tr: 'Alfabetik Sıra' },
  randomOrder: { en: 'Random Order', nl: 'Willekeurige Volgorde', tr: 'Rastgele Sıra' },
  startSlideshow: { en: 'Start Slideshow', nl: 'Start Diavoorstelling', tr: 'Slayt Gösterisini Başlat' },
  stopSlideshow: { en: 'Stop Slideshow', nl: 'Stop Diavoorstelling', tr: 'Slayt Gösterisini Durdur' },
  previous: { en: 'Previous', nl: 'Vorige', tr: 'Önceki' },
  next: { en: 'Next', nl: 'Volgende', tr: 'Sonraki' },
  autoPlay: { en: 'Auto-play', nl: 'Automatisch afspelen', tr: 'Otomatik oynat' },
  playAudio: { en: 'Play Audio', nl: 'Audio afspelen', tr: 'Ses Oynat' },
  fullscreen: { en: 'Fullscreen', nl: 'Volledig scherm', tr: 'Tam Ekran' },
  exitFullscreen: { en: 'Exit Fullscreen', nl: 'Volledig scherm afsluiten', tr: 'Tam Ekrandan Çık' },
  teacherInstructions: { en: 'Teacher Instructions', nl: 'Leraar Instructies', tr: 'Öğretmen Talimatları' },
  teacherInstruction1: { en: 'Use arrow keys or buttons to navigate', nl: 'Gebruik pijltjestoetsen of knoppen om te navigeren', tr: 'Gezinmek için ok tuşlarını veya düğmeleri kullanın' },
  teacherInstruction2: { en: 'Press Space to play audio', nl: 'Druk op spatiebalk om audio af te spelen', tr: 'Sesi oynatmak için Boşluk tuşuna basın' },
  teacherInstruction3: { en: 'Enable auto-play for automatic progression', nl: 'Schakel automatisch afspelen in voor automatische voortgang', tr: 'Otomatik ilerleme için otomatik oynatmayı etkinleştirin' },
  teacherInstruction4: { en: 'Toggle between alphabetic and random order', nl: 'Schakel tussen alfabetische en willekeurige volgorde', tr: 'Alfabetik ve rastgele sıra arasında geçiş yapın' },
  
  // Tajweed
  tajweedRules: { en: 'Tajweed Rules', nl: 'Tajweed Regels', tr: 'Tecvid Kuralları' },
  learnBeautifulRules: { en: 'Learn the beautiful rules of Quranic recitation', nl: 'Leer de mooie regels van Koran recitatie', tr: 'Kuran tilavetinin güzel kurallarını öğrenin' },
  whyLearnTajweed: { en: 'Why Learn Tajweed?', nl: 'Waarom Tajweed Leren?', tr: 'Neden Tecvid Öğrenilmeli?' },
  tajweedReason1: { en: 'Tajweed ensures you recite the Quran as it was revealed', nl: 'Tajweed zorgt ervoor dat je de Koran reciteert zoals het werd geopenbaard', tr: 'Tecvid, Kuran\'ı indirildiği gibi okumanızı sağlar' },
  tajweedReason2: { en: 'It helps preserve the exact pronunciation of each letter', nl: 'Het helpt de exacte uitspraak van elke letter te behouden', tr: 'Her harfin tam telaffuzunu korumaya yardımcı olur' },
  tajweedReason3: { en: 'Proper tajweed makes your recitation more beautiful', nl: 'Juiste tajweed maakt je recitatie mooier', tr: 'Doğru tecvid tilavetinizi daha güzel yapar' },
  tajweedReason4: { en: 'It protects the meaning of the Quranic text', nl: 'Het beschermt de betekenis van de Koraanse tekst', tr: 'Kuran metninin anlamını korur' },
  tajweedReason5: { en: 'Learning tajweed is a form of worship and respect', nl: 'Tajweed leren is een vorm van aanbidding en respect', tr: 'Tecvid öğrenmek bir ibadet ve saygı şeklidir' },
  
  // Mistakes
  learnAvoidErrors: { en: 'Learn to avoid common pronunciation errors', nl: 'Leer veelgemaakte uitspraakfouten te vermijden', tr: 'Yaygın telaffuz hatalarından kaçınmayı öğrenin' },
  letterConfusion: { en: 'Letter Confusion', nl: 'Letter Verwarring', tr: 'Harf Karışıklığı' },
  vowelMistakes: { en: 'Vowel Mistakes', nl: 'Klinkerfouten', tr: 'Sesli Harf Hataları' },
  throatLetters: { en: 'Throat Letters', nl: 'Keelletters', tr: 'Boğaz Harfleri' },
  similarSounds: { en: 'Similar Sounds', nl: 'Vergelijkbare Klanken', tr: 'Benzer Sesler' },
  wrong: { en: 'Wrong', nl: 'Fout', tr: 'Yanlış' },
  correctLabel: { en: 'Correct', nl: 'Correct', tr: 'Doğru' },
  example: { en: 'Example', nl: 'Voorbeeld', tr: 'Örnek' },
  tipsAvoidMistakes: { en: 'Tips to Avoid Mistakes', nl: 'Tips om Fouten te Vermijden', tr: 'Hatalardan Kaçınma İpuçları' },
  mistakeTip1: { en: 'Listen carefully to proper recitation', nl: 'Luister aandachtig naar juiste recitatie', tr: 'Doğru tilaveti dikkatlice dinleyin' },
  mistakeTip2: { en: 'Practice with a qualified teacher', nl: 'Oefen met een gekwalificeerde leraar', tr: 'Nitelikli bir öğretmenle pratik yapın' },
  mistakeTip3: { en: 'Record yourself and compare with correct pronunciation', nl: 'Neem jezelf op en vergelijk met correcte uitspraak', tr: 'Kendinizi kaydedin ve doğru telaffuzla karşılaştırın' },
  mistakeTip4: { en: 'Focus on one letter pair at a time', nl: 'Focus op één letterpaar tegelijk', tr: 'Bir seferde bir harf çiftine odaklanın' },
  mistakeTip5: { en: 'Be patient - mastering pronunciation takes time', nl: 'Wees geduldig - uitspraak beheersen kost tijd', tr: 'Sabırlı olun - telaffuzda ustalaşmak zaman alır' },
  
  // Common
  backToHome: { en: 'Back to Home', nl: 'Terug naar Home', tr: 'Ana Sayfaya Dön' },
  listen: { en: 'Listen', nl: 'Luister', tr: 'Dinle' },
  loading: { en: 'Loading...', nl: 'Laden...', tr: 'Yükleniyor...' },
  progress: { en: 'Progress', nl: 'Voortgang', tr: 'İlerleme' },
  completed: { en: 'Completed', nl: 'Voltooid', tr: 'Tamamlandı' },
  achievement: { en: 'Achievement Unlocked!', nl: 'Prestatie Ontgrendeld!', tr: 'Başarı Kilidi Açıldı!' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
