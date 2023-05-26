import React, { useContext , useState } from 'react';
import { Alert,View, Text, Button, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Formik } from 'formik';
import {  Fontisto,Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton from '../../components/Buttons/RegularButton';
import SelectDropdown from 'react-native-select-dropdown';
import { ngrokLink } from '../../config';

const { brand, darkLight, primary,secondary,tertiary } = Colors;

const  AddVaccin = ({navigation}) =>  {
const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
const [message, setMessage] = useState();
const [messageType, setMessageType] = useState();
const { email } = storedCredentials;
//console.log(email);
//date 
const [date , setDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [dob , setDob] = useState() ; 
const [show , setShow] = useState(false);

const onChange = (event , selectedDate) => {
    const currentDate = selectedDate || date ;
    setShowDatePicker(false);
    setDate(currentDate);
    setDob(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })); 

   }
   const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };  

  
//image____________________________________________________________________________________________________________
const takeImageHandler = async (setFieldValue) => {
  let img;
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

  if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
    alert('Désolé, nous avons besoin d\'autorisations d\'accès à la pellicule de la caméra pour que cela fonctionne !');
    return;
  }

  Alert.alert('Choisir Image', 'Choisissez une image depuis la galerie ou prenez une photo', [
    {
      text: 'Depuis la galerie',
      onPress: async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          //allowsEditing: true,
          aspect: [16, 9],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
          quality: 1,
          allowsMultipleSelection: true,
        });
        if (!result.canceled) {
          setFieldValue('image', result.assets[0].uri);
        }
      },
    },
    {
      text: 'Ouvrir la caméra',
      onPress: async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [24, 9],
          base64: true,
          quality: 0.5,
        });
        if (!result.canceled) {
          setFieldValue('image', result.assets[0].uri);
        }
      },
    },
    { text: 'Annuler', style: 'cancel' },
  ]);
};
//Fonction add vaccin _________________________________________________________________________________________

  const submitVaccin = async (values ,setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('maladieCible', values.maladieCible);
    formData.append('date',dob);
    formData.append('image',{
      uri: values.image,
      name: 'image.png',
      type: 'image/png'
    });
    
    formData.append('userEmail', email);
    formData.append('commentaire', values.commentaire);


    try {
      const response = await axios.post(`${ngrokLink}/api/v1/vaccin/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigation.navigate('ListeVaccin')

      setSubmitting(false);

    } catch (error) {
    setSubmitting(false);
    handleMessage(error.message);

      console.error(error);
    }
  };

  //Message___________________________________________________________________________________________________
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
};


  return (

    <>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={25} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un vaccin</Text>
      </View>
    <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="light" />
        
     <InnerContainer>  
    
                    <SubTitle></SubTitle>
    <Formik
      initialValues={{ title: '',maladieCible:'', date: '',commentaire:'', image: null }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.title == '' , values.maladieCible =='' ) {
            handleMessage('Veuillez remplir  les champs obligatoire');
            setSubmitting(false);
        } else {
            submitVaccin(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values , isSubmitting }) => (
        <StyledFormArea>
          
         
          <MyTextInput
           label="Vaccin"
           icon="id-badge"
           placeholder="Pfizer dose 1"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('title')}
           onBlur={handleBlur('title')}
           value={values.title}
                              
                          />
          <MyTextInput
          label="Maladie ciblée"
           icon2="injection-syringe"
           placeholder="Covid-19"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('maladieCible')}
           onBlur={handleBlur('maladieCible')}
           value={values.maladieCible}
                              
                          />
           <Text style={styles.label}>Date</Text>
           <DateTimePicker style={styles.date}
      value={date}
      mode="date"
      //is24Hour={true}
      display="spinner"
      onChange={onChange}
      locale="fr"
      onPress={handleShowDatePicker}
      //style={{ position: 'absolute', bottom: 0, left: 0 }}

    />
           
           <Text style={styles.label}>Preuve de vaccination</Text>
           <View style={styles.imageContainer}>
  <Ionicons
    name='camera'
    onPress={() => takeImageHandler(setFieldValue)}
    size={70}
    color={darkLight}
    style={{ paddingTop: 40, paddingLeft: 60, justifyContent: 'center', alignItems: 'center' }}
  />
  <TouchableOpacity
    onPress={() => takeImageHandler(setFieldValue)}
    style={{
      position: 'absolute',
      padding: 25,
      left: 70,
      paddingRight: 65,
      paddingLeft: 15,
      borderRadius: 20,
      fontSize: 16,
      height: 200,
      width: '90%',
      zIndex: 1,
      marginVertical: 3,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center'
    }}
  >
    {values.image && <Image source={{ uri: values.image }} style={{ width: '199%', height: 200 }} />}
  </TouchableOpacity>
  <Text style={{ textAlign: 'center', paddingRight: 40, color: darkLight }}>Ajouter votre document</Text>
</View>

            <MyTextInput style={styles.comentaire}
          label="Commenataire"
           placeholder="..."
           placeholderTextColor={darkLight}
           multiline={true}
           onChangeText={handleChange('commentaire')}
           onBlur={handleBlur('commentaire')}
           value={values.commentaire}
            />


          <MsgBox type={messageType}>
                              {message}
                          </MsgBox>
                          <View style={{ justifyContent: 'center'}}>
                          {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf:'center'}}>
                                    <ButtonText>
                                      Ajouter
                                    </ButtonText>
                                </RegularButton>}

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
    </>

  );
}

const MyTextInput = ({ label, icon, icon2, isPassword, hidePassword,isDate,showDatePicker, setHidePassword, ...props }) => {
    return (
        <View>
            <StyledInputLabel2> {label}</StyledInputLabel2>
            <LeftIcon>
                <Octicons name={icon} size={24} color={brand} />
            </LeftIcon>
            <LeftIcon>
                <Fontisto name={icon2} size={25} color={brand} marginTop='10' />
            </LeftIcon>
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
        marginBottom: 5,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'space-between',
        marginTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 0.25,
        borderBottomColor: darkLight,
        marginLeft: -25,
        marginRight: -25,
    
      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: brand,
        alignItems:'center'
    
      },
      backButton: {
        marginRight: 50,
        marginLeft: ScreenWidth - 350,
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
  dateContainer: {
    //flex:1,
    backgroundColor :secondary,
    padding:25,
    paddingLeft:55,
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
    marginRight:-10,
  },
  date: {
    //flex:1,
    //padding:25,
    //paddingLeft:55,
    height:90,
    marginVertical:-10,
    marginBottom:7,
    marginHorizontal:-15,
  },
  });
  export default AddVaccin; 
