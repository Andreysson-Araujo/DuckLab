
import { router } from 'expo-router';

import { useEffect, useState } from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import SampleManager, {
  PadSample,
} from '../audio/SampleManager';

import AudioEngine from '../audio/AudioEngine';

import VocalPad from '../components/VocalPad';

import { styles } from './index.styles';

const vocal01 =
  require('@/assets/samples/vocal01.wav');

type Pads = {
  [key: string]: PadSample | null;
};

export default function HomeScreen() {

  const [pads, setPads] = useState<Pads>({
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
  });

  const [loading, setLoading] =
    useState(true);

  async function loadSamples() {

    try {

      await SampleManager.initialize();

      const savedSamples =
        await SampleManager.getSamples();

      setPads(savedSamples);

    } catch (error) {

      console.error(
        'Erro ao carregar samples:',
        error
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    loadSamples();

  }, []);

  const getPadSound = (
    padNumber: number
  ) => {

    const savedSample =
      pads[String(padNumber)];

    if (savedSample) {

      return savedSample.uri;

    }

    // Mantém o sample original no PAD 1
    if (padNumber === 1) {

      return vocal01;

    }

    return undefined;
  };

  const getPadName = (
    padNumber: number
  ) => {

    const savedSample =
      pads[String(padNumber)];

    if (savedSample) {

      return savedSample.name;

    }

    return `VOCAL ${String(
      padNumber
    ).padStart(2, '0')}`;

  };

  /*
   * Toca um pad pelo número.
   *
   * Essa função será usada pelo teclado.
   */
  async function playPad(
    padNumber: number
  ) {

    const sound =
      getPadSound(padNumber);

    if (!sound) {

      console.log(
        `PAD ${padNumber} está vazio`
      );

      return;

    }

    try {

      await AudioEngine.playSample(
        sound
      );

      console.log(
        `PAD ${padNumber} tocado pelo teclado`
      );

    } catch (error) {

      console.error(
        `Erro ao tocar PAD ${padNumber}:`,
        error
      );

    }

  }

  /*
   * Teclado do computador.
   *
   * 1 → PAD 1
   * 2 → PAD 2
   * 3 → PAD 3
   * 4 → PAD 4
   * 5 → PAD 5
   * 6 → PAD 6
   */
  useEffect(() => {

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      const key =
        event.key;

      if (
        key === '1' ||
        key === '2' ||
        key === '3' ||
        key === '4' ||
        key === '5' ||
        key === '6'
      ) {

        const padNumber =
          Number(key);

        playPad(padNumber);

      }

    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

    };

  }, [pads]);

  const loadedSamples =
    Object.values(pads).filter(
      (sample) => sample !== null
    ).length;

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          DuckLab
        </Text>

        <Text style={styles.subtitle}>
          EXPERIMENTAL VOCAL SAMPLER
        </Text>

      </View>

      <View style={styles.padGrid}>

        <VocalPad
          name={getPadName(1)}
          number={1}
          sound={getPadSound(1)}
        />

        <VocalPad
          name={getPadName(2)}
          number={2}
          sound={getPadSound(2)}
        />

        <VocalPad
          name={getPadName(3)}
          number={3}
          sound={getPadSound(3)}
        />

        <VocalPad
          name={getPadName(4)}
          number={4}
          sound={getPadSound(4)}
        />

        <VocalPad
          name={getPadName(5)}
          number={5}
          sound={getPadSound(5)}
        />

        <VocalPad
          name={getPadName(6)}
          number={6}
          sound={getPadSound(6)}
        />

      </View>

      <Text style={styles.subtitle}>
        KEYS 1 2 3 4 5 6
      </Text>

      <Pressable
        onPress={() =>
          router.push('/recorder')
        }
        style={styles.recorderButton}
      >

        <Text
          style={styles.recorderButtonText}
        >
          🎙 RECORDER
        </Text>

      </Pressable>

      <Text style={styles.footer}>

        {loading
          ? 'LOADING SAMPLES...'
          : `${loadedSamples} SAVED SAMPLES`}

      </Text>

    </View>

  );
}

