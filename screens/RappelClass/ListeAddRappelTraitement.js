import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import SearchBar from '../../components/SearchBar';
import { ngrokLink } from '../../config';
//const screenHeight = Dimensions.get('window').height;

const { brand, green,red,darkLight, primary,secondary,tertiary } = Colors;
//________________________________________________________________________________
const ListeAddRappelTraitement = ({ navigation }) => {
  const [traitements, setTraitements] = useState([]);
  
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  //const screenHeight = Dimensions.get('window').height;
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
      <View style={[styles.analyseContainer2]}>
        <StatusBar style="white" />
  
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: 'column' }}>
          <View style={styles.header2}>
        <Text style={styles.headerTitle}>                    choisir votre traitement</Text>
      </View>
      <View style={{width:280 , paddingHorizontal:12 }}>            
        <StatusBar style="Light" />
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginLeft: 45, marginTop: 0 }}
              />
            </View>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignContent: 'center', marginTop:5 , paddingHorizontal:12}}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Totale:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {traitements ? traitements.length : 0}
      </Text>
    </View>
  
    <View style={styles.analyseContainer}>
      <View style={styles.item}>
      <FlatList
  style={styles.listContainer}
  contentInset={{ bottom: 400 }}
  data={traitements}
  keyExtractor={(item, index) => String(index)}
  renderItem={({ item }) => (
   
      <View style={styles.treatmentContainer}>
        <Text style={styles.treatmentTitle}>Traitement {item.id}</Text>
        {item.traitements && item.traitements.length > 0 ? (
          item.traitements.map((sousTraitement, sousTraitementIndex) => (
            <TouchableOpacity
              key={sousTraitementIndex}
              onPress={() => {
                navigation.navigate("AddRappel", {
                  selectedTraitement: sousTraitement,
                })              }}
              style={styles.subTreatmentContainer}
            >
              <Text style={styles.subTreatmentTitle}>
                Sous Traitement {sousTraitementIndex + 1}
              </Text>
              <Text style={styles.title}>
                {sousTraitement.medicament}
              </Text>
              
              <Text style={styles.date}>
                 {sousTraitement.dateDeCommencement}
              </Text>
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
      </View>
    );
  };

const styles = StyleSheet.create({
  analyseContainer:{
    paddingTop:20,
    paddingHorizontal:0,
    marginBottom:100,
    opacity:0.9,
    justifyContent:'space-between',
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
   //borderColor:secondary

},
analyseContainer2:{
 
  marginBottom: 10,
  borderRadius: 8,
  opacity:1,
  justifyContent:'space-between',
backgroundColor:brand,
},
header2: {
  alignItems: 'center',
  justifyContent: 'center', // To center the header
  marginHorizontal:-10 , // To remove the left and right padding
  paddingHorizontal: 10, // To add the padding back
  marginTop:StatusBarHeight
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:StatusBarHeight - 30,

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

text:{
  marginTop:15,
   // fontWeight:'400',
    fontSize:20,
},
text2:{
 marginTop:5,
    fontSize:15,
    color:brand,
},

item:{ 
  marginTop:-20,
    marginLeft:10,
    marginRight:10,
    //alignItems:'center',
    marginBottom:15,
},

index:{
    fontSize:20,
    fontWeight:'800',
    color:brand
},

listItemTitle: {
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 5,
},
headingContainer2:{
  fontWeight:'700',
  color:brand,
  justifyContent:'space-between',
  

}, treatmentContainer: {
  marginBottom: 20,
},
headingContainer:{
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
  backgroundColor:brand,
   height:110,
   //marginTop:20,
   
   
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


container: {

  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.5,
  marginTop:StatusBarHeight 

},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

textContainer: {
  flex: 1,
  marginBottom:9 ,
  marginTop:7,
  //flexDirection: 'row',

},
title: {
  //fontWeight: '500',
  fontSize: 22,
  //color:brand,
  //marginBottom: -5,
  marginLeft:40,

},
fois:{
    //marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    marginLeft:250,
   marginTop:-10 ,
   //color: brand,
   //fontWeight: 'bold',
   fontSize:18,

  },
  dateContainer:{
    //marginTop:10,
    //flexDirection:'row',
    //justifyContent:'space-between',
    //alignContent:'center',
    marginLeft:40,
   marginTop:-5,
   color: brand,
   fontWeight: '500',
   //marginBottom:10,

  },
date: {
  fontSize: 18 ,
  color: 'gray',
  //marginRight:10,
},
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  
  
  treatmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTreatmentContainer: {
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
  subTreatmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTreatmentText: {
    fontSize: 14,
    marginBottom: 2,
  },



}) 

export default ListeAddRappelTraitement;