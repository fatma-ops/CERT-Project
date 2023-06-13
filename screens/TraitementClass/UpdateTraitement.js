import React, { useContext, useState , useEffect} from 'react';
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
import RowContainer from '../../components/Containers/RowContainer';
import ListeConsultation from '../../screens/ConsultationClass/ListeConsultation'
import RowContainer2 from '../../components/Containers/RowContainer2';
     
const { brand, green,darkLight, primary, secondary,tertiary,red } = Colors;

const UpdateTraitement = ({ navigation , route  }) => {
  

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
      const response = await axios.put(
        `${ngrokLink}traitement/modifier/${traitements._id}`,
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

  const [traitementActuel, setTraitementActuel] = useState({});
  const [traitements, setTraitements] = useState([]);

  useEffect(() => {
    const fetchTraitements = async () => {
      try {
        const response = await axios.get(`${ngrokLink}traitement/traitements/${email}/${consultationId}`);
        setTraitements(response.data);
        if (response.data.length > 0) {
          setTraitementActuel(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTraitements();
  }, [email, consultationId]);
  console.log(traitementActuel.cout);
  console.log(traitementActuel.remboursement)
  console.log(traitementActuel.medicaments)



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
          <Text style={styles.headerTitle}>   Modifier votre traitement</Text>
        </View>
    
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
       
        <InnerContainer>
          <Formik
            initialValues={{
             cout: traitementActuel && traitementActuel.cout !== undefined ? traitementActuel.cout : "",
  remboursement: traitementActuel && traitementActuel.remboursement !== undefined ? traitementActuel.remboursement : "",
  medicaments: traitementActuel && traitementActuel.medicaments ? traitementActuel.medicaments.map((medicament) => ({
    ...medicament,
    nbrfois: medicament.nbrfois || "",
    nbrJours: medicament.nbrJours || "",
    dateDeCommencement: medicament.dateDeCommencement || "",
  })) : [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Vérifier si les champs obligatoires sont vides
              const hasEmptyFields = values.medicaments.some(
                (medicament) =>
                  medicament.nommedicament === '' 
              );
              

              if (values.medicaments.length === 0) {
                handleMessage('Veuillez ajouter au moins un médicament');
                setSubmitting(false);
              } else if (hasEmptyFields) {
                handleMessage('Veuillez remplir les champs obligatoires');
                setSubmitting(false);
              } else {
                submitTraitement(values, setSubmitting);
              }
              
              
  }}
          
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, isSubmitting }) => (
              <StyledFormArea>
         <View style={{paddingBottom:200, marginTop:-30}}>
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
            value={values.cout ? values.cout.toString() : traitementActuel.cout ? traitementActuel.cout.toString() : ''}
            keyboardType="phone-pad"
            onBlur={handleBlur('cout')}

          />

          <TextInput
            style={styles.remboursement}
            placeholder="70.0"
            placeholderTextColor={darkLight}
            onChangeText={handleChange('remboursement')}
            value={values.remboursement ? values.remboursement.toString() : traitementActuel.remboursement ? traitementActuel.remboursement.toString() : ''}
            keyboardType="phone-pad"
          />
          </View>
          <FieldArray
            name="medicaments"
            render={(arrayHelpers) => (
              <View>
                {traitementActuel.medicaments && traitementActuel.medicaments.map((medicament, index) => (
                  <View key={index}>
                    <Text style={styles.label3}>Médicament {index + 1}:</Text>
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
          value={medicament.nbrfois ? medicament.nbrfois.toString() : ''}
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
          value={medicament.nbrJours ? medicament.nbrJours.toString() : ''}

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
          <ButtonText>Enregistrer</ButtonText>
        </RegularButton>}
      {isSubmitting && <RegularButton disabled={true}>
          <ActivityIndicator size="large" color={primary} />
         </RegularButton>}
    </View>
    <Line />

    <Text style={styles.sectionTitleP}>Le médecin ne vous a donné aucun traitement?</Text>
                <ExtraView>
<TextLink onPress={() => {navigation.goBack(),navigation.goBack(),navigation.goBack()}}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 0,
    marginTop: 5,
  },
  label4: {
    fontSize: 16,
    fontWeight: 'bold',
    color: brand, 
    marginBottom: 1,
    marginTop: 8,
  },
  label2: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: -5,
    fontWeight:'bold'
  },
  label3: {
    fontSize: 18,
    marginBottom: 5,
    color: brand, 
    fontWeight: '600',
    marginLeft: -25,
    marginTop: 15,
  },
  ignor: {
    backgroundColor: 'white',
    marginTop: -20,
    fontSize: 16,
    padding: 10,
    marginBottom: 15,
  },
  sectionTitleP: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 10,
    color: tertiary, 
    marginTop: 30,
    marginLeft: -35,
    marginRight: -35,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 3,
    alignSelf:'center'
  },
  date: {
    height: 90,
    marginVertical: -10,
    marginBottom: 7,
    marginHorizontal: -15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingBottom: 15,
    borderBottomWidth: 0.25,
    borderBottomColor: darkLight , 
    marginLeft: -25,
    marginRight: -25,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: brand , 
    alignItems: 'center',
    alignSelf:'center'
  },
  backButton: {
    marginRight: 60,
    marginLeft: ScreenWidth - 350,
  },

  
  depense: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  cout: {
    backgroundColor: secondary , 
    paddingLeft: 25,
    borderRadius: 20,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 15,
    color: tertiary , 
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: -10,
    marginRight: 165,
  },
  remboursement: {
    backgroundColor: secondary, 
    paddingLeft: 25,
    borderRadius: 20,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 0,
    color: tertiary, 
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    elevation: 5,
    marginLeft: 155,
    marginRight: -10,
    marginTop: -75,
  },

  dateContainer: {
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
    backgroundColor: secondary , 
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
});

  export default UpdateTraitement; 
