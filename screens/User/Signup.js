import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator,Text  } from 'react-native';
import { Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import Login from './Login';
import { ToastAndroid ,StyleSheet} from 'react-native';
import MessageModal from '../../components/Modals/MessageModal';




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
    StyledContainer2


} from '../../components/styles';
const { green, brand, darkLight, primary } = Colors;


const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    
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

    const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
        return (
            <View>
                <StyledInputLabel> {label}</StyledInputLabel>
                <StyledTextInput  {...props} />
                <LeftIcon>
                    <Octicons name={icon} size={24} color={brand} />
                </LeftIcon>
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                    </RightIcon>

                )}

            </View>
        );

    };
    

    const MyTextInput2 = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
        return (
            <View>
                <StyledInputLabel> {label}</StyledInputLabel>
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
    






      
    const handleSignup = (credentials, setSubmitting) => {
      
            setSubmitting(true);

            axios
              .post('https://05ab-160-159-246-109.eu.ngrok.io/api/v1/user/signup', credentials)
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

         

          
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    
    const temporaryUserPersist = async (credentials) => {
       try{
         await AsyncStorage.setItem('tempUser' , JSON.stringify(credentials));
       }catch(error){
         handleMessage('Error with initial data handling');
       }




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
    

    


    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer2>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageSignup> Bienvenue ! </PageSignup>
                    <SubTitle>S'inscrire</SubTitle>
                    <Formik
                        initialValues={{ prenom: '' , nom: '', email: '', groupeSanguin:'' , allergie:'', password: '', confirmPassword: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.prenom == '' ||values.nom == '' || values.email == '' ||values.groupeSanguin == ''|| values.allergie == '' || values.password == '' || values.confirmPassword == '') {
                                handleMessage('Veuillez remplir tous les champs');
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
                                    label="Adresse Email"
                                    icon="mail"
                                    placeholder="Entrer votre adresse email"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}

                                    keyboardType="email-address"
                                />
                                <MyTextInput2
                                    label="Groupe Sanguin"
                                    icon="blood-bag"
                                    placeholder="Entrer votre groupe sanguin"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('groupeSanguin')}
                                    onBlur={handleBlur('groupeSanguin')}
                                    value={values.groupeSanguin}
                                    
                                    
                                />
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
            </StyledContainer2>
        </KeyboardAvoidingWrapper>


    );
};

export default Signup; 