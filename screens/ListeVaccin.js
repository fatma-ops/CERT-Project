import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView , Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

const ListeVaccin = ({ ...props }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.vaccinContainer]}>
      <View style={styles.headingContainer}>
        <View style={{ flexDirection: 'row' }}>
          
          <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Add')} >
             <FontAwesome5 name='plus' size={25} color='black' />
             <Text style={{ marginLeft: 10 }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: '700', fontSize: 18, color: "black" }}>
          Total:
        </Text>
        <Text style={{ fontWeight: '700', fontSize: 18, color: "black" }}>
          {props.vaccins ? props.vaccins.length : 0}
        </Text>
      </View>
      

  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {
          !props.vaccins || props.vaccins.length === 0
            ? (
              <View style={styles.emptyVaccinContainer}>
                <Text style={styles.emptyVaccinText}>There are no notes yet</Text>
              </View>
            ) : (
              props.vaccins.map((item, index) =>
                <View style={styles.item} key={index}>
                  
                  <View style={styles.vaccin}>
                  <TouchableOpacity
        onPress={() => navigation.navigate('Affiche Vaccin', { selectedVaccin: item })}>
             <Text style={styles.text}>{index + 1}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vaccin}>{item.vaccinName}</Text>
                      <Text style={styles.vaccin}>{item.vaccinDate}</Text>
                      {item.vaccinImage && (
              <Image
                source={{ uri: item.vaccinImage }}
                style={{ height: 200, width: '100%' }}
              />
            )}

                    </View>
      </TouchableOpacity>
                 
                  </View>
                </View>
              )
            )
        }
      </ScrollView>



     


    </View>
  )
}

export const styles = StyleSheet.create({
    vaccinContainer:{
        paddingTop:10,
        paddingHorizontal:20,
        marginBottom:70,
        opacity:0.9,
    },
    headingContainer:{
        fontWeight:'700',
        color:'blue',
    },
    divider:{
        width:'100%',
        height:2,
        marginTop:5,
        marginBottom:5,
    },
    item:{ 
        marginBottom:20,
        padding:15,
        color:'balck',
        opacity:0.8,
        marginTop:10,
        shadowOpacity:0.5,
        shadowOffset:{width:0, height:4},
        shadowRadius:8,
        elevation:5,
        backgroundColor:'white',
        borderWidth:2,
        borderRadius:5,
        borderLeftWidth:15,

    },
    index:{
        fontSize:20,
        fontWeight:'800',
    },
    headingContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    button:{
        width:50,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        height:50
    },
    buttonText:{
        color:'white',
        fontSize:32,
        fontWeight:'800'
    },
    scrollView:{
        marginBottom:70,
    },
    vaccin:{
        flexDirection:'row',
        width:'75%',
        color:'black',
        fontWeight:'bold',
    },
    text:{
        fontWeight:'700',
        fontSize:17,
       
       // alignItems:'center',
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
        color:'black',
        fontWeight:'600',
        opacity:0.8,
        marginTop:0.4,
        shadowOpacity:0.5,
        shadowOffset:{width:0, height:4},
        shadowRadius:8,
        elevation:5,
        backgroundColor:'white',
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
        color:'white',
        fontWeight:'700',
        fontSize:12,
    },
    emptyVaccinContainer:{
        alignItems:'center',
        marginTop:240,
    },
    emptyVaccinText:{
        fontWeight:'600',
        fontSize:15,
    },
    dateContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    },
}) 
export default ListeVaccin;