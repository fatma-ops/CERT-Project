import { StyleSheet, Text, View, Image } from "react-native";
  import { NavigationContainer, useRoute  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import Add from "./AddVaccin";
  import React, {useState , useEffect} from 'react';
  import Vaccins from "./ListeVaccin";
import AddVaccin from "./AddVaccin";
import AfficheVaccin from "./AfficheVaccin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModifyVaccin from "./ModifyVaccin";


const Stack = createNativeStackNavigator();
  
export default function Vaccin (){
  const [vaccinName, setVaccinName] = useState();
  const [vaccinImage, setVaccinImage] = useState();
  const [vaccinDate, setVaccinDate] = useState();
  const [vaccins , setVaccins]= useState([]);
  const [filteredVaccins, setFilteredVaccins] = useState([]);

  function handleAdd(){
    let newVaccin = {vaccinName: vaccinName, vaccinImage: vaccinImage, vaccinDate: vaccinDate};
    let newVaccins = [newVaccin, ...vaccins];
    setVaccins(newVaccins);
    setVaccinName("");
    setVaccinImage("");
    setVaccinDate("");

    // Update the stored vaccins list in AsyncStorage
  AsyncStorage.setItem('vaccins', JSON.stringify(newVaccins))
  .then(() => {
    console.log('Vaccin added to AsyncStorage:', newVaccin);
  })
  .catch((error) => {
    console.error('Error storing vaccin in AsyncStorage:', error);
  });



  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the stored vaccins list from AsyncStorage
        const jsonVaccins = await AsyncStorage.getItem('vaccins');
        const storedVaccins = JSON.parse(jsonVaccins) || [];

        // Update the vaccins and filteredProducts state
        setVaccins(storedVaccins);
        setFilteredVaccins(storedVaccins);
      } catch (error) {
        console.error('Error retrieving vaccins from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  // Rest of your component code


  
  
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
  initialParams={{ selectedVaccin: null, vaccins:vaccins, setVaccins: setVaccins }}
  vaccins={vaccins} 
  />

<Stack.Screen 
  name="Modifier Vaccin" 
  component={ModifyVaccin} 
  initialParams={{ selectedVaccin: null }}
  
  vaccinName={vaccinName} setVaccinName={setVaccinName}
            vaccinImage={vaccinImage} setVaccinImage={setVaccinImage}
            vaccinDate={vaccinDate} setVaccinDate={setVaccinDate}
            />



      </Stack.Navigator>
    //</NavigationContainer>
  )
}