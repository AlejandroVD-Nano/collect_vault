import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { style } from './styles';

interface AddCardModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (cardData: any) => Promise<void>;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ visible, onClose, onSubmit }) => {
  const [cardData, setCardData] = useState({
    nombre: '',
    cantidad: '',
    ubicacion: '',
    precio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!cardData.nombre) {
      Alert.alert("Error", "Debes ingresar el nombre de la carta");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...cardData,
        cantidad: parseInt(cardData.cantidad) || 1
      });
      setCardData({
        nombre: '',
        cantidad: '1',
        ubicacion: 'CUA',
        precio: ''
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar la carta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.modalTitle}>Agregar nueva carta</Text>
          
          <TextInput
            style={style.modalinput}
            value={cardData.nombre}
            onChangeText={(text) => setCardData({...cardData, nombre: text})}
            placeholder="Nombre de la carta(en ingles)"
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
          
          <TextInput
            style={style.modalinput}
            value={cardData.precio}
            onChangeText={(text) => setCardData({...cardData, precio: text.replace(/[^0-9.]/g, '')})}
            placeholder="Precio (opcional)"
            placeholderTextColor="#aaa"
            keyboardType="decimal-pad"
          />
          
          <View style={style.buttonContainer}>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={style.textStyle}>Cancelar</Text>
            </Pressable>
            
            <Pressable
              style={[style.button, style.buttonSubmit]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={style.textStyle}>
                {isSubmitting ? 'Guardando...' : 'Guardar Carta'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCardModal;