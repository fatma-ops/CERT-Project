import React, { useContext , useState } from 'react';
import { View, Text, Button, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Formik } from 'formik';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';

import MessageModal from './../components/Modals/MessageModal';
import { StatusBarHeight } from '../components/shared';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { KeyboardAvoidingView } from 'react-native-web';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle} from '../components/styles';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../components/Buttons/RegularButton3';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../components/Buttons/RegularButton2';
import { ngrokLink } from '../config';

const { brand, darkLight, primary,secondary,tertiary } = Colors;

const  AddAnalyse = ({navigation}) =>  {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
      

  const { email } = storedCredentials;
  console.log(email);
//date
const [date , setDate] = useState(new Date(2000,0,1));
const [dob , setDob] = useState() ; 
const [show , setShow] = useState(false);
const onChange = (event , selectedDate) => {
    const currentDate = selectedDate || date ;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
   }
   
   const showDatePicker = () =>{
       setShow(true);
   }


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



  const pickImage = async (setFieldValue) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin d\'autorisations d\'accès à la pellicule de la caméra pour que cela fonctionne !');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFieldValue('image', result.uri);
    }
  };

  const submitAnalyse = async (values ,setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('date', values.date);
    formData.append('testimage', {
      uri: values.image,
      name: 'image.png',
      type: 'image/png'
    });
    formData.append('userEmail', email);

    try {
      const response = await axios.post(`${ngrokLink}/api/v1/analyse/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigation.navigate('AnalyseFlatList')

      setSubmitting(false);

    } catch (error) {
    setSubmitting(false);
    handleMessage(error.message);

      console.error(error);
    }
  };
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
};


  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="dark" />
 <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={25} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter une analyse</Text>
      </View>
     <InnerContainer>  
    
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
      initialValues={{ title: '', date: '', image: null }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.title == '' ) {
            handleMessage('Veuillez remplir  les champs');
            setSubmitting(false);
        } else {
            submitAnalyse(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values , isSubmitting }) => (
        <StyledFormArea>
          
         
          <MyTextInput
           label="Nom d'analyse"
           icon="id-badge"
           placeholder="Analyse"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('title')}
           onBlur={handleBlur('title')}
           value={values.title}
                              
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
            <ViewImage style={styles.imageContainer}>

            <Ionicons name='camera' onPress={() => pickImage(setFieldValue)} size={70} color={darkLight} style={{paddingTop: 40,paddingLeft:60, justifyContent:'center',alignItems:'center'}} />
            <TouchableOpacity onPress={() => pickImage(setFieldValue)} style={{position:'absolute' ,padding:25,left:70, paddingRight:65 ,paddingLeft:15, borderRadius: 20 ,fontSize:16 ,height:200,width:'90%',zIndex:1,marginVertical:3 , justifyContent:'center' , alignSelf:'center',alignItems:'center'}}>
            {values.image && <Image source={{ uri: values.image }} style={{ width: '199%', height: 200 }} />}
            </TouchableOpacity> 

                <Text style={{textAlign:'center', paddingRight:40, color:darkLight}}>Ajouter votre document</Text>

            </ViewImage>
            <Text style={styles.label}>Dépenses</Text>
            <Text style={styles.label2}>Coût                                    Remboursement</Text>

            <View style={styles.depense}>
                  <TextInput style={styles.cout}
                placeholder="100.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('cout')}
                onBlur={handleBlur('cout')}
                value={values.cout}/>

                 <TextInput style={styles.remboursement}
                placeholder="70.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('rembourcement')}
                onBlur={handleBlur('rembourecemnt')}
                value={values.remboursement}/>
            </View>


          <MsgBox type={messageType}>
                              {message}
                          </MsgBox>
                          <View style={{ justifyContent: 'center'}}>
                          {!isSubmitting && <RegularButton2 onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf:'center'}}>
                                    <ButtonText>
                                      Ajouter
                                    </ButtonText>
                                </RegularButton2>}

                                {isSubmitting && <RegularButton2 disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton2>}
                                </View>
                                <ExtraView>
                             
                              <TextLink onPress={() => navigation.goBack()}>
                                  <TextLinkContent style={{ justifyContent: 'center' , alignContent:'center' , alignSelf:'center'}} >
                                      Annuler
                                  </TextLinkContent>
                              </TextLink>
                          </ExtraView>
          </StyledFormArea>
      )}
    </Formik>
    </InnerContainer> 
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword,isDate,showDatePicker, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={24} color={brand} />
            </LeftIcon>
            
            <StyledInputLabel2> {label}</StyledInputLabel2>
                {!isDate && <StyledTextInput  {...props} />}
                {isDate && (
                <TouchableOpacity onPress={showDatePicker}> 
                    
                    <StyledTextInput  {...props} />
                    </TouchableOpacity>)}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
                </RightIcon>
  
            )}
  
        </View>
    );
  
  }
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
       // marginBottom: 0,
        marginTop:5,
      },
      label2: {
        fontSize: 15,
        fontWeight: 'bold',
       // marginBottom: 1,
       color:brand,
        marginTop:5,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        marginTop:StatusBarHeight -42,
        paddingBottom: 15,
        borderBottomWidth: 0.25,
        borderBottomColor: darkLight,
        marginLeft:-25,
        marginRight:-25,

      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color:brand,

      },
      backButton: {
        marginRight: 70,
        marginLeft: 9,
      },

    imageContainer:
    { backgroundColor:secondary,
    padding:15,
    paddingLeft:55,
    borderRadius: 20,
    fontSize:16,
    height:200,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
    marginLeft:-10,
    marginRight:-10,
  },
  depense:{
    flexDirection: 'row',
    alignContent:'space-between'
  },
  cout:{
    backgroundColor :secondary,
    padding:25,
    //paddingLeft:55,
    paddingRight:75,
    borderRadius: 20,
    fontSize:16,
    height:60,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
    marginLeft:-10,
    marginRight:10,
  },
  remboursement:{
    backgroundColor :secondary,
    padding:25,
    //paddingLeft:55,
    paddingRight:75,
    borderRadius: 20,
    fontSize:16,
    height:60,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
    marginLeft:25,
    marginRight:0,
  },

   comentaire: {
    //flex:1,
    backgroundColor :secondary,
    padding:25,
    paddingLeft:55,
    borderRadius: 20,
    fontSize:16,
    height:100,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
    marginLeft:-10,
    marginRight:-10,
  },
  });
  export default AddAnalyse; 
