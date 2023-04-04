import React, { useState, route } from 'react';
import { Text, View, ScrollView,Image } from "react-native";


    const AfficheVaccin = ({ route, navigation, ...props }) => {
        const { selectedVaccin } = route.params;      
        return (
          <View >
            <Text >{selectedVaccin.vaccinName}</Text>
            <Text >{selectedVaccin.vaccinDate}</Text>
            {selectedVaccin.vaccinImage && (
              <Image
                source={{ uri: selectedVaccin.vaccinImage }}
                style={{ height: 200, width: '100%' }}
              />
            )}
          </View>
        );
      };

export default AfficheVaccin;