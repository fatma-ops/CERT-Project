import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBarHeight } from './shared';
import { Colors  } from './styles';
const {brand , darkLight}=Colors

const SearchBar = ({value, onClear, onChangeText}) => {
  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons name="search" size={30} color={brand} />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Chercher votre vaccin"
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#F0EEEE',
    borderWidth:2,
    borderColor:darkLight ,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop:StatusBarHeight +10
  },
  searchBarInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
  },
});

export default SearchBar;