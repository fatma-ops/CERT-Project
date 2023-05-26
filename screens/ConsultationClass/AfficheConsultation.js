import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../components/styles';
import { useState , useEffect } from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ScreenWidth } from '../../components/shared';
const { brand, darkLight, primary, red, tertiary,secondary } = Colors;

const AfficheConsultation = ({ navigation, route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id

  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState('');
  const [imageModal, setImageModal] = useState(null);


  const [imageData, setImageData] = useState(null);
  const handleImageClick = (image) => {
    setImageModal(image);
    setShowModalImage(true);
  };


  useEffect(() => {
    fetchImageData();
  }, []);

  const fetchImageData = async () => {
    try {
      const response = await axios.get(`${ngrokLink}/api/v1/consultation/imageConsultation/${id}`);
      setImageData(response.data);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };
  const buttonHandler = async (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      setIsLoading(true); // Mettre isLoading à true pour afficher l'indicateur de chargement
      await handleDelete();
      setIsLoading(false); // Mettre isLoading à false après la fin du chargement
    }
    setModalVisible(false);
  };
  
  
  
  const openModal = () => {
    if (!isLoading) {
      ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer cette consultation ?', 'OK', 'Cancel');
    }
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
  const handleDelete = async () => {
    try {
      setIsLoading(true); // Mettre isLoading à true pour afficher l'indicateur de chargement
  
      const response = await fetch(`${ngrokLink}/api/v1/consultation/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setResult(data);
      
      setIsLoading(false); // Mettre isLoading à false après la fin du chargement
  
      navigation.navigate('ListeConsultation');
    } catch (err) {
      console.error(err);
      setResult('Erreur');
      setIsLoading(false); // Mettre isLoading à false en cas d'erreur
    }
  };
  
const handleModify = () => {
    setShowModal(false);
    navigation.navigate('ModifyConsultation' , {objet: selectedAnalyse.objet, type: selectedAnalyse.type, dateConsultation:selectedAnalyse.date, contact: selectedAnalyse.contact , id: selectedAnalyse._id , cout:selectedAnalyse.cout,remboursement: selectedAnalyse.remboursement , ordonnanceData: imageData})   
     };

     const closeModal = () => {
      setShowModalImage(false);
    };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de la Consultation</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingWrapper>

      <View style={styles.content}>
        <View style={styles.section}>
        <Text style={styles.title}>{selectedAnalyse.objet}</Text>

          <Text style={styles.title}> type :{selectedAnalyse.type}</Text>
          <Text style={styles.subTitle}>Date: {selectedAnalyse.date}</Text>
          <Text style={styles.subTitle}>Contact: {selectedAnalyse.contact}</Text>
          <Text style={styles.subTitle}>Cout: {selectedAnalyse.cout}</Text>
          <Text style={styles.subTitle}>remboursement: {selectedAnalyse.remboursement}</Text>


          {imageData && imageData.ordonnance.contentType && imageData.ordonnance.data && (
            <TouchableOpacity onPress={() => handleImageClick(imageData)}>
              <Image
                source={{ uri: `data:${imageData.ordonnance.contentType};base64,${imageData.ordonnance.data}` }}
                style={{ width: 300, height: 300, marginTop: 15 }}
              />
            </TouchableOpacity>
          )}

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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleModify}>
              <View style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Modifier</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>
  <View style={styles.modalButton}>
    {isLoading ? (
      <ActivityIndicator size="small" color={brand} />
    ) : (
      <Text style={[styles.modalButtonText, { color: 'red' }]}>Supprimer</Text>
    )}
  </View>
</TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View style={styles.modalCancelButton}>
                <Text style={styles.modalCancelButtonText}>Annuler</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {imageData && imageData.ordonnance.contentType && imageData.ordonnance.data && (
        <Modal visible={showModalImage} animationType="fade" transparent={true}>
          <View style={styles.imageModalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.imageModalCloseButton}>
              <AntDesign name="close" size={26} color={brand} />
            </TouchableOpacity>
            <Image source={{ uri: `data:${imageData.ordonnance.contentType};base64,${imageData.ordonnance.data}` }} style={styles.imageModal} />
          </View>
        </Modal>
      )}
    </KeyboardAvoidingWrapper>

    </>
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
    //justifyContent:'space-between',
    marginTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.25,
    borderBottomColor: darkLight,
    marginLeft: -25,
    marginRight: -25,

  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: brand,
    alignItems:'center'

  },
  backButton: {
    marginRight: 40,
    marginLeft: ScreenWidth - 350,
  },
  moreButton: {
    marginLeft:30,
    alignItems:'center'
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  traitementItem: {
    marginBottom: 10,
  },
  traitementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  traitementText: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: primary,
    justifyContent: 'center',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    paddingHorizontal: 115,
    borderBottomWidth: 0.6,
    borderColor: darkLight,
    marginTop: 15,
  },
  modalButtonText: {
    color: '#007AFF',
    fontSize: 20,
    marginBottom: 15,
  },
  modalCancelButton: {
    paddingHorizontal: 125,
    marginTop: 15,
  },
  modalCancelButtonText: {
    color: '#007AFF',
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
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
}); 

export default AfficheConsultation;
