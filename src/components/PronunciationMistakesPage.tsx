import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, X, Check, AlertTriangle } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface PronunciationMistakesPageProps {
  onNavigate: (page: string) => void;
}

const commonMistakes = [
  {
    category: { en: 'Letter Confusion', nl: 'Letter Verwarring', tr: 'Harf Karışıklığı' },
    mistakes: [
      {
        wrong: 'س',
        correct: 'ص',
        wrongName: 'Seen',
        correctName: 'Sad',
        explanation: { 
          en: 'Sad is a heavy letter pronounced from deeper in the throat', 
          nl: 'Sad is een zware letter uitgesproken vanuit dieper in de keel', 
          tr: 'Sad, boğazın derinlerinden telaffuz edilen kalın bir harftir' 
        },
        example: 'صَلَاة vs سَلَام',
      },
      {
        wrong: 'ت',
        correct: 'ط',
        wrongName: 'Ta',
        correctName: 'Taa',
        explanation: { 
          en: 'Taa is the heavy version of Ta', 
          nl: 'Taa is de zware versie van Ta', 
          tr: 'Taa, Ta\'nın kalın versiyonudur' 
        },
        example: 'طَيِّب vs تَيْن',
      },
      {
        wrong: 'د',
        correct: 'ض',
        wrongName: 'Dal',
        correctName: 'Daad',
        explanation: { 
          en: 'Daad is a heavy letter unique to Arabic', 
          nl: 'Daad is een zware letter uniek aan het Arabisch', 
          tr: 'Daad, Arapçaya özgü kalın bir harftir' 
        },
        example: 'ضَرَبَ vs دَرَسَ',
      },
      {
        wrong: 'ه',
        correct: 'ح',
        wrongName: 'Ha',
        correctName: 'Haa',
        explanation: { 
          en: 'Haa comes from deeper in the throat', 
          nl: 'Haa komt van dieper in de keel', 
          tr: 'Haa, boğazın daha derininden gelir' 
        },
        example: 'حَمْد vs هَوَى',
      },
    ],
  },
  {
    category: { en: 'Vowel Mistakes', nl: 'Klinkerfouten', tr: 'Sesli Harf Hataları' },
    mistakes: [
      {
        wrong: { en: 'Short vowel', nl: 'Korte klinker', tr: 'Kısa sesli' },
        correct: { en: 'Madd (long vowel)', nl: 'Madd (lange klinker)', tr: 'Med (uzun sesli)' },
        wrongName: 'بَ',
        correctName: 'بَا',
        explanation: { 
          en: 'Madd should be held for 2 counts minimum', 
          nl: 'Madd moet minimaal 2 tellen aangehouden worden', 
          tr: 'Med en az 2 hareke tutulmalıdır' 
        },
        example: 'قَالَ (Qaa-la) not قَلَ (Qa-la)',
      },
    ],
  },
  {
    category: { en: 'Throat Letters', nl: 'Keelletters', tr: 'Boğaz Harfleri' },
    mistakes: [
      {
        wrong: 'ء',
        correct: 'ع',
        wrongName: 'Hamza',
        correctName: 'Ayn',
        explanation: { 
          en: 'Ayn is pronounced from the middle of the throat', 
          nl: 'Ayn wordt uitgesproken vanuit het midden van de keel', 
          tr: 'Ayn, boğazın ortasından telaffuz edilir' 
        },
        example: 'عَبْد vs أَبْد',
      },
      {
        wrong: 'ح',
        correct: 'خ',
        wrongName: 'Haa',
        correctName: 'Kha',
        explanation: { 
          en: 'Kha has a guttural sound like "ch" in "loch"', 
          nl: 'Kha heeft een gutturale klank zoals "ch" in "loch"', 
          tr: 'Kha, "ch" harfine benzer gırtlak sesidir' 
        },
        example: 'خَيْر vs حَيّ',
      },
    ],
  },
  {
    category: { en: 'Similar Sounds', nl: 'Vergelijkbare Klanken', tr: 'Benzer Sesler' },
    mistakes: [
      {
        wrong: 'ذ',
        correct: 'ظ',
        wrongName: 'Dhal',
        correctName: 'Dhaa',
        explanation: { 
          en: 'Dhaa is the heavy version of Dhal', 
          nl: 'Dhaa is de zware versie van Dhal', 
          tr: 'Dhaa, Dhal\'ın kalın versiyonudur' 
        },
        example: 'ظَلَمَ vs ذَهَبَ',
      },
      {
        wrong: 'ز',
        correct: 'ظ',
        wrongName: 'Zay',
        correctName: 'Dhaa',
        explanation: { 
          en: 'Dhaa is heavy, not like the light Zay', 
          nl: 'Dhaa is zwaar, niet zoals de lichte Zay', 
          tr: 'Dhaa kalındır, ince Zay gibi değildir' 
        },
        example: 'ظَهَرَ vs زَهَرَ',
      },
    ],
  },
];

