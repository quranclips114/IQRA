/**
 * Audio Mapping Configuration
 * Maps Arabic letters and words to their corresponding audio file names
 */

export interface AudioMapping {
  [key: string]: string;
}

// Letter audio files mapping
export const letterAudioMap: AudioMapping = {
  'ا': '/audio/alif.mp3',
  'ب': '/audio/ba.mp3',
  'ت': '/audio/ta.mp3',
  'ث': '/audio/tha.mp3',
  'ج': '/audio/jeem.mp3',
  'ح': '/audio/ha.mp3',
  'خ': '/audio/kha.mp3',
  'د': '/audio/dal.mp3',
  'ذ': '/audio/dhal.mp3',
  'ر': '/audio/ra.mp3',
  'ز': '/audio/zay.mp3',
  'س': '/audio/seen.mp3',
  'ش': '/audio/sheen.mp3',
  'ص': '/audio/sad.mp3',
  'ض': '/audio/dad.mp3',
  'ط': '/audio/ta2.mp3',
  'ظ': '/audio/dha.mp3',
  'ع': '/audio/ayn.mp3',
  'غ': '/audio/ghayn.mp3',
  'ف': '/audio/fa.mp3',
  'ق': '/audio/qaf.mp3',
  'ك': '/audio/kaf.mp3',
  'ل': '/audio/lam.mp3',
  'م': '/audio/meem.mp3',
  'ن': '/audio/noon.mp3',
  'ه': '/audio/ha2.mp3',
  'و': '/audio/waw.mp3',
  'ي': '/audio/ya.mp3',
};

// Word audio files mapping
export const wordAudioMap: AudioMapping = {
  'الله': '/audio/allah.mp3',
  'الحمد': '/audio/alhamd.mp3',
  'رب': '/audio/rab.mp3',
  'العالمين': '/audio/aalameen.mp3',
  'الرحمن': '/audio/arrahman.mp3',
  'الرحيم': '/audio/arraheem.mp3',
  'مالك': '/audio/malik.mp3',
  'يوم': '/audio/yawm.mp3',
  'الدين': '/audio/addeen.mp3',
  'إياك': '/audio/iyyaka.mp3',
  'نعبد': '/audio/nabudu.mp3',
  'نستعين': '/audio/nastaeen.mp3',
};

// Combined mapping for easy lookup
export const audioMap: AudioMapping = {
  ...letterAudioMap,
  ...wordAudioMap,
};

/**
 * Get audio file path for Arabic text
 * @param text Arabic letter or word
 * @returns Audio file path or null if not found
 */
export const getAudioPath = (text: string): string | null => {
  // Remove diacritics and normalize the text
  const normalized = text.trim();
  return audioMap[normalized] || null;
};

/**
 * Check if audio file exists
 * @param audioPath Path to audio file
 * @returns Promise<boolean>
 */
export const checkAudioExists = async (audioPath: string): Promise<boolean> => {
  try {
    const response = await fetch(audioPath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Preload audio file
 * @param audioPath Path to audio file
 * @returns Promise<HTMLAudioElement | null>
 */
export const preloadAudio = async (audioPath: string): Promise<HTMLAudioElement | null> => {
  try {
    const audio = new Audio(audioPath);
    await audio.load();
    return audio;
  } catch (error) {
    console.error('Failed to preload audio:', audioPath, error);
    return null;
  }
};
