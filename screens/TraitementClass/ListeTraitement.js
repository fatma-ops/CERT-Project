import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { CenterIcon, Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { ngrokLink } from '../../config';
import { AntDesign, Entypo } from '@expo/vector-icons';

const { brand, green,red,darkLight, primary,secondary,tertiary } = Colors;
   
const ListeTraitement = ({ navigation }) => {
  const [traitements, setTraitements] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTraitements, setFilteredTraitements] = useState([]);
  const handleOnSearchInput = (text) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredTraitements(traitements);
    } else {
      const filtered = traitements.filter((traitement) =>
        traitement.medicaments.some(
          (medicament) =>
            medicament.nommedicament.toLowerCase().includes(text.toLowerCase())
        )
      );
      setFilteredTraitements(filtered);
    }
  };
  
  useEffect(() => {
    axios.get(`${ngrokLink}traitement/traitements/${email}?cache_bust=123456789}`)
      .then(response => setTraitements(response.data))
      .catch(error => console.log(error));
  }, [email]);

  return ( 
    
      <View style={[styles.Container]}>
        <StatusBar style="white" />
        <View style={styles.headingContainer}>
          <View style={styles.header2}>
            <Text style={styles.headerTitle}>Mes Traitements</Text>
          </View>
          <View style={{ width: 300, paddingHorizontal: 5, top: -20, left: -20 }}>
            <StatusBar style="Light" />
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginLeft: 45, marginTop: 0 }}
            />
          </View>
        </View>
        <View style={styles.Container2}>
        <FlatList
    style={styles.listContainer}
    contentInset={{ bottom: 400 }}
    data={searchQuery ? filteredTraitements : traitements}
    keyExtractor={(item, index) => String(index)}
    renderItem={({ item }) => (
      <View style={styles.traitementContainer}>
        <Text style={styles.treatmentTitle}>Traitement</Text>
        <Text style={styles.coutRemboursement}>
          Cout: {item.cout} | Remboursement: {item.remboursement}
        </Text>
        {item.medicaments && item.medicaments.length > 0 ? (
          item.medicaments.map((medicament, medicamentIndex) => (
            <View
              key={medicamentIndex}
              style={styles.subTreatmentContainer}
            >
              <Image
                source={require('../../assets/img/med.jpg')}
                style={styles.image}
              />
              <View style={styles.fois}>
                <Text style={styles.title}>{medicament.nommedicament}</Text>
                <View style={styles.nbrJoursContainer}>
                  <Text style={styles.nbrJours}>
                    {medicament.nbrfois}X{medicament.nbrJours}
                  </Text>
                </View>
                <Text style={styles.dateContainer}>
                {medicament.dateDeCommencement}                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>Aucun traitement trouvé</Text>
        )}
      </View>
    )}
  />
</View>
      </View>
    );
    
  };

const styles = StyleSheet.create({
  Container2:{
    marginBottom:100,
    opacity:0.9,
    justifyContent:'space-between',
    padding:15,
    color:brand,
    opacity:1,
    borderWidth:0,
    paddingLeft:10,
    paddingRight:10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    //marginTop:-30,
    //backgroundColor:tertiary,

},
Container:{
  marginBottom: 10,
  borderRadius: 8,
  opacity:1,
  justifyContent:'space-between',
  



},
header2: {
  alignSelf: 'center',
  justifyContent: 'center', 
  //paddingLeft:75,
 
  marginTop:StatusBarHeight,
},
headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:'white',
},
listItemTitle: {
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 5,
}, 
headingContainer:{
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:brand,
  paddingTop:20,
  // paddingBottom:20,    
},

title: {
  fontSize: 20,
  marginLeft:20,
  fontWeight:'500'
},
fois:{ 
  flexDirection:'column',
  //justifyContent:'flex-start',
  //alignContent:'center',
  // backgroundColor:red,
  //paddingLeft:80,

  },
  nbrJours:{ 
  flexDirection:'column',
  justifyContent:'flex-start',
  alignContent:'center',
  // backgroundColor:red,
  paddingLeft:20,
  fontWeight:'500',
  fontSize:16, 
  marginTop:5,

  },
dateContainer2:{
   marginLeft:190,
   marginTop:-20,
   fontWeight: '500',
   fontSize:17,

  },
dateContainer:{
   marginLeft:20,
   marginTop:5,
   color:'grey',
   fontWeight: '400',
   fontSize:16, 

  },
  listContainer: {
    paddingHorizontal: 15,
    marginTop:-15
  },
  button: {
    paddingLeft:100,
    marginRight:10,
    justifyContent:'center',
    },
  treatmentTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    marginTop:25,
  },
  subTreatmentContainer: {
    marginBottom:5,
    padding:7,
    opacity:1,
    marginTop:7,
    shadowOpacity:0.25,
    shadowOffset:{width:0, height:2},
    shadowRadius:1,
    elevation:5,
    backgroundColor:'white',
    borderWidth:0,
    borderRadius:15,
   flexDirection:'row',
   // justifyContent:'space-between'
  },
  subTreatmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTreatmentText: {
    fontSize: 14,
    marginBottom: 2,
  },
  image: {
    width:60, // Adjust the width as needed
    height:60, // Adjust the height as needed
    //marginRight: 10, // Adjust the margin as needed
    //resizeMode: 'contain', 
    marginLeft:10, 
  },
  coutRemboursement:{
    fontSize:17,
    fontWeight:'500',
    color:brand
  },
}) 

export default ListeTraitement;