import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState , useEffect} from 'react';
import Consultations from "./ListeConsultation";
import AfficheConsultation from "./AfficheConsultation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModifyConsultation from "./ModifyConsultation";
import Add from "./AddConsultation";
import ListeConsultation from "./ListeConsultation";
import AddConsultation from "./AddConsultation";
import AddTraitement from "./AddTraitement";


const Stack = createNativeStackNavigator();
  
export default function Consultation (){
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>
        <Stack.Screen name="Consultations" component={ListeConsultation}/>

        <Stack.Screen name="Ajouter consultation" component={AddConsultation}/>
        <Stack.Screen name="Ajouter traitement" component={AddTraitement}/>

        <Stack.Screen name="Affiche Consultation" component={AfficheConsultation} />

        <Stack.Screen name="Modifier Consultation" component={ModifyConsultation}/>

      </Stack.Navigator>
    //</NavigationContainer>
  )
}