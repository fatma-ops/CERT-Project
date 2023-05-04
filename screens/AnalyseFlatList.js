import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../components/styles';
const { green, brand, darkLight, primary } = Colors;
import { StatusBarHeight } from '../components/shared';
import { FontAwesome5 } from '@expo/vector-icons';
//import { SearchBar } from 'react-native-screens';
import { StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';



const AnalyseFlatList = ({ navigation }) => {
  const [analyses, setAnalyses] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { email } = storedCredentials;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const handleOnSearchInput = (text) => {
    setSearchQuery(text);
      const filtered = analyses.filter(
        (item) =>
          item &&
          item.title &&
          item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAnalyses(filtered);
    };
  useEffect(() => {
    axios.get(`https://e922-197-15-82-75.ngrok-free.app/api/v1/analyse/${email}?cache_bust=123456789`)
      .then(response => setAnalyses(response.data))
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
   
    <View style={[styles.analyseContainer]}>
      <View style={styles.headingContainer}>
      <View style={{width:280 }}>
      <StatusBar style="Light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>                      Mes analyses</Text>
      </View>
      <SearchBar
           value={searchQuery}
            onChangeText={handleOnSearchInput}
            containerStyle={{ marginVertical: 15, marginTop:25}}
            />
     
    </View>
    <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('AddAnalyse')}
        >
          <MaterialIcons name="add" size={25} color={brand} />
          <Text style={{ marginLeft: -15, color: darkLight }}> Ajouter</Text>
        </TouchableOpacity>
        </View>
    </View>
    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Totale:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {analyses ? analyses.length : 0}
      </Text>
    </View>

<FlatList
  style={styles.scrollView}
  showsVerticalScrollIndicator={false}
  data={analyses}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AnalyseDetail", {
          selectedAnalyse: item,
        })
      }
    >
      <View style={styles.item} key={index}>
        <View style={styles.analyse}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.dateContainer}>{item.date}</Text>
          
        </View>
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

 
    
  );
};

const styles = StyleSheet.create({
  analyseContainer:{
    paddingTop:40,
    paddingHorizontal:15,
    marginBottom:70,
    opacity:0.9,
    justifyContent:'space-between',

},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:StatusBarHeight -30,
  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: darkLight,
  marginRight:-50,
  marginLeft:10
},
headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:brand

},
backButton: {
  marginRight: 10,
  marginLeft: -9,
},
headingContainer:{
    fontWeight:'700',
    color:brand,
    justifyContent:'space-between',
    

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
    color:brand,
    opacity:1,
    marginTop:10,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:1},
    shadowRadius:2,
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
},
button:{
    width:50,
    borderRadius:100,
    //justifyContent:'space-between',
   
    marginLeft:22,
   // height:50,
    marginTop :55,
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
    alignItems:'center'

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
}) 

export default AnalyseFlatList;
