import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');

export const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#01261C",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width*.9
  },
  modalTitle: {
    fontSize: 20,
    color: '#F0F1F2',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  modalinput: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    color: '#F0F1F2',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '43%'
  },
  buttonClose: {
    backgroundColor: '#d33',
  },
  buttonSubmit: {
    backgroundColor: '#038C73',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonDelete: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 30,
    alignItems: 'center',
  },
});