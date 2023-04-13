import React , {useState , useContext , useEffect} from 'react';
import {FlatList, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView , Image} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { Colors, ExtraView } from '../../components/styles';
import SearchBar from '../../components/SearchBar';
import { CredentialsContext } from '../../components/CredentialsContext';
import NotFound from '../../components/NotFound';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBarHeight } from '../../components/shared';
const { green, brand, darkLight, primary } = Colors;


const ListeVaccin = ({ ...props }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVaccins, setFilteredVaccins] = useState(props.vaccins);
  
  useEffect(() => {  
    const x = async() =>{
      
     const y =  await AsyncStorage.getItem('vaccins');
     const storedVaccins = JSON.parse(y) || [];
      setFilteredVaccins(storedVaccins)
    }
   x()
  } , [])

  





  const handleOnSearchInput = (text) => {
  setSearchQuery(text);
    const filtered = props.vaccins.filter(
      (item) =>
        item &&
        item.vaccinName &&
        item.vaccinName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredVaccins(filtered);
  };
  
  
 
  const navigation = useNavigation();
  console.log('filtred vaccins' , filteredVaccins.length)
  console.log(props.vaccins.length)
  return (

    <View style={[styles.vaccinContainer]}>
    <View style={styles.headingContainer}>
      <View style={{width:280}}>
      <StatusBar style="Light" />
    <SearchBar
      value={searchQuery}
      onChangeText={handleOnSearchInput}
      containerStyle={{ marginVertical: 15 }}
    />
    </View>
    <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('Add')}
        >
          <FontAwesome5 name="plus" size={25} color={brand} />
          <Text style={{ marginLeft: -15, color: darkLight }}> Ajouter</Text>
        </TouchableOpacity>
        </View>
    </View>
    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Total:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {props.vaccins ? props.vaccins.length : 0}
      </Text>
    </View>
    {filteredVaccins.length > 0 ? (
    <FlatList

      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      data={filteredVaccins}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => (
        <View style={styles.item} key={index}>
          <View >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Affiche Vaccin', {
                  selectedVaccin: item,
                  
                })
              }
            >
              <View style={styles.vaccin}>
              
                <Text style={styles.text}>{item.vaccinName}</Text>
                <Text style={styles.dateContainer}>{item.vaccinDate}</Text>
                
              </View>
            </TouchableOpacity>
          </View>
        </View> 
      )} 
      
     
    />  ) : !searchQuery
    ? 
      <View style={styles.emptyVaccinContainer}>
        <Text style={styles.emptyVaccinText}>
          Il n'y a pas encore de vaccins.
        </Text>
      </View>
     : (
      
      <View style={styles.container}>
        <MaterialCommunityIcons name='emoticon-sad-outline' size={90} color='black' />
          <Text style={styles.emptyVaccinText}>
          Résultat introuvable
          </Text>
        </View>
      
    )}
  </View>
);

    
}

export const styles = StyleSheet.create({
    vaccinContainer:{
        paddingTop:-4,
        paddingHorizontal:15,
        marginBottom:70,
        opacity:0.9,
        justifyContent:'space-between',

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
        marginTop :25,
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
    vaccin:{
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
    emptyVaccinContainer:{
        alignItems:'center',
        marginTop:140,
    },
    emptyVaccinText:{
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