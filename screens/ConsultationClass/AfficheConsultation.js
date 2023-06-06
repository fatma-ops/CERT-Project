import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState , useEffect, useContext} from 'react';
import { CredentialsContext } from '../../components/CredentialsContext';

import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import styled from 'styled-components';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {FlatList} from 'react-native'
import { SafeAreaView } from 'react-native';


const { brand, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;


const AfficheConsultation = ({ navigation , route }) => {
const { selectedAnalyse } = route.params;
const id = selectedAnalyse._id
const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

const { email } = storedCredentials;

  //console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);

  const [result, setResult] = useState('');

  const [imageModal, setImageModal] = useState(null);



//show Image__________________________________________________________________________
  const handleImageClick = (image) => {
    setImageModal(image);
    setShowModalImage(true);
  };
  
  const closeModal = () => {
    setImageModal(null);
  };
 
  const [consultationImages, setConsultationImages] = useState([]);
//fetching images_____________________________________________________________________
  useEffect(() => {
    fetchConsultationImages();
  }, []);

  const fetchConsultationImages = async () => {
    try {
      const response = await axios.get(`${ngrokLink}consultation/imagesConsultation/${id}`);
      const images = response.data.images;
      setConsultationImages(images);
    } catch (error) {
      console.error('Error fetching analyse images:', error);
    }
  };
    //show modal_______________________________________________________________

  const buttonHandler = (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      handleDelete();
    }
    setModalVisible(false);
  };
  const openModal = () => {
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer cette consultation ?', 'OK', 'Cancel');
  };

  const ShowModal = (type, headerText, message, confirmButtonText, cancelButtonText) => {
    setShowModal(false);
    setModalMessageType(type);
    setHeaderText(headerText);
    setModalMessage(message);
    setConfirmButtonText(confirmButtonText);
    setCancelButtonText(cancelButtonText);
    setModalVisible(true);
  };

 
//Delete_______________________________________________________________________________________________
 const handleDelete = async () => {
      try {
        const response = await fetch(`${ngrokLink}consultation/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
        navigation.navigate('ListeConsultation');
      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };

//Modifier______________________________________________________________________________________________
const handleModify = () => {
    setShowModal(false);
    navigation.navigate('ModifyConsultation' , {objet: selectedAnalyse.objet, type: selectedAnalyse.type, dateConsultation:selectedAnalyse.date, contact: selectedAnalyse.contact , id: selectedAnalyse._id , cout:selectedAnalyse.cout,remboursement: selectedAnalyse.remboursement , ordonnances:consultationImages
    ,traitements: traitements })    
     };
//affiche Traitement__________________________________________________________________
const [traitements, setTraitements] = useState([]);

useEffect(() => {
  const fetchTraitements = async () => {
    try {
      const response = await axios.get(`${ngrokLink}traitement/traitements/${email}/${id}`);
      setTraitements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchTraitements();
}, [email, id]);





    
  return (
    <>
    <View style={styles.header}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="left" size={28} color={brand} />
      </TouchableOpacity>
      {/* Title */}
      <Text style={styles.headerTitle}>Détails consultation</Text>
      {/* More options button */}
      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
        <Entypo name="dots-three-vertical" size={26} color={brand} />
      </TouchableOpacity>
    </View>
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.content}>
            {/* Analyse details */}  
            <Text style={styles.title}>{selectedAnalyse.objet}</Text>
            <View style={styles.heelo}>
              <Text style={styles.sectionItem2}>Type: </Text>
              <Text style={styles.sectionItem}>{selectedAnalyse.type}</Text>
            </View>
            <View style={styles.heelo}>
              <Text style={styles.sectionItem2}>Date:</Text>
              <Text style={styles.sectionItem}>{selectedAnalyse.date}</Text>
            </View>
            <View style={styles.heelo}>
              <Text style={styles.sectionItem2}>Médecin: </Text>
              <Text style={styles.sectionItem}>{selectedAnalyse.contact}</Text>
            </View>
            {/* cout  et remboursement*/}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', marginRight: 70 }}>
                <Text style={styles.sectionItem2}>Coût:</Text>
                <Text style={{ fontSize: 18 }}>{selectedAnalyse.cout}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.sectionItem2}>Remboursement:</Text>
                <Text style={{ fontSize: 18 }}>{selectedAnalyse.remboursement}</Text>
              </View>
            </View>
            {/* Ordonnances */}
            <View style={styles.heelo}>
              <Text style={styles.sectionItem2}>Ordonnance(s): </Text>
            </View>
            <View style={styles.imageContainer}>
              {/* Render ordonnance images */}
              {consultationImages.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
                  <Image
                    source={{ uri: `data:${image.contentType};base64,${image.data}` }}
                    style={styles.thumbnail}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <>
    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
      Traitement(s)
    </Text>
    {traitements.map((traitement, index) => (
  <View style={styles.traitementContainer} key={index}>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', marginRight: 70 }}>
        <Text style={styles.sectionItem2}>Coût:</Text>
        <Text style={{ fontSize: 18 }}>{traitement.cout}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.sectionItem2}>Remboursement:</Text>
        <Text style={{ fontSize: 18 }}>{traitement.remboursement}</Text>
      </View>
    </View>
    {traitement.medicaments && traitement.medicaments.length > 0 ? (
      traitement.medicaments.map((medicament, medicamentIndex) => (
        <View style={styles.medicamentContainer} key={medicamentIndex}>
          <Text style={styles.medicamentTitle}>Médicament {medicamentIndex + 1}</Text>
          <View style={styles.medicamentInfoContainer}>
            <Text style={styles.sectionItem2}>Nom du médicament: </Text>
            <Text style={styles.medicamentInfoText}>{medicament.nommedicament}</Text>
          </View>
          <View style={styles.medicamentInfoContainer}>
            <Text style={styles.sectionItem2}>Date de commencement: </Text>
            <Text style={styles.medicamentInfoText}>{medicament.dateDeCommencement}</Text>
          </View>
          <View style={styles.medicamentInfoContainer}>
                <View style={styles.foisContainer}>
                  <Text style={styles.sectionItem2}>A prendre </Text>
                  <Text style={{ fontSize: 18 ,fontWeight: 'bold', }}>{medicament.nbrfois}</Text>
                  <Text style={styles.sectionItem2}> fois </Text>
                  <Text style={styles.sectionItem2}>pendant </Text>
                  <Text  style={{fontWeight: 'bold' , fontSize: 18}}>{medicament.nbrJours}</Text>
                  <Text style={styles.sectionItem2}>jours</Text>
                </View>
              </View>
</View>
      ))
    ) : (
      <Text>Aucun traitement trouvé</Text>
    )}
  </View>
))}

  </>
          </View>
        </View>
      <MessageModalImage2
      modalVisible={modalVisible} 
      buttonHandler={buttonHandler} 
      type={modalMessageType} 
      headerText={headerText}
      message={modalMessage}
      confirmButtonText={confirmButtonText}
      cancelButtonText={cancelButtonText} 
    />
       
       <Modal visible={showModal} animationType="slide" transparent={true}>
      <ModalPressableContainer onPress={() => setShowModal(false)}>
 
    <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <TouchableOpacity onPress={handleModify}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: '#007AFF',marginBottom:15 }}>  Modifier  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={openModal}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: red ,marginBottom:15, }}>Supprimer  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => setShowModal(false)}>
        <View style={[styles.modalCancelButton]}>
          <Text style={{ color: '#007AFF',marginBottom:15, fontWeight:'bold'}}>Annuler</Text>
        </View>
        </TouchableOpacity>
      </View>

    </View>
    </ModalPressableContainer>

  </Modal>
      {imageModal && imageModal.contentType && imageModal.data && (
  <Modal visible={!!imageModal} animationType="fade" transparent={true}>
    <View style={styles.imageModalContainer}>
      <TouchableOpacity onPress={closeModal} style={styles.imageModalCloseButton}>
        <AntDesign name="close" size={26} color={brand} />
      </TouchableOpacity>
      <Image
        source={{ uri: `data:${imageModal.contentType};base64,${imageModal.data}` }}
        style={styles.imageModal}
      />
    </View>
  </Modal>
)}
    </View>
    </KeyboardAvoidingWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginBottom:00,
    paddingBottom:200,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    //marginBottom:10,
    //margingBottom:700,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomWidth: 0.25,
    borderBottomColor: brand,
    height:60,
    backgroundColor:'white'
   
  
  },
  sectionContent:{
    paddingLeft:10,
    paddingRight:10,
  },
  heelo:{
    //flexDirection:'row',
    borderBottomColor:darkLight,
    borderBottomWidth:0.3,
    paddingBottom:7,
    paddingTop:7,
    paddingRight:20,
    //marginRight:20,
    flexDirection:'column'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    },
  title2: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    marginTop:25,
    },
    sectionItem: {   
      fontSize: 18,
      //marginBottom:5,
      //marginRight:-5,
      paddingLeft:93,
      marginTop:-26, 
      paddingBottom:5
    },
    sectionItem2: {
      fontSize: 18 ,
      //marginLeft:-70, 
      //marginBottom: 5,
      fontWeight: '500',
      //marginTop:5,
      paddingBottom:5,
      color:brand,
    },
        sectionItem3: {   
      fontSize: 18,
      //marginBottom:5,
      //marginRight:-5,
      paddingLeft:45,
      marginTop:-26, 
      paddingBottom:5
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
    //flex: 1,
    backgroundColor:primary,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius:20,
    width: '100%',
    //padding:35,
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 2,},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '30%',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',   
  },
  modalButton: {
    paddingHorizontal:115,
    borderBottomWidth:0.6,
    borderColor:darkLight,
    marginTop:15,
  },
  modalCancelButton: {
    paddingHorizontal: 125,
    marginTop: 15,
  },
  content: {
    flex: 1,
    //alignItems: 'center',
    paddingLeft: 20,
    marginTop:20,
    paddingRight:20,
    //margingBottom:550,
    },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    flexDirection:'row'
    
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  imageModal: {
    width: 400,
    height: 400,
    borderRadius: 10,
  },
  thumbnail: {
    width: 120, // Ajustez la largeur selon vos besoins
    height: 120, // Ajustez la hauteur selon vos besoins
    borderRadius: 6,
    marginHorizontal: 5, // Ajoutez une valeur de marge horizontale
  },

  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  traitementContainer: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
  },
  coutRemboursementContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  coutRemboursementText: {
    fontSize: 18,
  },
  medicamentContainer: {
    marginTop: 10,
  },
  medicamentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  medicamentInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  medicamentInfoText: {
    fontSize: 16,
    marginRight: 10,
  },
  foisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foisText: {
    fontSize: 16,
    marginRight: 5,
  },
  traitementContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  medicamentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  grayCube: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  grayCubeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
});
export default AfficheConsultation
