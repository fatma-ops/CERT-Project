import React , { useEffect, useState , useContext } from 'react';
import { StyleSheet, TouchableOpacity,StatusBar, View, Text, Image } from 'react-native';
import { Colors } from '../components/styles';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBarHeight } from '../components/shared';
import RowContainer2 from '../components/Containers/RowContainer2';

const {brand , secondary , darkLight , red} = Colors


export default function HomeScreen({ navigation }) {
  const handleCubePress = (screenName) => {
    navigation.navigate(screenName);
  };
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
      
        <View style={styles.container2}>
        <StatusBar style= {brand} />
            <Text style={styles.header}>{`${greet} `}</Text>
            <Text style={styles.header2}>{`${prenom} !`}</Text>
          
          </View>
          <View  style={styles.container}>
          <View style={styles.row}>
      
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Vaccin')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/bleuVaccin.png')}
        />
          <Text style={styles.text}>Mes Vaccins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Screen2')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/pills.png')}
        />
          <Text style={styles.text}>Mes médicaments</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Screen3')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/consultation.png')}
        />
          <Text style={styles.text}>Mes Consultations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('AnalyseFlatList')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/medical-history.png')}
        />
          <Text style={styles.text}>Mes analyses</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Medecin')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/doctor.png')}
        />
          <Text style={styles.text}>Mes médecins</Text>
        </TouchableOpacity>
       
      </View>
      </View>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    
    
    container2: {
      paddingHorizontal: 20,

      flexDirection:'row',
      marginTop:StatusBarHeight-90,

    },
    
  Text: {
   
    
    color:'white',
    fontWeight:'bold'
    
  },
  avatar: {
    
    width: 60,
    height: 60,
    alignItems:'center',
    alignSelf:'center',
    alignContent:'center',
    
    
    
    
  },container: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  row: {
    flexDirection: 'row',
    
  },
  cube: {
    width: 150,
    height: 150,

    backgroundColor: secondary,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    shadowOpacity:14,
    shadowOpacity:0.25,
shadowOffset:2,
shadowRadius:1,
elevation:5
  },
  text: {
    color: brand,
    fontWeight: 'bold',
    marginTop:10
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color:brand,
    marginTop:StatusBarHeight + 60,

  },
  header2: {
    fontSize: 25,
    marginTop:StatusBarHeight + 60,

    color: brand,
   
  },
  
    
  });






