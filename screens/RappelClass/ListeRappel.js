import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
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
import { ngrokLink } from '../../config';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { brand, darkLight, primary,secondary,tertiary } = Colors;

const ListeRappel = ({ navigation }) => {
  const [rappels, setRappels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  //const screenHeight = Dimensions.get('window').height;
  const [result, setResult] = useState('');

  const { email } = storedCredentials;

  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${ngrokLink}rappel/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setIsLoading(false);

      setResult(data);
      navigation.navigate('ListeRappel');
 
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setResult('Erreur');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRappels, setFilteredRappels] = useState(rappels);

  const handleOnSearchInput = (text) => {
    setSearchQuery(text);
  
    if (text.trim() === '') {
      setFilteredRappels(rappels);
    } else {
      const filtered = rappels.filter(
        (item) =>
          item &&
          item.nommedicament &&
          item.nommedicament.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRappels(filtered);
    }
  };
  
  
    
  
  
  
  





  useEffect(() => {
    axios.get(`${ngrokLink}rappel/${email}?cache_bust=123456789`)
      .then(response => setRappels(response.data))
      .catch(error => console.log(error));
  }, [email]);

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${twoDigits(hours)}:${twoDigits(minutes)}`;
  }function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convertit 0 en 12 (format 12 heures)
    return `${twoDigits(hours)}:${twoDigits(minutes)} ${ampm}`;
  }
  
  
  function twoDigits(value) {
    return value.toString().padStart(2, '0');
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
 
    <View style={[styles.analyseContainer2]}>
                    <StatusBar style="white" />

                    <View style={styles.headingContainer}>
<View style ={{flexDirection:'column'}}>
<View style={styles.header2}>
<View>
<Text style={styles.headerTitle}>Mes rappels</Text></View>
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
onPress={() => navigation.navigate('AddRappel')}
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
      {rappels ? rappels.length : 0}
      </Text>
    </View>

    {isLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (

  <FlatList
  style={styles.item}
  data={searchQuery ? filteredRappels : rappels}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item, index }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          style={[
            styles.deleteButton,
            { transform: [{ translateX: dragX }] },
          ]}
        >
          <MaterialIcons name="delete" size={37} color='white'/>
        </TouchableOpacity>
      )} 
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UpdateRappel", {
            selectedRappel: item,
          })
        }
        style={styles.liste}
      >
        <View style={styles.itemContainer}>
          <Image
            source={require('../../assets/img/clock.jpg')}
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.text2}>{item.nommedicament}</Text>
            <Text style={styles.title}>{formatTime(item.morningDateTime)}-{formatTime(item.noonDateTime)}-{formatTime(item.eveningDateTime)}</Text>
            <Text style={styles.date}>{formatDate(item.startDate)}</Text>

          </View>
        </View>
        
      </TouchableOpacity>
      
    </Swipeable>
    
  )}
/>  
 )}








</View>
    </GestureHandlerRootView>

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
paddingLeft: 10,
backgroundColor:brand,
marginTop:90,
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
  fontWeight: 'bold',
  fontSize: 20,
  color:'white',
alignSelf:'center',
justifyContent:'center',
marginLeft:130
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
  title2: {
    fontSize: 16,
    marginBottom: 5,
    marginTop:5,
    
  },
item:{ 
  marginTop:-5,
   borderRadius:10,
    //alignItems:'center',
    marginBottom:15,
},
liste:{
  fontSize:19,
  fontWeight:'600',
  opacity:0.8,
  marginTop:15,
  shadowOpacity:0.25,
  shadowOffset:{width:0.75, height:2},
  shadowRadius:2,
  elevation:5,
  backgroundColor:'white',
  borderRadius:5,
  marginLeft:25,
  marginRight:25,
  marginBottom:5
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
    paddingLeft: 12,
    paddingRight: 20,
    height: '84%',
    width:'30%',
    //margingleft:900,
    marginRight:-86,
    marginTop:15,
    //marginBottom:15,
    borderRadius:5,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:2},
    shadowRadius:2,
    elevation:5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}) 

export default ListeRappel;