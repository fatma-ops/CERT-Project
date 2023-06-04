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
  const [consultations, setConsultations] = useState([]);
  const [traitements, setTraitements] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  
 // Définir les variables d'état pour les totaux
const [totalCoutAnalyses, setTotalCoutAnalyses] = useState(0);
const [totalRemboursementAnalyses, setTotalRemboursementAnalyses] = useState(0);
const [totalCoutTraitements, setTotalCoutTraitements] = useState(0);
const [totalRemboursementTraitements, setTotalRemboursementTraitements] = useState(0);
const [totalCoutConsultations, setTotalCoutConsultations] = useState(0);
const [totalRemboursementConsultations, setTotalRemboursementConsultations] = useState(0);

// ...

// Fetch data for analyses
useEffect(() => {
  axios
    .get(`${ngrokLink}analyse/${email}?cache_bust=123456789`)
    .then(response => {
      const analysesData = response.data;

      let totalCout = 0;
      let totalRemboursement = 0;

      // Calculer les totaux des coûts et des remboursements pour les analyses
      analysesData.forEach(analysis => {
        totalCout += analysis.cout;
        totalRemboursement += analysis.remboursement;
      });

      setTotalCoutAnalyses(totalCout);
      setTotalRemboursementAnalyses(totalRemboursement);
    })
    .catch(error => console.log(error));
}, [email]);

// Fetch data for traitements
useEffect(() => {
  axios
    .get(`${ngrokLink}traitement/traitements/${email}?cache_bust=123456789`)
    .then(response => {
      const traitementsData = response.data;

      let totalCout = 0;
      let totalRemboursement = 0;

      // Calculer les totaux des coûts et des remboursements pour les traitements
      traitementsData.forEach(traitement => {
        totalCout += traitement.cout;
        totalRemboursement += traitement.remboursement;
      });

      setTotalCoutTraitements(totalCout);
      setTotalRemboursementTraitements(totalRemboursement);
    })
    .catch(error => console.error(error));
}, [email]);

// Fetch data for consultations
useEffect(() => {
  axios
    .get(`${ngrokLink}consultation/${email}?cache_bust=123456789`)
    .then(response => {
      const consultationsData = response.data;

      let totalCout = 0;
      let totalRemboursement = 0;

      // Calculer les totaux des coûts et des remboursements pour les consultations
      consultationsData.forEach(consultation => {
        totalCout += consultation.cout;
        totalRemboursement += consultation.remboursement;
      });

      setTotalCoutConsultations(totalCout);
      setTotalRemboursementConsultations(totalRemboursement);
    })
    .catch(error => console.log(error));
}, [email]);

// Calculer les dépenses totales
const totalDepenses = totalCoutAnalyses - totalRemboursementAnalyses +
                      totalCoutTraitements - totalRemboursementTraitements +
                      totalCoutConsultations - totalRemboursementConsultations;

// ...

return (
  <View style={[styles.analyseContainer2]}>
    <StatusBar style="white" />
    <View style={styles.header2}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
        <AntDesign name="left" size={25} color="white" />
      </TouchableOpacity>
      <View>
          <Text style={styles.headerTitle}>Mes Dépenses</Text></View>
       </View>
       <View style={styles.analyseContainer}>
          <View style={styles.liste}>
          <View style={styles.item}>
            <Text style={styles.text2}>Totale : </Text>
            <Text style={styles.text}>{totalDepenses}</Text>

        </View>
        <View style={styles.item2}>
            <Text style={styles.type}>Consultations</Text>
            <View style={styles.container1}>
            <Text style={styles.cout1}>{totalCoutConsultations}</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>{totalRemboursementConsultations}</Text>
            <Text style={styles.cout2}>Remboursement</Text>
            </View>
        </View>

        <View style={styles.item2}>
            <Text style={styles.type}>Traitements</Text>
            <View style={styles.container2}>
            <Text style={styles.cout1}>{totalCoutTraitements}</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>{totalRemboursementTraitements}</Text>
            <Text style={styles.cout2}>Remboursement</Text>
            </View>
        </View>

        <View style={styles.item2}>
            <Text style={styles.type}>Analyses</Text>
            <View style={styles.container3}>
            <Text style={styles.cout1}>{totalCoutAnalyses}</Text>
            <Text style={styles.cout2}>Cout</Text>
            </View>
            <View style={styles.cout}>
            <Text style={styles.cout1}>{totalRemboursementAnalyses}</Text>
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
