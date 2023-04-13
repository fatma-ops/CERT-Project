import React , { useEffect, useState , useContext } from 'react';
import { Dimensions, Image } from 'react-native';
import {Text , StyleSheet , StatusBar , View , TouchableOpacity } from 'react-native';
import { CredentialsContext } from './../components/CredentialsContext';
import { ScreenHeight, StatusBarHeight } from '../components/shared';
import { CenterIcon, Colors } from '../components/styles';
import RowContainer from '../components/Containers/RowContainer';
import { useNavigation } from '@react-navigation/native';
const {brand , darkLight} = Colors


const { width } = Dimensions.get("window");

const HomeScreen = () => {


  const navigation = useNavigation();
  const [greet, setGreet] = useState('');
 
  useEffect(() => {
    const findGreet = () => {
      const hrs = new Date().getHours();
      if (hrs === 0 || hrs < 12) return setGreet('Bonjour');
      if (hrs === 1 || hrs < 17) return setGreet('bonne après-midi');
      setGreet('Bonsoir');
    };
    findGreet();
  }, []);
  
    
  const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

    const {nom,prenom} = storedCredentials;
    console.log(nom , prenom)
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <View style={styles.container}>
            <Text style={styles.header}>{`${greet}  `}</Text>
            <Text style={styles.header2}>{`${prenom} !`}</Text>
          </View>
        
          <RowContainer>
          <View style={styles.item}  >
         
            <TouchableOpacity onPress={() => navigation.navigate('Vaccin')}>
            <Image
          style={styles.avatar}
          source={require('./../assets/img/vaccinewhite.png')}
        />
        <Text style={styles.Text} >Mes vaccins</Text>

            </TouchableOpacity>
         
        </View>
        <View style={styles.item}  >
         
            <TouchableOpacity  onPress={() => navigation.navigate('Analyse')}  >
            <Image
           
          style={styles.avatar}
          source={require('./../assets/img/analysewhite.png')}
        />
        <Text style={styles.Text} >Mes analyses</Text>
        
             
            </TouchableOpacity>
         
        </View> 
        </RowContainer>


        
         
       
       
        

       
      </>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      fontSize: 25,
      fontWeight: 'bold',
      color:brand,
      marginTop:StatusBarHeight + 60,

    },
    header2: {
      fontSize: 25,
     
      color:brand,
      marginTop:StatusBarHeight + 60,
    },
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
      flexDirection:'row'
    },
    item:{ 
      marginBottom: StatusBarHeight + 400,
      padding:30,
      color:darkLight,
      opacity:1,
      marginLeft:20,
      marginRight:30,

      marginTop:StatusBarHeight ,
      shadowOpacity:0.25,
      shadowOffset:{width:2, height:1},
      shadowRadius:2,
      elevation:5,
      
      backgroundColor:brand,
      borderWidth:0,
      borderRadius:15,
     //borderLeftWidth:15,

  },
  Text: {
   
    
    color:'white',
    fontWeight:'bold'
    
  },
  avatar: {
    
    width: 70,
    height: 70,
    alignItems:'center',
    alignSelf:'center',
    alignContent:'center',
    
    
    
    
  }
    
  });
  
  export default HomeScreen;
   








