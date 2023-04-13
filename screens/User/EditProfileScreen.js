import React , {useContext,useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import { StatusBarHeight } from '../../components/shared';
import {  Octicons, AntDesign, Fontisto , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import MessageModal from '../../components/Modals/MessageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';



import
  
    {Colors , StyledInputLabel, StyledTextInput,LeftIcon, StyledContainer, InnerContainer, StyledFormArea, PageSignup, SubTitle, Editprofile, MsgBox, ButtonText, StyledButton, StyledContainer2, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainerRestPassword
  


} from '../../components/styles';
import IconHeader from '../../components/Icons/IconHeader';
const { brand, darkLight, primary , green, red} = Colors;

const EditProfileScreen = ({navigation , route}) => {

//context
const [nom, setNom] = useState(route.params.nom);
    const [prenom, setPrenom] = useState(route.params.prenom);
    const [email, setEmail] = useState(route.params.email);
    const [allergie, setAllergie] = useState(route.params.allergie);
    const [groupeSanguin, setGroupeSanguin] = useState(route.params.groupeSanguin);
    const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

    const {  _id} = storedCredentials;
    console.log(storedCredentials._id)

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');


const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');


const buttonHandler = () => {
    if(modalMessageType === 'success'){
        //do something
        navigation.goBack();

    }
    
        setModalVisible(false);
    };

    const ShowModal = (type , headerText , message , buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
        }
       
        const handleMessage = (message, type = 'FAILED') => {
          setMessage(message);
          setMessageType(type);
      }
      const handleSave = async (credentials , setSubmitting) => {
        setSubmitting(true);
      
        try {
          const response = await fetch(`https://f072-197-15-199-158.ngrok-free.app/api/v1/user/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id:credentials._id,
              nom: credentials.nom,
              prenom: credentials.prenom,
              allergie: credentials.allergie,
              groupeSanguin: credentials.groupeSanguin
            })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Update the state with the updated user information
            setNom(data.nom);
            
            setPrenom(data.prenom);
            setAllergie(data.allergie);
            setGroupeSanguin(data.groupeSanguin);
            AsyncStorage.setItem('DossierMedicaleCredentials', JSON.stringify(credentials))
            .then(() => {
              setStoredCredentials(credentials);
            })
      
            // Show a success message to the user
            ShowModal('success', "Profile mis à jour", "Votre profile a été mis à jour avec succès !", 'OK');
          } else {
            // Show an error message to the user
            handleMessage(data.message, 'FAILED');
          }
        } catch (error) {
          console.error(error);
          // Show an error message to the user
          handleMessage('Server error. Please try again later.', 'FAILED');
        } finally {
          setSubmitting(false);
        }
      };
      
    return(
  <KeyboardAvoidingWrapper>
  <StyledContainerRestPassword>
      <StatusBar style="transparent" />
      <IconHeader name ="account-edit-outline" style ={{marginBottom : 30 , marginTop:StatusBarHeight-90}} />

      <InnerContainer>
     
          <Formik
              initialValues={{_id:_id, prenom: prenom , nom: nom,email:email ,groupeSanguin:groupeSanguin , allergie:allergie  }}
              onSubmit={(values, { setSubmitting }) => {
                  if (values.prenom == '' ||values.nom == '' ) {
                    handleMessage('Veuillez remplir le nom et le prenom');
                    setSubmitting(false);
                      
                  }
                  else { 
                    handleSave(values, setSubmitting);
                  }
              }}
          >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                  <StyledFormArea>
                      <MyTextInput
                          label="Nom"
                          icon="person"
                          placeholder=" Entrer votre nom "
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('nom')}
                          onBlur={handleBlur('nom')}
                          value={values.nom}

                      />
                       <MyTextInput
                          label="Prénom"
                          icon="person"
                          placeholder="Entrer votre prénom"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('prenom')}
                          onBlur={handleBlur('prenom')}
                          value={values.prenom}

                      />
                     
                      <MyTextInput
                          label="Groupe Sanguin"
                          icon=""
                          placeholder="Entrer votre groupe sanguin"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('groupeSanguin')}
                          onBlur={handleBlur('groupeSanguin')}
                          value={values.groupeSanguin}
                          
                          
                      />
                      <MyTextInput
                          label="Allergie"
                          icon=""
                          placeholder=""
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('allergie')}
                          onBlur={handleBlur('allergie')}
                          value={values.allergie}
                          
                          
                      />
                      <MsgBox >
                                </MsgBox>
                               
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                       Enregistrer
                                    </ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>}
                                <ExtraView>
                                    
                                    <TextLink onPress={() => navigation.goBack()}>
                                        <TextLinkContent>
                                           Annuler
                                        </TextLinkContent>
                                    </TextLink>
                                </ExtraView>

                  </StyledFormArea>)}
          </Formik>
      </InnerContainer>

      <MessageModal 
                  modalVisible={modalVisible} 
                  buttonHandler = {buttonHandler} 
                  type = {modalMessageType} 
                  headerText = {headerText}
                  message={modalMessage}
                  buttonText={buttonText} /> 
  </StyledContainerRestPassword>
</KeyboardAvoidingWrapper>


);
};
const MyTextInput = ({ label, icon,  ...props }) => {
  return (
      <View>
          <LeftIcon>
              <Octicons name={icon} size={24} color={brand} />

          </LeftIcon>
          <StyledInputLabel> {label}</StyledInputLabel>
          <StyledTextInput  {...props} />
         

      </View>
  );

};

export default EditProfileScreen; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
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
    },
    button: {
      backgroundColor: brand,
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
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
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sectionContent: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 20,
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