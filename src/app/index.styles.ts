import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    maxWidth: 800,

    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },

  subtitle: {
    color: '#71717a',
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 6,
    textAlign: 'center',
  },

  padGrid: {
    width: '100%',
    maxWidth: 600,

    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'center',

    padding: 10,
  },

  footer: {
    color: '#52525b',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 20,
  },

  recorderButton: {
  width: 220,
  height: 50,

  marginTop: 20,

  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#a855f7',

  backgroundColor: '#18181b',

  alignItems: 'center',
  justifyContent: 'center',
},

recorderButtonText: {
  color: '#fff',
  fontSize: 13,
  fontWeight: '900',
  letterSpacing: 2,
},
});