export const PronunciationMistakesPage: React.FC<PronunciationMistakesPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-rose-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4 hover:bg-rose-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          <h1 className="text-rose-700 mb-2 flex items-center gap-3">
            <AlertTriangle className="h-10 w-10" />
            {t('mistakes')}
          </h1>
          <p className="text-gray-600">{t('learnAvoidErrors')}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {commonMistakes.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="mb-6 text-rose-600 flex items-center gap-2">
                <span className="text-3xl">
                  {categoryIndex === 0 ? '🔤' : categoryIndex === 1 ? '📝' : categoryIndex === 2 ? '👄' : '🔊'}
                </span>
                {typeof category.category === 'string' ? category.category : category.category[language]}
              </h2>
              <div className="grid gap-6">
                {category.mistakes.map((mistake, mistakeIndex) => (
                  <Card key={mistakeIndex} className="hover:shadow-2xl transition-all shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-rose-700 flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        {mistake.wrongName} vs {mistake.correctName}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {typeof mistake.explanation === 'string' ? mistake.explanation : mistake.explanation[language]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 shadow-md">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                                <X className="h-6 w-6 text-white" />
                              </div>
                              <CardTitle className="text-red-700">{t('wrong')}</CardTitle>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                              <p className="text-5xl text-red-700 flex-1">
                                {typeof mistake.wrong === 'string' ? mistake.wrong : mistake.wrongName}
                              </p>
                              <AudioButton 
                                text={typeof mistake.wrong === 'string' ? mistake.wrong : mistake.wrongName} 
                                variant="outline"
                              />
                            </div>
                            <CardDescription className="mt-2">{mistake.wrongName}</CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 shadow-md">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                                <Check className="h-6 w-6 text-white" />
                              </div>
                              <CardTitle className="text-green-700">{t('correctLabel')}</CardTitle>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                              <p className="text-5xl text-green-700 flex-1">
                                {typeof mistake.correct === 'string' ? mistake.correct : mistake.correctName}
                              </p>
                              <AudioButton 
                                text={typeof mistake.correct === 'string' ? mistake.correct : mistake.correctName} 
                                variant="outline"
                              />
                            </div>
                            <CardDescription className="mt-2">{mistake.correctName}</CardDescription>
                          </CardHeader>
                        </Card>
                      </div>

                      {mistake.example && (
                        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-3">{t('example')}:</p>
                          <div className="flex items-center gap-4">
                            <p className="text-3xl text-gray-800 flex-1">{mistake.example}</p>
                            <AudioButton text={mistake.example} variant="outline" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          <Card className="bg-gradient-to-r from-rose-100 to-red-100 shadow-xl border-rose-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-800">
                <span className="text-3xl">💡</span>
                {t('tipsAvoidMistakes')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-rose-600 text-xl">✨</span>
                <span>{t('mistakeTip1')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-600 text-xl">✨</span>
                <span>{t('mistakeTip2')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-600 text-xl">✨</span>
                <span>{t('mistakeTip3')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-600 text-xl">✨</span>
                <span>{t('mistakeTip4')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-600 text-xl">✨</span>
                <span>{t('mistakeTip5')}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
