import React from 'react';
import { Pressable, Image } from 'react-native';
import { style } from './CardTable/styles';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => (
  <Pressable onPress={onPress}>
    <Image 
      resizeMode="contain" 
      source={require('../../src/img/boton-agregar.png')} 
      style={style.imagen} 
    />
  </Pressable>
);

export default AddButton;