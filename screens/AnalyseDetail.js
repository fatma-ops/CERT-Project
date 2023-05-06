import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import RegularButton3 from '../components/Buttons/RegularButton3';
import { Colors } from '../components/styles';
import { ScrollView } from 'react-native';
import RowContainer from './../components/Containers/RowContainer';
import { ngrokLink } from '../config';
const { brand, darkLight, primary } = Colors;

const AnalyseDetail = ({ route }) => {
  const { selectedAnalyse } = route.params;
  
  return (

    <View style={styles.container}> 
    <View style={{
      backgroundColor: brand,
      height: '30%',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>  
        
          <Text style={styles.titre}>{selectedAnalyse.title}</Text>
          </View> 
          <View style={styles.header}>
        <Text style={styles.resultat}>Date: {selectedAnalyse.date}</Text>
        <Text style={styles.resultat}>Contact: {selectedAnalyse.contact}</Text>
        <Text style={styles.resultat}>Commentaire: {selectedAnalyse.commentaire}</Text>

      </View>
      <Text style={styles.resultat}>Résultat d'analyse</Text>

      <View style={styles.imageContainer}>

        <Image source={require('../assets/img/logo3.png')} style={styles.image} />
      </View>
    </View>
  );
  
      };
      
      const styles = StyleSheet.create({
        container: {
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          marginBottom: 16,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        header: {
          padding: 16,
          borderBottomColor: '#CCCCCC',
          borderBottomWidth: 1,
        },
        barreBleue: {
          backgroundColor: brand,
          padding: 8,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          marginBottom: 8,
        },
        titre: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        date: {
          fontSize: 16,
          color: '#555555',
          marginBottom: 8,
        },
        contact: {
          fontSize: 16,
          color: '#555555',
          marginBottom: 8,
        },
        imageContainer: {
          padding: 16,
        },
        image: {
          width: '100%',
          height: 200,
          borderRadius: 8,
          marginTop: 30,
        },
        resultat: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#555555',
        },
      });


export default AnalyseDetail;

