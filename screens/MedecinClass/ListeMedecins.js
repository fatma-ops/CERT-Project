import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
const { green, brand, darkLight, primary } = Colors;
import { StatusBarHeight , ScreenWidth } from '../../components/shared';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { StatusBar } from 'react-native';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import { ngrokLink } from '../../config';

const ListeMedecins = ({ navigation  }) => {
  const [medecins, setMedecins] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { email } = storedCredentials;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  
  
  const handleOnSearchInput = (text) => {

    setSearchQuery(text);
      const filtered = medecins.filter(
        (item) =>
          item &&
          item.nom &&
          item.nom.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAnalyses(filtered);
    };




    useEffect(() => {
      axios.get(`${ngrokLink}/api/v1/medecin/${email}?cache_bust=123456789`)
        .then(response => setMedecins(response.data))
        .catch(error => console.log(error));
    }, [email]);
    

  const renderAnalyse = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.analyse}>
          <Text style={styles.title}>{item.nom}</Text>
          <Text style={styles.text}>{item.specialite}</Text>
          

        </View>
      </View>
    );
  };

  return (
    
    <View style={[styles.analyseContainer2]}>
              <StatusBar style="white" />
              
      <View style={styles.headingContainer}>
        <View style ={{flexDirection:'column'}}>
        <View style={styles.header2}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
          <AntDesign name="left" size={25} color='white' />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mes médecins </Text></View>
       </View>
      <View style={{width:280 , paddingHorizontal:12 , height:170 }}>
      <StatusBar style="Light" />
      
      <SearchBar
      value={searchQuery}
      onChangeText={handleOnSearchInput}
      containerStyle={{ marginVertical: 15 }}
    />
    </View>
    </View>

    <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('AddMedecin')}
        >
          <MaterialIcons name="add" size={25} color='white' />
          <Text style={{ marginLeft: -15, color: 'white' }}> Ajouter</Text>
        </TouchableOpacity>
        </View>
    </View>
    <View style={{ flexDirection: 'row', alignContent: 'center' , marginTop:5 , paddingHorizontal:12 }}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Totale:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {medecins ? medecins.length : 0}
      </Text>
    </View>
    <View style={[styles.analyseContainer]}>

    <FlatList
  style={styles.scrollView}
  showsVerticalScrollIndicator={false}
  data={medecins}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AfficheMedecin", {
          selectedAnalyse: item,
        })
      }
    >
      <View style={styles.item} key={index}>
        <View style={styles.analyse}>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/img/doctorr.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.nom}</Text>
            <Text style={styles.specialty}>{item.specialite}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>
</View>
</View>

 
    
  );
};

const styles = StyleSheet.create({
  analyseContainer:{
    paddingHorizontal:15,
    paddingBottom:200,
    opacity:0.9,
    justifyContent:'space-between',

},
analyseContainer2:{
  marginBottom:70,
  opacity:1,
  justifyContent:'space-between',

},
headingContainer:{
    fontWeight:'700',
    color:brand,
    justifyContent:'space-between',
    

},
header2: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 10,
  backgroundColor:brand,
  marginTop:90,
},

headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:'white',
   marginLeft:100
  

},
backButton: {
 
},
divider:{
    width:'100%',
    height:2,
    marginTop:5,
    marginBottom:5,
},
item:{ 
    marginBottom:5,
    padding:15,
    color:brand,
    opacity:1,
    marginTop:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0, height:2},
    shadowRadius:1,
    elevation:5,
    backgroundColor:'white',
    borderWidth:0,
    borderRadius:15,
   //borderLeftWidth:15,

},
index:{
    fontSize:20,
    fontWeight:'800',
    color:brand
},
headingContainer:{
    flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
   backgroundColor:brand,
   height:150
},
button:{
    width:50,
    borderRadius:100,
    //justifyContent:'space-between',
    marginLeft:10,
   // height:50,
    marginTop :40,
    //marginBottom : 20
},
buttonText:{
    color:brand,
    fontSize:32,
    fontWeight:'800'
},
scrollView:{
    marginBottom:70,
},
analyse:{
    flexDirection:'row',
    width:'100%',
    color:'black',
    //fontWeight:'bold',
    //alignItems:'center'

},
text:{
  //marginTop:25,
    fontWeight:'400',
    fontSize:10,
    color:'black',
    //alignItems:'center',
},
title:{
  //marginTop:25,
    fontWeight:'400',
    fontSize:15,
    color:brand,
    //alignItems:'center',
},
dateContainer:{
  fontSize:15,
  marginTop:3,
  //flexDirection:'row',
  //justifyContent:'space-between',
  //alignContent:'center'
},
delete:{
    fontWeight:'700',
    fontSize:15
},
input:{
    height:40,
    paddingHorizontal:20,
    width:'65%',
    fontSize:19,
    color:brand,
    fontWeight:'600',
    opacity:0.8,
    marginTop:0.4,
    shadowOpacity:0.5,
    shadowOffset:{width:0, height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'#fff',
    borderWidth:2,
    borderRadius:5,
},
searchContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:8,
},
searchButton:{
    alignItems:"center",
    justifyContent:'center',
    width:60,
    borderRadius:5,
    height:40
},
searchButtonText:{
    color:"#fff",
    fontWeight:'700',
    fontSize:12,
},
emptyAnalyseContainer:{
    alignItems:'center',
    marginTop:140,
},
emptyAnalyseText:{
    fontWeight:'600',
    fontSize:15,
    justifyContent:'center',
    textAlign:'justify'
},

container: {

  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.5,
  marginTop:StatusBarHeight 

},
imageContainer: {
  width: 70,
  height: 70,
  borderRadius: 35,
  overflow: 'hidden',
  marginRight: 10,
 
},
image: {
  width: '100%',
  height: '100%',
},
textContainer: {
  flex: 1,
  paddingTop:14,
},
title: {
  fontWeight: '400',
  fontSize: 18,
  color: brand,
},
specialty: {
  fontSize: 15,
  color: '#555',
  marginTop: 3,
},
}) 

export default ListeMedecins;