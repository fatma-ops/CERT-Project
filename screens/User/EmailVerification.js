import React, { useState , useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import MainContainer from '../../components/Containers/MainContainer';
import RegularText from '../../components/Texts/RegularText';
import {StyledButton,ButtonText,Colors} from '../../components/styles';
import { ngrokLink } from '../../config';
//Api Client

import IconHeader from '../../components/Icons/IconHeader';
import StyledCodeInput from '../../components/Inputs/StyledCodeInput';
import ResendTimer from '../../components/Timers/ResendTimer';
import MessageModal from '../../components/Modals/MessageModal';


const { brand, darkLight, primary , secondary } = Colors;

const EmailVerification = ({ navigation , route }) => {
//code input 
const MAX_CODE_LENGTH = 4;
const [code , setCode]=useState('');
const [pinReady, setPinReady]=useState(false);
const [verifing , setVerifing] = useState(false);
//resending email
const [activeResend , setActiveResend] = useState(false);
const [resendStatus , setResendStatus] = useState('Renvoyer');
const [resendingEmail , setResendingEmail] = useState(false);

// modal 
//modalVisible , buttonHandler , type , headerText , message , buttonText
const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');
const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const {email , _id}= route?.params;
const [buttonText , setButtonText] = useState('');


const buttonHandler = () => {
    if(modalMessageType === 'success'){
      navigation.navigate('Login' )
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




const resendEmail = async (triggerTimer) => {
    try {
      setResendingEmail(true);
      console.log('Verifying code for email:', email);
      const response = await fetch(`${ngrokLink}/api/v1/email_verification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // pass any required parameters to the backend API
          email:email 
        }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        setResendStatus('Envoyé!');
      } else {
        setResendStatus('échoué!');
        alert("L'envoi du code a échoué");
      }
      setResendingEmail(false);
      //hold on briefly
      setTimeout(() => {
        setResendStatus('Renvoyer');
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus('Failed');
      alert("L'envoi du code a échoué" + error.message);
    }
    }
  
    
  
const handleEmailVerification = async () => {
    try {
        setVerifing(true);
        console.log('Verifying code for email:', email);
        console.log('Verification code:', code);
        const response = await fetch(`${ngrokLink}/api/v1/email_verification/verify`,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            otp: code
          })
        });
        const result = await response.json();
        console.log('Verification response:', result);
        setVerifing(false);
        if (result.verified) {
          return ShowModal('success', 'Votre email a été vérifié avec succès!' , '');
        } else {
          return ShowModal('error', 'Le code que vous avez entré est incorrect.');
        }
      } catch (error) {
        setVerifing(false);
        console.log('Verification error:', error);
        return ShowModal('error', 'Le code que vous avez entré est incorrect.');
      }
      };


    

   
    

    return (
      <MainContainer>
        <KeyboardAvoidingWrapper>    
           
                <StatusBar style="dark" />
                <IconHeader name ="lock-open" style ={{marginBottom : 30}}/>
                <RegularText style = {{ textAlign:'center'}}> 
                Entrez le code à 4 chiffres envoyé à votre</RegularText>
                <RegularText style = {{ textAlign:'center'}}> 
                adresse e-mail</RegularText>


                <StyledCodeInput code ={code} setCode = {setCode} maxLength = {MAX_CODE_LENGTH} setPinReady={setPinReady}/>
              
                {!verifing && pinReady && <StyledButton onPress={handleEmailVerification}>
                                <ButtonText>
                                    Verifier
                                </ButtonText>
                            </StyledButton>}

                            {!verifing && !pinReady && <StyledButton disabled={true} style={{backgroundColor : secondary}} textStyle={{color:darkLight}} >
                                <ButtonText>
                                    Verifier
                                </ButtonText>
                            </StyledButton>}
                            
                            {verifing && <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>}

                           <ResendTimer activeResend={activeResend} 
                           setActiveResend = {setActiveResend} 
                            resendingEmail={resendingEmail}
                            resendStatus={resendStatus}
                            resendEmail ={resendEmail}/>

                            <MessageModal 
                            modalVisible={modalVisible} 
                            buttonHandler = {buttonHandler} 
                            type = {modalMessageType} 
                            headerText = {headerText}
                            message={modalMessage}
                            buttonText={buttonText} />
        </KeyboardAvoidingWrapper>
        </MainContainer>


    );
};

export default EmailVerification; 