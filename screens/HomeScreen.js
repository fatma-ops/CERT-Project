import React , { useEffect, useState , useContext } from 'react';
import { Dimensions } from 'react-native';
import {Text , StyleSheet , StatusBar , View } from 'react-native';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBarHeight } from '../components/shared';
import { Colors } from '../components/styles';
const {brand} = Colors


const { width } = Dimensions.get("window");

const HomeScreen = () => {

  const [greet, setGreet] = useState('');
 
  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Bonjour');
    if (hrs === 1 || hrs < 17) return setGreet('bonne après-midi');
    setGreet('Bonsoir');
  };

  useEffect(() => {
    findGreet();
  }, []);
    
  const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

    const {nom,prenom} = storedCredentials;
    console.log(nom , prenom)
    return (
      <>
        <StatusBar barStyle='dark-content' />
          <View style={styles.container}>
            <Text style={styles.header}>{` ${greet}  `}</Text>
            <Text style={styles.header}>{`  ${nom} ${prenom} `}</Text>

           
           
          </View>
       
      </>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      color:brand,
      marginTop:StatusBarHeight + 10
    },
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
      flexDirection:'row'
    },
    emptyHeader: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      opacity: 0.2,
    },
    emptyHeaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    addBtn: {
      position: 'absolute',
      right: 15,
      bottom: 50,
      zIndex: 1,
    },
  });
  
  export default HomeScreen;
   








