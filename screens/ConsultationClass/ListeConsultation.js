import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { ngrokLink } from '../../config';

const { brand, darkLight, primary,secondary,tertiary } = Colors;

const ListeConsultation = ({ navigation }) => {

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  
  const [consultations, setConsultations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const handleOnSearchInput = (text) => {
    setSearchQuery(text);
      const filtered = consultations.filter(
        (item) =>
          item &&
          item.type &&
          item.type.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredConsultations(filtered);
    };

  //Affiche les consultation enregistré dana la base de donnés____________________________________________________  
  useEffect(() => {
    axios.get(`${ngrokLink}/api/v1/consultation/${email}?cache_bust=123456789`)
      .then(response => setConsultations(response.data))
      .catch(error => console.log(error));
  }, [email]);

  
//JSX_____________________________________________________________________________________________________________
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
          <Text style={styles.headerTitle}>Mes consultation </Text></View>
       </View>
      <View style={{width:280 , paddingHorizontal:12 , height:170 }}>
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
          onPress={() => navigation.navigate('AddConsultation')}
        >
          <MaterialIcons name="add" size={25} color='white' />
          <Text style={{ marginLeft: -15, color: 'white' }}> Ajouter</Text>
        </TouchableOpacity>
        </View>

    </View>

    <View style={{ flexDirection: 'row', alignContent: 'center', marginTop:5 , paddingHorizontal:12}}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Totale:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {consultations ? consultations.length : 0}
      </Text>
    </View>
  
    <View style={styles.analyseContainer}>
      <View style={styles.item}>
<FlatList
  style={styles.scrollView}
  showsVerticalScrollIndicator={false}
  data={consultations}
  //contentInset={{ bottom:700 }}

  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AfficheConsultation", {
          selectedAnalyse: item,
        })
      }
    >
      <View  key={index}>
      <View style={styles.liste}>

          <Text style={styles.text}>{item.type}</Text>
          <Text style={styles.dateContainer}>{item.date}</Text> 
          <Text style={styles.text2}>{item.contact}</Text>
          </View>
      </View>
    
    
    </TouchableOpacity>
  )}
/>

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
    height:1000,

},
analyseContainer2:{
  
  marginBottom:70,
  opacity:1,
  justifyContent:'space-between',
  height:1000,


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
  marginLeft:70
  

},
backButton: {
 
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


divider:{
    width:'100%',
    height:2,
    marginTop:5,
    marginBottom:5,
},
dateContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  marginLeft:-50,
  marginTop:-56,
  fontWeight:'bold',
  //color:darkLight
},
text:{
  marginTop:15,
   // fontWeight:'400',
    fontSize:20,
    paddingHorizontal:12
},
text2:{
 marginTop:40,
    fontSize:15,
    color:brand,
    paddingHorizontal:12

},
item:{ 
  marginTop:-1,
    marginLeft:20,
    marginRight:10,
    //alignItems:'center',
    borderLeftWidth: 2,
    borderLeftColor: brand,
    //marginBottom:20
    //backgroundColor:brand,
},
liste:{
  
  fontSize:19,
  fontWeight:'600',
  opacity:0.8,
  marginTop:20,
  marginBottom:10,
  shadowOpacity:0.25,
  shadowOffset:{width:0.75, height:2},
  shadowRadius:2,
  elevation:5,
  backgroundColor:'white',
  borderRadius:15,
  marginLeft:55,
  marginRight:15,
  height:70,

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
   
    marginLeft:-60,
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
  paddingBottom:20,
},
analyse:{
    //flexDirection:'row',
    width:'100%',
    color:'black',
    fontWeight:'bold',
    alignItems:'center',
    backgroundColor:{brand}

},


delete:{
    fontWeight:'700',
    fontSize:15
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

export default ListeConsultation;