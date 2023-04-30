import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage from '../../components/Modals/MessageModalImage';
import axios from 'axios';
const { brand, darkLight, primary, red, tertiary,secondary } = Colors;

const AfficheMedecin = ({ navigation , route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
  console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');

  const [result, setResult] = useState('');


  const buttonHandler = () => {
    if(modalMessageType === 'success'){
        handleDelete();
        navigation.navigate('ListeMedecin');
    }else  if(modalMessageType === 'close'){
      navigation.navigate('AfficheMedecin');
    }
    
        setModalVisible(false);
    };

    
  
    const openModal = () => {
      ShowModal('success', "Confirmation", "Êtes-vous sûr de supprimer ce contact?", 'OK');
    }
    const openModalClose = () => {
      ShowModal('close', "Confirmation", "Êtes-vous sûr de supprimer ce contact?", 'OK');
    }

    const handleDelete = async () => {
      try {
        const response = await fetch(`https://ffdc-102-159-72-228.eu.ngrok.io/api/v1/medecin/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };

    const ShowModal = (type , headerText , message , buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
        }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>         Détails du médecin</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={require('../../assets/img/user.png')} style={styles.doctorImage} />
        <View style={styles.infoContainer}>
        <View style={styles.sectionContent}>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Nom du medecin: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.nom}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Spécialité: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.specialite}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Adresse: </Text>
            <Text style={styles.sectionItem}> {selectedAnalyse.adresse}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Numero: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.numero}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Commenataire: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.commentaire}</Text>
            </View>
          </View>
         
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate('ModifyMedecin' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})} style={styles.editButton}>
            <Entypo name="edit" size={24} color={brand} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={openModal} style={styles.deleteButton}>
            <AntDesign name="delete" size={24} color={red} />
          </TouchableOpacity>
        </View>
      </View>

      <MessageModalImage 
                            modalVisible={modalVisible} 
                            buttonHandler = {buttonHandler} 
                            type = {modalMessageType} 
                            headerText = {headerText}
                            message={modalMessage}
                            buttonText={buttonText} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkLight,
  },
  sectionItem: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionItem2: {
    fontSize: 18,
   // marginLeft:-70,
   marginBottom: 5,
    fontWeight: 'bold',
    color:brand
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  moreButton: {
    padding: 10,
    marginLeft:40,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color:brand,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
  },
  specialite: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  adresse: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  numero: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  commentaire: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: red,
  },
  heelo:{
    flexDirection:'row',
    borderBottomColor:secondary,
    borderBottomWidth:2,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomLarge:9,
    marginTop:20,
    marginLeft:-5,
    marginBottom:15,
   }
});

export default AfficheMedecin
