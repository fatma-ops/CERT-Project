import React , {useState , useContext,useEffect} from 'react';
import {FlatList, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView , Image} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { Colors, ExtraView } from '../../components/styles';
import SearchBar from '../../components/SearchBar';
import { CredentialsContext } from '../../components/CredentialsContext';
import NotFound from '../../components/NotFound';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBarHeight } from '../../components/shared';
const { green, brand, darkLight, primary } = Colors;


const ListeMedecin = ({ ...props }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedecins, setFilteredMedecins] = useState([]);
  
  const handleOnSearchInput = (text) => {

  setSearchQuery(text);
    const filtered = props.medecins.filter(
      (item) =>
        item &&
        item.medecinName &&
        item.medecinName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMedecins(filtered);
  };
  
  useEffect(() => {  
    const x = async() =>{
      
     const y =  await AsyncStorage.getItem('medecins');
     const storedMedecins = JSON.parse(y) || [];
      setFilteredMedecins(storedMedecins)
    }
   x()
  } , [])

 //AsyncStorage.removeItem('medecins');



  const navigation = useNavigation();
  return (
    <View >

    <View style={[styles.medecinContainer]}>
   

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
          onPress={() => navigation.navigate('Add Medecin')}
        >
          <MaterialIcons name="add" size={30} color={brand} />
          <Text style={{ marginLeft: -10, color: darkLight }}> Ajouter</Text>
        </TouchableOpacity>
        </View>
    </View>
    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
        Total:
      </Text>
      <Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
        {props.medecins ? props.medecins.length : 0}
      </Text>
    </View>
    {filteredMedecins.length > 0 ? (
    <FlatList

      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      data={filteredMedecins}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => (
        <View style={styles.item} key={index}>
          <View >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Affiche Medecin', {
                  selectedMedecin: item,
                  
                })
              }
            >
              <View style={styles.medecin}>
              
                <Text style={styles.index}>{item.medecinName}</Text>
                <Text style={styles.text}>{item.medecinSpecialite}</Text>

              </View>
            </TouchableOpacity>
          </View>
        </View> 
      )} 
      
      
    />  ) : !searchQuery 
    ?
   
      <View style={styles.emptyMedecinContainer}>
        <Text style={styles.emptyMedecinText}>
          Il n'y a pas encore de medecin.
        </Text>
      </View>
    
     :(
      
      <View style={styles.container}>
        <MaterialCommunityIcons name='emoticon-sad-outline' size={90} color='black' />
          <Text style={styles.emptyMedecinText}>
          Résultat introuvable
          </Text>
        </View>
      
    )}
  </View>
  </View>
);

    
}

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      marginBottom:60
      
    },
    medecinContainer:{
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
        marginBottom:10,
        padding:15,
        color:brand,
        opacity:1,
        marginTop:10,
        shadowOpacity:0.25,
        shadowOffset:{width:0.5,height:2},
        shadowRadius:1,
        elevation:5,
        backgroundColor:'white',
        borderWidth:0,
        borderRadius:10,
        

    },
    index:{
        fontSize:17,
        fontWeight:'400',
        color:brand

    },
    text:{
      //marginTop:25,
        fontWeight:'400',
        fontSize:15,
    },
    headingContainer:{
        flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
    },
    button:{
      marginLeft:22,
      height:40,
       marginTop :StatusBarHeight -10,
    },
    buttonText:{
        color:brand,
        fontSize:32,
        fontWeight:'800'
    },
    scrollView:{
        marginBottom:70,
    },
    medecin:{
        //flexDirection:'row',
        width:'100%',
        color:'black',
        fontWeight:'bold',

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
    emptyMedecinContainer:{
        alignItems:'center',
        marginTop:140,
    },
    emptyMedecinText:{
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
export default ListeMedecin;