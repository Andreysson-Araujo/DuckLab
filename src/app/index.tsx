
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import VocalPad from '../components/VocalPad';

import { styles } from './index.styles';

const vocal01 = require('@/assets/samples/vocal01.wav');

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          IFALE VOCAL LAB
        </Text>

        <Text style={styles.subtitle}>
          EXPERIMENTAL VOCAL SAMPLER
        </Text>

      </View>

      <View style={styles.padGrid}>

        <VocalPad
          name="VOCAL 01"
          number={1}
          sound={vocal01}
        />

        <VocalPad
          name="VOCAL 02"
          number={2}
        />

        <VocalPad
          name="VOCAL 03"
          number={3}
        />

        <VocalPad
          name="VOCAL 04"
          number={4}
        />

        <VocalPad
          name="VOCAL 05"
          number={5}
        />

        <VocalPad
          name="VOCAL 06"
          number={6}
        />

      </View>

      <Pressable
        onPress={() => router.push('/recorder')}
        style={styles.recorderButton}
      >
        <Text style={styles.recorderButtonText}>
          🎙 RECORDER
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        1 SAMPLE LOADED
      </Text>

    </View>
  );
}

