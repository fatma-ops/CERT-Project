import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
//import { SearchBar } from 'react-native-screens';
import { StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';

const { brand, darkLight, primary,secondary,tertiary } = Colors;


const ListeVaccin = ({ navigation }) => {
  const [vaccins, setVaccins] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { email } = storedCredentials;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVaccins, setFilteredVaccins] = useState([]);
  const handleOnSearchInput = (text) => {
    setSearchQuery(text);
      const filtered = vaccins.filter(
        (item) =>
          item &&
          item.title &&
          item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVaccins(filtered);
    };
  useEffect(() => {
    axios.get(`https://1fd3-197-14-252-72.eu.ngrok.io/api/v1/vaccin/${email}?cache_bust=123456789`)
      .then(response => setVaccins(response.data))
      .catch(error => console.log(error));
  }, [email]);

  const renderAnalyse = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.analyse}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.dateContainer}>{item.date}</Text>
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
        <Text style={styles.headerTitle}>                    Mes vaccins</Text>
      </View>
      <View style={{width:280 , paddingHorizontal:12 }}>
      <StatusBar style="Light" />
      <SearchBar
           value={searchQuery}
            onChangeText={handleOnSearchInput}
            containerStyle={{ marginVertical: 15, marginTop:25}}
            />
     
    </View>
    </View>

    <View >
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('AddVaccin')}
        >
          <MaterialIcons name="add" size={25} color='white' />
          <Text style={{ marginLeft: -15, color: 'white' }}> Ajouter</Text>
        </TouchableOpacity>
        </View>

    </View>
    <View style={[styles.analyseContainer]}>

    <View style={{ flexDirection: 'row', alignContent: 'center', marginTop:5 , paddingHorizontal:12}}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Totale:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {vaccins ? vaccins.length : 0}
      </Text>
    </View>
  

<FlatList
  style={styles.scrollView}
  showsVerticalScrollIndicator={false}
  data={vaccins}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AfficheVaccin", {
          selectedAnalyse: item,
        })
      }
    >
      <View style={styles.item} key={index}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.dateContainer}>{item.date}</Text>
          
      </View>
      {item.image && (
      <Image
        source={{ uri: `data:${item.image.contentType};base64,${item.image.data.toString('base64')}` }}
        style={styles.image}
      />
    )}
    </TouchableOpacity>
    
  )}
/>
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
    height:900,

},
analyseContainer2:{
  
  marginBottom:70,
  opacity:1,
  justifyContent:'space-between',

},
header2: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // To center the header
 
  marginHorizontal:-10 , // To remove the left and right padding
  paddingHorizontal: 10, // To add the padding back
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:StatusBarHeight -30,

  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: darkLight,

  marginRight:-50,
  marginLeft:10,
},
headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:'white'

},
backButton: {
  marginRight: 10,
  marginLeft: -9,
},

divider:{
    width:'100%',
    height:2,
    marginTop:5,
    marginBottom:5,
},
item:{ 
    marginBottom:25,
    padding:20,
    marginRight:15,
    marginLeft:15,
    //color:brand,
    opacity:1,
    marginTop:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:2},
    shadowRadius:2,
    elevation:5,
    backgroundColor:'white',
   // backgroundColor: '#E2E9EB',
    borderWidth:0,
    borderRadius:15,
    alignItems:'center',
},
index:{
    fontSize:20,
    fontWeight:'800',
    color:brand
},
headingContainer2:{
  fontWeight:'700',
  color:brand,
  justifyContent:'space-between',
  

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
    //flexDirection:'row',
    width:'100%',
    color:'black',
    fontWeight:'bold',
    alignItems:'center',
    backgroundColor:{brand}

},
text:{
  marginTop:25,
    fontWeight:'400',
    fontSize:25,
    alignItems:'center',
},
dateContainer:{
  marginTop:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center'
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
    fontWeight:'600',
    opacity:0.8,
    marginTop:0.4,
    shadowOpacity:0.5,
    shadowOffset:{width:0, height:4},
    shadowRadius:8,
    elevation:5,
    backgroundColor:{brand},
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
}) 

export default ListeVaccin;