import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');

export const style = StyleSheet.create({
  container: {
    backgroundColor: '#01261C',
    flex: 1,
  },
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
  },
  titulo: {
    fontSize: 30,
    color: '#F0F1F2',
    marginTop: 60,
    padding: 10,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#025949',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: width * 0.95,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#038C73',
    width: width * 0.95,
    backgroundColor: '#038C73',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  cell: {
    color: '#F0F1F2',
    textAlign: 'center',
  },
  fixedWidth: {
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: width * 0.15,
    height: width * 0.15 * 1.4,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#F0F1F2',
    textAlign: 'center',
  },
  centrado: {
    alignItems: 'center',
    marginTop: 10,
  },
  imagen: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: width * 0.7,
    top: 10,
  },
});