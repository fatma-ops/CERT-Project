import React, { useContext , useState , useEffect} from 'react';
import { Alert,View, Text, Button, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Formik } from 'formik';
import {  Fontisto,Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import MessageModal from '../../components/Modals/MessageModal';
import { StatusBarHeight } from '../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { KeyboardAvoidingView } from 'react-native-web';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton from '../../components/Buttons/RegularButton';
import SelectDropdown from 'react-native-select-dropdown';
import { ngrokLink } from '../../config';

const { brand, darkLight, primary,secondary,tertiary } = Colors;

const  AddConsultation = ({navigation}) =>  {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Fetch the list of contacts from the database
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch(`${ngrokLink}/api/v1/medecin/${email}?cache_bust=123456789`)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);
  const options = contacts.map(contact => contact.nom);



  const { email } = storedCredentials;
  //console.log(email);


//date
const [date , setDate] = useState(new Date());
const [dob , setDob] = useState() ; 
const [show , setShow] = useState(false);
const onChange = (event , selectedDate) => {
    const currentDate = selectedDate || date ;
    setShow(false);
    setDate(currentDate);
    setDob(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })); 
   }
  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  }; 


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
        

const submitConsultation = async (values ,setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('type', values.type);
    formData.append('date',dob);
    formData.append('contact', values.contact);

    formData.append('testimage', {
      uri: values.image,
      name: 'image.png',
      type: 'image/png'
    });
    formData.append('userEmail', email);
    formData.append('commentaire', values.commentaire);
    formData.append('cout', values.cout);
    formData.append('remboursement', values.remboursement);




    try {
      const response = await axios.post(`${ngrokLink}/api/v1/consultation/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigation.navigate('ListeConsultation')

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
        <StatusBar style="light" />
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={25} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un consultation</Text>
      </View>
     <InnerContainer>  
    
                    <SubTitle></SubTitle>

    <Formik
      initialValues={{ type: '',date:'', contact: '',commentaire:'',cout:'',remboursement:'', image: null }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.type == ''  ) {
            handleMessage('Veuillez remplir  les champs obligatoire');
            setSubmitting(false);
        } else {
            submitConsultation(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values , isSubmitting }) => (
        <StyledFormArea>
          
         
          <MyTextInput
           label="Consultation"
          // icon="id-badge"
           placeholder=""
           placeholderTextColor={darkLight}
           onChangeText={handleChange('type')}
           onBlur={handleBlur('type')}
           value={values.type}
         />
          <Text style={styles.label}>Médecin</Text> 
        
          <SelectDropdownStyle>
          <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => {
          setFieldValue('contact', selectedItem);
        }}        defaultButtonText="Choisir votre médecin"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        buttonTextAfterSelection={(selectedItem, index) => contacts[index].nom}
      />
      </SelectDropdownStyle>
      <Text style={styles.label}>Date</Text>
           <View style={styles.dateContainer}>
    <DateTimePicker 
      value={date}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={onChange}
      onPress={handleShowDatePicker}
      style={{ position: 'absolute', bottom: 10, left: 55 }}

    />
            </View>

           <Text style={styles.label}>Ordonnance(s)</Text>
            <ViewImage style={styles.imageContainer}>
            <Ionicons name='camera' onPress={() => takeImageHandler(setFieldValue)} size={70} color={darkLight} style={{paddingTop: 15,paddingLeft:70, justifyContent:'center',alignItems:'center'}} />
            <TouchableOpacity onPress={() => takeImageHandler(setFieldValue)} style={{position:'absolute' ,padding:25,left:70,paddingRight:65 ,paddingLeft:15, borderRadius: 20 ,fontSize:16 ,height:200,width:'90%',zIndex:1,marginVertical:3 , justifyContent:'center' , alignSelf:'center',alignItems:'center'}}>
            {values.image && <Image source={{ uri: values.image }} style={{ width: '100%', height: 150, marginTop:-55 }} />}
            </TouchableOpacity> 

                <Text style={{textAlign:'center', paddingRight:30, color:darkLight}}>Ajouter votre document</Text>

            </ViewImage>
            <Text style={styles.label}>Dépenses</Text>
            <Text style={styles.label2}>Coût                                    Remboursement</Text>

                  <TextInput style={styles.cout}
                placeholder="100.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('cout')}
                onBlur={handleBlur('cout')}
                value={values.cout}
                keyboardType="phone-pad"
                />

                 <TextInput style={styles.remboursement}
                placeholder="70.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('remboursement')}
                onBlur={handleBlur('rembouresement')}
                value={values.remboursement}
                keyboardType="phone-pad"
                />


            <MyTextInput style={styles.comentaire}
          label="Commentaire"
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
      height:150,
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
      padding:15,
      paddingLeft:25,
      //paddingRight:75,
      borderRadius: 20,
      fontSize:16,
      height:60,
      marginVertical:3,
      marginBottom:15,
      color:tertiary,
      shadowOpacity:0.25,
      shadowOffset:{width:2, height:4},
      shadowRadius:1,
      elevation:5,
      marginLeft:-10,
      marginRight:165,
    },
    remboursement:{
      backgroundColor :secondary,
      padding:15,
      paddingLeft:25,
      //paddingRight:75,
      borderRadius: 20,
      fontSize:16,
      height:60,
      marginVertical:3,
      marginBottom:15,
      color:tertiary,
      shadowOpacity:0.25,
      shadowOffset:{width:2, height:4},
      shadowRadius:1,
      elevation:5,
      marginLeft:155,
      marginRight:-10,
      marginTop:-75,
    },
  
     comentaire: {
      //flex:1,
      backgroundColor :secondary,
      padding:25,
      paddingLeft:55,
      borderRadius: 20,
      fontSize:16,
      height:80,
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
    dropdownContainer: {
        backgroundColor: secondary,
        padding:15,
        paddingLeft:55,
        borderRadius: 20,
        height:60,
        marginVertical:3,
        marginBottom:10,
        color:tertiary,
        marginLeft:-10,
        marginRight:-10
     
       },
    dropdownButton: {
        backgroundColor: secondary,
        alignItems:'center',
        borderRadius:20,
        padding:15,
        //paddingLeft:55,
        paddingRight:0,
        height:50,
        marginVertical:-7,
        marginBottom:10,
       marginLeft:-10,
      marginRight:-10,
      },
      dropdownButtonText: {
        fontSize: 16,
        color: '#333',
        //paddingHorizontal:-50,
        paddingRight:-90,
      },
      dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#fafafa',
        justifyContent:'center'
    },
    dropdownRow: {
        paddingVertical: 10,
        paddingHorizontal: 5,
      },
      dropdownRowText: {
        fontSize: 16,
        color: '#333',
      },
      selectedValue: {
        fontSize: 18,
        marginTop: 20,
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
    });
  export default AddConsultation; 
