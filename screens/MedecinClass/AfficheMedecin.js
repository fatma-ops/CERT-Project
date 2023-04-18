import React, { useState, route } from 'react';
import { Text, View, ScrollView,Image, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import { ButtonText, Colors, ExtraView, Line, StyledButton } from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { StatusBarHeight } from '../../components/shared';
import { useRoute, useNavigation } from '@react-navigation/native';
import RegularButton from '../../components/Buttons/RegularButton';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import RowContainer from '../../components/Containers/RowContainer';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {  Octicons, AntDesign, Fontisto , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';




const { green, brand, darkLight, primary } = Colors;

    const AfficheMedecin = ({ route, navigation, ...props }) => {
       
        const [selectedMedecin, setSelectedMedecin] = useState(route.params.selectedMedecin);      
        const id = route.params.selectedMedecin;     
        const handleEdit = () => {
          // Navigate to the edit screen and pass the current analyse as a parameter
          navigation.navigate('ModifyMedecin', { selectedMedecin });
        };
        const handleDelete = () => {
          // Show an alert to confirm deletion
          Alert.alert(
            'Supprimer le medecin',
            'Êtes-vous sûr de vouloir supprimer ce medecin ?',
            [
              { text: 'Annuler', style: 'cancel' },
              {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => {
                    // Filter out the selected medecine from the medecines list
                    const updatedMedecins = route.params.medecins.filter((medecin) => medecin.index !== selectedMedecin.index);
          route.params.setMedecins(updatedMedecins);
          setSelectedMedecin(null);
          saveProducts(updatedMedecins);
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
      
        if (!selectedMedecin) {
          // If the analyse has been deleted, show a message
          return (
            <View style={styles.container}>
              <Text style={styles.deleted}>Ce medecin a été supprimé</Text>
            </View>
          );
        }
      
        return (
            <KeyboardAvoidingWrapper>

            <View style={styles.container}>
      <View style={styles.header}>
        <Text></Text>
              </View>
      <View style={styles.body}>
       
        <View style={styles.section}>
        <Text style={styles.sectionTitleP}>{selectedMedecin.medecinName}</Text>

        <TouchableOpacity onPress={handleDelete}>
        <View style={{ marginLeft:260 , marginTop:-55}}>
                                <Entypo name='pencil' size={32} color={brand} />
                            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
        <View style={{ marginLeft:300 , marginTop:-55}}>
                                <Entypo name='trash' size={30} color={brand} />
                            </View>
        </TouchableOpacity>

          <View style={styles.sectionContent}>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Specialite: </Text>
            <Text style={styles.sectionItem}>{selectedMedecin.medecinSpecialite}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Numero: </Text>
            <Text style={styles.sectionItem}>{selectedMedecin.medecinNum}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Adresse: </Text>
            <Text style={styles.sectionItem}>{selectedMedecin.medecinAdresse}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Commentaire: </Text>
            <Text style={styles.sectionItem}>{selectedMedecin.medecinCmnt}</Text>
            </View>
        
          </View>
        </View>
            
            </View>
            </View>
            
            </KeyboardAvoidingWrapper>
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
     
        medecinContainer:{
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
        medecin:{
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
          borderRadius:10,
          
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            marginBottom:60
            
          },
          header: {
            alignItems: 'center',
            justifyContent: 'center',
           
           
          },
          avatar: {
            marginTop: StatusBarHeight + 30,
            width: 200,
            height: 150,
            
          },
          name: {
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 16,
            color:brand
          },
          subtitle: {
            fontSize: 16,
            color: '#666',
            marginTop: 8,
          },
          body: {
            padding: 20,
            marginBottom:300,
            alignItems:'center',
            alignContent:'center',
            marginTop:-40
          },
          button: {
            backgroundColor: brand,
            padding: 10,
            borderRadius: 20,
            marginTop: 10,
          },
          buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          },
          section: {
            marginTop: 20,
            
          },
          sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          sectionTitleP: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20,
            color:brand,
            marginTop:20,
            marginLeft:6
          },
          sectionContent: {
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 20,
            shadowOpacity:0.25,
            shadowOffset:{width:0.5,height:2},
            shadowRadius:1,
          },
          sectionItem: {
            fontSize: 18,
            marginBottom: 5,
           
            
           
          },
          sectionItem2: {
            fontSize: 18,
            marginBottom: 5,
            fontWeight: 'bold',
            
           
          },
         heelo:{
          flexDirection:'row'
         }
        
    }) 
export default AfficheMedecin;