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
Colors,MsgBox,StyledContainerRestPassword} from './../components/styles';
import RegularText from '../components/Texts/RegularText';
import axios from 'axios';
import IconHeader from '../components/Icons/IconHeader';


const { brand, darkLight, primary } = Colors;

const RestPassword = ({ route , navigation }) => {
const [hidePassword, setHidePassword] = useState(true);

const [message, setMessage] = useState();
const [messageType, setMessageType] = useState();





//modalVisible , buttonHandler , type , headerText , message , buttonText
const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');
const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');
const { code, email } = route.params;


const buttonHandler = () => {
    if(modalMessageType === 'success'){
        //do something
        navigation.navigate('Login');
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
         
            handleMessage(null);
        
            // Get the email from the navigation state
            const email = route.params.email;
            const code = route.params.code;
            console.log('Verifying code for email:', email);
            console.log('Verification code:', code);
            console.log('new password:', credentials.newPassword);
        
        
  

    // Send a POST request to your backend server
    const response = await axios.post(
      'https://84d6-197-26-59-238.eu.ngrok.io/api/v1/forget_password/rest',
      {
        email,
        otp: code,
        newPassword: credentials.newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.passwordrest === true) {
      console.log('Password reset successful:', response.data);

      setSubmitting(false);
      ShowModal('success', 'Réussie', 'Votre mot de passe a été réinitialisé');
    } else {
      console.log('Password reset failed:', response.data);

      setSubmitting(false);
      ShowModal(
        'failed',
        'échec!',
        'Une erreur est survenue. Veuillez réessayer.',
        'Close'
      );
    }
  } catch (error) {
    console.log('Password reset failed:', error.message);

    setSubmitting(false);
    ShowModal('failed', 'échec!', error.message, 'Close');
  }
        };
      
   
    
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };







    return (
        <KeyboardAvoidingWrapper> 
            <StyledContainerRestPassword>
                <StatusBar style="light" />
                <IconHeader name ="lock-open" style ={{marginBottom : 30}}/>

                <InnerContainer>
                    <Formik
                        initialValues={{ newPassword:'' , confirmNewPassword:'' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.newPassword == '' || values.confirmNewPassword == '') {
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
export default RestPassword; 