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
      const filtered = traitements.filter(
        (item) =>
          item &&
          item.medicament &&
          item.medicament.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTraitements(filtered);
    };
  useEffect(() => {
    axios.get(`${ngrokLink}/api/v1/traitement/traitements/${email}?cache_bust=123456789}`)
      .then(response => setTraitements(response.data))
      .catch(error => console.log(error));
  }, [email]);

  return ( 
      <View style={[styles.Container]}>
        <StatusBar style="white" />
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: 'column' }}>
          <View style={styles.header2}>
        <Text style={styles.headerTitle}>Mes medicaments</Text>
      </View>
      <View style={{width:320 , paddingHorizontal:5 , top:-20,left:10}}>            
        <StatusBar style="Light" />
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginLeft: 45, marginTop: 0 }}
              />
            </View>
          </View>
        </View>   
    <View style={styles.Container2}>
      <FlatList
  style={styles.listContainer}
  contentInset={{ bottom: 400 }}
  data={traitements}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item }) => (
      <View> 
        {item.traitements && item.traitements.length > 0 ? (
          item.traitements.map((sousTraitement, sousTraitementIndex) => (
            <TouchableOpacity
              key={sousTraitementIndex}
              onPress={() => {navigation.navigate("AfficheTraitement", {
              selectedTraitement: sousTraitement,})}}style={styles.subTreatmentContainer}
            >
            <Image
            source={require('../../assets/img/med.jpg')}
            style={styles.image}
          />
              <View style={styles.fois}>
              <Text style={styles.title}>{sousTraitement.medicament} </Text>
              <Text style={styles.dateContainer}>{sousTraitement.dateDeCommencement}</Text>
              <Text style={styles.dateContainer2}>{sousTraitement.nbrfois}X{sousTraitement.nbrJours}</Text>
             </View>
            </TouchableOpacity> 
          ))
        ) : ( 
          <Text>Aucun sous-traitement trouvé</Text>
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
    //backgroundColor:'white',

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
  paddingLeft:75, 
  marginTop:StatusBarHeight,
},
headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:'white'
},
listItemTitle: {
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 5,
}, 
headingContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:brand,
  paddingTop:20,
  // paddingBottom:20,    
},
title: {
  fontSize: 22,
  marginLeft:20,
},
fois:{ 
  flexDirection:'column',
  //justifyContent:'flex-start',
  //alignContent:'center',
  // backgroundColor:red,
  //paddingLeft:80,

  },
dateContainer2:{
   marginLeft:190,
   marginTop:-20,
   //color: brand,
   fontWeight: '500',
   fontSize:17,

  },
dateContainer:{
   marginLeft:20,
   marginTop:5,
   color: brand,
   fontWeight: '500',

  },
  listContainer: {
    paddingHorizontal: 20,
  },
  button: {
    paddingLeft:100,
    marginRight:10,
    justifyContent:'center',
    },
  treatmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
}) 

export default ListeTraitement;