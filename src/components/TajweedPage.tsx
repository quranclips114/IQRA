import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { AudioButton } from './AudioButton';

interface TajweedPageProps {
  onNavigate: (page: string) => void;
}

const tajweedRules = [
  {
    title: { en: 'Noon Sakinah and Tanween', nl: 'Noon Sakinah en Tanween', tr: 'Sâkin Nun ve Tenvin' },
    titleArabic: 'النون الساكنة والتنوين',
    description: { en: 'Rules for pronouncing Noon with sukoon and tanween', nl: 'Regels voor het uitspreken van Noon met sukoon en tanween', tr: 'Sâkin Nun ve Tenvin telaffuz kuralları' },
    rules: [
      { 
        name: { en: 'Izhar (Clear pronunciation)', nl: 'Izhar (Duidelijke uitspraak)', tr: 'İzhar (Açık telaffuz)' },
        example: 'مِنْ أَنفُسِهِمْ', 
        description: { en: 'Clear pronunciation before throat letters', nl: 'Duidelijke uitspraak voor keelletters', tr: 'Boğaz harflerinden önce açık telaffuz' }
      },
      { 
        name: { en: 'Idgham (Merging)', nl: 'Idgham (Samenvoegen)', tr: 'İdğam (Birleştirme)' },
        example: 'مِن رَّبِّهِمْ', 
        description: { en: 'Merging with specific letters', nl: 'Samenvoegen met specifieke letters', tr: 'Belirli harflerle birleştirme' }
      },
      { 
        name: { en: 'Iqlab (Conversion)', nl: 'Iqlab (Omzetting)', tr: 'İklab (Dönüştürme)' },
        example: 'مِنۢ بَعْدِ', 
        description: { en: 'Converting to a meem sound before Ba', nl: 'Omzetten naar een meem-klank voor Ba', tr: 'Ba harfinden önce mim sesine dönüştürme' }
      },
      { 
        name: { en: 'Ikhfa (Hiding)', nl: 'Ikhfa (Verbergen)', tr: 'İhfa (Gizleme)' },
        example: 'مَن كَانَ', 
        description: { en: 'Hiding the sound with nasal pronunciation', nl: 'Het verbergen van de klank met nasale uitspraak', tr: 'Sesi genizden gizleme' }
      },
    ],
  },
  {
    title: { en: 'Meem Sakinah', nl: 'Meem Sakinah', tr: 'Sâkin Mim' },
    titleArabic: 'الميم الساكنة',
    description: { en: 'Rules for pronouncing Meem with sukoon', nl: 'Regels voor het uitspreken van Meem met sukoon', tr: 'Sâkin Mim telaffuz kuralları' },
    rules: [
      { 
        name: { en: 'Idgham Shafawi', nl: 'Idgham Shafawi', tr: 'İdğam Şafevi' },
        example: 'لَهُم مَّا', 
        description: { en: 'Merging two meems together', nl: 'Twee meems samenvoegen', tr: 'İki mimi birleştirme' }
      },
      { 
        name: { en: 'Ikhfa Shafawi', nl: 'Ikhfa Shafawi', tr: 'İhfa Şafevi' },
        example: 'وَهُم بِالْآخِرَةِ', 
        description: { en: 'Hiding before the letter Ba', nl: 'Verbergen voor de letter Ba', tr: 'Ba harfinden önce gizleme' }
      },
      { 
        name: { en: 'Izhar Shafawi', nl: 'Izhar Shafawi', tr: 'İzhar Şafevi' },
        example: 'لَهُمْ عَذَابٌ', 
        description: { en: 'Clear pronunciation before other letters', nl: 'Duidelijke uitspraak voor andere letters', tr: 'Diğer harflerden önce açık telaffuz' }
      },
    ],
  },
  {
    title: { en: 'Qalqalah', nl: 'Qalqalah', tr: 'Kalkale' },
    titleArabic: 'القلقلة',
    description: { en: 'Echo or vibrating sound', nl: 'Echo of trillende klank', tr: 'Yankı veya titreşen ses' },
    rules: [
      { 
        name: { en: 'Qalqalah Letters', nl: 'Qalqalah Letters', tr: 'Kalkale Harfleri' },
        example: 'ق ط ب ج د', 
        description: { en: 'Letters that require a slight bounce when pronounced with sukoon', nl: 'Letters die een lichte stuit vereisen bij uitspraak met sukoon', tr: 'Sükun ile okunduğunda hafif sıçrama gerektiren harfler' }
      },
    ],
  },
  {
    title: { en: 'Madd (Prolongation)', nl: 'Madd (Verlenging)', tr: 'Med (Uzatma)' },
    titleArabic: 'المد',
    description: { en: 'Rules for elongating vowels', nl: 'Regels voor het verlengen van klinkers', tr: 'Sesli harfleri uzatma kuralları' },
    rules: [
      { 
        name: { en: 'Madd Tabee\'ee', nl: 'Madd Tabee\'ee', tr: 'Med-i Tabii' },
        example: 'قَالَ', 
        description: { en: 'Natural prolongation (2 counts)', nl: 'Natuurlijke verlenging (2 tellen)', tr: 'Doğal uzatma (2 hareke)' }
      },
      { 
        name: { en: 'Madd Munfasil', nl: 'Madd Munfasil', tr: 'Med-i Munfasıl' },
        example: 'بِمَا أَنزَلَ', 
        description: { en: 'Disconnected prolongation (4-5 counts)', nl: 'Ontkoppelde verlenging (4-5 tellen)', tr: 'Ayrık uzatma (4-5 hareke)' }
      },
      { 
        name: { en: 'Madd Muttasil', nl: 'Madd Muttasil', tr: 'Med-i Muttasıl' },
        example: 'جَآءَ', 
        description: { en: 'Connected prolongation (4-5 counts)', nl: 'Verbonden verlenging (4-5 tellen)', tr: 'Bağlı uzatma (4-5 hareke)' }
      },
      { 
        name: { en: 'Madd Lazim', nl: 'Madd Lazim', tr: 'Med-i Lazım' },
        example: 'الضَّآلِّينَ', 
        description: { en: 'Necessary prolongation (6 counts)', nl: 'Noodzakelijke verlenging (6 tellen)', tr: 'Gerekli uzatma (6 hareke)' }
      },
    ],
  },
  {
    title: { en: 'Ra (ر) - Tafkheem and Tarqeeq', nl: 'Ra (ر) - Tafkheem en Tarqeeq', tr: 'Ra (ر) - Kalınlık ve İncelik' },
    titleArabic: 'الراء - التفخيم والترقيق',
    description: { en: 'Heavy and light pronunciation of Ra', nl: 'Zware en lichte uitspraak van Ra', tr: 'Ra\'nın kalın ve ince telaffuzu' },
    rules: [
      { 
        name: { en: 'Heavy Ra (Tafkheem)', nl: 'Zware Ra (Tafkheem)', tr: 'Kalın Ra (Tefhim)' },
        example: 'رَبِّ', 
        description: { en: 'When Ra has fatha, damma, or is followed by heavy letter', nl: 'Wanneer Ra fatha, damma heeft, of wordt gevolgd door een zware letter', tr: 'Ra üzerinde fetha, damme olduğunda veya kalın harf geldiğinde' }
      },
      { 
        name: { en: 'Light Ra (Tarqeeq)', nl: 'Lichte Ra (Tarqeeq)', tr: 'İnce Ra (Terkik)' },
        example: 'بِرَبِّكَ', 
        description: { en: 'When Ra has kasra or comes after kasra', nl: 'Wanneer Ra kasra heeft of na kasra komt', tr: 'Ra üzerinde kesre olduğunda veya kesreden sonra geldiğinde' }
      },
    ],
  },
  {
    title: { en: 'Lam in the Name of Allah', nl: 'Lam in de Naam van Allah', tr: 'Allah Lafzının Lam\'ı' },
    titleArabic: 'لام لفظ الجلالة',
    description: { en: 'Special rules for Lam in "Allah"', nl: 'Speciale regels voor Lam in "Allah"', tr: '"Allah" kelimesindeki Lam için özel kurallar' },
    rules: [
      { 
        name: { en: 'Heavy Lam', nl: 'Zware Lam', tr: 'Kalın Lam' },
        example: 'قَالَ اللَّهُ', 
        description: { en: 'After fatha or damma', nl: 'Na fatha of damma', tr: 'Fetha veya dammeden sonra' }
      },
      { 
        name: { en: 'Light Lam', nl: 'Lichte Lam', tr: 'İnce Lam' },
        example: 'بِسْمِ اللَّهِ', 
        description: { en: 'After kasra', nl: 'Na kasra', tr: 'Kesreden sonra' }
      },
    ],
  },
];

