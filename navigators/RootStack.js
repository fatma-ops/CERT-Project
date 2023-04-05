import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './../screens/Login';
import { Colors } from './../components/styles';
const { primary, tertiary , brand} = Colors;
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import ForgetPassword from '../screens/ForgetPassword';
import EmailVerification from './../screens/EmailVerification';
import RestPassword from '../screens/RestPassword';
import { CredentialsContext } from './../components/CredentialsContext';
import PasswordOtp from '../screens/PasswordOtp';
import NavBarre from './NavBarre';
import AddAnalyse from '../screens/AddAnalyse';
import AnalyseDetail from '../screens/AnalyseDetail';
import AnalyseFlatList from '../screens/AnalyseFlatList'
import EditProfileScreen from '../screens/EditProfileScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import Vaccin from '../screens/Vaccin';
import ListeVaccin from '../screens/ListeVaccin';
import AddVaccin from '../screens/AddVaccin';
import AfficheVaccin from '../screens/AfficheVaccin';

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


