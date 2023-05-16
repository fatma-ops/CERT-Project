import React, { useContext, useState, useEffect , useRef  } from 'react';

import { Alert, View, Text, Button, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Formik , FieldArray } from 'formik';
import { Fontisto, Octicons, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import MessageModal from '../../components/Modals/MessageModal';
import { StatusBarHeight } from '../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { KeyboardAvoidingView } from 'react-native-web';
import { InnerContainer, StyledContainer, Colors, LeftIcon, StyledInputLabel, StyledTextInput, StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton from '../../components/Buttons/RegularButton';
import SelectDropdown from 'react-native-select-dropdown';
import { ngrokLink } from '../../config';
import { useRoute } from '@react-navigation/native';


const { brand, darkLight, primary, secondary, tertiary,red } = Colors;

const AddTraitement = ({ navigation , route  }) => {
 

 //take consultationId from route ___________________________________________________ 
//const consultationId = route.params.consultationId
//onsole.log(consultationId)
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [formCount, setFormCount] = useState(1);


  


  //_______________________________________
  const { email } = storedCredentials;
  //console.log(email);
  //_______________________________________

  



  //date________________________________________
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState();
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }));
  }
  const handleShowDatePicker = () => {
    setShow(true);
  };

  //Modal ________________________________________________
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [buttonText, setButtonText] = useState('');

  const buttonHandler = () => {
    if (modalMessageType === 'success') {
      //do something
    }

    setModalVisible(false);
  };

  const ShowModal = (type, headerText, message, buttonText) => {
    setModalMessageType(type);
    setHeaderText(headerText);
    setModalMessage(message);
    setButtonText(buttonText);
    setModalVisible(true);
  }
  //____________________________________________________________________

  
  //______________________________________________________________       

  const submitTraitement = async (values, setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);

    const formData = new FormData();
    formData.append('cout', values.cout);
    formData.append('remboursement', values.remboursement);

// Append traitements array directly
values.traitements.forEach((traitement, index) => {
  formData.append(`traitements[${index}][nbrJours]`, traitement.nbrJours);
  formData.append(`traitements[${index}][nbrfois]`, traitement.nbrfois);
  formData.append(`traitements[${index}][dateDeCommencement]`, traitement.dateDeCommencement);
  formData.append(`traitements[${index}][medicament]`, traitement.medicament);

});
//formData.append('idConsultation', consultationId);

formData.append('userEmail', email);




    try {
      const response = await axios.post(`${ngrokLink}/api/v1/traitement/add`, formData, {
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
            initialValues={{cout:"",remboursement:"", traitements: [{ dateDeCommencement: "", nbrfois: "", nbrJours: "", medicament: "" }]
             }}
            onSubmit={(values, { setSubmitting }) => {
              
                submitTraitement(values, setSubmitting);


              

            }}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, isSubmitting }) => (
              <StyledFormArea>


               
              
                
                

                
                <Text style={styles.sectionTitleP}>Dépenses</Text>
                <Text style={styles.label2}>Coût                                 Remboursement</Text>

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
                onBlur={handleBlur('remboursement')}
                value={values.remboursement}
                keyboardType="phone-pad"
                />


                <Text style={styles.sectionTitleP}>Traitement(s)</Text>

                <View>
          <FieldArray
            name="traitements"
            render={(arrayHelpers) => (
              <View>
                {values.traitements.map((traitement, index) => (
                  <View key={index}>
                    <Text style={styles.label3}>------------Traitement {index + 1}------------</Text>
                    <View style={{ flexDirection: "column", marginTop:5, marginBottom:30 }}>
                        <MyTextInput
                        label="Médicament"
                          onChangeText={(value) =>
                            arrayHelpers.replace(index, {
                              ...traitement,
                              medicament: value
                            })
                          }
                          value={traitement.medicament}
                        />

                      
                        <Text style={styles.label}>Date de commencement</Text>
           <DateTimePicker style={styles.date}
              value={date}
              mode="date"
              //is24Hour={true}
              display="spinner"
              onChangeText={(value) =>
                arrayHelpers.replace(index, {
                  ...traitement,
                  date: value
                })
              }      locale="fr"
      onPress={handleShowDatePicker}
      //style={{ position: 'absolute', bottom: 0, left: 0 }}

    />
                      <View style={styles.inputContainer}>
      <Text style={styles.label}>Apprendre</Text>

        <TextInput
          style={[styles.input]}
          placeholder="1"
          keyboardType="phone-pad"
          onChangeText={(value) =>
            arrayHelpers.replace(index, {
              ...traitement,
              nbrfois: value
            })
          }
          value={traitement.nbrfois}
          />
        <Text style={styles.label}>fois dans les</Text>
        <TextInput
          style={[styles.input]}
          placeholder="1"
          keyboardType="phone-pad"
          onChangeText={(value) =>
            arrayHelpers.replace(index, {
              ...traitement,
              nbrJours: value
            })
          }
          value={traitement.nbrJours}

        />
        <Text style={styles.label}>jours</Text>
      </View>


                      
                     
                    </View>
                  </View>
                ))}
                {formCount < 4 && (
                  <TouchableOpacity
                    onPress={() => {
                      arrayHelpers.push({
                        dateDeCommencement: "",
                        nbrfois: "",
                        nbrJours: "",
                        medicament: ""
                      });
                      setFormCount((formCount + 1).toString());
                    }}
                    
                  >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <AntDesign name="pluscircleo" size={25} color={brand} />
  <Text style={{ color: brand, marginLeft: 5 }}>Ajouter une autre Traitement</Text>
</View>

                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>


                <MsgBox type={messageType}>
                  {message}
                </MsgBox>
                <View style={{ justifyContent: 'center' }}>
                  {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf: 'center' }}>
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
                    <TextLinkContent style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }} >
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

const MyTextInput = ({ label, icon, icon2, isPassword, hidePassword, isDate, showDatePicker, setHidePassword, ...props }) => {
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
    marginTop: 5,
  },
  label2: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginBottom: 10,
    //color: brand,
    marginTop: -5,
  },
  label3: {
    fontSize: 18,
    // marginBottom: 1,
    color: red,
    marginTop: 5,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent:'space-between',
    marginTop: StatusBarHeight - 42,
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

  },
  backButton: {
    marginRight: 70,
    marginLeft: 9,
  },

  imageContainer:
  {
    backgroundColor: secondary,
    padding: 15,
    paddingLeft: 55,
    borderRadius: 20,
    fontSize: 16,
    height: 150,
    marginVertical: 3,
    marginBottom: 10,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: -10,
    marginRight: -10,
  },
  depense: {
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  cout: {
    backgroundColor: secondary,
    padding: 15,
    paddingLeft: 25,
    //paddingRight:75,
    borderRadius: 20,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 15,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: -10,
    marginRight: 165,
  },
  remboursement: {
    backgroundColor: secondary,
    padding: 15,
    paddingLeft: 25,
    //paddingRight:75,
    borderRadius: 20,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 30,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: 155,
    marginRight: -10,
    marginTop: -75,
  },

  comentaire: {
    //flex:1,
    backgroundColor: secondary,
    padding: 25,
    paddingLeft: 55,
    borderRadius: 20,
    fontSize: 16,
    height: 80,
    marginVertical: 3,
    marginBottom: 10,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: -10,
    marginRight: -10,
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
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    //paddingLeft:55,
    paddingRight: 0,
    height: 50,
    marginVertical: -7,
    marginBottom: 10,
    marginLeft: -10,
    marginRight: -10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    //paddingHorizontal:-50,
    paddingRight: -90,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
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
  dateContainer: {
    //flex:1,
    backgroundColor: secondary,
    padding: 25,
    paddingLeft: 55,
    borderRadius: 20,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: -10,
    marginRight: -10,
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
  sectionTitleP: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: brand,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    shadowOpacity: 0.25,
    shadowOffset: 2,
    shadowRadius: 1,
    elevation: 5,
  },

});
  export default AddTraitement; 