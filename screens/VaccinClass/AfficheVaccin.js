import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage from '../../components/Modals/MessageModalImage';
import axios from 'axios';
import { ngrokLink } from '../../config';

const { brand, darkLight, primary, red, tertiary,secondary } = Colors;

const AfficheVaccin = ({ navigation , route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
  console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [result, setResult] = useState('');


  const buttonHandler = () => {
    if(modalMessageType === 'success'){
        handleDelete();
    }else  if(modalMessageType === 'close'){
    }
    
        setModalVisible(false);
    };

    
  
    const openModal = () => {
      ShowModal('success', "Confirmation", "Êtes-vous sûr de supprimer ce contact?",'ok');
      ShowModal('close', "Confirmation", "Êtes-vous sûr de supprimer ce contact?", 'OK');

    }
   
    const openModalClose = () => {
      ShowModal('close', "Confirmation", "Êtes-vous sûr de supprimer ce contact?", 'OK');
    }

    const handleDelete = async () => {
      setShowModal(false);
      try {
        const response = await fetch(`${ngrokLink}/api/v1/vaccin/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
        navigation.navigate('ListeVaccin');

      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };
    const handleModify = () => {
      setShowModal(false);
      navigation.navigate('ModifyVaccin' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})   
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
        <Text style={styles.headerTitle}>            Détails du vaccin    </Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      
      
      </View>
      <View style={styles.content}>
        <View style={styles.sectionContent}>
            <Text style={styles.title}>{selectedAnalyse.title}</Text>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Maladie ciblée: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.maladieCible}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Date: </Text>
            <Text style={styles.sectionItem}> {selectedAnalyse.date}</Text>
            </View>          
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Commenataire: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.commentaire}</Text>
            </View>
          </View>
         
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate('ModifyVaccin' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})} style={styles.editButton}>
            <Entypo name="edit" size={24} color={brand} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={openModal} style={styles.deleteButton}>
            <AntDesign name="delete" size={24} color={red} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={showModal} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Button title="Modify" onPress={handleModify} />
        <Button title="Delete" onPress={openModal} />
        <Button title="Cancel" onPress={() => setShowModal(false)} />
      </View>
    </View>
  </Modal>
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
  heelo:{
    flexDirection:'row',
    borderBottomColor:secondary,
    borderBottomWidth:1,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomLarge:9,
    marginTop:10,
    marginLeft:20,
    marginBottom:10,
    alignContent:'center'
   },
   title: {
    //fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  sectionItem: {
    fontSize: 18,
    marginBottom: 15,
    alignItems:'center',
  },
  sectionItem2: {
    fontSize: 18,
   // marginLeft:-70,
   marginBottom: 15,
    //fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
  content: {
    flex: 1,
    //alignItems: 'center',
    padding: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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

});

export default AfficheVaccin
