import { StyleSheet, Text, View } from 'react-native';
import React , {useState, useEffect} from 'react';
import RootStack from './navigators/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [appIsReady , setAppIsReady]= useState(false);
  const [storedCredentials , setStoredCredentials] = useState("");

  const checkLoginCredentials = async () => {
    try {
      const result = await AsyncStorage.getItem('DossierMedicaleCredentials');
      if(result !== null){
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if(!appIsReady){
    return null;
  }

  return (
    <CredentialsContext.Provider  value = {{storedCredentials , setStoredCredentials}}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}


