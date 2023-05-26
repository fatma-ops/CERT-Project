import React , {useContext,useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { TextInput } from 'react-native';
import EditProfileScreen from './EditProfileScreen';
import { Modal } from 'react-native';
import { StatusBarHeight } from '../../components/shared';
import {  Octicons, AntDesign, Fontisto , Entypo , MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ngrokLink } from '../../config';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import {Colors,} from '../../components/styles';
const { brand, darkLight, primary , green, red} = Colors;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';

const Welcome = ({navigation}) => {
//context
    const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);
    const {nom,prenom,email ,groupeSanguin,allergie ,token , _id} = storedCredentials;
    console.log(storedCredentials._id)
    
    const clearLogin = async () =>{
      
     AsyncStorage.removeItem('DossierMedicaleCredentials').then(() => {
      setStoredCredentials("");
     }).catch((error) => console.log(error))
    
    }

    const handleEditProfile = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };



  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');

  const [showModal, setShowModal] = useState(false);

    const buttonHandler = (isDeleteConfirmed) => {
      if (isDeleteConfirmed) {
        AsyncStorage.removeItem('DossierMedicaleCredentials').then(() => {
          setStoredCredentials("");
         }).catch((error) => console.log(error))    
          }
      setModalVisible(false);
    };
    
    const openModal = () => {
      ShowModal('success', 'Confirmation', 'Êtes-vous sûr de se deconnecter ?', 'OK', 'Cancel');
    };
    
    const ShowModal = (type, headerText, message, confirmButtonText, cancelButtonText) => {
      setModalMessageType(type);
      setHeaderText(headerText);
      setModalMessage(message);
      setConfirmButtonText(confirmButtonText);
      setCancelButtonText(cancelButtonText);
      setModalVisible(true);
    };
  
    return (
        <KeyboardAvoidingWrapper>

          <View style={styles.container}>
          <View style={{
      backgroundColor: brand,
      height: '25%',
      //borderBottomLeftRadius: 40,
      //borderBottomRightRadius: 40,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Image
        source={require('../../assets/img/user2.png')}
        style={{
          width: 70,
          height: 70,
          borderRadius: 25,
          marginRight: 10
        }}
      />
       <View style={{flexDirection:'row'}}>
       <Text style={styles.sectionTitleName}>{nom} {prenom}</Text>
       <TouchableOpacity onPress={openModal}>
       <View style={{ marginLeft:20 , marginTop:StatusBarHeight - 25 }}>
       <MaterialIcons name='logout' size={35} color='white'/>
       </View>
       </TouchableOpacity>
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
      <View style={styles.body}>
       
        <View style={styles.section}>
        
        
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen', {nom: nom, prenom: prenom, email: email, allergie: allergie, groupeSanguin: groupeSanguin})}>
       <View style={{ marginLeft:300 , marginTop:-40}}>
       <MaterialCommunityIcons name='account-edit' size={35} color={brand}/>
       </View>
       </TouchableOpacity>
          <View style={styles.sectionContent}>
            
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Nom: </Text>
            <Text style={styles.sectionItem}>{nom}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Prénom: </Text>
            <Text style={styles.sectionItem}>{prenom}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Email: </Text>
            <Text style={styles.sectionItem}> {email}</Text>

            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations médicales</Text>
          
          <View style={styles.sectionContent}>
          {allergie ? ( <View style={styles.heelo}>

            <Text style={styles.sectionItem2}>Allergies: </Text>
            <Text style={styles.sectionItem}>{allergie}</Text>

      
      </View>) : (<View style={styles.heelo}>
        
      <Text style={styles.sectionItem2}>Allergies: </Text>
      <Text style={styles.sectionItem}> Aucune</Text>

     
      </View>)} 
    {groupeSanguin ? (<View style={styles.heelo}>

      <Text style={styles.sectionItem2}>Groupe sanguin: </Text>
      <Text style={styles.sectionItem}>{groupeSanguin}</Text>

      </View>) : (<View style={styles.heelo}>
        
      <Text style={styles.sectionItem2}>Groupe sanguin: </Text>
      <Text style={styles.sectionItem}>Aucune</Text>

    </View>)}
          </View>
          <View style={styles.section}>
        <Text style={styles.sectionTitleP}>Connexion</Text>
<View style={styles.sectionContent}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPasswordScreen' , {email : email})}>
          
        <View style={{ marginLeft:300 , marginBottom:-30}}>
        <Entypo name='chevron-right' size={30} color={brand}/>
        </View>
       
        <Text style={styles.sectionTitle2}>Changer le mot de passe </Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
       
      </View>

    </View>
      </KeyboardAvoidingWrapper>


    );
};

export default Welcome; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginBottom:60,
     // marginRight:10,
      //marginTop:StatusBarHeight
      
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
     
     
    },
    avatar: {
      marginTop: StatusBarHeight + 30,
      width: 200,
      height: 150,
      
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 16,
      color:brand
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      marginTop: 8,
    },
    body: {
      marginTop:-35,
      padding: 20,
      marginBottom:300,
      paddingLeft:20,
      paddingRight:20,
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
      backgroundColor: 'white',


    },
    button: {
      backgroundColor: brand,
      padding: 10,
      borderRadius: 20,
      marginTop: 40,
      shadowOpacity:0.25,
      shadowOffset:{width:0.5,height:2},
      shadowRadius:1,
      marginLeft:90,
      marginRight:90,
      elevation:5,

    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    section: {
      marginTop: 20,
      
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sectionTitle2: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionTitleP: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      color: brand,
    },
    sectionTitleName:{
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
      marginTop:StatusBarHeight-25,
      alignItems:'center'
    },
    sectionContent: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      paddingRight:-10,
      borderRadius: 20,
      shadowOpacity:0.25,
      shadowOffset:{width:0.5,height:2},
      shadowRadius:1,
      elevation:5,
    },
    sectionItem: {
      fontSize: 16,
      marginBottom: 5,
    },
    sectionItem2: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: 'bold',
    },
   heelo:{
    flexDirection:'row'
   }
  });