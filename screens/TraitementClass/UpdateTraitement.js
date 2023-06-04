import React, { useContext, useState } from 'react';
import {  View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Formik , FieldArray } from 'formik';
import { Fontisto, Octicons, AntDesign } from '@expo/vector-icons';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer, Colors, LeftIcon, StyledInputLabel, StyledTextInput, StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton from '../../components/Buttons/RegularButton';
import { ngrokLink } from '../../config';
import ListeConsultation from '../ConsultationClass/AfficheConsultation';


const { brand, green,darkLight, primary, secondary,tertiary,red } = Colors;

const UpdateTraitement = ({ navigation , route  }) => {
 

 //take consultationId from route ___________________________________________________ 
//const consultationId = route.params.consultationId
//console.log('ID' , consultationId)

//take email from storedCredentials__________________________________________________
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
    //console.log(email);

//Variable Message_____________________________________________________________________
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [formCount, setFormCount] = useState(1);

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
  //________________________________________________________________________________________________________________

  
  //Add Traitement__________________________________________________________________________________________________       

  const submitTraitement = async (values, setSubmitting) => {
    handleMessage(null);
    setSubmitting(true);
  
    const data = {
      cout: values.cout,
      remboursement: values.remboursement,
      medicaments: values.medicaments,
      userEmail: email,
      idConsultation: consultationId,
    };
  
    try {
      const response = await axios.post(
        `${ngrokLink}traitement/add`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      navigation.navigate('ListeConsultation')
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
  
  
  
  
  //Message________________________________________________________________________________
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };


//JSX_________________________________________________________________________________
  return (
    <> 
     <View style={styles.header}>
          <View  style={styles.backButton}>
          </View>
          <Text style={styles.headerTitle}> Modifier votre traitement</Text>
        </View>
    
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
       
        <InnerContainer>
          <Formik
            initialValues={{cout: '', remboursement: '', medicaments: [{ dateDeCommencement: "", nbrfois: "", nbrJours: "", nommedicament: "" }]
             }}
            onSubmit={(values, { setSubmitting }) => {
              submitTraitement(values, setSubmitting);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, isSubmitting }) => (
              <StyledFormArea>
         <View style={{paddingBottom:200, marginTop:-50}}>
         <Text style={styles.label3}>Dépenses du traitement: </Text>
         <Text style={styles.label4}>Coût                                 Remboursement</Text>
            <TextInput
            style={styles.cout}
            placeholder="100.0"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('cout')}
            value={values.cout}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.remboursement}
            placeholder="70.0"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('remboursement')}
            value={values.remboursement}
            keyboardType="phone-pad"
          />
          <FieldArray
            name="medicaments"
            render={(arrayHelpers) => (
              <View>
                {values.medicaments.map((medicament, index) => (
                  <View key={index}>
                    <Text style={styles.label3}>Médicament {index + 1}:</Text>
                    <View style={{ flexDirection: "column", marginTop:5, marginBottom:30 }}>
                        <MyTextInput
                        label="Médicament"
                          onChangeText={(value) =>
                            arrayHelpers.replace(index, {
                              ...medicament,
                              nommedicament: value
                            })
                          }
                          value={medicament.nommedicament}
                        />
                        <Text style={styles.label}>Date de commencement</Text>
           <DateTimePicker style={styles.date}
              value={date}
              mode="date"
              //is24Hour={true}
              display="spinner"
              onChangeText={(value) =>
                arrayHelpers.replace(index, {
                  ...medicament,
                  dateDeCommencement: value
                })
              }
                locale="fr"
      onPress={handleShowDatePicker}
      //style={{ position: 'absolute', bottom: 0, left: 0 }}

               />
                      <View style={styles.inputContainer}>
      <Text style={styles.label}>A prendre</Text>

        <TextInput
          style={[styles.input]}
          placeholder="1"
          keyboardType="phone-pad"
          onChangeText={(value) =>
            arrayHelpers.replace(index, {
              ...medicament,
              nbrfois: value
            })
          }
          value={medicament.nbrfois}
          />
        <Text style={styles.label}>fois pendant</Text>
        <TextInput
          style={[styles.input]}
          placeholder="1"
          keyboardType="phone-pad"
          onChangeText={(value) =>
            arrayHelpers.replace(index, {
              ...medicament,
              nbrJours: value
            })
          }
          value={medicament.nbrJours}

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
                        nommedicament: "",
                        dateDeCommencement: "",
                        nbrfois: "",
                        nbrJours: ""

                        
                      });
                      setFormCount((formCount + 1).toString());
                    }}
                    
                  >
                <View style={{ flexDirection: 'row-reverse', alignSelf: 'center',alignItems:'center'}}>
                <Text style={{ fontWeight:'300',fontSize:18,color: brand, marginLeft: 5 }}>Ajouter une autre Traitement</Text>
                <AntDesign name="pluscircleo" size={24} color={brand} />
                </View>

                  </TouchableOpacity>
                )}
              </View>
            )}
          />
  <MsgBox type={messageType}>{message}</MsgBox>
    <View style={{ justifyContent: 'center' }}>
      {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <ButtonText>Ajouter</ButtonText>
        </RegularButton>}
      {isSubmitting && <RegularButton disabled={true}>
          <ActivityIndicator size="large" color={primary} />
         </RegularButton>}
    </View>
    <Text style={styles.sectionTitleP}>Le medecin ne vous a donné aucun traitement?</Text>
                <ExtraView>
<TextLink onPress={() => navigation.navigate(ListeConsultation)}>
  <TextLinkContent style={styles.ignor}>
  Ignorer l'etape
  </TextLinkContent>
</TextLink>
</ExtraView>
  </View>      
    </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
    </>

  );
}
//TExtInput Modal _______________________________________________________________
const MyTextInput = ({ label, icon, icon2,  ...props }) => {
  return (
    <View>
      <StyledInputLabel2> {label}</StyledInputLabel2>
      <LeftIcon>
        <Octicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <LeftIcon>
        <Fontisto name={icon2} size={25} color={brand} marginTop='10' />
      </LeftIcon>
     
          <StyledTextInput  {...props} />
       
     

    </View>
  );

}
//Styles____________________________________________________________________________
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
    //color:brand,
    // marginBottom: 0,
    marginTop: 5,
  },
  label4: {
    fontSize: 16,
fontWeight:'bold',
    // marginBottom: 1,
    //color: brand,
    marginTop: 8,
  },
  label2: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginBottom: 10,
    //color: brand,
    marginTop: -5,
  },
  label3: {
    fontSize: 20,
    marginBottom: 5,
    color: brand,
    //marginTop: 5,
    fontWeight:'600',
    marginLeft:-25,
    marginTop:25,
  
  },
  ignor:{
    //backgroundColor:'white',
    marginTop:-20,
    //fontWeight:'500',
    fontSize:16,
    //shadowOpacity: 0.25,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 1,
    //elevation: 5,
    padding:10,
    marginBottom:15,
    //borderWidth:0.2,
    //borderColor:darkLight
    //color:'white'
  },
  sectionTitleP: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 10,
   // color: tertiary,
    marginTop:30,
    marginLeft:-35,
    marginRight:-35,
    //backgroundColor:'white',
    //shadowOpacity: 0.25,
    //shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 5,
    borderRadius:3,
    //padding:4
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
    marginTop: 25,
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
    marginRight: 60,
    marginLeft: ScreenWidth - 350,
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
    marginBottom: 10,
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

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  export default UpdateTraitement; 
