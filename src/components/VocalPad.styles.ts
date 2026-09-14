import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pad: {
    width: 160,
    height: 160,
    margin: 8,
    borderRadius: 18,
    borderWidth: 2,

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 6,
  },

  padPressed: {
    transform: [{ scale: 0.94 }],
  },

  number: {
    position: 'absolute',
    top: 10,
    left: 12,
    color: '#ffffffaa',
    fontSize: 12,
    fontWeight: 'bold',
  },

  icon: {
    fontSize: 42,
    marginBottom: 8,
  },

  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  status: {
    color: '#ffffffaa',
    fontSize: 10,
    marginTop: 5,
    letterSpacing: 2,
  },
});