import React , { useEffect, useState , useContext } from 'react';
import { StyleSheet, TouchableOpacity,StatusBar, View, Text, Image } from 'react-native';
import { Colors } from '../components/styles';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBarHeight } from '../components/shared';
const {brand , secondary , darkLight , red} = Colors

const Plus = ({ navigation  }) => {
    const handleCubePress = (screenName) => {
        navigation.navigate(screenName);
      };
  return (
    
<View style={styles.page}>
              <StatusBar style= {brand} />

      <View style={{
      height: '20%',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>  

  </View>
          <View  style={styles.container}>
      
      <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('AddConsultation')}>
        <Text style={styles.text}>Ajouter consultation</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('AddMedecin')}>
        <Text style={styles.text}>Ajouter médecin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('AddAnalyse')}>
          <Text style={styles.text}>Ajouter analyse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cube} onPress={() => handleCubePress('AddVaccin')}>
        <Text style={styles.text}>Ajouter vaccin</Text>
      </TouchableOpacity>

    
      </View>

    
  </View>

      
    );
}
  
  const styles = StyleSheet.create({
    
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
   paddingBottom:160,
   backgroundColor:'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',  
  },
  cube: {
    width: 260,
    height: 60,
    backgroundColor: brand,
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
    color: 'white',
    fontWeight: '500',
    fontSize:20,
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
export default Plus;