import React, {useState , useEffect} from 'react';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import { Colors } from '../../components/styles';
import { ScrollView } from 'react-native';
import RowContainer from '../../components/Containers/RowContainer';
import { ngrokLink } from '../../config';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import { StatusBarHeight } from '../../components/shared';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
const { brand, darkLight, primary,red } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;
const AnalyseDetail = ({ route , navigation }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
  console.log(selectedAnalyse)
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
  const closeModal = () => {
    setImageModal(null);
  };

  const [analyseImages, setAnalyseImages] = useState([]);

  useEffect(() => {
    fetchAnalyseImages();
  }, []);

  const fetchAnalyseImages = async () => {
    try {
      const response = await axios.get(`${ngrokLink}analyse/imagesAnalyse/${id}`);
      const images = response.data.images;
      setAnalyseImages(images);
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
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer cette analyse ?', 'OK', 'Cancel');
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
    const response = await fetch(`${ngrokLink}analyse/delete/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    setResult(data);
    navigation.navigate('AnalyseFlatList');
  } catch (err) {
    console.error(err);
    setResult('Erreur');
  }
};

//Modifier______________________________________________________________________________________________
const handleModify = () => {
  setShowModal(false);
  navigation.navigate('ModifierAnalyse' , {title: selectedAnalyse.title, contact: selectedAnalyse.contact, dateAnalyse:selectedAnalyse.date,  cout:selectedAnalyse.cout,remboursement:selectedAnalyse.remboursement, id: selectedAnalyse._id, typeAnalyse:selectedAnalyse.type ,
})   
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
    <View style={styles.sectionContent}>
    <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Type: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.type}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Medecin: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.contact}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Date:</Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.date}</Text>
            </View>          
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Coût: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.cout}dt</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Remboursement: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.remboursement}dt</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Resultat(s): </Text>
            </View>
          </View>
    <View style={styles.imageContainer}>
        {analyseImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
            <Image
              source={{ uri: `data:${image.contentType};base64,${image.data}` }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        ))}

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

    
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginBottom:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomWidth: 0.25,
    borderBottomColor: brand,
    height:60
   
  
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
  sectionItem: {   
    fontSize: 18,
    //marginBottom:5,
    //marginRight:-5,
    paddingLeft:145,
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
    padding: 20,
    marginTop:20,
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
});

export default AnalyseDetail;

