import {
    RecordingPresets,
    requestRecordingPermissionsAsync,
    setAudioModeAsync,
    useAudioPlayer,
    useAudioRecorder,
    useAudioRecorderState,
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from './Recorder.styles';

type RecorderProps = {
  onRecordingFinished?: (uri: string) => void;
};

export default function Recorder({
  onRecordingFinished,
}: RecorderProps) {
  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState = useAudioRecorderState(recorder);

  const [permission, setPermission] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const player = useAudioPlayer(recordedUri);

  useEffect(() => {
    async function prepareRecorder() {
      const result = await requestRecordingPermissionsAsync();

      if (!result.granted) {
        console.log('Permissão para gravar foi negada.');
        return;
      }

      setPermission(true);

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    }

    prepareRecorder();
  }, []);

  async function startRecording() {
    if (!permission) {
      console.log('Sem permissão para gravar.');
      return;
    }

    setRecordedUri(null);

    await recorder.prepareToRecordAsync();
    recorder.record();

    console.log('Gravação iniciada');
  }

  async function stopRecording() {
    await recorder.stop();

    const uri = recorder.uri;

    console.log('Gravação finalizada:', uri);

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

  const isRecording = recorderState.isRecording;

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

        <Pressable
          onPress={playRecording}
          style={styles.playButton}
        >
          <Text style={styles.buttonText}>
            ▶ OUVIR GRAVAÇÃO
          </Text>
        </Pressable>

      )}

    </View>
  );
}