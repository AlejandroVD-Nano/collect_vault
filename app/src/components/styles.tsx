import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');

export const style = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    color: '#F0F1F2',
    width: width * 0.2,
    position: 'absolute',
    right: 20,
    top: 10,
  }
});