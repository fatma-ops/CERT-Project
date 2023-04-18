import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, Alert, Platform, Image } from "react-native";
import DatePicker from 'react-native-datepicker';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { ActivityIndicator, Button } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../../components/CredentialsContext';
import RegularButton from '../../components/Buttons/RegularButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import {
    InnerContainer,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledButton,
    StyledInputLabel2,
    StyledTextInput,
    ButtonText,
    Colors,
    MsgBox,
    ExtraView2,
    PageSignup,
    StyledContainer2,
    ViewImage,
    StyledContainer,
    ExtraView,
    TextLink,
    TextLinkContent,
} from '../../components/styles';
import MessageModalImage from '../../components/Modals/MessageModalImage';
import styled from 'styled-components';
import RegularButton2 from '../../components/Buttons/RegularButton2';

const { green, brand, darkLight, primary } = Colors;

const AddVaccin = ({ navigation, ...props }) => {


const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
   console.log(result);

  if (!result.canceled) {
    props.setVaccinImage(result.assets[0].uri);
  }
};

 
 const showDatePicker = () =>{
     setShow(true);
 }
 const [showPicker, setShowPicker] = useState(false);
 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

 const handlePress = () => {
  setShowPicker(true);
};

  const [show, setShow] = useState(false);
return(
    <ScrollView>
      <KeyboardAvoidingWrapper>
      <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                   
                            <StyledFormArea>
                                <Text style={styles.label}>Nom du vaccin</Text>
                                <StyledTextInput  {...props} 
                                    placeholder=" vaccin corona "
                                    placeholderTextColor={darkLight}
                                    value={props.vaccinName}
                                    onChangeText={(text) => props.setVaccinName(text)}                                   

                                />
                                
                                <Text style={styles.label}>Date</Text>
                                <TouchableOpacity  style={styles.date} onPress={handlePress}>
        <Text>
        <DateTimePicker 
                                  mode="date"
                                  display="default"
                                  testID= "dateTimePicker"
         
                                  date={new Date(props.vaccinDate)}
                                  value={props.vaccinDate}
                                  onConfirm={(selectedDate) => {
                                    const formattedDate =moment(selectedDate).format("YYYY-MM-DD");

                                    props.setDate(formattedDate);

                                    setDatePickerVisibility(false);
                                  }}
                                  onCancel={() => setDatePickerVisibility(false)}

                                />
        </Text>
      </TouchableOpacity>
     
                                <Text style={styles.label}>Commentaire</Text>
                                <TextInput style={styles.comentaire} {...props} 
                                    placeholder=" ... "
                                    placeholderTextColor={darkLight}
                                    value={props.vaccinCmnt}
                                    onChangeText={(text) => props.setVaccinCmnt(text)}                                   
                                />
                                <Text style={styles.label}>Résultat du Vaccin</Text>

                                <ViewImage onPress={pickImage}>

                               <Ionicons name='camera' onPress={pickImage} size={70} color={darkLight} style={{paddingTop: 40,paddingLeft:60, justifyContent:'center',alignItems:'center'}} />
                              <TouchableOpacity onPress={pickImage} style={{position:'absolute' ,padding:25,left:70, paddingRight:65 ,paddingLeft:15, borderRadius: 20 ,fontSize:16 ,height:200,width:'90%',zIndex:1,marginVertical:3 , justifyContent:'center' , alignSelf:'center',alignItems:'center'}}>
                             {props.vaccinImage && <Image source={{ uri: props.vaccinImage }} style={{height:200,width:'199%'}} />}

                               </TouchableOpacity> 

                              <Text style={{textAlign:'center', paddingRight:40, color:darkLight}}>Ajouter votre document</Text>

                              </ViewImage> 
                              
                                
                                <RegularButton2 style={{ justifyContent: 'center' , alignContent:'center' , alignSelf:'center', marginTop:20}} onPress ={() => {
                                    if (props.vaccinName === '' ||  props.vaccinImage === '') {
                                    Alert.alert('Please fill in all fields');
                                    } else {
                                    props.handleAdd();
                                    navigation.navigate('Vaccins');
                                    }
                                  }}>
                                      <ButtonText>
                                            Enregistrer
                                      </ButtonText>                                    
                                      </RegularButton2>
                                      <ExtraView>
                             
                              <TextLink onPress={() => navigation.goBack()}>
                                  <TextLinkContent style={{ justifyContent: 'center' , alignContent:'center' , alignSelf:'center'}} >
                                      Annuler
                                  </TextLinkContent>
                              </TextLink>
                          </ExtraView>
                                    
                                    
                                
                            </StyledFormArea>
                            
                              
        
                         </InnerContainer>
                         </StyledContainer>
                         </KeyboardAvoidingWrapper>    
                         </ScrollView>
    
  );
};
const styles = StyleSheet.create({
  date:{
    backgroundColor :secondary,
    padding:15,
    paddingLeft:55,
    height:60,
    borderRadius:20,
    fontSize:16,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    marginRight:-10,
    marginLeft:-10,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,

  },
  text: {
      fontSize:20,
      fontWeight:'bold'
  },
  image: {
    position:'absolute' ,
    padding:25,left:70, 
    paddingRight:65 ,
    paddingLeft:15, 
    borderRadius: 20 ,
    fontSize:16 ,
    height:200,
    width:'90%',
    zIndex:1,
    marginVertical:3 , 
    justifyContent:'center' , 
    alignSelf:'center',
    alignItems:'center',
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    marginRight:-10,
    marginLeft:-10,

  },
  comentaire: {
    backgroundColor :secondary,
    //padding:7,
    paddingLeft:55,
    height:100,
    borderRadius: 20,
    fontSize:16,
    //height:60,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:0.5,height:2},
    shadowRadius:1,
    marginRight:-10,
        marginLeft:-10,

  },
});


export default AddVaccin;