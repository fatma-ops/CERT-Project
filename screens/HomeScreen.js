import React , { useEffect, useState , useContext } from 'react';
import { StyleSheet, TouchableOpacity,StatusBar, View, Text, Image } from 'react-native';
import { Colors } from '../components/styles';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBarHeight } from '../components/shared';
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
      if (hrs < 17) return setGreet('Bonne après-midi');
      setGreet('Bonsoir');
    };
    findGreet();
  }, []);
  const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

  const {nom,prenom} = storedCredentials;
  //console.log(nom , prenom)
  return (
    
      <View style={styles.page}>
              <StatusBar style= {brand} />

      <View style={{
      backgroundColor: brand,
      height: '20%',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>  
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


        <TouchableOpacity style={styles.cube} >
        <Image
          style={styles.avatar}
          source={require('./../assets/img/pills.png')}
        />
          <Text style={styles.text}>Mes médicaments</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Consultation')}>
        <Image
          style={styles.avatar}
          source={require('./../assets/img/consultation.png')}
        />
          <Text style={styles.text}>Mes Consultations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('Analyse')}>
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
      </View>
      
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
    
    
    
    
  },
  page: {
   paddingBottom:100,
   backgroundColor:'white',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,

  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor:'white',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    marginTop: - 50,

  },
  row: {
    flexDirection: 'row',
    
  },
  cube: {
    width: 140,
    height: 140,
    backgroundColor: secondary,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
  },
  text: {
    color: brand,
    fontWeight: 'bold',
    marginTop:10
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'white',
    marginTop:StatusBarHeight-30,
marginLeft:25,

  },
  header2: {
    fontSize: 25,
    marginTop:StatusBarHeight-30 ,
    color: "white",
   
  },
  
    
  });






