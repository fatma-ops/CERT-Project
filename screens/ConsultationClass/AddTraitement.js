import React, { useContext, useState } from 'react';
import {  View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Formik , FieldArray } from 'formik';
import { Fontisto, Octicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { CredentialsContext } from '../../components/CredentialsContext';
import { InnerContainer, StyledContainer, Colors, LeftIcon, StyledInputLabel, StyledTextInput, StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle, Line, ExtraText, StyledEtoile } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton2 from '../../components/Buttons/RegularButton2';
import RegularButton from '../../components/Buttons/RegularButton';
import { ngrokLink } from '../../config';
import ListeConsultation from './ListeConsultation';
import RowContainer from '../../components/Containers/RowContainer';
import RowContainer2 from '../../components/Containers/RowContainer2';


const { brand, green,darkLight, primary, secondary,tertiary,red } = Colors;

const AddTraitement = ({ navigation , route  }) => {
 

 //take consultationId from route ___________________________________________________ 
const consultationId = route.params.consultationId
console.log('ID' , consultationId)

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
      navigation.goBack()
      navigation.goBack()
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
          <Text style={styles.headerTitle}>               Ajouter votre traitement</Text>
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
         <View style={{paddingBottom:200, marginTop:5}}>
         <Text style={styles.label3}>Dépenses du traitement: </Text>
         <RowContainer>
                <Text style={styles.label2}>Coût</Text>
                <Text style={styles.label2}>Remboursement</Text>
                </RowContainer>
                <View style ={{marginLeft:10}}>
            <TextInput
            style={styles.cout}
            placeholder="100.0"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('cout')}
            value={values.cout } // Convert to string if not null or undefined
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.remboursement}
            placeholder="70.0"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('remboursement')}
            value={values.remboursement} // Convert to string if not null or undefined
            keyboardType="phone-pad"
          />
          </View>
          <FieldArray
            name="medicaments"
            render={(arrayHelpers) => (
              <View>
                {values.medicaments.map((medicament, index) => (
                  <View key={index}>
                    <Text style={styles.label3}>Médicament {index + 1}: </Text>
                    <View style={{ flexDirection: "column", marginTop:5, marginBottom:30 }}>
                        <MyTextInput
                        label="Médicament"
                        etoile="*"
                        icon='medical-bag'
                          onChangeText={(value) =>
                            arrayHelpers.replace(index, {
                              ...medicament,
                              nommedicament: value
                            })
                          }
                          value={medicament.nommedicament}
                        />
                        <Text style={styles.label}>Date de commencement <Text style={{ color: 'red' }}>*</Text></Text>
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
    <Line />

    <Text style={styles.sectionTitleP}>Le medecin ne vous a donné aucun traitement?</Text>
                <ExtraView>
<TextLink onPress={() => {navigation.goBack(), navigation.goBack()}}>
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
const MyTextInput = ({ label,etoile, icon, icon2,  ...props }) => {
  return (
    <View>
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={24} color={brand} />
      </LeftIcon>
      <LeftIcon>
        <Fontisto name={icon2} size={25} color={brand} marginTop='10' />
      </LeftIcon>
     
      <RowContainer2>
        <StyledInputLabel2> {label}  </StyledInputLabel2>
        <StyledEtoile> {etoile}  </StyledEtoile>
        </RowContainer2>
              
                  
                  <StyledTextInput  {...props} />
       
     

    </View>
  );

}
//Styles____________________________________________________________________________
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    opacity:1,
    paddingBottom:300
    //justifyContent:'space-between',

  },
  sectionTitleP:{
    fontSize:15,
    marginLeft:-20,
    marginRight:-15,
    marginTop:5,
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
    // marginBottom: 0,
    marginTop: 5,
    //color:brand,
  },
  label3: {
    fontSize: 19,
    fontWeight: 'bold',
    // marginBottom: 0,
    marginTop: 5,
    color:brand,

  },
  inputContainer:{
    flexDirection:'row'
  },
  input: {
    backgroundColor: secondary , // Replace 'secondary' with the desired color value
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
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
    marginLeft: ScreenWidth - 350,
  },
  moreButton: {
    marginLeft:50,
    alignItems:'center'
  },
  sectionContent: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    //paddingRight:10,
    borderRadius: 20,
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    elevation:5,
    marginLeft: -40,
    marginRight:-40,
    alignItems: 'center',
},
heelo:{
  flexDirection:'row',
  marginRight:5,
  marginLeft:5,
  //marginBottom:10,
  alignContent:'center'
},
heelo2:{
  flexDirection:'row',
  borderBottomColor:secondary,
  alignContent:'center',
  marginTop:30,
  //marginLeft:30,
  alignSelf:'center'
},
   title: {
    //fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    alignSelf:'center',
    fontWeight:'500',
    //color:green,
  },
   sectionItem: {
    fontSize: 20,
    marginBottom: 15,
    //fontWeight:'bold',
    //alignItems:'center',
    color:brand,


  },
  sectionItem3: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight:'250',
    color:brand

    //alignItems:'center',
  },
  sectionItem2: {
    fontSize: 18,
   //marginLeft:-10,
   marginBottom: 15,
    fontWeight: '400',
   alignSelf: 'center',

   //color:brand
  },
 
  modalContainer: {
    //flex: 1,
    backgroundColor:primary,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius:20,
    width: '100%',
    //padding:35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  height: '30%',

  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',   
},
modalButton: {
  paddingHorizontal:115,
  borderBottomWidth:0.6,
  borderColor:darkLight,
  marginTop:15,

},
modalCancelButton: {

  paddingHorizontal: 125,
  marginTop: 15,
},
  content: {
    flex: 1,
    //alignItems: 'center',
    padding: 20,
    marginLeft:30,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
 
  specialite: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  adresse: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  numero: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 5,
  },
  commentaire: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: red,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    marginRight: 10, // Adjust the margin as needed
    resizeMode: 'contain', 
    //marginLeft:30, 
    marginTop:10
  },
  time: {
    //flex:1,
    //padding:25,
    //paddingLeft:55,
    height:90,
    marginVertical:-65,
    marginLeft:50,
    //marginTop:-65,
    marginRight:50,
    marginBottom:-3,
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
    marginBottom: 15,
    color: tertiary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: 155,
    marginRight: -10,
    marginTop: -75,
  },
});

  export default AddTraitement;  