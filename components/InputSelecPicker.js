import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from './styles';
const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const HomeNavigation = () => {
  const [selectedValue, setSelectedValue] = useState('option1');
  const countries = ["Egypt", "Canada", "Australia", "Ireland", "France", "Tunisia", "Algeria", "Morocco"]

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélectionnez un pays :</Text>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            setSelectedValue(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
        />
      </View>
      <Text style={styles.selectedValue}>Vous avez sélectionné : {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
   backgroundColor: secondary,

padding:15,
paddingLeft:55,
borderRadius: 20,
height:60,
marginVertical:3,
marginBottom:10,
color:tertiary,
shadowOpacity:0.25,
shadowOffset:2,
shadowRadius:1,
marginLeft:-10,
marginRight:-10




  },
  dropdownButton: {
    backgroundColor: secondary,
    alignItems:'center',
    
    
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fafafa',
    justifyContent:'center'
  },
  dropdownRow: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  dropdownRowText: {
    fontSize: 16,
    color: '#333',
  },
  selectedValue: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default HomeNavigation;