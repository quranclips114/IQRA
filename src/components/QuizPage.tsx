import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, Trophy, RotateCcw, Star, Award, Zap, Clock, Flame, Lightbulb, Shuffle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

interface QuizQuestion {
  question: { en: string; nl: string; tr: string };
  options: string[] | { en: string; nl: string; tr: string }[];
  correct: number;
}

const quizData = {
  beginner: [
    { question: { en: 'Which letter is this: ب', nl: 'Welke letter is dit: ب', tr: 'Bu hangi harf: ب' }, options: ['Alif', 'Ba', 'Ta', 'Tha'], correct: 1 },
    { question: { en: 'Which letter is this: م', nl: 'Welke letter is dit: م', tr: 'Bu hangi harf: م' }, options: ['Lam', 'Noon', 'Meem', 'Ha'], correct: 2 },
    { question: { en: 'Which letter is this: ر', nl: 'Welke letter is dit: ر', tr: 'Bu hangi harf: ر' }, options: ['Ra', 'Zay', 'Dal', 'Dhal'], correct: 0 },
    { question: { en: 'Which letter is this: س', nl: 'Welke letter is dit: س', tr: 'Bu hangi harf: س' }, options: ['Sheen', 'Seen', 'Sad', 'Daad'], correct: 1 },
    { question: { en: 'Which letter is this: ل', nl: 'Welke letter is dit: ل', tr: 'Bu hangi harf: ل' }, options: ['Alif', 'Lam', 'Kaf', 'Qaf'], correct: 1 },
    { question: { en: 'Which letter is this: ا', nl: 'Welke letter is dit: ا', tr: 'Bu hangi harf: ا' }, options: ['Alif', 'Ba', 'Ta', 'Tha'], correct: 0 },
    { question: { en: 'Which letter is this: ت', nl: 'Welke letter is dit: ت', tr: 'Bu hangi harf: ت' }, options: ['Ba', 'Ta', 'Tha', 'Jeem'], correct: 1 },
    { question: { en: 'Which letter is this: ث', nl: 'Welke letter is dit: ث', tr: 'Bu hangi harf: ث' }, options: ['Ba', 'Ta', 'Tha', 'Jeem'], correct: 2 },
    { question: { en: 'Which letter is this: ج', nl: 'Welke letter is dit: ج', tr: 'Bu hangi harf: ج' }, options: ['Ba', 'Ta', 'Tha', 'Jeem'], correct: 3 },
    { question: { en: 'Which letter is this: ح', nl: 'Welke letter is dit: ح', tr: 'Bu hangi harf: ح' }, options: ['Ha', 'Kha', 'Haa', 'Ayn'], correct: 0 },
    { question: { en: 'Which letter is this: خ', nl: 'Welke letter is dit: خ', tr: 'Bu hangi harf: خ' }, options: ['Ha', 'Kha', 'Jeem', 'Ayn'], correct: 1 },
    { question: { en: 'Which letter is this: د', nl: 'Welke letter is dit: د', tr: 'Bu hangi harf: د' }, options: ['Dal', 'Dhal', 'Ra', 'Zay'], correct: 0 },
    { question: { en: 'Which letter is this: ذ', nl: 'Welke letter is dit: ذ', tr: 'Bu hangi harf: ذ' }, options: ['Dal', 'Dhal', 'Ra', 'Zay'], correct: 1 },
    { question: { en: 'Which letter is this: ز', nl: 'Welke letter is dit: ز', tr: 'Bu hangi harf: ز' }, options: ['Dal', 'Dhal', 'Ra', 'Zay'], correct: 3 },
    { question: { en: 'Which letter is this: ش', nl: 'Welke letter is dit: ش', tr: 'Bu hangi harf: ش' }, options: ['Seen', 'Sheen', 'Sad', 'Daad'], correct: 1 },
    { question: { en: 'Which letter is this: ص', nl: 'Welke letter is dit: ص', tr: 'Bu hangi harf: ص' }, options: ['Seen', 'Sheen', 'Sad', 'Daad'], correct: 2 },
    { question: { en: 'Which letter is this: ض', nl: 'Welke letter is dit: ض', tr: 'Bu hangi harf: ض' }, options: ['Seen', 'Sheen', 'Sad', 'Daad'], correct: 3 },
    { question: { en: 'Which letter is this: ط', nl: 'Welke letter is dit: ط', tr: 'Bu hangi harf: ط' }, options: ['Ta (Emphatic)', 'Dha', 'Ayn', 'Ghayn'], correct: 0 },
    { question: { en: 'Which letter is this: ظ', nl: 'Welke letter is dit: ظ', tr: 'Bu hangi harf: ظ' }, options: ['Ta', 'Dha', 'Ayn', 'Ghayn'], correct: 1 },
    { question: { en: 'Which letter is this: ع', nl: 'Welke letter is dit: ع', tr: 'Bu hangi harf: ع' }, options: ['Ta', 'Dha', 'Ayn', 'Ghayn'], correct: 2 },
    { question: { en: 'Which letter is this: غ', nl: 'Welke letter is dit: غ', tr: 'Bu hangi harf: غ' }, options: ['Ta', 'Dha', 'Ayn', 'Ghayn'], correct: 3 },
    { question: { en: 'Which letter is this: ف', nl: 'Welke letter is dit: ف', tr: 'Bu hangi harf: ف' }, options: ['Fa', 'Qaf', 'Kaf', 'Lam'], correct: 0 },
    { question: { en: 'Which letter is this: ق', nl: 'Welke letter is dit: ق', tr: 'Bu hangi harf: ق' }, options: ['Fa', 'Qaf', 'Kaf', 'Lam'], correct: 1 },
    { question: { en: 'Which letter is this: ك', nl: 'Welke letter is dit: ك', tr: 'Bu hangi harf: ك' }, options: ['Fa', 'Qaf', 'Kaf', 'Lam'], correct: 2 },
    { question: { en: 'Which letter is this: ن', nl: 'Welke letter is dit: ن', tr: 'Bu hangi harf: ن' }, options: ['Meem', 'Noon', 'Waw', 'Ya'], correct: 1 },
    { question: { en: 'Which letter is this: ه', nl: 'Welke letter is dit: ه', tr: 'Bu hangi harf: ه' }, options: ['Ha', 'Noon', 'Waw', 'Ya'], correct: 0 },
    { question: { en: 'Which letter is this: و', nl: 'Welke letter is dit: و', tr: 'Bu hangi harf: و' }, options: ['Meem', 'Noon', 'Waw', 'Ya'], correct: 2 },
    { question: { en: 'Which letter is this: ي', nl: 'Welke letter is dit: ي', tr: 'Bu hangi harf: ي' }, options: ['Meem', 'Noon', 'Waw', 'Ya'], correct: 3 },
    { question: { en: 'Which letter comes after ب?', nl: 'Welke letter komt na ب?', tr: 'ب harfinden sonra hangi harf gelir?' }, options: ['Alif', 'Ta', 'Tha', 'Jeem'], correct: 1 },
    { question: { en: 'Which letter comes before ر?', nl: 'Welke letter komt voor ر?', tr: 'ر harfinden önce hangi harf gelir?' }, options: ['Dal', 'Dhal', 'Zay', 'Seen'], correct: 1 },
    { question: { en: 'How many letters are in the Arabic alphabet?', nl: 'Hoeveel letters heeft het Arabische alfabet?', tr: 'Arap alfabesinde kaç harf vardır?' }, options: ['26', '27', '28', '29'], correct: 2 },
    { question: { en: 'Which letter is ف?', nl: 'Welke letter is ف?', tr: 'ف hangi harftir?' }, options: ['Fa', 'Qaf', 'Kaf', 'Lam'], correct: 0 },
    { question: { en: 'Which is the first letter?', nl: 'Wat is de eerste letter?', tr: 'İlk harf hangisidir?' }, options: ['ا', 'ب', 'ت', 'ث'], correct: 0 },
    { question: { en: 'Which is the last letter?', nl: 'Wat is de laatste letter?', tr: 'Son harf hangisidir?' }, options: ['و', 'ه', 'ن', 'ي'], correct: 3 },
    { question: { en: 'Which letter is خ?', nl: 'Welke letter is خ?', tr: 'خ hangi harftir?' }, options: ['Ha', 'Kha', 'Jeem', 'Haa'], correct: 1 },
    { question: { en: 'Which letter is ع?', nl: 'Welke letter is ع?', tr: 'ع hangi harftir?' }, options: ['Ghayn', 'Ayn', 'Ha', 'Kha'], correct: 1 },
  ],
  intermediate: [
    { question: { en: 'What does "الحمد" mean?', nl: 'Wat betekent "الحمد"?', tr: '"الحمد" ne anlama gelir?' }, options: [{ en: 'The Peace', nl: 'De Vrede', tr: 'Barış' }, { en: 'The Praise', nl: 'De Lof', tr: 'Hamd' }, { en: 'The Mercy', nl: 'De Genade', tr: 'Merhamet' }, { en: 'The Light', nl: 'Het Licht', tr: 'Işık' }], correct: 1 },
    { question: { en: 'What does "رب" mean?', nl: 'Wat betekent "رب"?', tr: '"رب" ne anlama gelir?' }, options: [{ en: 'King', nl: 'Koning', tr: 'Kral' }, { en: 'Lord', nl: 'Heer', tr: 'Rab' }, { en: 'Master', nl: 'Meester', tr: 'Efendi' }, { en: 'Creator', nl: 'Schepper', tr: 'Yaratıcı' }], correct: 1 },
    { question: { en: 'What does "الرحمن" mean?', nl: 'Wat betekent "الرحمن"?', tr: '"الرحمن" ne anlama gelir?' }, options: [{ en: 'The Kind', nl: 'De Vriendelijke', tr: 'Şefkatli' }, { en: 'The Generous', nl: 'De Gulle', tr: 'Cömert' }, { en: 'The Most Gracious', nl: 'De Meest Genadevolle', tr: 'Rahman' }, { en: 'The Wise', nl: 'De Wijze', tr: 'Bilge' }], correct: 2 },
    { question: { en: 'What does "نعبد" mean?', nl: 'Wat betekent "نعبد"?', tr: '"نعبد" ne anlama gelir?' }, options: [{ en: 'We pray', nl: 'Wij bidden', tr: 'Dua ederiz' }, { en: 'We worship', nl: 'Wij aanbidden', tr: 'İbadet ederiz' }, { en: 'We read', nl: 'Wij lezen', tr: 'Okuruz' }, { en: 'We learn', nl: 'Wij leren', tr: 'Öğreniriz' }], correct: 1 },
    { question: { en: 'What does "الرحيم" mean?', nl: 'Wat betekent "الرحيم"?', tr: '"الرحيم" ne anlama gelir?' }, options: [{ en: 'The Powerful', nl: 'De Machtige', tr: 'Güçlü' }, { en: 'The Most Merciful', nl: 'De Meest Barmhartige', tr: 'Rahim' }, { en: 'The Great', nl: 'De Grote', tr: 'Büyük' }, { en: 'The Knowing', nl: 'De Wetende', tr: 'Bilen' }], correct: 1 },
    { question: { en: 'What does "العالمين" mean?', nl: 'Wat betekent "العالمين"?', tr: '"العالمين" ne anlama gelir?' }, options: [{ en: 'The People', nl: 'De Mensen', tr: 'İnsanlar' }, { en: 'The Angels', nl: 'De Engelen', tr: 'Melekler' }, { en: 'The Worlds', nl: 'De Werelden', tr: 'Alemler' }, { en: 'The Heavens', nl: 'De Hemelen', tr: 'Gökler' }], correct: 2 },
    { question: { en: 'What does "مالك" mean?', nl: 'Wat betekent "مالك"?', tr: '"مالك" ne anlama gelir?' }, options: [{ en: 'Master/Owner', nl: 'Meester/Eigenaar', tr: 'Malik/Sahip' }, { en: 'Creator', nl: 'Schepper', tr: 'Yaratıcı' }, { en: 'Guide', nl: 'Gids', tr: 'Rehber' }, { en: 'Helper', nl: 'Helper', tr: 'Yardımcı' }], correct: 0 },
    { question: { en: 'What does "يوم الدين" mean?', nl: 'Wat betekent "يوم الدين"?', tr: '"يوم الدين" ne anlama gelir?' }, options: [{ en: 'Day of Peace', nl: 'Dag van Vrede', tr: 'Barış Günü' }, { en: 'Day of Judgment', nl: 'Dag des Oordeels', tr: 'Hesap Günü' }, { en: 'Day of Prayer', nl: 'Dag van Gebed', tr: 'Dua Günü' }, { en: 'Day of Mercy', nl: 'Dag van Genade', tr: 'Merhamet Günü' }], correct: 1 },
    { question: { en: 'What does "إياك" mean?', nl: 'Wat betekent "إياك"?', tr: '"إياك" ne anlama gelir?' }, options: [{ en: 'You alone', nl: 'Jij alleen', tr: 'Yalnız Sen' }, { en: 'We believe', nl: 'Wij geloven', tr: 'İnanırız' }, { en: 'They know', nl: 'Zij weten', tr: 'Bilirler' }, { en: 'I worship', nl: 'Ik aanbid', tr: 'İbadet ederim' }], correct: 0 },
    { question: { en: 'What does "نستعين" mean?', nl: 'Wat betekent "نستعين"?', tr: '"نستعين" ne anlama gelir?' }, options: [{ en: 'We believe', nl: 'Wij geloven', tr: 'İnanırız' }, { en: 'We seek help', nl: 'Wij zoeken hulp', tr: 'Yardım dileriz' }, { en: 'We pray', nl: 'Wij bidden', tr: 'Dua ederiz' }, { en: 'We thank', nl: 'Wij danken', tr: 'Teşekkür ederiz' }], correct: 1 },
    { question: { en: 'What does "اهدنا" mean?', nl: 'Wat betekent "اهدنا"?', tr: '"اهدنا" ne anlama gelir?' }, options: [{ en: 'Help us', nl: 'Help ons', tr: 'Bize yardım et' }, { en: 'Guide us', nl: 'Leid ons', tr: 'Bizi doğru yola ilet' }, { en: 'Forgive us', nl: 'Vergeef ons', tr: 'Bizi bağışla' }, { en: 'Bless us', nl: 'Zegen ons', tr: 'Bizi kutsala' }], correct: 1 },
    { question: { en: 'What does "الصراط" mean?', nl: 'Wat betekent "الصراط"?', tr: '"الصراط" ne anlama gelir?' }, options: [{ en: 'The Light', nl: 'Het Licht', tr: 'Işık' }, { en: 'The Path', nl: 'Het Pad', tr: 'Yol' }, { en: 'The Truth', nl: 'De Waarheid', tr: 'Gerçek' }, { en: 'The Book', nl: 'Het Boek', tr: 'Kitap' }], correct: 1 },
    { question: { en: 'What does "المستقيم" mean?', nl: 'Wat betekent "المستقيم"?', tr: '"المستقيم" ne anlama gelir?' }, options: [{ en: 'The Wide', nl: 'Het Brede', tr: 'Geniş' }, { en: 'The Narrow', nl: 'Het Smalle', tr: 'Dar' }, { en: 'The Straight', nl: 'Het Rechte', tr: 'Doğru' }, { en: 'The Long', nl: 'Het Lange', tr: 'Uzun' }], correct: 2 },
    { question: { en: 'What does "لله" mean?', nl: 'Wat betekent "لله"?', tr: '"لله" ne anlama gelir?' }, options: [{ en: 'To Allah', nl: 'Aan Allah', tr: 'Allah\'a' }, { en: 'From Allah', nl: 'Van Allah', tr: 'Allah\'tan' }, { en: 'With Allah', nl: 'Met Allah', tr: 'Allah ile' }, { en: 'By Allah', nl: 'Bij Allah', tr: 'Allah tarafından' }], correct: 0 },
    { question: { en: 'What does "بسم" mean?', nl: 'Wat betekent "بسم"?', tr: '"بسم" ne anlama gelir?' }, options: [{ en: 'In the name of', nl: 'In de naam van', tr: 'Adıyla' }, { en: 'With the help of', nl: 'Met de hulp van', tr: 'Yardımıyla' }, { en: 'By the power of', nl: 'Door de kracht van', tr: 'Gücüyle' }, { en: 'For the sake of', nl: 'Ter wille van', tr: 'Uğruna' }], correct: 0 },
    { question: { en: 'Which word means "Allah"?', nl: 'Welk woord betekent "Allah"?', tr: 'Hangi kelime "Allah" anlamına gelir?' }, options: ['الله', 'الحمد', 'الرحمن', 'الرحيم'], correct: 0 },
    { question: { en: 'Which word means "The Praise"?', nl: 'Welk woord betekent "De Lof"?', tr: 'Hangi kelime "Hamd" anlamına gelir?' }, options: ['الله', 'الحمد', 'الرحمن', 'الرحيم'], correct: 1 },
    { question: { en: 'Which word is "Ar-Rahman"?', nl: 'Welk woord is "Ar-Rahman"?', tr: 'Hangi kelime "Rahman"dır?' }, options: ['الله', 'الحمد', 'الرحمن', 'الرحيم'], correct: 2 },
    { question: { en: 'What does "الصراط المستقيم" mean?', nl: 'Wat betekent "الصراط المستقيم"?', tr: '"الصراط المستقيم" ne anlama gelir?' }, options: [{ en: 'The Straight Path', nl: 'Het Rechte Pad', tr: 'Doğru Yol' }, { en: 'The Wide Path', nl: 'Het Brede Pad', tr: 'Geniş Yol' }, { en: 'The Long Path', nl: 'Het Lange Pad', tr: 'Uzun Yol' }, { en: 'The Easy Path', nl: 'Het Gemakkelijke Pad', tr: 'Kolay Yol' }], correct: 0 },
    { question: { en: 'What does "أنعمت" mean?', nl: 'Wat betekent "أنعمت"?', tr: '"أنعمت" ne anlama gelir?' }, options: [{ en: 'You blessed', nl: 'Jij zegende', tr: 'Sen nimet verdin' }, { en: 'You punished', nl: 'Jij strafte', tr: 'Sen cezalandırdın' }, { en: 'You created', nl: 'Jij creëerde', tr: 'Sen yarattın' }, { en: 'You guided', nl: 'Jij leidde', tr: 'Sen yol gösterdin' }], correct: 0 },
    { question: { en: 'Which word means "upon them"?', nl: 'Welk woord betekent "op hen"?', tr: 'Hangi kelime "onlara" anlamına gelir?' }, options: ['عليهم', 'إليهم', 'منهم', 'بهم'], correct: 0 },
    { question: { en: 'What does "غير" mean?', nl: 'Wat betekent "غير"?', tr: '"غير" ne anlama gelir?' }, options: [{ en: 'Not', nl: 'Niet', tr: 'Değil' }, { en: 'Very', nl: 'Zeer', tr: 'Çok' }, { en: 'Always', nl: 'Altijd', tr: 'Her zaman' }, { en: 'Never', nl: 'Nooit', tr: 'Asla' }], correct: 0 },
    { question: { en: 'What does "المغضوب" mean?', nl: 'Wat betekent "المغضوب"?', tr: '"المغضوب" ne anlama gelir?' }, options: [{ en: 'The blessed', nl: 'De gezegende', tr: 'Kutsanmış' }, { en: 'Those who earned anger', nl: 'Degenen die toorn verwierven', tr: 'Gazaba uğrayanlar' }, { en: 'The guided', nl: 'De geleide', tr: 'Doğru yola iletilenler' }, { en: 'The merciful', nl: 'De barmhartige', tr: 'Merhametli' }], correct: 1 },
    { question: { en: 'What does "الضالين" mean?', nl: 'Wat betekent "الضالين"?', tr: '"الضالين" ne anlama gelir?' }, options: [{ en: 'The believers', nl: 'De gelovigen', tr: 'İnananlar' }, { en: 'The astray', nl: 'De dwalenden', tr: 'Sapıtanlar' }, { en: 'The righteous', nl: 'De rechtvaardigen', tr: 'Salihler' }, { en: 'The patient', nl: 'De geduldigen', tr: 'Sabredenler' }], correct: 1 },
    { question: { en: 'Which is the opening Surah?', nl: 'Wat is de openingssoera?', tr: 'Açılış suresi hangisidir?' }, options: [{ en: 'Al-Fatiha', nl: 'Al-Fatiha', tr: 'Fatiha' }, { en: 'Al-Baqarah', nl: 'Al-Baqarah', tr: 'Bakara' }, { en: 'Al-Ikhlas', nl: 'Al-Ikhlas', tr: 'İhlas' }, { en: 'An-Nas', nl: 'An-Nas', tr: 'Nas' }], correct: 0 },
    { question: { en: 'How many verses in Al-Fatiha?', nl: 'Hoeveel verzen in Al-Fatiha?', tr: 'Fatiha\'da kaç ayet var?' }, options: ['5', '6', '7', '8'], correct: 2 },
    { question: { en: 'What does "قل" mean?', nl: 'Wat betekent "قل"?', tr: '"قل" ne anlama gelir?' }, options: [{ en: 'Say', nl: 'Zeg', tr: 'De ki' }, { en: 'Read', nl: 'Lees', tr: 'Oku' }, { en: 'Write', nl: 'Schrijf', tr: 'Yaz' }, { en: 'Listen', nl: 'Luister', tr: 'Dinle' }], correct: 0 },
    { question: { en: 'What does "هو" mean?', nl: 'Wat betekent "هو"?', tr: '"هو" ne anlama gelir?' }, options: [{ en: 'She', nl: 'Zij', tr: 'O (kadın)' }, { en: 'He/It', nl: 'Hij/Het', tr: 'O (erkek)' }, { en: 'They', nl: 'Zij (meervoud)', tr: 'Onlar' }, { en: 'We', nl: 'Wij', tr: 'Biz' }], correct: 1 },
    { question: { en: 'What does "الله" mean?', nl: 'Wat betekent "الله"?', tr: '"الله" ne anlama gelir?' }, options: [{ en: 'Allah', nl: 'Allah', tr: 'Allah' }, { en: 'Prophet', nl: 'Profeet', tr: 'Peygamber' }, { en: 'Angel', nl: 'Engel', tr: 'Melek' }, { en: 'Book', nl: 'Boek', tr: 'Kitap' }], correct: 0 },
    { question: { en: 'What does "أحد" mean?', nl: 'Wat betekent "أحد"?', tr: '"أحد" ne anlama gelir?' }, options: [{ en: 'Two', nl: 'Twee', tr: 'İki' }, { en: 'One/Unique', nl: 'Één/Uniek', tr: 'Bir/Eşsiz' }, { en: 'Three', nl: 'Drie', tr: 'Üç' }, { en: 'Many', nl: 'Veel', tr: 'Çok' }], correct: 1 },
    { question: { en: 'What does "الصمد" mean?', nl: 'Wat betekent "الصمد"?', tr: '"الصمد" ne anlama gelir?' }, options: [{ en: 'The Eternal', nl: 'De Eeuwige', tr: 'Samed' }, { en: 'The Creator', nl: 'De Schepper', tr: 'Yaratıcı' }, { en: 'The Merciful', nl: 'De Barmhartige', tr: 'Merhametli' }, { en: 'The Powerful', nl: 'De Machtige', tr: 'Güçlü' }], correct: 0 },
    { question: { en: 'What does "لم يلد" mean?', nl: 'Wat betekent "لم يلد"?', tr: '"لم يلد" ne anlama gelir?' }, options: [{ en: 'He begets', nl: 'Hij verwekt', tr: 'O doğurur' }, { en: 'He does not beget', nl: 'Hij verwekt niet', tr: 'O doğurmaz' }, { en: 'He was begotten', nl: 'Hij werd verwekt', tr: 'O doğuruldu' }, { en: 'He creates', nl: 'Hij schept', tr: 'O yaratır' }], correct: 1 },
    { question: { en: 'What does "ولم يولد" mean?', nl: 'Wat betekent "ولم يولد"?', tr: '"ولم يولد" ne anlama gelir?' }, options: [{ en: 'Nor was He begotten', nl: 'Noch werd Hij verwekt', tr: 've doğurulmadı' }, { en: 'And He begets', nl: 'En Hij verwekt', tr: 've doğurur' }, { en: 'And He was born', nl: 'En Hij werd geboren', tr: 've doğdu' }, { en: 'And He creates', nl: 'En Hij schept', tr: 've yaratır' }], correct: 0 },
  ],
};

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { progress, addQuizScore, getBestScore, addStars, addXP, addBadge } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  const [correctInRow, setCorrectInRow] = useState(0);
  const [maxCorrectInRow, setMaxCorrectInRow] = useState(0);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Timer effect
  useEffect(() => {
    if (timedMode && !showResult && !quizCompleted && selectedLevel && shuffledQuestions.length > 0) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        // Auto-submit when time runs out
        handleAnswerSubmit();
      }
    }
  }, [timedMode, timeLeft, showResult, quizCompleted, selectedLevel, shuffledQuestions.length]);

  const handleLevelSelect = (level: 'beginner' | 'intermediate') => {
    const questions = shuffleArray(quizData[level]).slice(0, 10); // Take 10 random questions
    setShuffledQuestions(questions);
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setCorrectInRow(0);
    setMaxCorrectInRow(0);
    setHintUsed(false);
    setShowHint(false);
    setTimeLeft(15);
    shuffleCurrentOptions(questions[0]);
  };

  const shuffleCurrentOptions = (question: QuizQuestion) => {
    const indices = question.options.map((_, i) => i);
    setShuffledOptions(shuffleArray(indices));
  };

  const handleAnswerSubmit = () => {
    if (!selectedLevel) return;

    const currentQ = shuffledQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    
    if (isCorrect) {
      const newCorrectInRow = correctInRow + 1;
      setCorrectInRow(newCorrectInRow);
      setMaxCorrectInRow(Math.max(maxCorrectInRow, newCorrectInRow));
      
      setScore(score + 1);
      
      // Combo multiplier for stars
      const comboMultiplier = Math.min(newCorrectInRow, 5);
      const starsEarned = 10 * comboMultiplier;
      addStars(starsEarned);
      addXP(15 + (comboMultiplier * 5));
    } else {
      setCorrectInRow(0);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (!selectedLevel) return;

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setHintUsed(false);
      setShowHint(false);
      setTimeLeft(15);
      shuffleCurrentOptions(shuffledQuestions[currentQuestion + 1]);
    } else {
      const finalScore = score + (selectedAnswer === shuffledQuestions[currentQuestion].correct ? 1 : 0);
      addQuizScore(selectedLevel, finalScore);
      
      // Award badges based on performance
      const percentage = (finalScore / shuffledQuestions.length) * 100;
      if (percentage === 100) {
        addBadge(`${selectedLevel}_quiz_perfect`);
        addStars(100);
      } else if (percentage >= 80) {
        addBadge(`${selectedLevel}_quiz_master`);
        addStars(50);
      }
      
      // Combo badges
      if (maxCorrectInRow >= 5) {
        addBadge('combo_master');
        addStars(25);
      }
      
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShuffledQuestions([]);
    setCorrectInRow(0);
    setMaxCorrectInRow(0);
    setHintUsed(false);
    setShowHint(false);
  };

  const handleHint = () => {
    if (!hintUsed && selectedAnswer === null) {
      setShowHint(true);
      setHintUsed(true);
    }
  };

  const getLevelName = (level: string) => {
    if (level === 'beginner') return t('beginner');
    return t('intermediate');
  };

  const getOptionText = (option: any) => {
    if (typeof option === 'string') return option;
    return option[language];
  };

  const getComboText = (combo: number) => {
    if (combo >= 5) return '🔥 ON FIRE! 🔥';
    if (combo >= 3) return '⚡ AMAZING! ⚡';
    if (combo >= 2) return '✨ GREAT! ✨';
    return '';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C27B0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4 hover:bg-indigo-100 hover:scale-105 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
          <h1 className="text-indigo-700 mb-2 flex items-center gap-3 animate-slide-in-right">
            <Trophy className="h-12 w-12 text-indigo-600 animate-bounce-soft" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('quiz')}
            </span>
          </h1>
          <p className="text-gray-600 text-lg">{t('quizDesc')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!selectedLevel ? (
            <div className="space-y-6 animate-fade-in">
              {/* Timed Mode Toggle */}
              <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-semibold text-amber-900">{t('timedMode')}</p>
                        <p className="text-sm text-amber-700">15 {t('secondsPerQuestion')}</p>
                      </div>
                    </div>
                    <Switch
                      checked={timedMode}
                      onCheckedChange={setTimedMode}
                      className="data-[state=checked]:bg-amber-600"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 overflow-hidden group"
                onClick={() => handleLevelSelect('beginner')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shimmer"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-emerald-700 flex items-center gap-3 mb-2 text-2xl">
                        <span className="text-4xl animate-bounce-soft">🌟</span>
                        {t('beginner')}
                      </CardTitle>
                      <CardDescription className="text-base">{t('testLetters')}</CardDescription>
                      <p className="text-sm text-emerald-600 mt-2">{quizData.beginner.length} {t('questionsAvailable')} • 10 {t('perQuiz')}</p>
                    </div>
                    {getBestScore('beginner') > 0 && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-emerald-200 px-4 py-3 rounded-xl shadow-lg">
                          <Star className="h-5 w-5 text-emerald-700 fill-emerald-700" />
                          <span className="text-emerald-700 font-bold text-lg">{getBestScore('beginner')}</span>
                        </div>
                        <p className="text-xs text-emerald-600">{t('bestScore')}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>

              <Card 
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 overflow-hidden group"
                onClick={() => handleLevelSelect('intermediate')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shimmer"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-700 flex items-center gap-3 mb-2 text-2xl">
                        <span className="text-4xl animate-bounce-soft">📚</span>
                        {t('intermediate')}
                      </CardTitle>
                      <CardDescription className="text-base">{t('testWords')}</CardDescription>
                      <p className="text-sm text-blue-600 mt-2">{quizData.intermediate.length} {t('questionsAvailable')} • 10 {t('perQuiz')}</p>
                    </div>
                    {getBestScore('intermediate') > 0 && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-blue-200 px-4 py-3 rounded-xl shadow-lg">
                          <Star className="h-5 w-5 text-blue-700 fill-blue-700" />
                          <span className="text-blue-700 font-bold text-lg">{getBestScore('intermediate')}</span>
                        </div>
                        <p className="text-xs text-blue-600">{t('bestScore')}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>
          ) : quizCompleted ? (
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 shadow-2xl border-2 border-indigo-200 animate-fade-in overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
              <CardHeader className="text-center relative">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full blur-xl opacity-50 animate-pulse-glow"></div>
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl">
                      <Trophy className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl mb-4">{t('quizCompleted')}</CardTitle>
                <CardDescription className="text-2xl mt-3">
                  {t('yourScore')}: <span className="font-bold text-indigo-700">{score} {t('of')} {shuffledQuestions.length}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 relative">
                <div className="text-8xl animate-bounce-soft">
                  {score === shuffledQuestions.length ? '🌟' : score >= shuffledQuestions.length / 2 ? '👏' : '💪'}
                </div>
                <p className="text-gray-700 text-xl font-medium">
                  {score === shuffledQuestions.length
                    ? t('perfect')
                    : score >= shuffledQuestions.length / 2
                    ? t('goodJob')
                    : t('keepLearning')}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                    <Award className="h-8 w-8 mx-auto mb-2 text-indigo-700" />
                    <div className="text-3xl font-bold text-indigo-700">
                      {Math.round((score / shuffledQuestions.length) * 100)}%
                    </div>
                    <p className="text-xs text-gray-600">{t('accuracy')}</p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                    <Flame className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-3xl font-bold text-orange-700">{maxCorrectInRow}</div>
                    <p className="text-xs text-gray-600">{t('bestStreak')}</p>
                  </div>
                </div>

                {score === shuffledQuestions.length && (
                  <div className="flex justify-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 animate-bounce-soft" />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 animate-bounce-soft" style={{ animationDelay: '0.1s' }} />
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
                
                <Button onClick={handleRestart} className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" size="lg">
                  <RotateCcw className="h-5 w-5" />
                  {t('restart')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Progress and Timer Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">{getLevelName(selectedLevel)}</span>
                    <span>
                      {currentQuestion + 1} / {shuffledQuestions.length}
                    </span>
                  </div>
                  <Progress 
                    value={((currentQuestion + 1) / shuffledQuestions.length) * 100} 
                    className="h-3"
                  />
                </div>

                {timedMode && (
                  <Card className={`${timeLeft <= 5 ? 'bg-gradient-to-r from-red-100 to-orange-100 border-red-300 animate-pulse' : 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300'} border-2`}>
                    <CardContent className="pt-4 pb-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className={`h-5 w-5 ${timeLeft <= 5 ? 'text-red-600' : 'text-blue-600'}`} />
                        <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-700' : 'text-blue-700'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Combo Indicator */}
              {correctInRow >= 2 && !showResult && (
                <Card className="bg-gradient-to-r from-orange-100 via-red-100 to-orange-100 border-2 border-orange-400 shadow-lg animate-pulse-glow">
                  <CardContent className="pt-4 pb-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Flame className="h-6 w-6 text-orange-600 animate-bounce" />
                      <span className="text-xl font-bold text-orange-700">
                        {correctInRow} {getComboText(correctInRow)}
                      </span>
                      <Flame className="h-6 w-6 text-orange-600 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    </div>
                    <p className="text-sm text-orange-600 mt-1">
                      Next correct = {10 * Math.min(correctInRow + 1, 5)}⭐
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-2xl border-2 border-indigo-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Zap className="h-6 w-6 text-indigo-600" />
                    {typeof shuffledQuestions[currentQuestion]?.question === 'string' 
                      ? shuffledQuestions[currentQuestion].question 
                      : shuffledQuestions[currentQuestion]?.question[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedAnswer?.toString() || ''}
                    onValueChange={(value) => !showResult && setSelectedAnswer(parseInt(value))}
                    disabled={showResult}
                  >
                    {shuffledOptions.map((shuffledIndex, displayIndex) => {
                      const option = shuffledQuestions[currentQuestion].options[shuffledIndex];
                      const isCorrect = shuffledIndex === shuffledQuestions[currentQuestion].correct;
                      const isWrongOption = showHint && !isCorrect;
                      
                      return (
                        <div
                          key={displayIndex}
                          className={`flex items-center space-x-3 p-6 rounded-2xl border-2 transition-all duration-300 ${
                            showResult
                              ? isCorrect
                                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-400 shadow-lg scale-105'
                                : shuffledIndex === selectedAnswer
                                ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-400'
                                : 'border-gray-200 opacity-50'
                              : selectedAnswer === shuffledIndex
                              ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg scale-105'
                              : isWrongOption
                              ? 'border-gray-200 opacity-30'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:scale-102'
                          }`}
                        >
                          <RadioGroupItem value={shuffledIndex.toString()} id={`option-${displayIndex}`} />
                          <Label htmlFor={`option-${displayIndex}`} className="flex-1 cursor-pointer text-lg">
                            {getOptionText(option)}
                          </Label>
                          {showResult && isCorrect && (
                            <span className="text-2xl animate-bounce-soft">✅</span>
                          )}
                          {showResult && shuffledIndex === selectedAnswer && !isCorrect && (
                            <span className="text-2xl">❌</span>
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {showResult && (
                    <div
                      className={`p-6 rounded-2xl text-center shadow-lg animate-fade-in ${
                        selectedAnswer === shuffledQuestions[currentQuestion].correct
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800'
                          : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                      }`}
                    >
                      <p className="text-2xl font-bold mb-2">
                        {selectedAnswer === shuffledQuestions[currentQuestion].correct
                          ? t('correct')
                          : t('incorrect')}
                      </p>
                      {selectedAnswer === shuffledQuestions[currentQuestion].correct && correctInRow > 0 && (
                        <p className="text-lg">
                          +{10 * Math.min(correctInRow, 5)}⭐ Combo Bonus!
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    {!showResult ? (
                      <>
                        {!hintUsed && (
                          <Button
                            onClick={handleHint}
                            variant="outline"
                            className="gap-2 border-amber-300 hover:bg-amber-50"
                          >
                            <Lightbulb className="h-4 w-4 text-amber-600" />
                            {t('hint')}
                          </Button>
                        )}
                        <Button
                          onClick={handleAnswerSubmit}
                          disabled={selectedAnswer === null}
                          className="flex-1 text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          size="lg"
                        >
                          {t('submit')}
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={handleNext} 
                        className="flex-1 text-lg py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" 
                        size="lg"
                      >
                        {currentQuestion < shuffledQuestions.length - 1
                          ? t('nextQuestion')
                          : t('finish')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Score and Streak Display */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-lg flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        {t('score')}:
                      </span>
                      <span className="text-3xl font-bold text-indigo-700">
                        {score} / {shuffledQuestions.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-lg">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-lg flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        {t('streak')}:
                      </span>
                      <span className="text-3xl font-bold text-orange-700">
                        {correctInRow}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
