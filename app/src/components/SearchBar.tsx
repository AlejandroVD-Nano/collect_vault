import React from 'react';
import { TextInput } from 'react-native';
import { style } from './CardTable/styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => (
  <TextInput
    style={style.input}
    placeholder="Buscar..."
    placeholderTextColor="#aaa"
    value={value}
    onChangeText={onChangeText}
  />
);

export default SearchBar;