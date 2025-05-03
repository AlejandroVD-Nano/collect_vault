import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CardRow from './CardRow';
import { style } from './styles';
import { Card } from '../../types/Card';

interface CardTableProps {
  data: Card[];
  searchText: string;
  onEditPress: (card: Card) => void;
}

const CardTable: React.FC<CardTableProps> = ({ data, searchText, onEditPress }) => {
  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    item.ubicacion.toLowerCase().includes(searchText.toLowerCase()) ||
    item.precio.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Text style={style.titulo}>
        <b>Mi colección</b>
      </Text>
      
      <View style={style.centrado}>
        <View style={style.headerRow}>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Imagen</Text></View>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Nombre</Text></View>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Cantidad</Text></View>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Ubicación</Text></View>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Precio</Text></View>
          <View style={style.fixedWidth}><Text style={style.headerCell}>Editar</Text></View>
        </View>
        
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <CardRow card={item} onEditPress={onEditPress} />}
          keyExtractor={item => item.id}
          style={{ width: '95%' }}
          ListEmptyComponent={
            <Text style={{color: '#F0F1F2', textAlign: 'center', marginTop: 20}}>
              No se encontraron cartas
            </Text>
          }
        />
      </View>
    </>
  );
};

export default CardTable;