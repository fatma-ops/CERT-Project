import { View, Text, Modal ,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
const { brand, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;


const AfficheMedecin = ({ navigation , route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
  console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState('');


//Delete Modal__________________________________________________________________________________________
const buttonHandler = (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      handleDelete();
    }
    setModalVisible(false);
  };
const openModal = () => {
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer ce medecin?', 'OK', 'Cancel');
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
        const response = await fetch(`${ngrokLink}/api/v1/medecin/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
        navigation.navigate('ListeMedecin');

      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };


//Modifier______________________________________________________________________________________________    
const handleModify = () => {
    setShowModal(false);
    navigation.navigate('ModifyMedecin' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})   
     };



return (
    <View style={styles.container}>
                    <StatusBar style="Light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> {selectedAnalyse.nom}</Text>
        <StatusBar style="Light" />

        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>
       <View style={styles.content}>
        <Image source={require('../../assets/img/doctorr.png')} style={styles.doctorImage} />
        <View style={styles.sectionContent}>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Nom: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.nom}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Spécialité: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.specialite}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Adresse: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.adresse}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Numero: </Text>
            <Text style={styles.sectionItem}>+216 {selectedAnalyse.numero}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Commentaire: </Text>
            <Text style={styles.sectionItem}>{selectedAnalyse.commentaire}</Text>
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
</View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  //marginBottom:50,
  opacity:1,
  justifyContent:'space-between',
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
sectionItem: {
  fontSize: 18,
  //marginBottom:5,
  //marginRight:-5,
  paddingLeft:130,
  marginTop:-25,
  paddingBottom:5
},
sectionItem2: {
  fontSize: 18,
  // marginLeft:-70,
  //marginBottom: 5,
  fontWeight: 'bold',
  //marginTop:5,
  paddingBottom:5,
  color:brand,
},

headerTitle: {
  fontWeight: 'bold',
  fontSize: 20,
  color:brand,
},
content: {
  flex: 1,
  paddingTop:20,
},
doctorImage: {
  width: 120,
  height: 120,
  borderRadius: 60,
  marginBottom: 20,
  alignSelf: 'center',
  },
heelo:{
  //flexDirection:'row',
  borderBottomColor:darkLight,
  borderBottomWidth:0.3,
  paddingBottom:10,
  paddingTop:10,
  paddingRight:20,
  //marginRight:20
  flexDirection:'column'
},
sectionContent:{
  paddingLeft:20,
  paddingRight:20,
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
  shadowOffset: {width:0,height: 2,},
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
});

export default AfficheMedecin
