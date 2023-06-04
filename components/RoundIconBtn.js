import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RoundIconBtn = ({ antIconName, size, color ,  style, onPress }) => {
  return (
    <AntDesign
      name={'addfolder'}
      size={size || 24}
      color= {color ||'#034c81'}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor:'white',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:1},
    shadowRadius:2,
  },
});

export default RoundIconBtn;
