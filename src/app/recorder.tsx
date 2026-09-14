import { View } from 'react-native';

import Recorder from '../components/Recorder';
import { styles } from './recorder.styles';

export default function RecorderScreen() {
  return (
    <View style={styles.container}>
      <Recorder />
    </View>
  );
}