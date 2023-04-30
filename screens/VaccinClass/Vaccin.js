import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState , useEffect} from 'react';
import Vaccins from "./ListeVaccin";
import AfficheVaccin from "./AfficheVaccin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModifyVaccin from "./ModifyVaccin";
import Add from "./AddVaccin";
import ListeVaccin from "./ListeVaccin";
import AddVaccin from "./AddVaccin";


const Stack = createNativeStackNavigator();
  
export default function Vaccin (){
 

  

  
  
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>
        <Stack.Screen name="Vaccins" component={ListeVaccin}>
         
                            
        </Stack.Screen>
        <Stack.Screen name="Ajouter vaccin" component={AddVaccin} >
         
        </Stack.Screen>
        <Stack.Screen 
  name="Affiche Vaccin" 
  component={AfficheVaccin} 
  
  />

<Stack.Screen 
  name="Modifier Vaccin" 
  component={ModifyVaccin} 

            />



      </Stack.Navigator>
    //</NavigationContainer>
  )
}