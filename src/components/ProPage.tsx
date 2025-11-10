import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { Button } from './ui/button';
import { AudioButton } from './AudioButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, CheckCircle2, Star, BookOpen, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface ProPageProps {
  onNavigate: (page: string) => void;
}

const surahs = [
  {
    number: 1,
    name: 'Al-Fatihah',
    nameArabic: 'الفاتحة',
    meaning: { en: 'The Opening', nl: 'De Opening', tr: 'Açılış' },
    id: 'surah-1',
    verses: [
      { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahir Rahmanir Raheem', translation: { en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', nl: 'In de naam van Allah, de Meest Genadevolle, de Meest Barmhartige.', tr: 'Rahman ve Rahim olan Allah\'ın adıyla.' } },
      { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi rabbil alameen', translation: { en: 'All praise is due to Allah, Lord of the worlds.', nl: 'Alle lof behoort aan Allah, Heer van de werelden.', tr: 'Hamd, alemlerin Rabbi Allah\'a mahsustur.' } },
      { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Ar-Rahmanir-Raheem', translation: { en: 'The Entirely Merciful, the Especially Merciful,', nl: 'De Meest Genadevolle, de Meest Barmhartige,', tr: 'O Rahman ve Rahim\'dir.' } },
      { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki yawmid-deen', translation: { en: 'Sovereign of the Day of Recompense.', nl: 'Heerser van de Dag des Oordeels.', tr: 'Din gününün malikidir.' } },
      { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'Iyyaka nabudu wa iyyaka nastaeen', translation: { en: 'It is You we worship and You we ask for help.', nl: 'U alleen aanbidden wij en U alleen vragen wij om hulp.', tr: 'Ancak sana ibadet eder ve yalnız senden yardım dileriz.' } },
      { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', transliteration: 'Ihdinas-siratal-mustaqeem', translation: { en: 'Guide us to the straight path -', nl: 'Leid ons op het rechte pad -', tr: 'Bizi doğru yola ilet.' } },
      { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', transliteration: 'Siratal-latheena anamta alayhim ghayril-maghdubi alayhim walad-dalleen', translation: { en: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', nl: 'Het pad van degenen aan wie U genade hebt geschonken, niet van degenen die Uw toorn hebben gewekt of die zijn afgedwaald.', tr: 'Kendilerine nimet verdiklerinin yoluna; gazaba uğramışların ve sapıtmışların yoluna değil.' } },
    ],
  },
  {
    number: 112,
    name: 'Al-Ikhlas',
    nameArabic: 'الإخلاص',
    meaning: { en: 'The Sincerity', nl: 'De Oprechtheid', tr: 'İhlas' },
    id: 'surah-112',
    verses: [
      { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', transliteration: 'Qul huwa Allahu ahad', translation: { en: 'Say, "He is Allah, [who is] One,', nl: 'Zeg: "Hij is Allah, de Enige,', tr: 'De ki: "O, Allah\'tır, bir tektir.' } },
      { number: 2, arabic: 'اللَّهُ الصَّمَدُ', transliteration: 'Allahu assamad', translation: { en: 'Allah, the Eternal Refuge.', nl: 'Allah, de Eeuwige Toevlucht.', tr: 'Allah Samed\'dir (her şey O\'na muhtaçtır, O, hiçbir şeye muhtaç değildir).' } },
      { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', transliteration: 'Lam yalid walam yoolad', translation: { en: 'He neither begets nor is born,', nl: 'Hij heeft niet verwekt en is niet verwekt,', tr: 'O doğmamıştır, doğurmamıştır.' } },
      { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', transliteration: 'Walam yakun lahu kufuwan ahad', translation: { en: 'Nor is there to Him any equivalent."', nl: 'En er is niets aan Hem gelijk."', tr: 'Hiçbir şey O\'na denk ve benzer değildir."' } },
    ],
  },
  {
    number: 113,
    name: 'Al-Falaq',
    nameArabic: 'الفلق',
    meaning: { en: 'The Daybreak', nl: 'Het Aanbreken', tr: 'Tan Yeri' },
    id: 'surah-113',
    verses: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', transliteration: 'Qul aoodhu birabbi alfalaq', translation: { en: 'Say, "I seek refuge in the Lord of daybreak', nl: 'Zeg: "Ik zoek toevlucht bij de Heer van het aanbreken', tr: 'De ki: "Tan yerinin Rabbine sığınırım.' } },
      { number: 2, arabic: 'مِن شَرِّ مَا خَلَقَ', transliteration: 'Min sharri ma khalaq', translation: { en: 'From the evil of that which He created', nl: 'Tegen het kwaad van wat Hij heeft geschapen', tr: 'Yarattıklarının şerrinden,' } },
      { number: 3, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', transliteration: 'Wamin sharri ghasiqin itha waqab', translation: { en: 'And from the evil of darkness when it settles', nl: 'En tegen het kwaad van de duisternis wanneer het valt', tr: 'Karanlığın çöktüğü zaman onun şerrinden,' } },
      { number: 4, arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', transliteration: 'Wamin sharri annaffathati fee aluqad', translation: { en: 'And from the evil of the blowers in knots', nl: 'En tegen het kwaad van degenen die in knopen blazen', tr: 'Düğümlere üfleyenlerin şerrinden,' } },
      { number: 5, arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', transliteration: 'Wamin sharri hasidin itha hasad', translation: { en: 'And from the evil of an envier when he envies."', nl: 'En tegen het kwaad van een afgunstige wanneer hij afgunstig is."', tr: 'Haset ettiği zaman hasetçinin şerrinden."' } },
    ],
  },
  {
    number: 114,
    name: 'An-Nas',
    nameArabic: 'الناس',
    meaning: { en: 'Mankind', nl: 'De Mensheid', tr: 'İnsanlar' },
    id: 'surah-114',
    verses: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Qul aoodhu birabbi annas', translation: { en: 'Say, "I seek refuge in the Lord of mankind,', nl: 'Zeg: "Ik zoek toevlucht bij de Heer van de mensheid,', tr: 'De ki: "İnsanların Rabbine sığınırım.' } },
      { number: 2, arabic: 'مَلِكِ النَّاسِ', transliteration: 'Maliki annas', translation: { en: 'The Sovereign of mankind,', nl: 'De Koning van de mensheid,', tr: 'İnsanların Malikine (hükümdarına),' } },
      { number: 3, arabic: 'إِلَٰهِ النَّاسِ', transliteration: 'Ilahi annas', translation: { en: 'The God of mankind,', nl: 'De God van de mensheid,', tr: 'İnsanların İlahına (mabûduna),' } },
      { number: 4, arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', transliteration: 'Min sharri alwaswasi alkhannas', translation: { en: 'From the evil of the retreating whisperer -', nl: 'Tegen het kwaad van de sluipende influisteraar -', tr: 'Sinsi vesvesecinin şerrinden.' } },
      { number: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', transliteration: 'Allathee yuwaswisu fee sudoori annas', translation: { en: 'Who whispers [evil] into the breasts of mankind -', nl: 'Die influistert in de harten van de mensheid -', tr: 'O ki, insanların göğüslerine vesvese verir.' } },
      { number: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', transliteration: 'Mina aljinnati wannas', translation: { en: 'From among the jinn and mankind."', nl: 'Van de djinn en de mensheid."', tr: 'Cinlerden ve insanlardan."' } },
    ],
  },
  {
    number: 108,
    name: 'Al-Kawthar',
    nameArabic: 'الكوثر',
    meaning: { en: 'The Abundance', nl: 'De Overvloed', tr: 'Bolluk' },
    id: 'surah-108',
    verses: [
      { number: 1, arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', transliteration: 'Inna aataynaka alkawthara', translation: { en: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.', nl: 'Voorwaar, Wij hebben u, [O Mohammed], al-Kawthar geschonken.', tr: 'Şüphesiz biz sana Kevser\'i verdik.' } },
      { number: 2, arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', transliteration: 'Fasalli lirabbika wanhar', translation: { en: 'So pray to your Lord and sacrifice [to Him alone].', nl: 'Bid dus tot uw Heer en offer [alleen aan Hem].', tr: 'O halde Rabbin için namaz kıl ve kurban kes.' } },
      { number: 3, arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', transliteration: 'Inna shaniaka huwa alabtar', translation: { en: 'Indeed, your enemy is the one cut off.', nl: 'Voorwaar, uw vijand is degene die is afgesneden.', tr: 'Şüphesiz ki, sana kin duyan soyu kesik olandır.' } },
    ],
  },
];

export const ProPage: React.FC<ProPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { progress, markLessonComplete, getCompletionPercentage } = useProgress();
  const [selectedSurah, setSelectedSurah] = useState(0);

  const handleSurahComplete = (surahId: string) => {
    markLessonComplete('pro', surahId);
  };

  const isCompleted = (surahId: string) => {
    return progress.completedLessons.pro.includes(surahId);
  };

  const completionPercentage = getCompletionPercentage('pro');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-300 to-violet-300 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C27B0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4 hover:bg-purple-100 hover:scale-105 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-purple-700 mb-2 flex items-center gap-3 animate-slide-in-right">
                <span className="text-5xl animate-bounce-soft">📖</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('pro')}
                </span>
              </h1>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                {t('clickToHear')}
              </p>
            </div>
            
            <Card className="bg-gradient-to-br from-purple-100 via-violet-100 to-pink-100 border-2 border-purple-300 shadow-xl lg:w-80 hover:shadow-2xl transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-800 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-purple-600 text-purple-600" />
                    {t('progress')}
                  </span>
                  <span className="text-2xl font-bold text-purple-700">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3 shadow-inner" />
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={selectedSurah.toString()} onValueChange={(v) => setSelectedSurah(parseInt(v))} className="animate-fade-in">
          <TabsList className="mb-8 bg-white/80 backdrop-blur-sm p-2 shadow-lg flex-wrap h-auto gap-2">
            {surahs.map((surah, index) => (
              <TabsTrigger 
                key={surah.number} 
                value={index.toString()} 
                className="gap-2 px-4 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all hover:scale-105"
              >
                {isCompleted(surah.id) && <CheckCircle2 className="h-4 w-4" />}
                <span className="font-medium">{surah.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {surahs.map((surah, index) => (
            <TabsContent key={surah.number} value={index.toString()}>
              {/* Surah header */}
              <Card className="mb-8 bg-gradient-to-r from-purple-100 via-violet-100 to-pink-100 shadow-2xl border-2 border-purple-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                <CardHeader className="relative">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <CardTitle className="text-center mb-3">
                        <span className="text-6xl font-amiri text-purple-800 block mb-2 animate-slide-in-right">
                          {surah.nameArabic}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-center text-xl text-purple-700">
                        {t('surah')} {surah.number}: {surah.name} - {surah.meaning[language]}
                      </CardDescription>
                    </div>
                    <Button
                      variant={isCompleted(surah.id) ? 'default' : 'outline'}
                      onClick={() => handleSurahComplete(surah.id)}
                      className={`gap-2 px-6 py-3 ${isCompleted(surah.id) ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''} hover:scale-105 transition-all`}
                    >
                      {isCompleted(surah.id) ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          {t('completed')}
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          {t('completed') + '?'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Verses */}
              <div className="space-y-6">
                {surah.verses.map((verse, vIndex) => (
                  <Card 
                    key={verse.number} 
                    className="hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-2 border-purple-100 overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${vIndex * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          {/* Arabic text */}
                          <div className="text-right mb-8 p-8 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-inner">
                            <p className="text-5xl md:text-6xl leading-loose font-arabic text-purple-900 dir-rtl hover:scale-105 transition-transform duration-300">
                              {verse.arabic}
                            </p>
                          </div>
                          {/* Transliteration and translation */}
                          <div className="space-y-4 px-2">
                            <div className="flex items-start gap-3">
                              <span className="text-purple-600 text-xl flex-shrink-0">📝</span>
                              <p className="text-gray-700 italic text-lg leading-relaxed">{verse.transliteration}</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-purple-600 text-xl flex-shrink-0">💫</span>
                              <p className="text-gray-600 leading-relaxed text-lg">{verse.translation[language]}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Verse number and audio */}
                        <div className="flex flex-col gap-4 items-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-md opacity-50 animate-pulse-glow"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 text-white shadow-xl border-4 border-white">
                              <span className="text-xl font-bold">{verse.number}</span>
                            </div>
                          </div>
                          <AudioButton 
                            text={verse.arabic}
                            surahNumber={surah.number}
                            ayahNumber={verse.number}
                            variant="outline"
                            size="lg"
                          />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Tips section */}
        <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-white border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300 to-violet-300 rounded-full opacity-20 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-700 text-2xl">
                <Star className="h-6 w-6 text-purple-600 fill-purple-600" />
                {t('readingTips')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              {[t('readingTip1'), t('readingTip2'), t('readingTip3'), t('readingTip4')].map((tip, i) => (
                <p key={i} className="flex items-start gap-3">
                  <span className="text-purple-600 text-2xl flex-shrink-0 animate-bounce-soft" style={{ animationDelay: `${i * 0.2}s` }}>✨</span>
                  <span className="text-gray-700">{tip}</span>
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-white border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full opacity-20 blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-700 text-2xl">
                <span className="text-3xl animate-bounce-soft">🎯</span>
                {t('progress')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <div className="text-center">
                <div className="text-7xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                  {progress.completedLessons.pro.length}/{surahs.length}
                </div>
                <p className="text-gray-600 text-lg">{t('completed')}</p>
              </div>
              {completionPercentage === 100 && (
                <div className="text-center p-6 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-2xl shadow-inner animate-pulse-glow">
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
