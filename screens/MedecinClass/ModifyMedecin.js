import React, { useContext , useState } from 'react';
import { View,  StatusBar, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';

import MessageModal from '../../components/Modals/MessageModal';

import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, StyledTextCommentaire, SelectDropdownStyle, StyledEtoile, StyledTextInputContainercountry, StyledTextInputcountry} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import SelectDropdown from 'react-native-select-dropdown';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { ngrokLink } from '../../config';
import RegularButton from '../../components/Buttons/RegularButton';
import RowContainer2 from '../../components/Containers/RowContainer2';

const { brand, darkLight, primary , secondary , tertiary } = Colors;

const  ModifyMedecin = ({navigation , route}) =>  {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [selectedValue, setSelectedValue] = useState('option1');
  const [nom, setNom] = useState(route.params.nom);
  const [id, setId] = useState(route.params.id);

    const [adresse, setAdresse] = useState(route.params.adresse);
    const [specialite, setSpecialite] = useState(route.params.specialite);
    const [numero, setNumero] = useState(route.params.numero);
    const [commentaire, setCommenataire] = useState(route.params.commentaire);
      
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
        navigation.navigate('ListeMedecin');
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



 

        const ModifyMedecin = async (values, setSubmitting) => {
            setSubmitting(true);
      
        try {
          const response = await fetch(`${ngrokLink}medecin/put/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             
              nom: values.nom,
              adresse: values.adresse,
              specialite: values.specialite,
              numero: values.numero,
              commentaire: values.commentaire,
              userEmail:values.email
            })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Update the state with the updated user information
            setNom(data.nom);
            
            setSpecialite(data.specialite);
            setAdresse(data.adresse);
            setNumero(data.numero);
            setCommenataire(data.commenataire);
            // Show a success message to the user
           // ShowModal('success', "Contact mis à jour", "Votre contact a été mis à jour avec succès !", 'OK');
           navigation.navigate('ListeMedecin')
          } else {
            // Show an error message to the user
            handleMessage(data.message, 'FAILED');
          }
        } catch (error) {
          console.error(error);
          // Show an error message to the user
          handleMessage('Erreur de serveur. Veuillez réessayer ultérieurement.', 'FAILED');
        } finally {
          setSubmitting(false);
        }
      };
         
      
      const [countryCode, setCountryCode] = useState('TN');
      const [countryCallingCode, setCountryCallingCode] = useState('+216');
      const [phoneNumber, setPhoneNumber] = useState('');
    
      const handleCountrySelect = (country) => {
        setCountryCode(country.cca2);
        setCountryCallingCode(country.callingCode[0]);
        setPhoneNumber('');
      };
    
      const handlePhoneNumberChange = (text) => {
        setPhoneNumber(text);
      };
  


  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
};


  return (
    <>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>    Modifier un  médecin </Text>
      </View>
    
    
    <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="light" />
       
     
     

     <InnerContainer>  
                    <SubTitle></SubTitle>
                   
                    


    <Formik
      initialValues={{ nom: nom, id:id ,email:email, adresse: adresse, specialite: specialite, numero:numero , commentaire:commentaire }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.nom == ''||values.specialite == '' ) {
            handleMessage('Veuillez remplir tous les champs obligatoires');
            setSubmitting(false);
        } else {
            ModifyMedecin(values, setSubmitting);

        }
    
      }}
    >
      {({ handleChange, handleBlur, handleSubmit,setFieldValue , values , isSubmitting }) => (
        <StyledFormArea>
          
         
          <MyTextInput
           label="Nom du médecin"
           icon="person"
           etoile="*"
           placeholder="Dr "
           placeholderTextColor={darkLight}
           onChangeText={handleChange('nom')}
           onBlur={handleBlur('nom')}
           value={values.nom}
          />
         
         <Text style={styles.label}>Spécialité <Text style={{ color: 'red' }}>*</Text></Text>
             
         <SelectDropdownStyle>          
          <SelectDropdown
  label="Spécialité"
  data={specialities}
  onSelect={(selectedItem, index) => {
    setFieldValue('specialite', selectedItem);
  }}
  renderDropdownIcon={() => (
    <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
  )} 
  buttonStyle={styles.dropdownButton}
  buttonTextStyle={styles.dropdownButtonText}
  dropdownStyle={styles.dropdown}
  rowStyle={styles.dropdownRow}
  rowTextStyle={styles.dropdownRowText}
  defaultButtonText={values.specialite ? values.specialite : 'Choisir la spécialité  '}

/>
</SelectDropdownStyle>

        
                           <MyTextInput
           label="Adresse"
           icon="location"
           placeholder="Bizerte , Tunisie"
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
                           <MyTextInput2
           label="Commentaire"
          
           placeholder=""
           placeholderTextColor={darkLight}
           onChangeText={handleChange('commentaire')}
           onBlur={handleBlur('commenataire')}
           value={values.commentaire}
                              
                          />
          

           

          <MsgBox type={messageType}>
                              {message}
                          </MsgBox>
                          <View style={{ justifyContent: 'center' }}>
                          {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center' , alignSelf:'center'}}>
                                    <ButtonText >
                                     Enregistrer
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
    <MessageModal 
                  modalVisible={modalVisible} 
                  buttonHandler = {buttonHandler} 
                  type = {modalMessageType} 
                  headerText = {headerText}
                  message={modalMessage}
                  buttonText={buttonText} /> 
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
                
                    
                    <StyledTextCommentaire  {...props} />
                    
            
  
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
        marginLeft: ScreenWidth - 380,
      },
   
      dropdownContainer: {
        backgroundColor: secondary,
        padding: 15,
        paddingLeft: 55,
        borderRadius: 20,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: tertiary,
        marginLeft: -10,
        marginRight: -10
    
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
        borderRadius: 10,
        backgroundColor: '#fafafa',
        justifyContent: 'center'
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
  });
  export default ModifyMedecin; 