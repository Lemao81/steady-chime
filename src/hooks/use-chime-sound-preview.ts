import { useAudioPlayer } from 'expo-audio';
import type { AudioSource } from 'expo-audio';
import type { ChimeSound } from '@/types';

const CHIME_SOUND_ASSETS: Record<ChimeSound, AudioSource> = {
  'soft-bell': require('../../assets/sounds/soft_bell.wav'),
  'boxing-bell': require('../../assets/sounds/boxing_bell.wav'),
  'triangle-chime': require('../../assets/sounds/triangle_chime.wav'),
  'jaw-harp': require('../../assets/sounds/jaw_harp.wav'),
  'harmonic-guitar': require('../../assets/sounds/harmonic_guitar.wav'),
  'boom-piano': require('../../assets/sounds/boom_piano.wav'),
};

export function useChimeSoundPreview(): (sound: ChimeSound) => void {
  const player = useAudioPlayer(null);

  function preview(sound: ChimeSound): void {
    player.replace(CHIME_SOUND_ASSETS[sound]);
    player.play();
  }

  return preview;
}
