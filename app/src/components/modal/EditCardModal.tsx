import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { style } from './styles';
import { Card } from '../../types/Card';
import DeleteCardButton from './DeleteCardButton';

interface EditCardModalProps {
  visible: boolean;
  card: Card | null;
  onClose: () => void;
  onSubmit: (cardData: any) => Promise<void>;
  onDelete?: (cardId: string) => Promise<void>;
}

const EditCardModal: React.FC<EditCardModalProps> = ({ 
  visible, 
  card, 
  onClose, 
  onSubmit,
  onDelete 
}) => {
  const [cardData, setCardData] = useState({
    nombre: '',
    nombreEnglish: '',
    cantidad: '1',
    ubicacion: 'CUA',
    precio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (card) {
      setCardData({
        nombre: card.nombre || '',
        nombreEnglish: card.nombreEnglish || '',
        cantidad: card.cantidad?.toString() || '1',
        ubicacion: card.ubicacion || 'CUA',
        precio: card.precio || ''
      });
    }
  }, [card]);

  const handleSubmit = async () => {
    if (!cardData.nombre) {
      Alert.alert("Error", "Debes ingresar al menos el nombre de la carta");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...cardData,
        cantidad: parseInt(cardData.cantidad) || 1
      });
      onClose();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la carta");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!card?.id || !onDelete) {
      console.log('No hay ID de carta o función onDelete');
      return;
    }
    
    setIsDeleting(true);
    try {
      console.log('Intentando eliminar carta con ID:', card.id);
      await onDelete(card.id);
      console.log('Carta eliminada, cerrando modal');
      onClose();
    } catch (error) {
      console.error('Error al eliminar:', error);
      Alert.alert("Error", "No se pudo eliminar la carta");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.modalTitle}>
            {card ? 'Editar carta' : 'Agregar carta'}
          </Text>
          
          <TextInput
            style={style.modalinput}
            value={cardData.nombre}
            onChangeText={(text) => setCardData({...cardData, nombre: text})}
            placeholder="Nombre de la carta"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
          />
          
          <TextInput
            style={style.modalinput}
            value={cardData.cantidad}
            onChangeText={(text) => setCardData({...cardData, cantidad: text.replace(/[^0-9]/g, '')})}
            placeholder="Cantidad"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          
          <TextInput
            style={style.modalinput}
            value={cardData.ubicacion}
            onChangeText={(text) => setCardData({...cardData, ubicacion: text})}
            placeholder="Ubicación"
            placeholderTextColor="#aaa"
          />

          <View style={style.buttonContainer}>
            
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={onClose}
              disabled={isSubmitting || isDeleting}
            >
              <Text style={style.textStyle}>Cancelar</Text>
            </Pressable>
            
            <Pressable
              style={[style.button, style.buttonSubmit]}
              onPress={handleSubmit}
              disabled={isSubmitting || isDeleting}
            >
              <Text style={style.textStyle}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCardModal;