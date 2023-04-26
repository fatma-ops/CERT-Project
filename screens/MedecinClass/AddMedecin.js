import React, { useContext , useState } from 'react';
import { View,  StatusBar, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import {  Octicons, Ionicons, AntDesign } from '@expo/vector-icons';

import MessageModal from '../../components/Modals/MessageModal';

import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer , Colors , LeftIcon , StyledInputLabel , StyledTextInput,StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, StyledTextCommentaire} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import SelectDropdown from 'react-native-select-dropdown';
import { StatusBarHeight } from '../../components/shared';

const { brand, darkLight, primary , secondary } = Colors;

const  AddMedecin = ({navigation}) =>  {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
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
              'https://9616-41-225-241-147.ngrok-free.app/api/v1/medecin/add',
              data,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
            console.log(response.data);
            navigation.navigate('ListeMedecin')

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
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un contact</Text>
      </View>
     

     <InnerContainer>  
                    <SubTitle></SubTitle>
                   
                    


    <Formik
      initialValues={{ nom: '', adresse: '', specialite: '', numero:'' , commentaire:'' }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.nom == ''||values.adresse == ''||values.specialite == ''||values.numero == '' ) {
            handleMessage('Veuillez remplir  les champs');
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
           placeholder="Analyse"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('nom')}
           onBlur={handleBlur('nom')}
           value={values.nom}
                              
                          />
         
         <Text style={styles.label}>Spécialité</Text>
             
                          
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
  buttonStyle={styles.dropdownButton}
  buttonTextStyle={styles.dropdownButtonText}
  dropdownStyle={styles.dropdown}
  rowStyle={styles.dropdownRow}
  rowTextStyle={styles.dropdownRowText}
  defaultButtonText="Choisir la spécialité"
/>

        
                           <MyTextInput
           label="Adresse"
           icon="location"
           placeholder="Analyse"
           placeholderTextColor={darkLight}
           onChangeText={handleChange('adresse')}
           onBlur={handleBlur('adresse')}
           value={values.adresse}
                              
                          />
                           <MyTextInput
           label="numero"
           icon2="call-outline"
           placeholder="+216 *** *** *** ** "
           placeholderTextColor={darkLight}
           onChangeText={handleChange('numero')}
           onBlur={handleBlur('numero')}
           value={values.numero}
           keyboardType="phone-pad"
           
                              
                          />
                           <MyTextInput2
           label="commenataire"
          
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
                          {!isSubmitting && <RegularButton3 onPress={handleSubmit} style={{ justifyContent: 'center' , alignSelf:'center'}}>
                                    <ButtonText >
                                      Ajouter
                                    </ButtonText>
                                </RegularButton3>}

                                {isSubmitting && <RegularButton3 disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton3>}
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

const MyTextInput = ({ label, icon,icon2, ...props }) => {
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
      
       
        marginTop:StatusBarHeight -100,
        paddingBottom: 20,
        borderBottomWidth: 1,
        
        borderBottomColor: darkLight,
      },
      backButton: {
        marginRight: 10,
        marginLeft: -9
      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
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
  });
  export default AddMedecin; 