import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import styled from 'styled-components';
import { StatusBarHeight } from '../../components/shared';

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

  const [result, setResult] = useState('');


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
 const handleDelete = async () => {
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
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
      <ModalPressableContainer onPress={() => setShowModal(false)}>

    <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <TouchableOpacity onPress={handleModify}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: '#007AFF',fontSize:'20',marginBottom:15 }}>  Modifier  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={openModal}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: red ,fontSize:'20',marginBottom:15, }}>Supprimer  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => setShowModal(false)}>
        <View style={[styles.modalCancelButton]}>
          <Text style={{ color: '#007AFF', fontSize:'18',marginBottom:15, fontWeight:'bold'}}>Annuler</Text>
        </View>
        </TouchableOpacity>
      </View>

    </View>
    </ModalPressableContainer>

  </Modal>
        <MessageModalImage2 
      modalVisible={modalVisible} 
      buttonHandler={buttonHandler} 
      type={modalMessageType} 
      headerText={headerText}
      message={modalMessage}
      confirmButtonText={confirmButtonText}
      cancelButtonText={cancelButtonText} 
    />
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
    marginTop: StatusBarHeight ,
    paddingBottom: 5,
    borderBottomWidth: 0.25,
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
    //flex: 1,
    backgroundColor:primary,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius:20,
    width: '100%',
    //padding:35,
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
