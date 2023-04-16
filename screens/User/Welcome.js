import React , {useContext,useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { TextInput } from 'react-native';
import EditProfileScreen from './EditProfileScreen';
import { Modal } from 'react-native';
import { StatusBarHeight } from '../../components/shared';
import {  Octicons, AntDesign, Fontisto , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';




import {
  
    Colors,
  


} from '../../components/styles';
const { brand, darkLight, primary , green, red} = Colors;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';

const Welcome = ({navigation}) => {
//context
    const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);
    const {nom,prenom,email ,groupeSanguin,allergie ,token , _id} = storedCredentials;
    console.log(storedCredentials._id)
    
    const clearLogin = () =>{
      
     AsyncStorage.removeItem('DossierMedicaleCredentials').then(() => {
      setStoredCredentials("");
     }).catch((error) => console.log(error))
    
    }
    const [modalVisible, setModalVisible] = useState(false);

    const handleEditProfile = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
    return (
        <KeyboardAvoidingWrapper>

          <View style={styles.container}>
      <View style={styles.body}>
       
        <View style={styles.section}>
        <Text style={styles.sectionTitleP}>Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen', {nom: nom, prenom: prenom, email: email, allergie: allergie, groupeSanguin: groupeSanguin})}>
        <View style={{ marginLeft:300 , marginTop:-55}}>
                                <Entypo name='pencil' size={30} color={brand} />
                            </View>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>

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
          
        <View style={{ marginLeft:280 , marginBottom:-30}}>
        <Entypo name='chevron-right' size={30} color={brand}/>
        </View>
        <Text style={styles.sectionTitle2}>Changer le mot de passe </Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={clearLogin}>
          <Text style={styles.buttonText} onPress={clearLogin}>Se déconnecter</Text>
        </TouchableOpacity>
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
      marginBottom:60
      
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
      padding: 20,
      marginBottom:300,
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
      marginTop:5,
    },
    sectionTitleP: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color:brand,
      marginTop:20,
    },
    sectionContent: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 20,
      shadowOpacity:0.25,
      shadowOffset:{width:0.5,height:2},
      shadowRadius:1,
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