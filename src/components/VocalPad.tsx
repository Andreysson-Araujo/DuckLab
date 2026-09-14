import { Pressable, Text } from 'react-native';

import AudioEngine from '../audio/AudioEngine';
import { styles } from './VocalPad.styles';

type VocalPadProps = {
  name: string;
  number: number;
  sound?: any;
};

const padColors = [
  '#7C3AED',
  '#2563EB',
  '#16A34A',
  '#EAB308',
  '#EA580C',
  '#DC2626',
];

export default function VocalPad({
  name,
  number,
  sound,
}: VocalPadProps) {

  const padColor = padColors[(number - 1) % padColors.length];

  async function handlePress() {
    if (!sound) {
      console.log(`Pad ${number} ainda não possui sample`);
      return;
    }

    await AudioEngine.playSample(sound);
  }

  // Pega o nome do arquivo automaticamente
  const fileName = sound?.toString().split('/').pop()?.split('?')[0];
  const audioName = fileName?.replace(/\.(wav|mp3|ogg|m4a)$/i, '');

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.pad,
        {
          backgroundColor: padColor,
          borderColor: '#ffffff55',
        },
        pressed && styles.padPressed,
      ]}
    >
      <Text style={styles.number}>
        {number}
      </Text>

      <Text style={styles.icon}>
        🎤
      </Text>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.status}>
        {sound ? audioName : 'EMPTY'}
      </Text>
    </Pressable>
  );
}