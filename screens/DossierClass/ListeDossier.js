import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet,screenHeight } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import { ngrokLink } from '../../config';
import { Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { brand, darkLight, primary,secondary,tertiary } = Colors;
 
const ListeDossier = ({ navigation }) => {
  const [dossier, setDossier] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  //const screenHeight = Dimensions.get('window').height;

  const { email } = storedCredentials;

  const handleDelete = async () => {
    try {
      const response = await fetch(`${ngrokLink}/api/v1/dossier/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setResult(data);
      //navigation.navigate('ListeVaccin');

    } catch (err) {
      console.error(err);
      setResult('Erreur');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRappels, setFilteredRappels] = useState([]);
  
  useEffect(() => {
    axios.get(`${ngrokLink}/api/v1/dossier/${email}?cache_bust=123456789`)
      .then(response => setDossier(response.data))
      .catch(error => console.log(error));
  }, [email]);

  return (
    

    <View style={[styles.analyseContainer2]}>
                    <StatusBar style="white" />
        <View style={styles.headingContainer}>
        <Text style={styles.headerTitle}>Mes dossiers</Text>
    </View>

    <FlatList
  style={styles.item}
  data={dossier}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <View style={{flexDirection:'row',marginTop:2,marginRight:-135,justifyContent: 'flex-end',}}>
          <TouchableOpacity
            onPress={() => handleUpdate(index)}
            style={[
              styles.updateButton,
              { transform: [{ translateX: dragX }] },
            ]}
          >
            <MaterialIcons name="edit" size={37} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(index)}
            style={[
              styles.deleteButton,
              { transform: [{ translateX: dragX }] },
            ]}
          >
            <MaterialIcons name="delete" size={37} color='white'/>
          </TouchableOpacity>
        </View>
      )}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UpdateDossier", {
            selectedDossier: item,
          })
        }
        style={styles.liste}
      >
        <View style={styles.itemContainer}>
          <Image
            source={require('../../assets/img/dossier.png')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}></Text>
          </View>
          
        </View>
        
      </TouchableOpacity>
    </Swipeable>
    
  )}
/>







</View>

  );

};

const styles = StyleSheet.create({
  analyseContainer:{
    paddingTop:10,
    paddingHorizontal:0,
    marginBottom:100,
    opacity:0.9,
    justifyContent:'space-between',
    //backgroundColor:'white',
    height:1000,

},
analyseContainer2:{

  //marginBottom:70,
  //opacity:1,
  //justifyContent:'space-between',
  //height:1000
},
header2: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // To center the header
  marginHorizontal:-10 , // To remove the left and right padding
  paddingHorizontal: 10, // To add the padding back
  marginTop:StatusBarHeight ,

},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:StatusBarHeight +30,

  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: darkLight,

  marginRight:-50,
  marginLeft:10,
},
headerTitle: {
  fontWeight: '500',
  fontSize: 35,
  color:'white',
  marginLeft:90,
  // alignContent :'center'
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
dateContainer:{
  //marginTop:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  marginLeft:200,
  marginTop:-20,
},
text:{
  marginTop:15,
   // fontWeight:'400',
    fontSize:20,
},
text2:{
 marginTop:5,
    fontSize:20,
    color:brand,
},
date: {
    fontSize: 16,
    color: 'gray',
    //marginLeft:60,
  //marginTop:-25
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop:5,
    
  },
item:{ 
  marginTop:-5,
    //marginLeft:20,
    marginRight:-5,
    //alignItems:'center',
    marginBottom:15,
    //width:350,
    padding:10,
    //backgroundColor:'red'
},
liste:{
  fontSize:19,
  //fontWeight:'600',
  opacity:0.8,
  marginTop:15,
  shadowOpacity:0.25,
  shadowOffset:{width:0.75, height:2},
  shadowRadius:2,
  elevation:5,
  backgroundColor:'white',
  borderRadius:15,
  marginLeft:20,
  marginRight:15 ,
  marginBottom:5,
  height:90,
  //backgroundColor:brand
},
index:{
    fontSize:20,
    fontWeight:'800',
    color:brand
},
headingContainer2:{
  fontWeight:'700',
  color:brand,
  ///justifyContent:'space-between',
  alignItems :'center'


},
headingContainer:{
   flexDirection:'row',
   //justifyContent:'space-between',
   alignItems :'center',
   backgroundColor:brand,
   height:120,
   borderBottomLeftRadius:30, 
   borderBottomRightRadius:30, 
   borderTopLeftRadius:30, 
   borderTopRightRadius:30,
   marginTop:20,  
   margin:0.5,

   
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
    marginBottom:10,
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
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  color:'white',
  padding:20,
},
image: {
  width: 50, // Adjust the width as needed
  height: 50, // Adjust the height as needed
  marginRight: 10, // Adjust the margin as needed
  resizeMode: 'contain', 
  marginLeft:10, 
},
textContainer: {
  flex: 1,
  marginBottom:10 ,
  marginTop:10,
  backgroundColor:'white'

},
deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20,
    //paddingRight: 20,
    height: '82%',
    width:'27%',
    //margingleft:900,
    //marginRight:2,
    marginTop:15,
    //marginBottom:15,
    borderRadius:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:1},
    shadowRadius:2,
    elevation:5,
  },
  updateButton: {
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    paddingLeft: 20,
    //paddingRight: 20,
    height: '82%',
    width:'27%',
    //margingleft:-90,
    marginRight:2,
    marginTop:15,
    //marginBottom:15,
    borderRadius:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:1},
    shadowRadius:2,
    elevation:5,
  },

}) 

export default ListeDossier;