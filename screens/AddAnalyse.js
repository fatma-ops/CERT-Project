import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator,Text , TouchableOpacity ,Image, TextInput, Button } from 'react-native';
import { Octicons, Ionicons , FontAwesome5 } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../components/CredentialsContext';
import { ToastAndroid ,StyleSheet} from 'react-native';
import MessageModal from '../components/Modals/MessageModal';
import RegularButton2 from '../components/Buttons/RegularButton2';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';



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
    StyledInputLabel2,
    StyledTextInput,
    ButtonText,
    Colors,
    MsgBox,
    ExtraView2,
    PageSignup,
    ViewImage,
    StyledContainer3


} from '../components/styles';
import MessageModalImage from '../components/Modals/MessageModalImage';
import RegularButton3 from '../components/Buttons/RegularButton3';
const { green, brand, darkLight, primary } = Colors;


const AddAnalyse = ({ navigation }) => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [show , setShow] = useState(false);
    const [date , setDate] = useState(new Date(2000,0,1));
const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');
const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');


//date 

const [dob , setDob] = useState() ; 

const onChange = (event , selectedDate) => {
 const currentDate = selectedDate || date ;
 setShow(false);
 setDate(currentDate);
 setDob(currentDate);
}

const showDatePicker = () =>{
    setShow(true);
}
const [image, setImage] = useState(null);




  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

    const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate ,isImage , showDatePicker , ...props }) => {
        return (
            <View>
                <StyledInputLabel2> {label}</StyledInputLabel2>
                {!isDate && <StyledTextInput  {...props} />}
                {isDate && (
                <TouchableOpacity onPress={showDatePicker}> 
                    
                    <StyledTextInput  {...props} />
                    </TouchableOpacity>)}
                <LeftIcon>
                    <Octicons name={icon} size={24} color={brand} />
                </LeftIcon>
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                    </RightIcon>
                    

                )} 
                {isImage && (
                    <RightIcon onPress={handleTakePhoto}>
                        <Ionicons name={'image'} size={24} color={brand} />
                    </RightIcon>
                    

                )} 
               
              
                  


            </View>
        );

    };
    
      
    const handleAddAnalyse = (credentials, setSubmitting) => {
      
            
    };


    const handleOpen = async () => {
       return ShowModal('echec' , 'hello' , 'merci');
    };   

          
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    
    

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer3>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageSignup>  </PageSignup>
                    <SubTitle></SubTitle>
                   
                    {show && (
                   <DateTimePicker
                   testID= "dateTimePicker"
                   value={date}
                   mode='date'
                   is24Hour={true}
                   display="default"
                   onChange={onChange}

                   />


                    )}
                     

           
                    <Formik
                        initialValues={{ typeAnalyse: '' , date: '', ResultatAnalyse:''  }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.prenom == '' ||values.date == '' || values.email == '' ) {
                                handleMessage('Veuillez remplir tous les champs');
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
                                    label="Type d'analyse"
                                    icon="id-badge"
                                    placeholder=" analyse du sang "
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('typeAnalyse')}
                                    onBlur={handleBlur('typeAnalyse')}
                                    value={values.typeAnalyse}

                                />
                                 <MyTextInput
                                    label="date"
                                    icon="calendar"
                                    placeholder = "AAAA - MM - JJ"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('date')}
                                    onBlur={handleBlur('date')}
                                    value={dob ? dob.toDateString() : '' }
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
                                    

                                
                                />
                                <Text style={styles.label}>Résultat d'analyse</Text>

                                <ViewImage onPress={pickImage}>

                              <Ionicons name='camera' onPress={pickImage} size={70} color={darkLight} style={{paddingTop: 40,paddingLeft:60, justifyContent:'center',alignItems:'center'}} />
                             <TouchableOpacity onPress={pickImage} style={{position:'absolute' ,padding:15, paddingLeft:55 , borderRadius: 20 ,fontSize:16 ,height:200,width:'100%',zIndex:1,marginVertical:3 , justifyContent:'center' , alignSelf:'center'}}>
                             {image && <Image source={{ uri: image }} style={{height:200,width:'100%'}} />}
                                </TouchableOpacity> 

                              <Text style={{textAlign:'center', paddingRight:40, color:darkLight}}>Ajouter votre Résultat d'analyse</Text>

                                    </ViewImage> 


                              
                                
                                <MsgBox type={messageType}>
                                    {message}
                                </MsgBox>
                               <ExtraView2>
                                {!isSubmitting && <RegularButton3 onPress={handleSubmit} style={{justifyContent:'center'}}>
                                    <ButtonText>
                                      Annuler     
                                    </ButtonText>
                                </RegularButton3>}

                                {isSubmitting && <RegularButton2 disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton2>}


                                {!isSubmitting && <RegularButton3 onPress={handleSubmit}>
                                    <ButtonText>
                                      Enregistrer
                                    </ButtonText>
                                </RegularButton3>}

                                {isSubmitting && <RegularButton3 disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton3>}
                                </ExtraView2>
                               
                                
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
                <MessageModalImage 
                            modalVisible={modalVisible} 
                            buttonHandler = {buttonHandler} 
                            type = {modalMessageType} 
                            headerText = {headerText}
                            message={modalMessage}
                            buttonText={buttonText} /> 
            </StyledContainer3>
        
        </KeyboardAvoidingWrapper>


    );

    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 20,
    },
  });

export default AddAnalyse; 