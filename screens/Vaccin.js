import { StyleSheet, Text, View, Image } from "react-native";
  import { NavigationContainer, useRoute } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import Add from "./AddVaccin";
  import React, {useState} from 'react';
  import Vaccins from "./ListeVaccin";
import AddVaccin from "./AddVaccin";
import AfficheVaccin from "./AfficheVaccin";


const Stack = createNativeStackNavigator();
  
export default function Vaccin (){
  const [vaccinName, setVaccinName] = useState();
  const [vaccinImage, setVaccinImage] = useState();
  const [vaccinDate, setVaccinDate] = useState();
  const [vaccins , setVaccins]= useState([]);
  
  function handleAdd(){
    let newVaccin = {vaccinName: vaccinName, vaccinImage: vaccinImage, vaccinDate: vaccinDate};
    let newVaccins = [newVaccin, ...vaccins];
    setVaccins(newVaccins);
    setVaccinName("");
    setVaccinImage("");
    setVaccinDate("");
  }
  
  return(
    //<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Vaccins">
          {props => <Vaccins vaccins={vaccins} setVaccins={setVaccins} 
                             vaccinName={vaccinName} setVaccinName={setVaccinName}
                             vaccinImage={vaccinImage} setVaccinImage={setVaccinImage}
                             vaccinDate={vaccinDate} setVaccinDate={setVaccinDate}
                             />}
        </Stack.Screen>
        <Stack.Screen name="Add">
          {props => <Add {...props} 
            vaccinName={vaccinName} setVaccinName={setVaccinName}
            vaccinImage={vaccinImage} setVaccinImage={setVaccinImage}
            vaccinDate={vaccinDate} setVaccinDate={setVaccinDate}
            handleAdd={handleAdd}/>}
        </Stack.Screen>
        <Stack.Screen 
  name="Affiche Vaccin" 
  component={AfficheVaccin} 
  initialParams={{ selectedVaccine: null }}
  vaccinName={vaccinName} setVaccinName={setVaccinName}
            vaccinImage={vaccinImage} setVaccinImage={setVaccinImage}
            vaccinDate={vaccinDate} setVaccinDate={setVaccinDate}
            handleAdd={handleAdd}/>



      </Stack.Navigator>
    //</NavigationContainer>
  )
}