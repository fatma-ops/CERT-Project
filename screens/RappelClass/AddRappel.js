import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useState , useContext, useEffect } from 'react';
import { CredentialsContext } from '../../components/CredentialsContext';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { ScreenWidth, StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import { Formik , FieldArray } from 'formik';
import { InnerContainer, StyledContainer, Colors, LeftIcon,  StyledFormArea, MsgBox, ButtonText,  ViewImage, TextLink, ExtraView, TextLinkContent,  StyledInputLabel2, SubTitle, SelectDropdownStyle, StyledTextInput, StyledEtoile } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton3 from '../../components/Buttons/RegularButton3';
import SelectDropdown from 'react-native-select-dropdown';


const { brand, green, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;
const AddRappel = ({ navigation , route }) => {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState('');
  const [formCount, setFormCount] = useState(1);

    // Fetch the list of contacts from the database____________________________________________________________
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      fetch(`${ngrokLink}medecin/${email}?cache_bust=123456789`)
        .then(response => response.json())
        .then(data => setContacts(data))
        .catch(error => console.error(error));
    }, []);
    const options = contacts.map(contact => contact.nom);


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


  const buttonHandler = (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      handleDelete();
    }
    setModalVisible(false);
  };
  
  const openModal = () => {
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer ce rappel ?', 'OK', 'Cancel');
  };
  
  const ShowModal = (type, headerText, message, confirmButtonText, cancelButtonText) => {
    setShowModal(false);
    setModalMessageType(type);
    setHeaderText(headerText);
    setModalMessage(message);
    setConfirmButtonText(confirmButtonText);
    setCancelButtonText(cancelButtonText);
    setModalVisible(true);
  };
 

     const submitRappel = async (values, setSubmitting) => {
      handleMessage(null);
      setSubmitting(true);
    
      const data = {
        
        rappels: values.rappels,
      };
    
      try {
        const response = await axios.post(
          `${ngrokLink}/api/v1/rappel/add`,
          data,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response.data);
        navigation.navigate('ListeRappel')
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
      <StatusBar style="light" />
    <View style={styles.container}>
        <StatusBar style="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>                   Ajouter rappel        </Text>

      </View>
          <Formik style={styles.container}
           initialValues={{rappels: [{ heure: ""}]}}
       onSubmit={(values, { setSubmitting }) => {
         submitRappel(values, setSubmitting);
       }}
     >
    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, isSubmitting }) => (
              <StyledFormArea>

      <View style={styles.content}>
        
                <Text style={styles.label}>Rappel pour médicament:<Text style={{ color: 'red' }}>*</Text></Text>

                <SelectDropdownStyle>
                  <SelectDropdown
                    data={options}
                    onSelect={(selectedItem, index) => {
                      setFieldValue('contact', selectedItem);
                    }} 
                    renderDropdownIcon={() => (
                      <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
                    )} 
                    defaultButtonText="Choisir médicament"

                    buttonStyle={styles.dropdownButton}
                    buttonTextStyle={styles.dropdownButtonText}
                    dropdownStyle={styles.dropdown}
                    rowStyle={styles.dropdownRow}
                    rowTextStyle={styles.dropdownRowText}
                    buttonTextAfterSelection={(selectedItem, index) => contacts[index].nom}
                  />
                </SelectDropdownStyle>
                 <Text style={styles.label}>Date<Text style={{ color: 'red' }}>*</Text></Text> 
             
                <DateTimePicker
    style={styles.date}
    value={date}
    mode="date"
    display="spinner"
    onChange={onChange}
    locale="fr"
    onPress={handleShowDatePicker}
  />
  <View style={{flexDirection:'row', marginTop:10, marginBottom:25}}>
      <Text style={styles.label}>Repeter pendant   </Text>

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
          //value={medicament.nbrfois}
          />
        <Text style={styles.label}>     jours</Text>
      </View>
            <View>
<Text style={styles.label}>Heure<Text style={{ color: 'red' }}>*</Text></Text> 
          <FieldArray
            name="rappels"
            render={(arrayHelpers) => (
              <View>
               {values.rappels.map((rappel, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "column", marginTop:5, marginBottom:10 }}>   
                    <Image
            source={require('../../assets/img/clock.jpg')}
            style={styles.image}
          />    
           <DateTimePicker style={styles.time}
              value={date}
              mode="time"
              //is24Hour={true}
              display="spinner"
              onChangeText={(value) =>
                arrayHelpers.replace(index, {
                  ...rappel,
                  heure: value
                })
              }      locale="fr"
      onPress={handleShowDatePicker}

    />
                    </View>
                  </View>
                ))}
                {formCount < 4 && (
                  <TouchableOpacity
                    onPress={() => {
                      arrayHelpers.push({
                        heure: "",
                      });
                      setFormCount((formCount + 1).toString());
                    }}
                    
                  >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:-10 }}>
                <AntDesign name="pluscircleo" size={25} color={brand} />
               <Text style={{ color: brand, marginLeft: 10, fontSize:17 }}>Ajouter un autre rappel</Text>
                </View>

                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
          
      </View>
      <MsgBox type={messageType}>
                  {message}
                </MsgBox>
                <View style={{ justifyContent: 'center' ,left:25, top:-10}}>
                  {!isSubmitting && <RegularButton3 onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <ButtonText>
                      Enregister
                    </ButtonText>
                  </RegularButton3>}
                

                  {isSubmitting && <RegularButton3 disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </RegularButton3>}
                  <TextLink onPress={() => navigation.goBack()}>
                    <TextLinkContent style={{ paddingRight:-40, }} >
                      Annuler
                    </TextLinkContent>
                  </TextLink>
                </View>
                  
      

      <Modal visible={showModal} animationType="slide" transparent={true}>
      <ModalPressableContainer onPress={() => setShowModal(false)}>

    <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <TouchableOpacity /*onPress={handleModify}*/>
        <View style={[styles.modalButton]}>
          <Text style={{  color: '#007AFF',marginBottom:15 }}>  Modifier  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={openModal}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: red ,marginBottom:15, }}>Supprimer  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => setShowModal(false)}>
        <View style={[styles.modalCancelButton]}>
          <Text style={{ color: '#007AFF',marginBottom:15, fontWeight:'bold'}}>Annuler</Text>
        </View>
        </TouchableOpacity>
      </View>

    </View>
    </ModalPressableContainer>

  </Modal>
        <MessageModalImage2 
      modalVisible={modalVisible} 
      buttonHandler={buttonHandler} 
      type={modalMessageType} 
      headerText={headerText}
      message={modalMessage}
      confirmButtonText={confirmButtonText}
      cancelButtonText={cancelButtonText} 
    />
    </StyledFormArea>

    )}
    </Formik>
    </View>
   
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    opacity:1,
    paddingBottom:300
    //justifyContent:'space-between',

  },
    label: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 0,
    marginTop: 5,
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
});

export default AddRappel