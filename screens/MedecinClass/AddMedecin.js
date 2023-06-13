import React, { useContext , useState } from 'react';
import { View,  StatusBar, TouchableOpacity, Text, TextInput } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import MessageModal from '../../components/Modals/MessageModal';
import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, StyledTextCommentaire, SelectDropdownStyle, StyledEtoile, StyledTextInputContainercountry, StyledTextInputcountry} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { ngrokLink } from '../../config';
import RowContainer2 from '../../components/Containers/RowContainer2';
import RegularButton from '../../components/Buttons/RegularButton';
import CountryPicker from 'react-native-country-picker-modal';


const { brand, darkLight, primary , secondary, tertiary} = Colors;



const  AddMedecin = ({navigation, route}) =>  {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [checked, setChecked] = useState('Blue');
  const { setReloadList } = route.params;

  const [messageType, setMessageType] = useState();
  const [selectedValue, setSelectedValue] = useState('option1');
      
  const specialities = [
    "Cardiologie",
    "Dermatologie",
    "Endocrinologie",
    "Gastro-entérologie",
    "Gynécologie",
    "Neurologie",
    "Ophtalmologie",
    "Oncologie",
    "Oto-rhino-laryngologie",
    "Pédiatrie",
    "Psychiatrie",
    "Rhumatologie",
    "Urologie"
  ];
  const { email } = storedCredentials;
  console.log(email);

   
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

        const submitMedecin = async (values, setSubmitting) => {
          handleMessage(null);
          setSubmitting(true);
        
          const data = {
            nom: values.nom,
            adresse: values.adresse,
            specialite: values.specialite,
            userEmail: email,
            numero: values.numero,
            commentaire: values.commentaire
          };
        
          try {
            const response = await axios.post(
              `${ngrokLink}medecin/add`,
              data,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
            console.log(response.data);
            setReloadList();

            navigation.goBack()

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

const [countryCode, setCountryCode] = useState('TN');
    const [countryCallingCode, setCountryCallingCode] = useState('+216');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleCountrySelect = (country) => {
      setCountryCode(country.cca2);
      setCountryCallingCode(country.callingCode[0]);
      setPhoneNumber('');
    };
  
    

  return (
   <>
   <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={25} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un médecin</Text>
      </View>
  
    <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="light" />
     <InnerContainer>           
    <Formik
      initialValues={{ nom: '', adresse: '', specialite: '', numero:'' , commentaire:'' }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.nom == ''||values.specialite == '' ) {
            handleMessage('Veuillez remplir tous les champs obligatoires');
            setSubmitting(false);
        } else {
            submitMedecin(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit,setFieldValue , values , isSubmitting }) => (
        <StyledFormArea>
          <MyTextInput
           label="Nom du médecin"
           icon="person"
           etoile="*"
           placeholder="Dr"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('nom')}
           onBlur={handleBlur('nom')}
           value={values.nom} 
          />
<Text style={styles.label}>
  Spécialité<Text style={{ color: 'red' }}>*</Text>
</Text>
         <SelectDropdownStyle>              
         <SelectDropdown
            label="Specialité"
            data={specialities}
            onSelect={(selectedItem, index) => {
              setFieldValue('specialite', selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={() => (
              <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
            )}
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.dropdownButtonText}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.dropdownRow}
            rowTextStyle={styles.dropdownRowText}
            defaultButtonText="Choisir la spécialité"
          />
          </SelectDropdownStyle>
          <MyTextInput
           label="Adresse"
           icon="location"
           placeholder="Bizerte , Tunisie "
           placeholderTextColor={darkLight}
           onChangeText={handleChange('adresse')}
           onBlur={handleBlur('adresse')}
           value={values.adresse}
                              
                          />
                          <Text style={styles.label}>
  Numéro
</Text>
          <StyledTextInputContainercountry>
      <CountryPicker
        withFilter
        withCallingCode
        onSelect={handleCountrySelect}
        countryCode={countryCode}
        style={{left:15,
          top:38,
          position:'absolute',
          zindex : 1}}
      />
      <StyledTextInputcountry
        placeholder={`${countryCallingCode} ${phoneNumber}`}
        value={values.numero}
        onChangeText={handleChange('numero')}
        onBlur={handleBlur('numero')}

        keyboardType="phone-pad"
      />
    </StyledTextInputContainercountry>
          <Text style={styles.label}>Commentaire</Text>               
            <TextInput style={styles.comentaire}
          //label="Commenataire"
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
                          <View style={{ justifyContent: 'center' }}>
                          {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center' , alignSelf:'center'}}>
                                    <ButtonText >
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

const MyTextInput = ({ label,etoile, icon,icon2, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={24} color={brand} />
  
            </LeftIcon>
            <LeftIcon>
                <Ionicons name={icon2} size={24} color={brand} />
  
            </LeftIcon>
            
            <RowContainer2>
          <StyledInputLabel2> {label}  </StyledInputLabel2>
          <StyledEtoile> {etoile}  </StyledEtoile>
          </RowContainer2>
                
                    
                    <StyledTextInput  {...props} />
                    

  
        </View>
    );
  
  }
  const MyTextInput2 = ({ label, icon,icon2, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={24} color={brand} />
            </LeftIcon>
            <LeftIcon>
                <Ionicons name={icon2} size={24} color={brand} />
            </LeftIcon>
            <StyledInputLabel2> {label}</StyledInputLabel2>
            <StyledTextInput  {...props} />
        </View>
    );
  
  }
  const styles = StyleSheet.create({
    
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      
      header: {
        flexDirection: 'row',
        alignContent: 'center',
        //justifyContent:'space-between',
        marginTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 0.25,
        borderBottomColor: darkLight,
        marginLeft: -15,
        marginRight: -25,
    
      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: brand,
        alignItems:'center',
        marginLeft:20,
    
      },
      backButton: {
        marginRight: 50,
        marginLeft: ScreenWidth - 380,
      },
   
   
    dropdownButton: {
      backgroundColor: secondary,
      alignItems:'center',
      borderRadius:20,
      padding:15,
      paddingLeft:55,
      height:60,
      marginVertical:3,
       marginBottom:10,
      shadowOpacity:0.25,
       shadowOffset:2,
        shadowRadius:1,
      marginLeft:-10,
       marginRight:-10, 
    },
    dropdownButtonText: {
      fontSize: 17,
      color: '#333',
    
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
  },
  comentaire: {
    //flex:1,
    backgroundColor :secondary,
    padding:25,
    paddingLeft:55,
    borderRadius: 20,
    fontSize:16,
    height:70,
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
    shadowOpacity:0.25,
    shadowOffset:2,
    shadowRadius:1,
    marginLeft:-10,
    marginRight:-10
 
   },
   dropdownButton: {
     backgroundColor: secondary,
     alignItems:'center',
     marginTop:-10,
     
     
   },
   dropdownButtonText: {
     fontSize: 16,
     color: brand,
   
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
   dropdownIcon: {
    left:10,
    position:'absolute',
    zIndex:1,     

  },
});


export default AddMedecin;
