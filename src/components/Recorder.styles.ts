import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,

    marginTop: 30,
    padding: 20,

    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#27272a',

    backgroundColor: '#111113',

    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },

  status: {
    color: '#a1a1aa',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 8,
    marginBottom: 18,
  },

  recordButton: {
    width: 180,
    height: 50,

    borderRadius: 12,

    backgroundColor: '#dc2626',

    alignItems: 'center',
    justifyContent: 'center',
  },

  stopButton: {
    width: 180,
    height: 50,

    borderRadius: 12,

    backgroundColor: '#27272a',
    borderWidth: 2,
    borderColor: '#dc2626',

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  playButton: {
  width: 180,
  height: 50,

  marginTop: 12,

  borderRadius: 12,

  backgroundColor: '#27272a',
  borderWidth: 2,
  borderColor: '#a855f7',

  alignItems: 'center',
  justifyContent: 'center',
},
});