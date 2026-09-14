import { Audio } from 'expo-av';

class AudioEngine {
  async playSample(sample: any) {
    try {
      const { sound } = await Audio.Sound.createAsync(sample);

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });

    } catch (error) {
      console.error('Erro ao reproduzir sample:', error);
    }
  }
}

export default new AudioEngine();