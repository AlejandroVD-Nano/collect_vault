import React from 'react';
import { Pressable, Text, Alert, StyleSheet } from 'react-native';

interface DeleteCardButtonProps {
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
}

const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({ onDelete, isDeleting }) => {
  const handleDelete = () => {
    Alert.alert(
      "Eliminar carta",
      "¿Estás seguro de que quieres eliminar esta carta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Eliminar", 
          onPress: () => onDelete().catch(e => console.error(e)),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <Pressable
      style={[styles.button, styles.deleteButton]}
      onPress={handleDelete}
      disabled={isDeleting}
    >
      <Text style={styles.textStyle}>
        {isDeleting ? 'Eliminando...' : 'Eliminar carta'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteCardButton;