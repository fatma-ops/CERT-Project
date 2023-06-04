import React, { useState , useContext } from 'react';
import { StyleSheet, TextInput, Button,  Text } from 'react-native';

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import {  Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
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
    StyledEtoile,
} from '../../components/styles';
const { brand, darkLight, primary } = Colors;

import { ngrokLink } from '../../config';

//Api Client
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import RowContainer2 from '../../components/Containers/RowContainer2';
//API URL_________________________________________________________________________________

const API_URL = `${ngrokLink}user/`;

//__________________________________________________________________________________
const Login = ({navigation}) => {
  
  const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [hidePassword, setHidePassword] = useState(true);

//Fonction Login ____________________________________________________________________
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
        throw new Error('identifiants invalides');
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


   
//Fonction Enregistrer les donnés dans asyncStorage____________________________________
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
  //Message ___________________________________________________________________
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

   //JSX___________________________________________________________________________ 

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
                              etoile="*"
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
                              etoile="*"
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
                           <View style={{justifyContent:'flex-end' , alignItems:'flex-end'}}>
                          <Motdepasse onPress={() => navigation.navigate('ForgetPassword')}>
                              Mot de passe oublié ?
                          </Motdepasse>
                          </View>
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
                          
                         
                          <Line />
                          <ExtraView>
                              <ExtraText>
                                  Nouveau sur Dossier médical ?
                              </ExtraText>
                          </ExtraView>
                          
                             <StyledButton inscription={true} onPress={() => navigation.navigate('Signup')} >
                              <ButtonText inscription={true}>
                                  S'inscrire
                              </ButtonText>
                          </StyledButton>

                          
                              

                          
                          



                      </StyledFormArea>)}
                  </Formik>
              </InnerContainer>
          </StyledContainer>
      </KeyboardAvoidingWrapper>


  );
};

//Custom text input __________________________________________________________________
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
export default Login; 


    

