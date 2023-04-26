import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage from '../../components/Modals/MessageModalImage';
import axios from 'axios';
const { brand, darkLight, primary, red } = Colors;

const AfficheMedecin = ({ navigation , route }) => {
  const { selectedAnalyse } = route.params;
  const id = selectedAnalyse._id
  console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');



  const buttonHandler = () => {
    if(modalMessageType === 'success'){
        handleDelete();
    }
    
        setModalVisible(false);
    };

    const openModal = () => {
      ShowModal('success', "Confirmation", "Êtes-vous sûr de supprimer ce contact?", 'OK');
    }

    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`https://9616-41-225-241-147.ngrok-free.app/api/v1/medecin/delete/${id}`);
        console.log(response.data);
        navigation.navigate('ListeMedecin')

        // faire quelque chose en cas de suppression réussie
      } catch (error) {
        console.error(error);
        // faire quelque chose en cas d'erreur
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
        <Text style={styles.headerTitle}>Détails du médecin</Text>
      </View>
      <View style={styles.content}>
        <Image source={require('../../assets/img/user.png')} style={styles.doctorImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{selectedAnalyse.nom}</Text>
          <Text style={styles.specialite}>{selectedAnalyse.specialite}</Text>
          <Text style={styles.adresse}>{selectedAnalyse.adresse}</Text>
          <Text style={styles.numero}>{selectedAnalyse.numero}</Text>
          <Text style={styles.commentaire}>{selectedAnalyse.commentaire}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton}>
            <Entypo name="edit" size={24} color={brand} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal} style={styles.deleteButton}>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkLight,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
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
});

export default AfficheMedecin
