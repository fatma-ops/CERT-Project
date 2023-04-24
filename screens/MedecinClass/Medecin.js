import { StyleSheet, Text, View, Image } from "react-native";
  import { NavigationContainer, useRoute  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import React, {useState , useEffect} from 'react';
  import Medecins from "./ListeMedecins";
  import AddMedecin from "./AddMedecin";
  import AfficheMedecin from "./AfficheMedecin";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import ModifyMedecin from "./ModifyMedecin";


const Stack = createNativeStackNavigator();
  
export default function Medecin (){
  const specialties = [
    'Cardiologie',
    'Dermatologie',
    'Endocrinologie',
    'Gastro-entérologie',
    'Hématologie',
    'Infectiologie',
    'Médecine interne',
    'Neurologie',
    'Ophtalmologie',
    'Pédiatrie',
    'Psychiatrie',
    'Rhumatologie',
  ];
  const [medecinName, setMedecinName] = useState();
  const [medecinAdresse, setMedecinAdresse] = useState();
  const [medecinSpecialite, setMedecinSpecialite] = useState();
  const [medecinNum, setMedecinNum] = useState();
  const [medecinCmnt, setMedecinCmnt] = useState();
  const [medecins , setMedecins]= useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);

  function handleAdd(){
    let newMedecin = {medecinName: medecinName, medecinAdresse: medecinAdresse, 
        medecinSpecialite: medecinSpecialite, medecinNum:medecinNum,medecinCmnt:medecinCmnt};
    let newMedecins = [newMedecin, ...medecins];
    setMedecins(newMedecins);
    setMedecinName("");
    setMedecinAdresse("");
    setMedecinSpecialite(specialties);
    setMedecinNum("");
    setMedecinCmnt("");


    // Update the stored medecins list in AsyncStorage
  AsyncStorage.setItem('medecins', JSON.stringify(newMedecins))
  .then(() => {
    console.log('Medecin added to AsyncStorage:', newMedecin);
  })
  .catch((error) => {
    console.error('Error storing medecin in AsyncStorage:', error);
  });



  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the stored medecins list from AsyncStorage
        const jsonMedecins = await AsyncStorage.getItem('medecins');
        const storedMedecins = JSON.parse(jsonMedecins) || [];

        // Update the medecins and filteredProducts state
        setMedecins(storedMedecins);
        setFilteredMedecins(storedMedecins);
      } catch (error) {
        console.error('Error retrieving medecins from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  // Rest of your component code


  
  
  return(
    //<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Medecins">
          {props => <Medecins medecins={medecins} setMedecins={setMedecins} 
                             medecinName={medecinName} setMedecinName={setMedecinName}
                             medecinAdresse={medecinAdresse} setMedecinAdresse={setMedecinAdresse}
                             medecinSpecialite={medecinSpecialite} setMedecinSpecialite={setMedecinSpecialite}
                             medecinNum={medecinNum} setMedecinNum={setMedecinNum}
                             medecinCmnt={medecinCmnt} setMedecinCmnt={setMedecinCmnt}
                             />}
        </Stack.Screen>
        <Stack.Screen name="Add Medecin">
          {props => <AddMedecin {...props}
            medecinName={medecinName} setMedecinName={setMedecinName}
            medecinAdresse={medecinAdresse} setMedecinAdresse={setMedecinAdresse}
            medecinSpecialite={medecinSpecialite} setMedecinSpecialite={setMedecinSpecialite}
            medecinNum={medecinNum} setMedecinNum={setMedecinNum}
            medecinCmnt={medecinCmnt} setMedecinCmnt={setMedecinCmnt}
            handleAdd={handleAdd}/>}
        </Stack.Screen>
        <Stack.Screen 
  name="Affiche Medecin" 
  component={AfficheMedecin} 
  initialParams={{ selectedMedecin: null, medecins:medecins, setMedecins: setMedecins }}
  medecins={medecins} 
  />
      </Stack.Navigator>
    //</NavigationContainer>
  )
}