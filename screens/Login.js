import React, { useState , useContext } from 'react';
import { StyleSheet, TextInput, Button,  Text } from 'react-native';

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import {  Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
import * as Google from 'expo-google-app-auth'
import {
    StyledContainer,
    InnerContainer,
 
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
    Motdepasse,
    ViewMot,
} from './../components/styles';

//Api Client
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';

const { brand, darkLight, primary } = Colors;

const API_URL = 'https://686b-102-159-204-255.eu.ngrok.io/api/v1/user/';

const Login = ({navigation}) => {
  
  const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  const [googleSubmitting , setGoogleSubmitting]=useState(false);


  const handleLogin = async (credentials, setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
        setSubmitting(false);
      }
  
      const { token, status, message, nom, email, prenom,groupeSanguin,allergie,_id } = await response.json();
  
      persistLogin(token, message, status, nom, email, prenom,groupeSanguin,allergie,_id);
      setSubmitting(false);
  
      // Navigate to the home screen
     
    } catch (error) {
      setSubmitting(false);
      handleMessage(error.message);
    }
  };
//context 

   

const persistLogin = (token, message, status, nom, email, prenom,groupeSanguin,allergie,_id) => {
    const credentials = { token, nom, email, prenom,groupeSanguin,allergie,_id };
    AsyncStorage.setItem('DossierMedicaleCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('La persistance de la connexion a échoué');
      });
  };
  
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {iosClientId:`34022021330-g3mf2rvtd0u81edlhg1dvt2mp7618np9.apps.googleusercontent.com`, 
        androidClientId:`34022021330-96et3uniejlfecdmbsnkjddrp386sidg.apps.googleusercontent.com` ,
        scopes: ['profile' , 'email ']
      };
      Google.logInAsync(config)
      .then((result) => {
        const {type , user} = result ;
        if(type == 'success' ){
            const {email, name , photoUrl } = user;
            handleMessage('Google signin was successful' , 'SUCCESS' );
            setTimeout(() => navigation.navigate('Welcome', {email , name , photoUrl}), 1000)
      
        }else{
            handleMessage('Google signin was cancelled');
        }
        setGoogleSubmitting(false);
      
      })
      .catch(error => {
        console.log(error);
        handleMessage("Une erreur s'est produite. Vérifiez votre connexion réseau et réessayez.");
        setGoogleSubmitting(false);
      })
        
        
      };

    return (
      <KeyboardAvoidingWrapper>        
          <StyledContainer>
              <StatusBar style="dark" />
              <PageTitle> Bienvenue ! </PageTitle>
              <SubTitle> Connectez-vous sur votre compte </SubTitle>

              <InnerContainer>
                  
                  <Formik
                      initialValues={{ email: '', password: '' }}
                      onSubmit={(values, { setSubmitting }) => {
                          if (values.email == '' || values.password == '') {
                              handleMessage('Veuillez remplir tous les champs');
                              setSubmitting(false);
                          } else {
                              handleLogin(values, setSubmitting);

                          }
                      }}
                  >
                      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                          <MyTextInput
                              label="Adresse Email"
                              icon='mail'
                              placeholder="andyj@gmail.com"
                              placeholderTextColor={darkLight}
                              onChangeText={handleChange('email')}
                              onBlur={handleBlur('email')}
                              value={values.email}
                              keyboardType="email-address"
                          />
                          <MyTextInput
                              label="Mot de passe"
                              icon="lock"
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

                          <MsgBox type={messageType}>
                              {message}
                          </MsgBox>
                          {!isSubmitting && <StyledButton onPress={handleSubmit}>
                              <ButtonText>
                                  S'identifier
                              </ButtonText>
                          </StyledButton>}
                          

                          {isSubmitting && <StyledButton disabled={true}>
                              <ActivityIndicator size="large" color={primary} />
                          </StyledButton>}
                          <ViewMot>
                          <Motdepasse onPress={() => navigation.navigate('ForgetPassword')}>
                              Mot de passe oublié ?
                          </Motdepasse>
                          </ViewMot>
                         
                          <Line />
                          {!googleSubmitting &&  (
                             <StyledButton google={true} onPress={handleGoogleSignin}>
                              <Fontisto name="google" color={primary} size={25} />
                              <ButtonText google={true}>
                                  S'identifier avec google
                              </ButtonText>
                          </StyledButton>)}

                          {googleSubmitting && (
                               <StyledButton google={true} disabled = {true}>
                              <ActivityIndicator size="large" color={primary} />

                               </StyledButton>

                          )}
                          <ExtraView>
                              <ExtraText>
                                  Nouveau sur Dossier médical ?
                              </ExtraText>
                              <TextLink onPress={() => navigation.navigate('Signup')}>
                                  <TextLinkContent >
                                      S'inscrire
                                  </TextLinkContent>
                              </TextLink>
                          </ExtraView>



                      </StyledFormArea>)}
                  </Formik>
              </InnerContainer>
          </StyledContainer>
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
export default Login; 


    


