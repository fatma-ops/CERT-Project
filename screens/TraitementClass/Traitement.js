import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState , useEffect} from 'react';


import UpdateTraitement from '../../screens/TraitementClass/UpdateTraitement'
import ListeTraitement from "./ListeTraitement";

const Stack = createNativeStackNavigator();
  
export default function Traitement (){
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>

      

        <Stack.Screen name="Liste Traitement" component={ListeTraitement}/>

        <Stack.Screen name="Modifier Traitement" component={UpdateTraitement}/>

      </Stack.Navigator>
    //</NavigationContainer>
  )
}