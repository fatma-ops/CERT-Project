import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState, useEffect } from 'react';
import Analyses from "./ListeAnalyse";
import AfficheAnalyse from "./AfficheAnalyse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModifyAnalyse from "./ModifyAnalyse";
import Add from "./Add";


const Stack = createNativeStackNavigator();

export default function Analyse() {
  const [analyseName, setAnalyseName] = useState();
  const [analyseImage, setAnalyseImage] = useState();
  const [analyseDate, setAnalyseDate] = useState();
  const [analyses, setAnalyses] = useState([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);

  function handleAdd() {
    let newAnalyse = { analyseName: analyseName, analyseImage: analyseImage, analyseDate: analyseDate };
    let newAnalyses = [newAnalyse, ...analyses];
    setAnalyses(newAnalyses);
    setAnalyseName("");
    setAnalyseImage("");
    setAnalyseDate("");

    // Update the stored analyses list in AsyncStorage
    AsyncStorage.setItem('analyses', JSON.stringify(newAnalyses))
      .then(() => {
        console.log('Analyse added to AsyncStorage:', newAnalyse);
      })
      .catch((error) => {
        console.error('Error storing analyse in AsyncStorage:', error);
      });



  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the stored analyses list from AsyncStorage
        const jsonAnalyses = await AsyncStorage.getItem('analyses');
        const storedAnalyses = JSON.parse(jsonAnalyses) || [];

        // Update the analyses and filteredProducts state
        setAnalyses(storedAnalyses);
        setFilteredAnalyses(storedAnalyses);
      } catch (error) {
        console.error('Error retrieving analyses from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  // Rest of your component code




  return (
    //<NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="analyses">
        {props => <Analyses analyses={analyses} setAnalyses={setAnalyses}
          analyseName={analyseName} setAnalyseName={setAnalyseName}
          analyseImage={analyseImage} setAnalyseImage={setAnalyseImage}
          analyseDate={analyseDate} setAnalyseDate={setAnalyseDate}
        />}
      </Stack.Screen>
      <Stack.Screen name="Add">
        {props => <Add {...props}
          analyseName={analyseName} setAnalyseName={setAnalyseName}
          analyseImage={analyseImage} setAnalyseImage={setAnalyseImage}
          analyseDate={analyseDate} setAnalyseDate={setAnalyseDate}
          handleAdd={handleAdd} />}
      </Stack.Screen>
      <Stack.Screen
        name="Affiche Analyse"
        component={AfficheAnalyse}
        initialParams={{ selectedAnalyse: null, analyses: analyses, setAnalyses: setAnalyses }}
        analyses={analyses}
      />

      <Stack.Screen
        name="Modifier Analyse"
        component={ModifyAnalyse}
        initialParams={{ selectedAnalyse: null }}

        analyseName={analyseName} setAnalyseName={setAnalyseName}
        analyseImage={analyseImage} setAnalyseImage={setAnalyseImage}
        analyseDate={analyseDate} setAnalyseDate={setAnalyseDate}
      />



    </Stack.Navigator>
    //</NavigationContainer>
  )
}