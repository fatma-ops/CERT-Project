import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import ListeDossier from "./ListeDossier";

//HomeScreen________________________________________________________________________
import HomeScreen from './../HomeScreen';
import ListeConsultation from "../ConsultationClass/ListeConsultation";
import Consultation from "../ConsultationClass/Consultation"



const Stack = createNativeStackNavigator();
  
export default function HomeNavigation (){
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>
        

     <Stack.Screen name="ListeDossier" component={ListeDossier} />
     <Stack.Screen name="HomeScreen" component={HomeScreen}  />
     <Stack.Screen name="Consultation" component={Consultation}  />

     <Stack.Screen name="ListeConsultation" component={ListeConsultation}  />




      </Stack.Navigator>
    //</NavigationContainer>
  )
}