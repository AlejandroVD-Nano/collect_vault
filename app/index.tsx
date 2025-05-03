import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { useCards } from './src/hooks/useCard';
import SearchBar from './src/components/SearchBar';
import AddButton from './src/components/AddButton';
import CardTable from './src/components/CardTable/CardTable';
import AddCardModal from './src/components/modal/AddCardModal';
import EditCardModal from './src/components/modal/EditCardModal';
import { Card } from './src/types/Card';
import { style } from './src/components/CardTable/styles';

export default function Index() {
  const [searchText, setSearchText] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const { data, loading, addCard, updateCard, deleteCard, loadCards } = useCards();

  const handleAddCard = async (cardData: any) => {
    try {
      await addCard(cardData);
      setIsAddModalVisible(false);
      loadCards();
    } catch (error) {
      console.error("Error adding card:", error);
      Alert.alert("Error", "No se pudo agregar la carta");
    }
  };

  const handleEditCard = async (cardData: any) => {
    if (!currentCard) return;
    try {
      await updateCard(currentCard.id, cardData);
      setIsEditModalVisible(false);
      loadCards();
    } catch (error) {
      console.error("Error updating card:", error);
      Alert.alert("Error", "No se pudo actualizar la carta");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await deleteCard(cardId);
      setIsEditModalVisible(false);
      loadCards();
      Alert.alert("Éxito", "La carta fue eliminada correctamente");
    } catch (error) {
      console.error("Error deleting card:", error);
      Alert.alert("Error", "No se pudo eliminar la carta");
    }
  };

  if (loading) {
    return (
      <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#038C73" />
      </View>
    );
  }

  return (
    <ScrollView style={style.container}>
      <AddButton onPress={() => setIsAddModalVisible(true)} />
      <SearchBar value={searchText} onChangeText={setSearchText} />

      <CardTable
        data={data}
        searchText={searchText}
        onEditPress={(card) => {
          setCurrentCard(card);
          setIsEditModalVisible(true);
        }}
      />

      <AddCardModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAddCard}
      />

<EditCardModal
  visible={isEditModalVisible}
  card={currentCard}
  onClose={() => {
    console.log('Cerrando modal');
    setIsEditModalVisible(false);
  }}
  onSubmit={handleEditCard}
  onDelete={async (cardId) => {
    console.log('Eliminando carta con ID:', cardId);
    await handleDeleteCard(cardId);
  }}
/>
    </ScrollView>
  );
}