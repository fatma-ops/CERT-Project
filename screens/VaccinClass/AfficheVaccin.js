import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState , useEffect} from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import styled from 'styled-components';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';

const { brand, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;


const AfficheVaccin = ({ navigation , route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
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



  const [imageData, setImageData] = useState(null);

  const handleImageClick = (image) => {
    setImageModal(image);
    setShowModalImage(true);
  };
 

  const [vaccinImages, setVaccinImages] = useState([]);

  useEffect(() => {
    fetchVaccinImages();
  }, []);

  const fetchVaccinImages = async () => {
    try {
      const response = await axios.get(`${ngrokLink}/api/v1/vaccin/imagesVaccin/${id}`);
      const images = response.data.images;
      setVaccinImages(images);
    } catch (error) {
      console.error('Error fetching analyse images:', error);
    }
  };
  const buttonHandler = (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      handleDelete();
    }
    setModalVisible(false);
  };
  const openModal = () => {
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer ce vaccin ?', 'OK', 'Cancel');
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
        const response = await fetch(`${ngrokLink}/api/v1/analyse/delete/${id}`, {
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

//Modifier______________________________________________________________________________________________
const handleModify = () => {
    setShowModal(false);
    navigation.navigate('ModifyVaccin' , {title: selectedAnalyse.title, maladieCible: selectedAnalyse.maladieCible, dateVaccin:selectedAnalyse.date,  commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id,  images: vaccinImages,
  })   
     };

     const closeModal = () => {
      setShowModalImage(false);
    };
  return (
    
    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedAnalyse.title}</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>

     

      <View style={styles.content}>
    <View style={styles.imageContainer}>
      {vaccinImages.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
          <Image
            source={{ uri: `data:${image.contentType};base64,${image.data}` }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <FontAwesome name="heartbeat" size={20} color={brand} style={{ marginRight: 10 }} />
        <Text style={styles.label}>Maladie ciblée:</Text>
        <Text style={styles.value}>{selectedAnalyse.maladieCible}</Text>
      </View>
      <View style={styles.infoItem}>
        <FontAwesome name="calendar" size={20} color={brand} style={{ marginRight: 10 }} />
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{selectedAnalyse.date}</Text>
      </View>
      <View style={styles.infoItem}>
        <FontAwesome name="comment" size={20} color={brand} style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 10, alignSelf: 'center', color: brand, marginTop: -20 }}>Commentaire:</Text>
        <Text style={styles.value}>{selectedAnalyse.commentaire}</Text>
      </View>
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
                <Text style={[styles.modalButtonText, { color: 'red' }]}>Supprimer</Text>
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

      {imageData && imageData.image.contentType && imageData.image.data && (
        <Modal visible={showModalImage} animationType="fade" transparent={true}>
          <View style={styles.imageModalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.imageModalCloseButton}>
              <AntDesign name="close" size={26} color={brand} />
            </TouchableOpacity>
            <Image source={{ uri: `data:${imageData.image.contentType};base64,${imageData.image.data}` }} style={styles.imageModal} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomWidth: 0.25,
    borderBottomColor: brand,
    height:60
   

  },
  backButton: {
    alignSelf:'center'
  },
  moreButton: {
    
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: brand,
    alignItems:'center'

  },
  content: {
    flex: 1,
    padding: 20,
    marginTop:StatusBarHeight
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 300,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:10,
    alignContent:'center',
    marginTop:15
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    alignSelf:'center',
    color: brand,
  },
  value: {
    fontSize: 18,
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
  imageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  thumbnail: {
    width: 120, // Ajustez la largeur selon vos besoins
    height: 120, // Ajustez la hauteur selon vos besoins
    borderRadius: 6,
    marginHorizontal: 5, // Ajoutez une valeur de marge horizontale
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
export default AfficheVaccin
