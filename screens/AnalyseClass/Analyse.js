import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState , useEffect} from 'react';
import AnalyseDetail from "./AnalyseDetail";
import AnalyseFlatList from "./AnalyseFlatList";
import AddAnalyse from "./AddAnalyse";


const Stack = createNativeStackNavigator();
  
export default function Consultation (){
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>
        <Stack.Screen name="Analyses" component={AnalyseFlatList}/>

        <Stack.Screen name="Ajouter consultation" component={AddAnalyse}/>

        <Stack.Screen name="Affiche Analyse" component={AnalyseDetail} />


      </Stack.Navigator>
    //</NavigationContainer>
  )
}