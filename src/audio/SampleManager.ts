
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

export type PadSample = {
  uri: string;
  name: string;
};

type SavedSamples = {
  [padNumber: string]: PadSample | null;
};

const emptySamples: SavedSamples = {
  '1': null,
  '2': null,
  '3': null,
  '4': null,
  '5': null,
  '6': null,
};

const samplesDirectory =
  `${FileSystem.documentDirectory ?? ''}ducklab-samples/`;

const samplesFile =
  `${samplesDirectory}samples.json`;

class SampleManager {

  async initialize() {

    // O FileSystem não é usado no navegador.
    if (Platform.OS === 'web') {
      console.log(
        'SampleManager: Web detectado. Persistência de arquivos desativada.'
      );
      return;
    }

    try {

      const directoryInfo =
        await FileSystem.getInfoAsync(
          samplesDirectory
        );

      if (!directoryInfo.exists) {

        await FileSystem.makeDirectoryAsync(
          samplesDirectory,
          {
            intermediates: true,
          }
        );

      }

      const fileInfo =
        await FileSystem.getInfoAsync(
          samplesFile
        );

      if (!fileInfo.exists) {

        await FileSystem.writeAsStringAsync(
          samplesFile,
          JSON.stringify(emptySamples)
        );

      }

      console.log(
        'SampleManager inicializado'
      );

    } catch (error) {

      console.error(
        'Erro ao inicializar SampleManager:',
        error
      );

    }

  }

  async getSamples(): Promise<SavedSamples> {

    // No Web não existe armazenamento
    // persistente através do FileSystem.
    if (Platform.OS === 'web') {

      return {
        ...emptySamples,
      };

    }

    try {

      await this.initialize();

      const content =
        await FileSystem.readAsStringAsync(
          samplesFile
        );

      return JSON.parse(content);

    } catch (error) {

      console.error(
        'Erro ao carregar samples:',
        error
      );

      return {
        ...emptySamples,
      };

    }

  }

  async saveRecording(
    sourceUri: string,
    name: string,
    padNumber: number
  ): Promise<PadSample | null> {

    // No navegador ainda não vamos tentar
    // copiar o arquivo usando FileSystem.
    if (Platform.OS === 'web') {

      console.log(
        'Persistência de gravações ainda não disponível no Web.'
      );

      return {
        uri: sourceUri,
        name,
      };

    }

    try {

      await this.initialize();

      const extension =
        sourceUri.includes('.')
          ? sourceUri.substring(
              sourceUri.lastIndexOf('.')
            )
          : '.m4a';

      const fileName =
        `pad-${padNumber}-${Date.now()}${extension}`;

      const destination =
        `${samplesDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: sourceUri,
        to: destination,
      });

      const samples =
        await this.getSamples();

      samples[String(padNumber)] = {
        uri: destination,
        name,
      };

      await FileSystem.writeAsStringAsync(
        samplesFile,
        JSON.stringify(samples)
      );

      console.log(
        `Sample salvo no PAD ${padNumber}:`,
        destination
      );

      return {
        uri: destination,
        name,
      };

    } catch (error) {

      console.error(
        'Erro ao salvar gravação:',
        error
      );

      return null;

    }

  }

  async removeFromPad(
    padNumber: number
  ) {

    if (Platform.OS === 'web') {

      console.log(
        'Remoção persistente não disponível no Web.'
      );

      return;

    }

    try {

      const samples =
        await this.getSamples();

      const sample =
        samples[String(padNumber)];

      if (sample) {

        const fileInfo =
          await FileSystem.getInfoAsync(
            sample.uri
          );

        if (fileInfo.exists) {

          await FileSystem.deleteAsync(
            sample.uri,
            {
              idempotent: true,
            }
          );

        }

      }

      samples[String(padNumber)] = null;

      await FileSystem.writeAsStringAsync(
        samplesFile,
        JSON.stringify(samples)
      );

      console.log(
        `Sample removido do PAD ${padNumber}`
      );

    } catch (error) {

      console.error(
        'Erro ao remover sample:',
        error
      );

    }

  }

}

export default new SampleManager();

