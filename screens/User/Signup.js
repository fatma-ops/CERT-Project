import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator,Text  } from 'react-native';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import Login from './Login';
import { ToastAndroid ,StyleSheet} from 'react-native';
import MessageModal from '../../components/Modals/MessageModal';
import { ngrokLink } from '../../config';
import SelectDropdown from 'react-native-select-dropdown';



import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledButton,
    StyledInputLabel,
    StyledTextInput,

    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    PageSignup,
    StyledContainer2,
    StyledEtoile,
    SelectDropdownStyle


} from '../../components/styles';
import RowContainer2 from '../../components/Containers/RowContainer2';
const { green, brand, darkLight, primary , secondary , tertiary } = Colors;


//________________________________________________________________________________
const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
//Model_______________________________________________________________________    
const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');
const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');

const buttonHandler = () => {
    if(modalMessageType === 'success'){
        //do something
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




//_________________________________________________________________________________
const groupesanguin = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
    
  ];


 //Custom TextInput____________________________________________________________________   
    const MyTextInput = ({ label, etoile,icon, isPassword, hidePassword, setHidePassword, ...props }) => {
        return (
            <View>
                <LeftIcon>
                    <Octicons name={icon} size={24} color={brand} />
      
                </LeftIcon>
                <RowContainer2>
                <StyledInputLabel> {label}  </StyledInputLabel>
                <StyledEtoile> {etoile}  </StyledEtoile>
                </RowContainer2>
                <StyledTextInput  {...props} />
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                    </RightIcon>
      
                )}
      
            </View>
        );
      
      };
  //Custom Text Input 2 _____________________________________________________________  

    const MyTextInput2 = ({ label,etoile ,icon, isPassword, hidePassword, setHidePassword, ...props }) => {
        return (
            <View>
                  <RowContainer2>
          <StyledInputLabel> {label}  </StyledInputLabel>
          <StyledEtoile> {etoile}  </StyledEtoile>
          </RowContainer2>
                <StyledTextInput  {...props} />
                <LeftIcon>
                    <MaterialCommunityIcons name={icon} size={24} color={brand} />
                </LeftIcon>
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                    </RightIcon>

                )}

            </View>
        );

    };

//Fonction signup__________________________________________________________________
      const handleSignup = (credentials, setSubmitting) => {
      
            setSubmitting(true);

            axios
              .post(`${ngrokLink}user/signup`, credentials)
              .then((response) => {
                const { status, data } = response;
                if (status === 200) {
                    console.log('Inscription réussie', response.data);

                    setSubmitting(false);
                    navigation.navigate('EmailVerification' , {...data });
                } else{
                    console.log('L\'inscription a échoué', response.data);
                    setSubmitting(false);
                   ShowModal( 'failed', 'échec!'," L\'inscription a échoué veuillez réessayer.",'Fermer'); }
              })
              .catch((error) => {

                if (error.response && error.response.data && error.response.data.error) {
                    const errorMessage = error.response.data.error;

                    handleMessage(errorMessage);
                  } else {
                    handleMessage('error', "Une erreur s'est produite. Vérifiez votre connexion réseau et réessayez.");
                  }
              })
              .finally(() => {
                setSubmitting(false);
              });
          };

         
//Message_________________________________________________________________________
          
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    
   




    
    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('DossierMedicaleCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
               
                
            }).catch((error) => {
                console.log(error);
                handleMessage('La persistance de la connexion a échoué');
            })
    }
    
//JSX___________________________________________________________________________
    


    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style={brand} />
                <InnerContainer>
                    <PageSignup> Bienvenue ! </PageSignup>
                    <SubTitle>S'inscrire</SubTitle>
                    <Formik
                        initialValues={{ prenom: '' , nom: '', email: '', groupeSanguin:'' , allergie:'', password: '', confirmPassword: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.prenom == '' ||values.nom == '' || values.email == '' || values.password == '' || values.confirmPassword == '') {
                                handleMessage('Veuillez remplir tous les champs obligatoires');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Les mots de passe ne correspondent pas.');
                                setSubmitting(false);
                            }
                            else { 
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Nom"
                                    etoile="*"
                                    icon="person"
                                    placeholder=" Entrer votre nom "
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('nom')}
                                    onBlur={handleBlur('nom')}
                                    value={values.nom}

                                />
                                 <MyTextInput
                                    label="Prénom"
                                    etoile="*"
                                    icon="person"
                                    placeholder="Entrer votre prénom"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('prenom')}
                                    onBlur={handleBlur('prenom')}
                                    value={values.prenom}

                                />
                                <MyTextInput
                                    label="Adresse Email"
                                    etoile="*"
                                    icon="mail"
                                    placeholder="Entrer votre adresse email"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}

                                    keyboardType="email-address"
                                />
      
         <Text style={styles.label}>Groupe Sanguin</Text> 
         

        <SelectDropdownStyle>    
                
         <SelectDropdown
            label="Groupe sanguin"
           
            
            data={groupesanguin}

            onSelect={(selectedItem, index) => {
              setFieldValue('groupeSanguin', selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={() => (
                <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
              )}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.dropdownRow}
            rowTextStyle={styles.dropdownRowText}
            defaultButtonText="Choisir votre groupe sanguin"
          >
                 
                       
                
                </SelectDropdown>
              
          </SelectDropdownStyle>
          

                                <MyTextInput2
                                    label="Allergie"
                                    icon="allergy"
                                    placeholder="Entrer votre allergie"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('allergie')}
                                    onBlur={handleBlur('allergie')}
                                    value={values.allergie}
                                    
                                    
                                />

                                <MyTextInput
                                    label="Mot de passe"
                                    etoile="*"
                                    icon="lock"
                                    placeholder="Entrer votre mot de passe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MyTextInput
                                    label="Confirmer mot de passe"
                                    etoile="*"
                                    icon="lock"
                                    placeholder="Confirmer votre mot de passe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <MsgBox type={messageType}>
                                    {message}
                                </MsgBox>
                               
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        S'inscrire
                                    </ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>}



                                <Line />
                                <ExtraView>
                                    <ExtraText>
                                        Vous avez déjà un compte ?
                                    </ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>
                                            S'identifier
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
            </StyledContainer>
        </KeyboardAvoidingWrapper>


    );
};

const styles = StyleSheet.create({
    
    label: {
        fontSize: 13,
        marginBottom: 5,
        color:tertiary
      },
      
    
   
   
   
    dropdownButtonText: {
      fontSize: 17,
      color: '#333',
    
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      width: '100%',
      marginBottom: 20,
  },
  
  dropdownContainer: {
    backgroundColor: secondary,
    padding:15,
    paddingLeft:55,
    borderRadius: 20,
    height:60,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:2,
    shadowRadius:1,
    marginLeft:-10,
    marginRight:-10
 
   },
   dropdownButton: {
    backgroundColor: secondary,
    alignSelf:"center",
    marginTop: -10,

    width: '100%', // Ajoutez cette ligne pour définir la largeur du bouton à 100%
  },
   dropdownButtonText: {
     fontSize: 17,
     color: brand ,
     alignItems:'center',

     marginLeft: -27, // Espace à gauche de l'icône


   
   },
   dropdownIcon: {
    left:15,
    position:'absolute',
    zIndex:1,     

  },
   dropdown: {
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 20,
     backgroundColor: '#fafafa',
     justifyContent:'center'
   },
   dropdownRow: {
     paddingVertical: 10,
     paddingHorizontal: 5,
   },
   dropdownRowText: {
     fontSize: 16,
     color: '#333',
   },
   selectedValue: {
     fontSize: 18,
     marginTop: 20,
   },
});

export default Signup; 