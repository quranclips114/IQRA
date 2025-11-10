import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { getAudioPath } from '../utils/audioMapping';

interface AudioButtonProps {
  text: string;
  audioUrl?: string;
  surahNumber?: number;
  ayahNumber?: number;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ 
  text, 
  audioUrl,
  surahNumber,
  ayahNumber,
  size = 'default',
  variant = 'ghost',
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    try {
      setIsLoading(true);
      
      // If we already have an audio element playing, stop it
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      let audioToPlay: HTMLAudioElement | null = null;
      let loadedSuccessfully = false;

      // Priority 1: Use provided audio URL
      if (audioUrl) {
        try {
          audioToPlay = new Audio(audioUrl);
          await audioToPlay.load();
          loadedSuccessfully = true;
        } catch (error) {
          console.log('Provided audio URL failed, trying local file:', error);
          audioToPlay = null;
        }
      }

      // Priority 2: Try local audio file from mapping
      if (!loadedSuccessfully) {
        const localAudioPath = getAudioPath(text);
        if (localAudioPath) {
          try {
            audioToPlay = new Audio(localAudioPath);
            await audioToPlay.load();
            loadedSuccessfully = true;
            console.log('Using local audio file:', localAudioPath);
          } catch (error) {
            console.log('Local audio file not found, trying API:', error);
            audioToPlay = null;
          }
        }
      }

      // Priority 3: Use AlQuran.cloud API for Quranic verses
      if (!loadedSuccessfully && surahNumber && ayahNumber) {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch audio');
          }

          const data = await response.json();
          
          if (data.status === 'OK' && data.data.audio) {
            audioToPlay = new Audio(data.data.audio);
            loadedSuccessfully = true;
            console.log('Using AlQuran.cloud API audio');
          } else {
            throw new Error('Audio not available');
          }
        } catch (error) {
          console.log('API audio failed, will use speech synthesis:', error);
        }
      }

      // Priority 4: Fallback to speech synthesis
      if (!loadedSuccessfully) {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ar-SA';
          utterance.rate = 0.7;
          utterance.onstart = () => {
            setIsPlaying(true);
            setIsLoading(false);
          };
          utterance.onend = () => {
            setIsPlaying(false);
          };
          window.speechSynthesis.speak(utterance);
          console.log('Using speech synthesis for:', text);
          return;
        } else {
          console.log('No audio available for:', text);
          setIsLoading(false);
          return;
        }
      }

      // If we have an audio element, set up event listeners and play
      if (audioToPlay) {
        audioToPlay.onloadeddata = () => {
          setIsLoading(false);
          setIsPlaying(true);
        };

        audioToPlay.onended = () => {
          setIsPlaying(false);
          setAudio(null);
        };

        audioToPlay.onerror = () => {
          console.error('Error playing audio file');
          setIsLoading(false);
          setIsPlaying(false);
          // Fallback to speech synthesis
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.7;
            utterance.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
          }
        };

        setAudio(audioToPlay);
        await audioToPlay.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={playAudio}
      disabled={isPlaying || isLoading}
      className={`gap-2 transition-all hover:scale-110 ${className || ''}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse text-emerald-600' : ''}`} />
      )}
    </Button>
  );
};
