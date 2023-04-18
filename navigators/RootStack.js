import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../screens/User/Login';
import { Colors } from './../components/styles';
const { primary, tertiary , brand} = Colors;
import Signup from '../screens/User/Signup';
import Welcome from '../screens/User/Welcome';
import ForgetPassword from '../screens/User/ForgetPassword';
import EmailVerification from '../screens/User/EmailVerification';
import RestPassword from '../screens/User/RestPassword';
import { CredentialsContext } from './../components/CredentialsContext';
import PasswordOtp from '../screens/User/PasswordOtp';
import NavBarre from './NavBarre';
import AddAnalyse from '../screens/AddAnalyse';
import AnalyseDetail from '../screens/AnalyseDetail';
import AnalyseFlatList from '../screens/AnalyseFlatList'
import EditProfileScreen from '../screens/User/EditProfileScreen';
import EditPasswordScreen from '../screens/User/EditPasswordScreen';
import Vaccin from '../screens/VaccinClass/Vaccin';
import ListeVaccin from '../screens/VaccinClass/ListeVaccin';
import AddVaccin from '../screens/VaccinClass/AddVaccin';
import AfficheVaccin from '../screens/VaccinClass/AfficheVaccin';
import ModifyVaccin from '../screens/VaccinClass/ModifyVaccin';
import Analyse from '../screens/AnalyseClass/Analyse';
import ListeAnalyse from '../screens/AnalyseClass/ListeAnalyse';
import Add from '../screens/AnalyseClass/Add';
import AfficheAnalyse from '../screens/AnalyseClass/AfficheAnalyse';
import ModifyAnalyse from '../screens/AnalyseClass/ModifyAnalyse';
import Medecin from '../screens/MedecinClass/Medecin';
import ListeMedecin from '../screens/MedecinClass/ListeMedecins';
import AddMedecin from '../screens/MedecinClass/AddMedecin';
import AfficheMedecin from '../screens/MedecinClass/AfficheMedecin';

import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown : false}}

              //headerStyle: {
              //  backgroundColor: 'transparent'
              //},
             //headerTintColor: tertiary,
             // headerTransparent: true,
             //headerTitle: '',
              //headerLeftContainerStyle: {
               // paddingLeft: 20,
              //},

            //}}


            initialRouteName="Login"
          >

            {storedCredentials ?
            <>
              <Stack.Screen   name="NavBarre" component={NavBarre} />
              <Stack.Screen  name="Welcome" component={Welcome} />
              <Stack.Screen  name="AddAnalyse" component={AddAnalyse} />
              <Stack.Screen  name="AnalyseDetail" component={AnalyseDetail}  />
              <Stack.Screen name="AnalyseFlatList" component={AnalyseFlatList} />
              <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
              <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
              <Stack.Screen name="Vaccin" component={Vaccin} />
                <Stack.Screen name="ListeVaccin" component={ListeVaccin} />
                <Stack.Screen name="AddVaccin" component={AddVaccin} />
                <Stack.Screen name="AfficheVaccin" component={AfficheVaccin} />
                <Stack.Screen name="ModifyVaccin" component={ModifyVaccin} />
                <Stack.Screen name="Analyse" component={Analyse} />
                <Stack.Screen name="ListeAnalyse" component={ListeAnalyse} />
                <Stack.Screen name="Add" component={AddAnalyse} />
                <Stack.Screen name="AfficheAnalyse" component={AfficheAnalyse} />
                <Stack.Screen name="ModifyAnalyse" component={ModifyAnalyse} />
                <Stack.Screen name="Medecin" component={Medecin} />
                <Stack.Screen name="ListeMedecin" component={ListeMedecin} />
                <Stack.Screen name="AddMedecin" component={AddMedecin} />
                <Stack.Screen name="AfficheMedecin" component={AfficheMedecin} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />

                
              





              </>
              : <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="EmailVerification" component={EmailVerification} />
                <Stack.Screen name="RestPassword" component={RestPassword} />
                <Stack.Screen name="PasswordOtp" component={PasswordOtp} />
               




                


              </>
            }


          </Stack.Navigator>
        </NavigationContainer>

      )}





    </CredentialsContext.Consumer>

  );
}
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? brand : ''
  },
 
  headerTintColor: Platform.OS === 'android' ? 'white' : brand,
  headerTitle: 'mes analyses',
};

export default RootStack;


