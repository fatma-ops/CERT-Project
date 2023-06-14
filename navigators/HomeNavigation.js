import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer, useRoute  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import ListeDossier from "../screens/DossierClass/ListeDossier";

//Consultation _____________________________________________________________________
import AfficheConsultation from "../screens/ConsultationClass/AfficheConsultation";
import ModifyConsultation from "../screens/ConsultationClass/ModifyConsultation";
import ListeConsultation from "../screens/ConsultationClass/ListeConsultation";
import AddConsultation from "../screens/ConsultationClass/AddConsultation";
import AddTraitement from "../screens/ConsultationClass/AddTraitement";
import Consultation from "../screens/ConsultationClass/Consultation";
//Vaccins___________________________________________________________________________

import Vaccin from "../screens/VaccinClass/Vaccin";
import ListeVaccin from "../screens/VaccinClass/ListeVaccin";
import AfficheVaccin from "../screens/VaccinClass/AfficheVaccin";
import AddVaccin from "../screens/VaccinClass/AddVaccin";
import ModifyVaccin from "../screens/VaccinClass/ModifyVaccin";


//Analyse____________________________________________________________________________
import Analyse from "../screens/AnalyseClass/Analyse"
import AddAnalyse from "../screens/AnalyseClass/AddAnalyse";
import AnalyseFlatList from "../screens/AnalyseClass/AnalyseFlatList";
import AnalyseDetail from "../screens/AnalyseClass/AnalyseDetail";
//Medecin___________________________________________________________________________
import Medecin from "../screens/MedecinClass/Medecin";
import ListeMedecins from "../screens/MedecinClass/ListeMedecins";
import AddMedecin from "../screens/MedecinClass/AddMedecin";
import ModifyMedecin from "../screens/MedecinClass/ModifyMedecin";
import AfficheMedecin from "../screens/MedecinClass/AfficheMedecin";
//HomeScreen________________________________________________________________________
import HomeScreen from "../screens/HomeScreen";
//_____________________________________________________________________________
import ListeTraitement from "../screens/TraitementClass/ListeTraitement";
import Traitement from "../screens/TraitementClass/Traitement"
import AfficheTraitement from "../screens/TraitementClass/AfficheTraitement";

//
import Depenses from "../screens/Depenses"
import plus from"../screens/plus"


const Stack = createNativeStackNavigator();
  
export default function HomeNavigation (){
  return(
    //<NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown : false  }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Consultation" component={Consultation}/>
        <Stack.Screen name="Consultations" component={ListeConsultation}/>
        <Stack.Screen name="Ajouter consultation" component={AddConsultation}/>
        <Stack.Screen name="Ajouter traitement" component={AddTraitement}/>
        <Stack.Screen name="Affiche Consultation" component={AfficheConsultation} />
        <Stack.Screen name="Modifier Consultation" component={ModifyConsultation}/>





        <Stack.Screen name="Vaccin" component={Vaccin}/>
        <Stack.Screen name="Vaccins" component={ListeVaccin}/>
        <Stack.Screen name="Ajouter vaccin" component={AddVaccin}/>
        <Stack.Screen name="Affiche Vaccin" component={AfficheVaccin} />
        <Stack.Screen name="Modifier Vaccin" component={ModifyVaccin}/>






        <Stack.Screen name="Analyse" component={Analyse}/>
        <Stack.Screen name="Analyses" component={AnalyseFlatList}/>
        <Stack.Screen name="Ajouter Analyse" component={AddAnalyse}/>
        <Stack.Screen name="Affiche Analyse" component={AnalyseDetail} />



        <Stack.Screen name="Medecin" component={Medecin} />
        <Stack.Screen name="ListeMedecins" component={ListeMedecins} />
        <Stack.Screen name="AddMedecin" component={AddMedecin}  />
        <Stack.Screen name="AfficheMedecin" component={AfficheMedecin}  />
        <Stack.Screen name="ModifyMedecin" component={ModifyMedecin}  />



        <Stack.Screen name="Traitement" component={Traitement} />
        <Stack.Screen name="ListeTraitement" component={ListeTraitement} />
        <Stack.Screen name="AfficheTraitement" component={AfficheTraitement}  />
        <Stack.Screen name="Depenses" component={Depenses}  />

        <Stack.Screen name="ListeDossier" component={ListeDossier}  />
        <Stack.Screen name="plus" component={plus}  />






      </Stack.Navigator>
    //</NavigationContainer>
  )
}