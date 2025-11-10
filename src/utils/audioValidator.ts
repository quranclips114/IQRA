/**
 * Audio Files Validator
 * Helps check which audio files are present and which are missing
 */

import { letterAudioMap, wordAudioMap } from './audioMapping';

export interface ValidationResult {
  total: number;
  found: number;
  missing: number;
  files: {
    path: string;
    exists: boolean;
    arabicText: string;
  }[];
}

/**
 * Check if an audio file exists
 */
const checkFileExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Validate all letter audio files
 */
export const validateLetterAudio = async (): Promise<ValidationResult> => {
  const results: ValidationResult = {
    total: 0,
    found: 0,
    missing: 0,
    files: [],
  };

  for (const [arabicText, path] of Object.entries(letterAudioMap)) {
    const exists = await checkFileExists(path);
    results.total++;
    if (exists) {
      results.found++;
    } else {
      results.missing++;
    }
    results.files.push({ path, exists, arabicText });
  }

  return results;
};

/**
 * Validate all word audio files
 */
export const validateWordAudio = async (): Promise<ValidationResult> => {
  const results: ValidationResult = {
    total: 0,
    found: 0,
    missing: 0,
    files: [],
  };

  for (const [arabicText, path] of Object.entries(wordAudioMap)) {
    const exists = await checkFileExists(path);
    results.total++;
    if (exists) {
      results.found++;
    } else {
      results.missing++;
    }
    results.files.push({ path, exists, arabicText });
  }

  return results;
};

/**
 * Validate all audio files
 */
export const validateAllAudio = async (): Promise<{
  letters: ValidationResult;
  words: ValidationResult;
  total: { total: number; found: number; missing: number };
}> => {
  const letters = await validateLetterAudio();
  const words = await validateWordAudio();

  return {
    letters,
    words,
    total: {
      total: letters.total + words.total,
      found: letters.found + words.found,
      missing: letters.missing + words.missing,
    },
  };
};

/**
 * Print validation results to console
 */
export const printValidationResults = async (): Promise<void> => {
  console.log('🔊 Audio Files Validation Report');
  console.log('================================');

  const results = await validateAllAudio();

  console.log('\n📝 Letters:');
  console.log(`   Total: ${results.letters.total}`);
  console.log(`   ✅ Found: ${results.letters.found}`);
  console.log(`   ❌ Missing: ${results.letters.missing}`);

  if (results.letters.missing > 0) {
    console.log('\n   Missing letter files:');
    results.letters.files
      .filter(f => !f.exists)
      .forEach(f => console.log(`   - ${f.arabicText} (${f.path})`));
  }

  console.log('\n📚 Words:');
  console.log(`   Total: ${results.words.total}`);
  console.log(`   ✅ Found: ${results.words.found}`);
  console.log(`   ❌ Missing: ${results.words.missing}`);

  if (results.words.missing > 0) {
    console.log('\n   Missing word files:');
    results.words.files
      .filter(f => !f.exists)
      .forEach(f => console.log(`   - ${f.arabicText} (${f.path})`));
  }

  console.log('\n📊 Overall:');
  console.log(`   Total files needed: ${results.total.total}`);
  console.log(`   ✅ Found: ${results.total.found} (${Math.round((results.total.found / results.total.total) * 100)}%)`);
  console.log(`   ❌ Missing: ${results.total.missing}`);

  if (results.total.missing === 0) {
    console.log('\n🎉 All audio files are present!');
  } else {
    console.log(`\n⚠️  Please add ${results.total.missing} missing audio file(s)`);
  }
  
  console.log('\n================================');
};

/**
 * Get list of missing files for easy reference
 */
export const getMissingFiles = async (): Promise<string[]> => {
  const results = await validateAllAudio();
  const missing: string[] = [];

  results.letters.files
    .filter(f => !f.exists)
    .forEach(f => missing.push(f.path));

  results.words.files
    .filter(f => !f.exists)
    .forEach(f => missing.push(f.path));

  return missing;
};
