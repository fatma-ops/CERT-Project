import React, { useState , useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
import ResendTimer from '../components/Timers/ResendTimer';
import styled from 'styled-components';
import MessageModal from '../components/Modals/MessageModal';
import {InnerContainer,StyledFormArea,LeftIcon,RightIcon,StyledButton,StyledInputLabel,StyledTextInput, ButtonText,
Colors,MsgBox,StyledContainerRestPassword, ExtraText, TextLink, TextLinkContent, ExtraView, Editprofile, PageSignup} from './../components/styles';
import RegularText from '../components/Texts/RegularText';
import axios from 'axios';
import IconHeader from '../components/Icons/IconHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';


const { brand, darkLight, primary } = Colors;

const EditPasswordScreen = ({ route , navigation }) => {
const [hidePassword, setHidePassword] = useState(true);

const [message, setMessage] = useState();
const [messageType, setMessageType] = useState();





//modalVisible , buttonHandler , type , headerText , message , buttonText
const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');
const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');
const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

const {  email, prenom , nom , groupeSanguin, allergie , _id} = storedCredentials;
console.log(email)



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
      
      const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            const response = await axios.post('https://e07e-41-225-159-11.eu.ngrok.io/api/v1/forget_password/change', credentials);
            if (response.status === 200) {
              handleMessage('Mot de passe changé avec succès', 'SUCCESS');
              ShowModal('success', "Réussie", "Mot de passe changé avec succès!", 'OK');

              AsyncStorage.setItem('DossierMedicaleCredentials', JSON.stringify(credentials ))
            .then(() => {
              setStoredCredentials(credentials);
            })
            } else {
              handleMessage('Erreur lors du changement de mot de passe');
            }
          } catch (error) {
            handleMessage(error.response.data);
          }
          setSubmitting(false);
        };
      
    
   
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper> 
            <StyledContainerRestPassword>
                <StatusBar style="transparent" />
                <IconHeader name ="lock-open" style ={{marginBottom : 30}}/>

                <InnerContainer>
                    <Formik
                        initialValues={{ password : '',email:email,nom:nom ,prenom:prenom,groupeSanguin:groupeSanguin,allergie:allergie,_id:_id,newPassword:'' , confirmNewPassword:'' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.password == '' ||values.newPassword == '' || values.confirmNewPassword == '') {
                                handleMessage('Veuillez remplir tous les champs');
                                setSubmitting(false);
                            } else if (values.newPassword !== values.confirmNewPassword) {
                                handleMessage('Les mots de passe ne correspondent pas.');
                                setSubmitting(false);
                            }
                            else {  
                                handleOnSubmit(values, setSubmitting);

                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                            <MyTextInput
                                label=" Ancien mot de passe"
                                icon="unlock"
                                placeholder="* * * * * * *"
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
                                label=" Nouveau mot de passe"
                                icon="unlock"
                                placeholder="* * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MyTextInput
                                label="Confirmer nouveau mot de passe"
                                icon="unlock"
                                placeholder="* * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmNewPassword')}
                                onBlur={handleBlur('confirmNewPassword')}
                                value={values.confirmNewPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}

                            />
                            <MsgBox type={messageType}>
                                {message}
                            </MsgBox>
                            {!isSubmitting && <StyledButton  onPress={handleSubmit}>
                                <ButtonText>
                                    Changer de mot de passe
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
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={24} color={brand} />
            </LeftIcon>
            <StyledInputLabel> {label}</StyledInputLabel>
            <StyledTextInput  {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                </RightIcon>
            )}
       </View>
    );
};
export default EditPasswordScreen; 