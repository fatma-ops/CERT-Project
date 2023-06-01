import React, { useContext , useState , useEffect } from 'react';
import { Alert,View, Text, Button, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Formik } from 'formik';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import MessageModal from '../../components/Modals/MessageModal';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { KeyboardAvoidingView } from 'react-native-web';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, StyledEtoile} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import { ngrokLink } from '../../config';
import { SelectDropdownStyle } from '../../components/styles';
import SelectDropdown from 'react-native-select-dropdown';
import RegularButton from '../../components/Buttons/RegularButton';
import RowContainer2 from '../../components/Containers/RowContainer2';


const { brand, darkLight, primary,secondary,tertiary } = Colors;

const  AddAnalyse = ({navigation}) =>  {
const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
const [message, setMessage] = useState();
const [messageType, setMessageType] = useState();
const { email } = storedCredentials;

//image

 
  const takeImageHandler = async (index, setFieldValue, values) => {
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
      alert("Désolé, nous avons besoin d'autorisations d'accès à la pellicule de la caméra pour que cela fonctionne !");
      return;
    }
  
    Alert.alert('Choisir Image', 'Choisissez une image depuis la galerie ou prenez une photo', [
      {
        text: 'Depuis la galerie',
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [16, 9],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
            allowsMultipleSelection: true,
          });
          if (!result.canceled) {
            const newImages = result.assets.map((asset) => ({ uri: asset.uri }));
            const updatedImages = [...values.images];
            updatedImages[index] = newImages[0];
            setFieldValue('images', updatedImages);
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
            const newImage = { uri: result.assets[0].uri };
            const updatedImages = [...values.images];
            updatedImages[index] = newImage;
            setFieldValue('images', updatedImages);
          }
        },
      },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };
  

  // Fetch the list of contacts from the database
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch(`${ngrokLink}/api/v1/medecin/${email}?cache_bust=123456789`)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error(error));
  }, []);
  const options = contacts.map(contact => contact.nom);

      

 // console.log(email);
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

    

  const submitAnalyse = async (values, setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('date', dob);
    formData.append('contact', values.contact);
    formData.append('cout', values.cout);
    formData.append('remboursement', values.remboursement);
  
    // Ajouter une boucle pour parcourir les images
    values.images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        name: `image_${index}.png`,
        type: 'image/png'
      });
    });
  
    formData.append('userEmail', email);
  
    try {
      const response = await axios.post(`${ngrokLink}/api/v1/analyse/add/multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigation.navigate('Analyse');
  
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.data && error.response.data.message) {
        handleMessage(error.response.data.message);
      } else {
        handleMessage(error.message);
      }
    }
  };
  
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
        <Text style={styles.headerTitle}>Ajouter votre analyse  </Text>
      </View>
    
    <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="light" />
        
     <InnerContainer>  
    <Formik
      initialValues={{ title: '', date: '',contact:'',cout:'', remboursement:'', images: [] }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.title == ''  ) {
            handleMessage('Veuillez remplir tous les champs obligatoires');
            
            setSubmitting(false);
        } else {
            submitAnalyse(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values , isSubmitting }) => (
        <StyledFormArea>
          
         
          <MyTextInput
           label="Nom de l'analyse"
           icon="id-badge"
           etoile="*"

           placeholder="Analyse"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('title')}
           onBlur={handleBlur('title')}
           value={values.title}
                              
                          />

 

           

               
          <View>
          <Text style={styles.label}>Médecin</Text> 

          <SelectDropdownStyle>
          <SelectDropdown
        data={options}
        onSelect={(selectedItem, index) => {
          setFieldValue('contact', selectedItem);
        }}  
        renderDropdownIcon={() => (
          <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
        )}      
        defaultButtonText="Choisir votre médecin"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        buttonTextAfterSelection={(selectedItem, index) => contacts[index].nom}
      />
      </SelectDropdownStyle>
      </View>
      <Text style={styles.label}>
    Date
  </Text>
  <DateTimePicker
    style={styles.date}
    value={date}
    mode="date"
    display="spinner"
    onChange={onChange}
    locale="fr"
    onPress={handleShowDatePicker}
  />
  
           <Text style={styles.label}>les résultats d'analyse</Text>
           <>
      <View style={styles.imageRow}>
        {values.images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => takeImageHandler(index, setFieldValue, values)}
            style={styles.imageContainer}
          >
            <Image source={{ uri: image.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
        {values.images.length < 3 && (
          <TouchableOpacity
            style={styles.placeholder}
            onPress={() => takeImageHandler(values.images.length, setFieldValue, values)}
          >
            <Ionicons name="camera" size={40} color={brand} />
            <Text style={styles.placeholderText}>Ajouter votre document</Text>
          </TouchableOpacity>
        )}
      </View>
      
    </>
            <Text style={styles.label}>Dépenses</Text>
            <Text style={styles.label2}>Coût                                    Remboursement</Text>

                  <TextInput style={styles.cout}
                placeholder="100.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('cout')}
                onBlur={handleBlur('cout')}
                value={values.cout}/>

                 <TextInput style={styles.remboursement}
                placeholder="70.0"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('remboursement')}
                onBlur={handleBlur('remboursement')}
                value={values.remboursement}/>


          <MsgBox type={messageType}>
                              {message}
                          </MsgBox>
                          <View style={{ justifyContent: 'center'}}>
                          {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf:'center'}}>
                                    <ButtonText>
                                      Ajouter
                                    </ButtonText>
                                </RegularButton>}

                                {isSubmitting && <RegularButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton>}
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

const MyTextInput = ({ label, icon, etoile, isPassword, hidePassword, isDate, showDatePicker, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={24} color={brand} />
      </LeftIcon>

      <RowContainer2>
        <StyledInputLabel2>
          {label} <Text style={{ color: 'red' }}>{etoile}</Text>
        </StyledInputLabel2>
      </RowContainer2>

      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}

      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
        </RightIcon>
      )}
    </View>
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

      imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop:5
      },
      imageContainer: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      placeholder: {
        width: 100,
        height: 100,
        backgroundColor: secondary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius:10,
        shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    elevation:5,
      },
      placeholderText: {
        color: brand ,
        fontSize: 14,
        marginTop: 5,
      },
  depense:{
    flexDirection: 'row',
    alignContent:'space-between',
    marginLeft:-10,
    marginRight:-10,
    //backgroundColor:'black',
    height:80,
    paddingVertical:15,
    marginVertical:3
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
    color: brand,
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
     color: brand,
   
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
  date: {
    //flex:1,
    //padding:25,
    //paddingLeft:55,
    height: 90,
    marginVertical: 4,
    marginBottom: 7,
    marginHorizontal: -15,
  },
  
  });
  export default AddAnalyse; 
