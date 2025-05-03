import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { style } from './styles';
import { Card } from '../../../types/Card';

interface CardRowProps {
  card: Card;
  onEditPress: (card: Card) => void;
}

const CardRow: React.FC<CardRowProps> = ({ card, onEditPress }) => (
  <View style={style.row}>
    {card.imagen ? (
      <Image source={{ uri: card.imagen }} style={style.cardImage} resizeMode="contain" />
    ) : (
      <Text style={style.cell}>No image</Text>
    )}
    <Text style={[style.cell, style.fixedWidth]} numberOfLines={1}>{card.nombre}</Text>
    <Text style={[style.cell, style.fixedWidth]}>{card.cantidad}</Text>
    <Text style={[style.cell, style.fixedWidth]}>{card.ubicacion}</Text>
    <Text style={[style.cell, style.fixedWidth]}>${card.precio}</Text>
    <Pressable onPress={() => onEditPress(card)} style={[style.cell, style.fixedWidth]}>
      <Text style={{color: '#4CAF50', fontWeight: 'bold', textAlign: 'center'}}>Editar</Text>
    </Pressable>
  </View>
);

export default CardRow;