import React, { useState , useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {
    InnerContainer,

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
    StyledContainerRestPassword,
    ExtraView, 
    TextLink,
    TextLinkContent,
    ExtraText,
    StyledEtoile
   
} from '../../components/styles';
//Api Client
import IconHeader from '../../components/Icons/IconHeader';
import RegularText from '../../components/Texts/RegularText';
import axios from 'axios';
import RowContainer2 from '../../components/Containers/RowContainer2';

const { brand, darkLight, primary } = Colors;

const ForgetPassword = ({ navigation }) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
//context 

    const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            handleMessage(null);
            setSubmitting(true);
      
            const response = await axios.post('https://8f95-197-15-244-61.ngrok-free.app/api/v1/forget_password', { email: credentials.email });
      
            setSubmitting(false);
      
            if (response.status === 200) {
              navigation.navigate('PasswordOtp', { email: credentials.email });
            } else {
              handleMessage(response.data.message, 'FAILED');
            }
          } catch (error) {
            setSubmitting(false);
  if (error.response && error.response.status === 400) {
    handleMessage("L'adresse e-mail est invalide.", 'FAILED');
  } else {
    handleMessage('La requête a échoué: ' + error.message, 'FAILED');
  }
          }
        
            
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };
    

    
   
    

    return (
        <KeyboardAvoidingWrapper> 
            <StyledContainerRestPassword>
                <StatusBar style="dark" />
               <IconHeader name = "key" style ={{marginBottom: 30 }}/>
               <RegularText style ={{ marginBottom: 25 }}> Entrez votre adresse e-mail, et nous vous enverrons un code pour récupérer votre compte. </RegularText>
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email == '') {
                                handleMessage('Veuillez remplir le champs');
                                setSubmitting(false);
                            } else {
                                handleOnSubmit(values, setSubmitting);
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
                           
                            <MsgBox type={messageType}>
                                {message}
                            </MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}> 
                                <ButtonText>
                                   Envoyer
                                </ButtonText>
                            </StyledButton>}
                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}
                            <Line />
                            <ExtraView>
                              <ExtraText>
                                   
                              </ExtraText>
                              <TextLink onPress={() => navigation.navigate('Login')}>
                                  <TextLinkContent >
                                  Retour à la page connexion
                                  </TextLinkContent>
                              </TextLink>
                          </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainerRestPassword>
        </KeyboardAvoidingWrapper>


    );
};
const MyTextInput = ({ label,etoile, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
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
export default ForgetPassword; 