export const TajweedPage: React.FC<TajweedPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4 hover:bg-amber-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          <h1 className="text-amber-700 mb-2 flex items-center gap-3">
            <Sparkles className="h-10 w-10" />
            {t('tajweed')}
          </h1>
          <p className="text-gray-600">{t('learnBeautifulRules')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {tajweedRules.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="text-left">
                      <CardTitle className="text-amber-700 flex items-center gap-2">
                        <span className="text-2xl">📜</span>
                        {category.title[language]}
                      </CardTitle>
                      <p className="text-3xl text-amber-600 mt-2">{category.titleArabic}</p>
                      <CardDescription className="mt-2">{category.description[language]}</CardDescription>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {category.rules.map((rule, ruleIndex) => (
                          <Card key={ruleIndex} className="bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle className="text-lg text-amber-800">{rule.name[language]}</CardTitle>
                              <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg">
                                <p className="text-3xl text-amber-700 flex-1">{rule.example}</p>
                                <AudioButton text={rule.example} size="sm" variant="outline" />
                              </div>
                              <CardDescription className="text-base">{rule.description[language]}</CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12">
            <Card className="bg-gradient-to-r from-amber-100 to-orange-100 shadow-xl border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <span className="text-3xl">💫</span>
                  {t('whyLearnTajweed')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 text-xl">✨</span>
                  <span>{t('tajweedReason1')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 text-xl">✨</span>
                  <span>{t('tajweedReason2')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 text-xl">✨</span>
                  <span>{t('tajweedReason3')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 text-xl">✨</span>
                  <span>{t('tajweedReason4')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-600 text-xl">✨</span>
                  <span>{t('tajweedReason5')}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
