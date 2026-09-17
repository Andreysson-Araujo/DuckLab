import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#09090b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },

  status: {
    color: '#71717a',
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 8,
    marginBottom: 25,
  },

  recordButton: {
    width: 220,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stopButton: {
    width: 220,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f97316',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playButton: {
    width: 220,
    height: 55,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },

  assignTitle: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 25,
    marginBottom: 12,
  },

  padGrid: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  padButton: {
    width: 100,
    height: 55,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#a855f7',
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  padButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

});