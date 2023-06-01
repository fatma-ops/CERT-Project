import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../components/styles';
import { StatusBarHeight } from '../components/shared';
import { AntDesign} from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { ngrokLink } from '../config';
const { green, brand, darkLight, primary, secondary,tertiary } = Colors;

const Depenses = ({ navigation }) => {
  const [analyses, setAnalyses] = useState([]);
  const [treatements, setTreatements] = useState([]);
  const [consultations, setConsultations] = useState([]);

  const [cout, setCout] = useState(0);
const [remboursement, setRemboursement] = useState(0);


  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  
 // Fetch data for analyses
useEffect(() => {
  axios.get(`${ngrokLink}/api/v1/analyse/${email}?cache_bust=123456789`)
    .then(response => {
      setAnalyses(response.data);
      // Update the cout and remboursement values based on the fetched analyses data
      const totalCoutAnalyse = response.data.reduce((sum, analyse) => sum + (analyse.cout || 0), 0);
      const totalRemboursementAnalyse = response.data.reduce((sum, analyse) => sum + (analyse.remboursement || 0), 0);
      setCout(totalCoutAnalyse);
      setRemboursement(totalRemboursementAnalyse);
    })
    .catch(error => console.log(error));
}, [email]);

// Fetch data for treatments
useEffect(() => {
  axios.get(`${ngrokLink}/api/v1/traitement/${email}?cache_bust=123456789`)
    .then(response => {
      setTreatements(response.data);
      // Update the cout and remboursement values based on the fetched treatments data
      const totalCoutTraitement = response.data.reduce((sum, treatment) => sum + (treatment.cout || 0), 0);
      const totalRemboursementTraitement = response.data.reduce((sum, treatment) => sum + (treatment.remboursement || 0), 0);
      setCout(prevCout => prevCout + totalCoutTraitement);
      setRemboursement(prevRemboursement => prevRemboursement + totalRemboursementTraitement);
    })
    .catch(error => console.log(error));
}, [email]);

// Fetch data for consultations
useEffect(() => {
  axios.get(`${ngrokLink}/api/v1/consultation/${email}?cache_bust=123456789`)
    .then(response => {
      setConsultations(response.data);
      // Update the cout and remboursement values based on the fetched consultations data
      const totalCoutConsultation = response.data.reduce((sum, consultation) => sum + (consultation.cout || 0), 0);
      const totalRemboursementConsultation = response.data.reduce((sum, consultation) => sum + (consultation.remboursement || 0), 0);
      setCout(prevCout => prevCout + totalCoutConsultation);
      setRemboursement(prevRemboursement => prevRemboursement + totalRemboursementConsultation);
    })
    .catch(error => console.log(error));
}, [email]);


return (
   <View style={[styles.analyseContainer2]}>
      <StatusBar style="white" />
          <View style={styles.header2}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
          <AntDesign name="left" size={25} color='white' />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mes Dépenses</Text></View>
       </View>
       <View style={styles.analyseContainer}>
          <View style={styles.liste}>
          <View style={styles.item}>
            <Text style={styles.text2}>Totale : </Text>
            <Text style={styles.text}>1000</Text>

        </View>
        <View style={styles.item2}>
            <Text style={styles.type}>Consultations</Text>
            <View style={styles.container1}>
            <Text style={styles.cout1}>500</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>100</Text>
            <Text style={styles.cout2}>Remboursement</Text>
            </View>
        </View>

        <View style={styles.item2}>
            <Text style={styles.type}>Traitements</Text>
            <View style={styles.container2}>
            <Text style={styles.cout1}>300</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>100</Text>
            <Text style={styles.cout2}>Remboursement</Text>
            </View>
        </View>

        <View style={styles.item2}>
            <Text style={styles.type}>Analyses</Text>
            <View style={styles.container3}>
            <Text style={styles.cout1}>600</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>200</Text>
            <Text style={styles.cout2}>Remboursement</Text>
            </View>
        </View>
      
       
          </View>
       </View>
       
    </View>
 
    
  );
};

const styles = StyleSheet.create({
analyseContainer:{
    paddingTop:10,
    paddingHorizontal:0,
    marginBottom:70,
    opacity:0.9,
    justifyContent:'space-between',
    //backgroundColor:'white',
    height:'100%',

},
analyseContainer2:{
  marginBottom:70,
  opacity:1,
  justifyContent:'space-between',
  height:'100%',
},
header2: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 10,
  backgroundColor:brand,

  height:100
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  
 
},
headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:'white',
   marginLeft:85
},
backButton: {


},
divider:{
    width:'100%',
    height:2,
    marginTop:5,
    marginBottom:5,
},
dateContainer:{
  //marginTop:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  marginLeft:230,
  marginTop:-20,
},
text:{
    //marginTop:15,
     // fontWeight:'400',
      fontSize:25,
      alignSelf:'center',

  },
  text2:{
   //marginTop:5,
      fontSize:25,
      color:brand,
      alignSelf:'center',

  },
   type:{
      fontSize:19,
      //alignSelf:'center',
      paddingLeft:7,
      marginTop:28,
      color:brand,
      //fontWeight:'bold'

  },
  cout1:{
    //marginTop:15,
     // fontWeight:'400',
      fontSize:20,
      alignSelf:'center',

  },
  cout2:{
   //marginTop:5,
      fontSize:16,
      //color:brand,
    color:darkLight,
      //fontWeight:'bold',

      alignSelf:'center',

  },
  cout:{
      flexDirection:'column',
      marginTop:20,
      marginLeft:30,
},
container1:{
      flexDirection:'column',
      marginTop:20,
      marginLeft:20,
},
container2:{
      flexDirection:'column',
      marginTop:20,
      marginLeft:35,
},
container3:{
      flexDirection:'column',
      marginTop:20,
      marginLeft:59,
},
item2:{ 
      borderTopWidth: 1,
      borderTopColor: darkLight,
      marginBottom:15,
      flexDirection:'row',


  },
item:{ 
    marginTop:25,
      marginLeft:10,
      //marginRight:10,
      alignSelf:'center',
      //borderTopWidth: 1,
      borderTopColor: darkLight,
      marginBottom:25,
      flexDirection:'row'
  },
liste:{
    fontSize:19,
    fontWeight:'600',
    opacity:0.8,
    marginTop:0.4,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:2},
    shadowRadius:2,
    elevation:5,
    backgroundColor:'white',
    borderRadius:15,
    marginLeft:15,
    marginRight:15,
  },





}) 
export default Depenses;
