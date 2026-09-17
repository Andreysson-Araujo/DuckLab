import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

import { router } from 'expo-router';

import { useEffect, useState } from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import SampleManager from '../audio/SampleManager';

import { styles } from './recorder.styles';

type RecorderProps = {
  onRecordingFinished?: (uri: string) => void;
};

export default function Recorder({
  onRecordingFinished,
}: RecorderProps) {

  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState =
    useAudioRecorderState(recorder);

  const [permission, setPermission] =
    useState(false);

  const [recordedUri, setRecordedUri] =
    useState<string | null>(null);

  const [savingPad, setSavingPad] =
    useState<number | null>(null);

  const [savedPad, setSavedPad] =
    useState<number | null>(null);

  const player =
    useAudioPlayer(recordedUri);

  useEffect(() => {

    async function prepareRecorder() {

      const result =
        await requestRecordingPermissionsAsync();

      if (!result.granted) {

        console.log(
          'Permissão para gravar foi negada.'
        );

        return;
      }

      setPermission(true);

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await SampleManager.initialize();

    }

    prepareRecorder();

  }, []);

  async function startRecording() {

    if (!permission) {

      console.log(
        'Sem permissão para gravar.'
      );

      return;
    }

    setRecordedUri(null);
    setSavedPad(null);

    await recorder.prepareToRecordAsync();

    recorder.record();

    console.log(
      'Gravação iniciada'
    );

  }

  async function stopRecording() {

    await recorder.stop();

    const uri = recorder.uri;

    console.log(
      'Gravação finalizada:',
      uri
    );

    if (uri) {

      setRecordedUri(uri);

      if (onRecordingFinished) {

        onRecordingFinished(uri);

      }

    }

  }

  function playRecording() {

    if (!recordedUri) {
      return;
    }

    player.seekTo(0);
    player.play();

  }

  async function assignToPad(
    padNumber: number
  ) {

    if (!recordedUri) {
      return;
    }

    try {

      setSavingPad(padNumber);
      setSavedPad(null);

      const sample =
        await SampleManager.saveRecording(
          recordedUri,
          `VOCAL ${padNumber}`,
          padNumber
        );

      if (sample) {

        console.log(
          `Gravação atribuída ao PAD ${padNumber}`
        );

        setSavedPad(padNumber);

      }

    } catch (error) {

      console.error(
        'Erro ao atribuir gravação:',
        error
      );

    } finally {

      setSavingPad(null);

    }

  }

  function backToPads() {

    router.replace('/');

  }

  const isRecording =
    recorderState.isRecording;

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        VOCAL RECORDER
      </Text>

      <Text style={styles.status}>

        {isRecording
          ? '● RECORDING'
          : recordedUri
            ? '● RECORDING READY'
            : 'READY'}

      </Text>

      {isRecording ? (

        <Pressable
          onPress={stopRecording}
          style={styles.stopButton}
        >

          <Text style={styles.buttonText}>
            ■ PARAR
          </Text>

        </Pressable>

      ) : (

        <Pressable
          onPress={startRecording}
          style={styles.recordButton}
        >

          <Text style={styles.buttonText}>
            ● GRAVAR
          </Text>

        </Pressable>

      )}

      {recordedUri && !isRecording && (

        <>

          <Pressable
            onPress={playRecording}
            style={styles.playButton}
          >

            <Text style={styles.buttonText}>
              ▶ OUVIR GRAVAÇÃO
            </Text>

          </Pressable>

          {!savedPad ? (

            <>

              <Text style={styles.assignTitle}>
                ESCOLHER PAD
              </Text>

              <View style={styles.padGrid}>

                {[1, 2, 3, 4, 5, 6].map(
                  (padNumber) => (

                    <Pressable
                      key={padNumber}
                      onPress={() =>
                        assignToPad(
                          padNumber
                        )
                      }
                      style={styles.padButton}
                    >

                      <Text
                        style={
                          styles.padButtonText
                        }
                      >

                        {savingPad === padNumber
                          ? 'SALVANDO...'
                          : `PAD ${padNumber}`}

                      </Text>

                    </Pressable>

                  )
                )}

              </View>

            </>

          ) : (

            <>

              <Text style={styles.status}>
                ✓ SALVO NO PAD {savedPad}
              </Text>

              <Pressable
                onPress={backToPads}
                style={styles.playButton}
              >

                <Text style={styles.buttonText}>
                  ← VOLTAR AOS PADS
                </Text>

              </Pressable>

            </>

          )}

        </>

      )}

    </View>

  );

}

