import { useState, useEffect } from 'react';
import { Card } from '../types/Card';

const API_URL = "http://localhost:3001";

export const useCards = () => {
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [localNames, setLocalNames] = useState<Record<string, string>>({});

  const loadCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/cards`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cards = await response.json();
      setData(cards);
      
      const namesDict: Record<string, string> = {};
      cards.forEach((card: Card) => {
        if (card.nombre && card.nombreEnglish) {
          namesDict[card.nombre] = card.nombreEnglish;
        }
      });
      setLocalNames(namesDict);
    } catch (error) {
      console.error("Error loading cards:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchCard = async (cardName: string) => {
    try {
      let response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
      
      if (!response.ok && localNames[cardName]) {
        response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(localNames[cardName])}`);
      }
      
      if (!response.ok) throw new Error("Carta no encontrada");
      return await response.json();
    } catch (error) {
      console.error("Error fetching card:", error);
      throw error;
    }
  };

  const fetchCardPrice = async (cardName: string): Promise<string> => {
    try {
      const card = await fetchCard(cardName);
      return card.prices?.usd || '0.00';
    } catch (error) {
      console.error("Error fetching card price:", error);
      return '0.00';
    }
  };

  const addCard = async (cardData: Omit<Card, 'id' | 'imagen' | 'fechaCreacion' | 'precio'>) => {
    try {
      const card = await fetchCard(cardData.nombre);
      const precio = await fetchCardPrice(cardData.nombre);
      
      const cardToSave = {
        ...cardData,
        id: card.id,
        nombreEnglish: card.name,
        imagen: card.image_uris?.small || card.card_faces?.[0]?.image_uris?.small,
        fechaCreacion: new Date().toISOString(),
        precio: precio
      };

      const response = await fetch(`${API_URL}/api/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardToSave),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedCard = await response.json();
      setData(prev => [...prev, savedCard]);
      return savedCard;
    } catch (error) {
      console.error("Error adding card:", error);
      throw error;
    }
  };

  const updateCard = async (id: string, cardData: Partial<Card>) => {
    try {
      if (cardData.cantidad !== undefined && cardData.cantidad <= 0) {
        return await deleteCard(id);
      }

      const response = await fetch(`${API_URL}/api/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCard = await response.json();
      
      setData(prev => prev.map(card => 
        card.id === id ? { ...card, ...updatedCard } : card
      ));
      
      return updatedCard;
    } catch (error) {
      console.error("Error updating card:", error);
      throw error;
    }
  };

  const deleteCard = async (id: string) => {
    try {
      console.log(`Enviando DELETE a: ${API_URL}/api/cards/${id}`);
      const response = await fetch(`${API_URL}/api/cards/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Actualización optimista
      setData(prev => prev.filter(card => card.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting card:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  return { 
    data, 
    loading, 
    localNames, 
    addCard, 
    updateCard, 
    deleteCard,
    loadCards: () => {
      setLoading(true);
      loadCards();
    }
  };
};