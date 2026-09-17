import { createAudioPlayer } from 'expo-audio';

class AudioEngine {
  playSample(sample: any) {
    try {
      const player = createAudioPlayer(sample);

      player.play();

      console.log('Sample reproduzido');
    } catch (error) {
      console.error('Erro ao reproduzir sample:', error);
    }
  }
}

export default new AudioEngine();