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
import AddAnalyse from '../screens/AnalyseClass/AddAnalyse';
import AnalyseDetail from '../screens/AnalyseClass/AnalyseDetail';
import AnalyseFlatList from '../screens/AnalyseClass/AnalyseDetail'
import EditProfileScreen from '../screens/User/EditProfileScreen';
import EditPasswordScreen from '../screens/User/EditPasswordScreen';
import Vaccin from '../screens/VaccinClass/Vaccin';
import ListeVaccin from '../screens/VaccinClass/ListeVaccin';
import AddVaccin from '../screens/VaccinClass/AddVaccin';
import AfficheVaccin from '../screens/VaccinClass/AfficheVaccin';
import ModifyVaccin from '../screens/VaccinClass/ModifyVaccin';
import Analyse from '../screens/AnalyseClass/Analyse';
import HomeNavigation from './HomeNavigation';
import Medecin from '../screens/MedecinClass/Medecin';
import ListeMedecin from '../screens/MedecinClass/ListeMedecins';
import AddMedecin from '../screens/MedecinClass/AddMedecin';
import AfficheMedecin from '../screens/MedecinClass/AfficheMedecin';
import Consultation from '../screens/ConsultationClass/Consultation';
import ListeConsultation from '../screens/ConsultationClass/ListeConsultation';
import AddConsultation from '../screens/ConsultationClass/AddConsultation';
import AfficheConsultation from '../screens/ConsultationClass/AfficheConsultation';
import ModifyConsultation from '../screens/ConsultationClass/ModifyConsultation';
import Depenses from '../screens/Depenses';
import HomeScreen from '../screens/HomeScreen';
import ModifyMedecin from '../screens/MedecinClass/ModifyMedecin';
import Traitement from '../screens/TraitementClass/Traitement';
import AddTraitement from '../screens/ConsultationClass/AddTraitement'
import UpdateTraitement from '../screens/TraitementClass/UpdateTraitement'
import AddRappel from '../screens/RappelClass/AddRappel'
import ListeAddRappelTraitement from '../screens/RappelClass/ListeAddRappelTraitement'
import ListeRappel from '../screens/RappelClass/ListeRappel'
import ListeTraitement from '../screens/TraitementClass/ListeTraitement';
import AfficheTraitement from '../screens/TraitementClass/AfficheTraitement';
import Notification from '../screens/TraitementClass/Notification';
import ModifierAnalyse from '../screens/AnalyseClass/ModifierAnalyse';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown : false}}
              //headerStyle: {backgroundColor: 'transparent'},
             //headerTintColor: tertiary,
             // headerTransparent: true,
             //headerTitle: '',
              //headerLeftContainerStyle: {paddingLeft: 20,},
            //}}
            initialRouteName="Login"
          >
            {storedCredentials ?
            <>
              <Stack.Screen   name="NavBarre" component={NavBarre} />
              <Stack.Screen   name="HomeNavigation" component={HomeNavigation} />

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
                <Stack.Screen name="Medecin" component={Medecin} />
                <Stack.Screen name="ListeMedecin" component={ListeMedecin} />
                <Stack.Screen name="AddMedecin" component={AddMedecin} />
                <Stack.Screen name="AfficheMedecin" component={AfficheMedecin} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ModifyMedecin" component={ModifyMedecin} />
                <Stack.Screen name="Consultation" component={Consultation} />
                <Stack.Screen name="ListeConsultation" component={ListeConsultation} />
                <Stack.Screen name="AddConsultation" component={AddConsultation} />
                <Stack.Screen name="AfficheConsultation" component={AfficheConsultation} />
                <Stack.Screen name="ModifyConsultation" component={ModifyConsultation} />
                <Stack.Screen name="Depenses" component={Depenses} />
                <Stack.Screen name="Traitement" component={Traitement} />
                <Stack.Screen name="AddTraitement" component={AddTraitement} />
                <Stack.Screen name="UpdateTraitement" component={UpdateTraitement} />
                <Stack.Screen name="AddRappel" component={AddRappel} />
                <Stack.Screen name="ListeAddRappelTraitement" component={ListeAddRappelTraitement} />
                <Stack.Screen name="ListeRappel" component={ListeRappel} />
                <Stack.Screen name="ListeTraitement" component={ListeTraitement} />
                <Stack.Screen name="AfficheTraitement" component={AfficheTraitement} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="ModifierAnalyse" component={ModifierAnalyse} />
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


