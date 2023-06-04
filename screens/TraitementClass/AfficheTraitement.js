import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState, useContext } from 'react';
import { CredentialsContext } from '../../components/CredentialsContext';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import { Formik , FieldArray } from 'formik';
import { InnerContainer, StyledContainer2, LeftIcon, StyledInputLabel, StyledTextInput, StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularButton3 from '../../components/Buttons/RegularButton3';
//import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
//import { Notifications } from 'expo';
//import * as Permissions from 'expo-permissions';

const { brand, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7); 
justify-content:center;
`;


const AfficheTraitement = ({ navigation , route }) => {
  const { selectedTraitement } = route.params;
  const id = selectedTraitement._id
  //console.log("id" , id);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formCount, setFormCount] = useState(1);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

//date___________________________________________________________________________________________________
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

//Delete Modal___________________________________________________________________________________________
  const buttonHandler = (isDeleteConfirmed) => {
    if (isDeleteConfirmed) {
      handleDelete();
    }
    setModalVisible(false);
  };
  const openModal = () => {
    ShowModal('success', 'Confirmation', 'Êtes-vous sûr de supprimer ce medicament ?', 'OK', 'Cancel');
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


//Delete_______________________________________________________________________________________________
 const handleDelete = async () => {
      try {
        const response = await fetch(`${ngrokLink}traitement/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
        navigation.navigate('ListeVaccin');
      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };

//Modifier______________________________________________________________________________________________
const handleModify = () => {
    setShowModal(false);
    navigation.navigate('ModifyVaccin' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})   
     };
//fontion notif_________________________________________________________________________________________

//fontion rappel_________________________________________________________________________________________
const submitRappel = async (values, setSubmitting) => {
  handleMessage(null);
  setSubmitting(true);
  const data = {
    rappels: values.rappels,
    userEmail: email,
    idTraitement: selectedTraitement._id,
    dateDeCommencement: selectedTraitement.dateDeCommencement,
    medicament: selectedTraitement.medicament
  };
  try {
    const response = await axios.post(`${ngrokLink}rappel/add`, data, { headers: { 'Content-Type': 'application/json' } });
    // Schedule notifications for each rappel time
    const rappels = response.data.rappels;
    await scheduleNotifications(rappels);

    console.log(response.data);
    navigation.navigate('ListeRappel');
    setSubmitting(false);
  } catch (error) {
    setSubmitting(false);
    handleMessage(error.message);
    console.error(error);
  }
};
const scheduleNotifications = async (rappels) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus.status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus.status !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  rappels.forEach(async (rappel, index) => {
    const rappelTime = new Date(rappel.heure); // Assuming rappel.heure is a valid date/time string
    const schedulingOptions = {
      content: {
        title: 'Rappel',
        body: "C'est l'heure du rappel !",
      },
      trigger: {
        hour: rappelTime.getHours(),
        minute: rappelTime.getMinutes(),
        repeats: true,
      },
    };

    const identifier = await Notifications.scheduleNotificationAsync(schedulingOptions);
    console.log(`Notification scheduled for rappel ${index}, identifier: ${identifier}`);
  });
};
    
const handleMessage = (message, type = 'FAILED') => {setMessage(message);setMessageType(type);};
return (     
<KeyboardAvoidingWrapper>
      <StatusBar style="light" />
    <View style={styles.container}>
        <StatusBar style="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>       Detail du medicament</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
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
      <Text style={styles.title}>{selectedTraitement.medicament}</Text>

        <View style={styles.sectionContent}>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Date De Commencement: </Text>
            <Text style={styles.sectionItem3}>{selectedTraitement.dateDeCommencement}</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>À apprendre  </Text>
            <Text style={styles.sectionItem3}>{selectedTraitement.nbrfois}</Text>
            <Text style={styles.sectionItem2}>  fois tous les  </Text>
            <Text style={styles.sectionItem3}>{selectedTraitement.nbrJours}</Text>
            <Text style={styles.sectionItem2}>  jours</Text>
            </View>
            </View>          
            <View style={styles.rappelContainer} >
           <View  style={{flexDirection: 'row', alignItems: 'center'}}>
  <Text style={{ color:'black', marginLeft:15, fontSize:19,fontWeight:'400', marginTop:15}}>Personnalisez vos rappels si vous voulez recevoir des notifications</Text>
            </View>
            <View>
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
           <DateTimePicker style={styles.date}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:40, marginBottom:15 }}>
                <AntDesign name="pluscircleo" size={22} color={brand} />
               <Text style={{ color: brand, marginLeft:10, fontSize:17}}>Ajouter un autre rappel</Text>
                </View>

                  </TouchableOpacity>
                )}
              </View>
            )}
          />
          <MsgBox type={messageType}>
                  {message}
                </MsgBox>
                <View style={{ justifyContent: 'center' ,left:0, top:10}}>
                  {!isSubmitting && <RegularButton3 onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <ButtonText>
                      Enregister
                    </ButtonText>
                  </RegularButton3>}

                  {isSubmitting && <RegularButton3 disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </RegularButton3>}
                </View>
                </View>

        </View>
          
      </View>
      


      <Modal visible={showModal} animationType="slide" transparent={true}>
      <ModalPressableContainer onPress={() => setShowModal(false)}>

    <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <TouchableOpacity /*onPress={handleModify}*/>
        <View style={[styles.modalButton]}>
          <Text style={{  color: '#007AFF',fontSize:'20',marginBottom:15 }}>  Modifier  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={openModal}>
        <View style={[styles.modalButton]}>
          <Text style={{  color: red ,fontSize:'20',marginBottom:15, }}>Supprimer  </Text>
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => setShowModal(false)}>
        <View style={[styles.modalCancelButton]}>
          <Text style={{ color: '#007AFF', fontSize:'18',marginBottom:15, fontWeight:'bold'}}>Annuler</Text>
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

rappelContainer:{
  //borderWidth:1,
  margingtop:30,
  marginLeft:-20,
  marginRight:-20,
  backgroundColor:'#f0f0f0',
  borderRadius: 20,
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    elevation:5,
}, 
  header: {
   flexDirection: 'row',
    alignItems: 'center',
    //justifyContent:'space-between',
    marginTop: StatusBarHeight ,
    paddingBottom: 5,
    borderBottomWidth: 0.25,
    borderBottomColor: darkLight,
    //marginLeft: -25,
    //marginRight: -25,
  },
  sectionContent: {
    //backgroundColor: '#f0f0f0',
    padding: 10,
    //paddingRight:10,
    borderRadius: 20,
    //shadowOpacity:0.25,
    //shadowOffset:{width:0.5,height:2},
    //shadowRadius:1,
    //elevation:5,
    marginLeft: -40,
    marginRight:-40,
    alignItems: 'center',
    marginBottom:5,
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
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  moreButton: {
    padding: 10,
    marginLeft:40,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color:brand,
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
    marginLeft:30, 
    marginTop:10
  },
  date: {
    //flex:1,
    //padding:25,
    //paddingLeft:55,
    height:90,
    marginVertical:-65,
    marginLeft:80,
    //marginTop:-65,
    marginRight:70,
    marginBottom:-3,
  },
});
export default AfficheTraitement