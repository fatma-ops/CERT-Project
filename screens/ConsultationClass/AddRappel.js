import { View, Text, StyleSheet, Image, Modal,Button,TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Colors } from '../../components/styles';
import { useState } from 'react';
import MessageModalImage2 from '../../components/Modals/MessageModalImage2';
import axios from 'axios';
import { ngrokLink } from '../../config';
import styled from 'styled-components';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import { Formik , FieldArray } from 'formik';
import { InnerContainer, StyledContainer, LeftIcon, StyledInputLabel, StyledTextInput, StyledFormArea, MsgBox, ButtonText, StyledButton2, ViewImage, TextLink, ExtraView, TextLinkContent, StyledTextInput2, StyledInputLabel2, PageSignup, SubTitle, SelectDropdownStyle } from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';


const { brand, green, darkLight, primary, red, tertiary,secondary } = Colors;
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;
`;
const AddRappel = ({ navigation , route }) => {
  //const { selectedAnalyse } = route.params;
  //const id = selectedAnalyse._id
  //console.log("id" , id);
  const [modalVisible , setModalVisible] = useState(false);
  const [modalMessageType , setModalMessageType] = useState('');
  const [headerText , setHeaderText]= useState('');
  const [modalMessage , setModalMessage] = useState('');
  const [buttonText , setButtonText] = useState('');
  const [confirmButtonText , setConfirmButtonText] = useState('');
  const [cancelButtonText , setCancelButtonText] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [result, setResult] = useState('');


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
 const handleDelete = async () => {
      try {
        const response = await fetch(`${ngrokLink}/api/v1/rappel/delete/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        setResult(data);
        navigation.navigate('ListeRappel');

      } catch (err) {
        console.error(err);
        setResult('Erreur');
      }
    };
    /*const handleModify = () => {
      setShowModal(false);
      navigation.navigate('ModifyRappel' , {nom: selectedAnalyse.nom, specialite: selectedAnalyse.specialite, adresse:selectedAnalyse.adresse, numero: selectedAnalyse.numero, commentaire: selectedAnalyse.commentaire , id: selectedAnalyse._id})   
     };*/

     const submitRappel = async (values, setSubmitting) => {
        handleMessage(null);
        setSubmitting(true);
        const formData = new FormData();
        formData.append('rappel', values.rappel);
      //formData.append('idConsultation', consultationId);
        formData.append('userEmail', email);
          try {
            const response = await axios.post(`${ngrokLink}/api/v1/rappel/add`, formData, {
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
    <View style={styles.container}>
        <StatusBar style="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={28} color={brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>            Détails du rappel    </Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.moreButton}>
          <Entypo name="dots-three-vertical" size={26} color={brand} />
        </TouchableOpacity>
      </View>
      <InnerContainer>
          <SubTitle></SubTitle>
          <Formik
           initialValues={{heure:""}}
       onSubmit={(values, { setSubmitting }) => {
         submitTraitement(values, setSubmitting);
       }}
     >
    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, isSubmitting }) => (
              <StyledFormArea>

      <View style={styles.content}>
      <Text style={styles.title}>Doliprane</Text>

        <View style={styles.sectionContent}>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>Date De Commencement: </Text>
            <Text style={styles.sectionItem3}>12 mai 2023</Text>
            </View>
            <View style={styles.heelo}>
            <Text style={styles.sectionItem2}>À apprendre  </Text>
            <Text style={styles.sectionItem3}>3</Text>
            <Text style={styles.sectionItem2}>  fois tous les  </Text>
            <Text style={styles.sectionItem3}>1</Text>
            <Text style={styles.sectionItem2}>  jours</Text>
            </View>


            </View>          
            <View style={styles.heelo2}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <AntDesign name="pluscircleo" size={30} color={brand} />
  <Text style={{ color: brand, marginLeft: 10, fontSize:18}}>Ajouter L'heure des rappels</Text>
</View>
            </View>
            <View>
          <FieldArray
            name="rappels"
            render={(arrayHelpers) => (
              <View>
               {values.rappels.map((rappels, index) => (
                  <View key={index}>
                    <View style={{ flexDirection: "column", marginTop:5, marginBottom:30 }}>       
           <DateTimePicker style={styles.date}
              value={date}
              mode="time"
              //is24Hour={true}
              display="spinner"
              onChangeText={(value) =>
                arrayHelpers.replace(index, {
                  ...rappel,
                  date: value
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <AntDesign name="pluscircleo" size={25} color={brand} />
  <Text style={{ color: brand, marginLeft: 5 }}>Ajouter un autre rappel</Text>
</View>

                  </TouchableOpacity>
                )}
              </View>
            )}
          />
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
    </InnerContainer>
    </View>
   
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    opacity:1,
    marginBottom:50,
    justifyContent:'space-between',

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
    backgroundColor: '#f0f0f0',
    padding: 10,
    //paddingRight:10,
    borderRadius: 20,
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    elevation:5,
    marginLeft: -5,
    marginRight:-10,
    alignItems: 'center',


  },
  heelo:{
    flexDirection:'row',
    //borderBottomColor:secondary,
    //borderStartWidth:1,
    //borderBottomLeftRadius:20,
    //borderBottomRightRadius:20,
    //borderBottomLarge:9,
    //marginTop:10,
    marginLeft:-5,
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
    fontWeight: '500',
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

});

export default AddRappel
