import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBarHeight } from './shared';
import { Colors  } from './styles';
const {brand , darkLight}=Colors

const SearchBar = ({value, onChangeText}) => {
  return (
    <View style={styles.searchBarContainer}>
      <MaterialIcons name="search" size={30} color={brand} />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Rechercher ..."
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
    borderWidth:0.3,
    borderColor:brand ,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 1,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop:StatusBarHeight +10,
    marginLeft:2,
    

  },
  searchBarInput: {
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
  },
});

export default SearchBar;