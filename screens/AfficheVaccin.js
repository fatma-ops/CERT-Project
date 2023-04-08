import React, { useState, route } from 'react';
import { Text, View, ScrollView,Image, StyleSheet, Button, Alert } from "react-native";
import { Colors, ExtraView } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { StatusBarHeight } from '../components/shared';
import { useRoute, useNavigation } from '@react-navigation/native';


const { green, brand, darkLight, primary } = Colors;

    const AfficheVaccin = ({ route, navigation, ...props }) => {
       
        const [selectedVaccin, setSelectedVaccin] = useState(route.params.selectedVaccin);      
        /*return (
          <View style={styles.vaccin}>
          
            
            {selectedVaccin.vaccinImage && (
              <Image style={styles.imageContainer} 
                source={{ uri: selectedVaccin.vaccinImage }}
              />
            )}
            <Text style={styles.text} >{selectedVaccin.vaccinName}             {selectedVaccin.vaccinDate}</Text>
          </View>
        );*/
      
      
        const id = route.params.selectedVaccin;
            
        const handleEdit = () => {
          // Navigate to the edit screen and pass the current analyse as a parameter
          navigation.navigate('ModifyVaccin', { selectedVaccin });
        };
      
        const handleDelete = () => {
          // Show an alert to confirm deletion
          Alert.alert(
            'Supprimer le vaccin',
            'Êtes-vous sûr de vouloir supprimer ce vaccin ?',
            [
              { text: 'Annuler', style: 'cancel' },
              {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => {
                    // Filter out the selected vaccine from the vaccines list
                    const updatedVaccins = route.params.vaccins.filter((vaccin) => vaccin.index !== selectedVaccin.index);
          route.params.setVaccins(updatedVaccins);
          setSelectedVaccin(null);
          saveProducts(updatedVaccins);
          navigation.goBack();
                  
                },
                
              },
            ],
            { cancelable: true },
          );
        };
      
        const saveProducts = (products) => {
          // Save the updated products list to local storage
          // You can implement this using AsyncStorage or another local storage solution
        };
      
        if (!selectedVaccin) {
          // If the analyse has been deleted, show a message
          return (
            <View style={styles.container}>
              <Text style={styles.deleted}>Ce vaccin a été supprimé</Text>
            </View>
          );
        }
      
        return (
          //<View style={styles.vaccin}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>{
              <View style={styles.vaccin}>
            <Image style={styles.imageContainer} source={{ uri: selectedVaccin.vaccinImage }} />
            <Text style={styles.text}>{selectedVaccin.vaccinName}</Text>
            <Text style={styles.dateContainer}>{selectedVaccin.vaccinDate}</Text>

            <View style={styles.actions}>
              <Button color={brand} title="Modifier" onPress={handleEdit} />
              <Button color={brand} title="Supprimer" onPress={handleDelete} />
            </View>
            </View>}
            </ScrollView>
          //</View>
        );
      };
      
      const styles = StyleSheet.create({
        actions: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        deleted: {
          fontSize: 20,
          color: '#888',
          textAlign: 'center',
          marginVertical: 20,
        },
     
        vaccinContainer:{
            paddingTop:-4,
            paddingHorizontal:15,
            marginBottom:70,
            //opacity:0.9,
        },
        headingContainer:{
            fontWeight:'700',
            color:brand,
        },
     
    
        scrollView:{
           // marginBottom:100,
        },
        vaccin:{
            width:'100%',
            alignItems:'center',
            marginBottom:100
    
        },
        text:{
          marginTop:15,
            fontWeight:'400',
            fontSize:25,
            alignItems:'center',
        },
        dateContainer:{
          marginTop:10,
          flexDirection:'row',
          justifyContent:'space-between',
          alignContent:'center',
          marginBottom:10,
          fontWeight:'300',
            fontSize:20,
            color:'grey'
      },
        delete:{
            fontWeight:'700',
            fontSize:15
        },
  
        imageContainer:{
          height: 400, 
          width: '90%',
          marginTop:20,
          shadowOpacity:0.25,
          shadowOffset:{width:2, height:1},
          shadowRadius:2,
          elevation:5,
          borderWidth:0,
          borderRadius:3,
        }
        
    }) 
export default AfficheVaccin;