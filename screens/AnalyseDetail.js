import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import RegularButton3 from '../components/Buttons/RegularButton3';
import { Colors } from '../components/styles';
import { ScrollView } from 'react-native';
import RowContainer from './../components/Containers/RowContainer';

const { brand, darkLight, primary } = Colors;

const AnalyseDetail = ({ route }) => {
  const { selectedAnalyse } = route.params;
  
  return (
   
            <View style={styles.vaccin}>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>{
              <View style={styles.vaccin}>
            <Text style={styles.dateContainer}>{selectedAnalyse.date}</Text>
            <Text >{selectedAnalyse.tile}</Text>

            <View style={styles.actions}>
            <RowContainer style = {{justifycontent: 'space-between'}}>
             <RegularButton3 style={{justifyContent:'center'}}>{ `Supprimer`}</RegularButton3>
             <RegularButton3  style={{justifyContent:'center'}}>{ `Modifier`}</RegularButton3>

             </RowContainer>
            </View>
            </View>}
            </ScrollView>
          </View>
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
          borderRadius:10,
          
        }
        
    })    



export default AnalyseDetail;

