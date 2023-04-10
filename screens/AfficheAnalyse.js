import React, { useState, route } from 'react';
import { Text, View, ScrollView,Image, StyleSheet, Button, Alert } from "react-native";
import { Colors, ExtraView } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { StatusBarHeight } from '../components/shared';
import { useRoute, useNavigation } from '@react-navigation/native';
import RowContainer from '../components/Containers/RowContainer';
import RegularButton3 from '../components/Buttons/RegularButton3';


const { green, brand, darkLight, primary } = Colors;

    const AfficheAnalyse = ({ route, navigation, ...props }) => {
       
        const [selectedAnalyse, setSelectedAnalyse] = useState(route.params.selectedAnalyse);      
        /*return (
          <View style={styles.analyse}>
          
            
            {selectedAnalyse.analyseImage && (
              <Image style={styles.imageContainer} 
                source={{ uri: selectedAnalyse.analyseImage }}
              />
            )}
            <Text style={styles.text} >{selectedAnalyse.analyseName}             {selectedAnalyse.analyseDate}</Text>
          </View>
        );*/
      
      
        const id = route.params.selectedAnalyse;
            
        const handleEdit = () => {
          // Navigate to the edit screen and pass the current analyse as a parameter
          navigation.navigate('ModifyAnalyse', { selectedAnalyse });
        };
      
        const handleDelete = () => {
          // Show an alert to confirm deletion
          Alert.alert(
            'Supprimer le analyse',
            'Êtes-vous sûr de vouloir supprimer ce analyse ?',
            [
              { text: 'Annuler', style: 'cancel' },
              {
                text: 'Supprimer',
                style: 'destructive',
                onPress: () => {
                    // Filter out the selected analysee from the analysees list
                    const updatedAnalyses = route.params.analyses.filter((analyse) => analyse.index !== selectedAnalyse.index);
          route.params.setAnalyses(updatedAnalyses);
          setSelectedAnalyse(null);
          saveProducts(updatedAnalyses);
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
      
        if (!selectedAnalyse) {
          // If the analyse has been deleted, show a message
          return (
            <View style={styles.container}>
              <Text style={styles.deleted}>Ce analyse a été supprimé</Text>
            </View>
          );
        }
      
        return (
          //<View style={styles.analyse}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>{
              <View style={styles.analyse}>
            <Image style={styles.imageContainer} source={{ uri: selectedAnalyse.analyseImage }} />
            <Text style={styles.text}>{selectedAnalyse.analyseName}</Text>
            <Text style={styles.dateContainer}>{selectedAnalyse.analyseDate}</Text>

            <View style={styles.actions}>
            <RowContainer style = {{justifycontent: 'space-between'}}>
             <RegularButton3 onPress={handleDelete} style={{justifyContent:'center'}}>{ `Supprimer`}</RegularButton3>
             <RegularButton3 onPress={handleEdit} style={{justifyContent:'center'}}>{ `Modifier`}</RegularButton3>

             </RowContainer>
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
     
        analyseContainer:{
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
        analyse:{
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
        }
        
    }) 
export default AfficheAnalyse;