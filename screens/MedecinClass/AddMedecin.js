import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, Alert, Platform, Image } from "react-native";
import { picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { ActivityIndicator, Button } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../../components/CredentialsContext';
import RegularButton from '../../components/Buttons/RegularButton';
import SelectDropdown from 'react-native-select-dropdown';

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
    TextLinkContent,SelectDropdownStyle,
} from '../../components/styles';
import styled from 'styled-components';
import RegularButton2 from '../../components/Buttons/RegularButton2';

const { green, brand, darkLight, primary, secondary, tertiary } = Colors;

const AddMedecin = ({ navigation, ...props }) => {
        const [selectedValue, setSelectedValue] = useState('option1');
        const specialitie = [
            'Cardiologie',
            'Dentiste',
            'Dermatologie',
            'Endocrinologie',
            'Gastro-entérologie',
            'Generaliste',
            'Hématologie',
            'Infectiologie',
            'Médecine interne',
            'Neurologie',
            'Ophtalmologie',
            'Pédiatrie',
            'Psychiatrie',
            'Rhumatologie',
          ]
      
    
       
 return(
    <ScrollView>
      <KeyboardAvoidingWrapper>
      <StyledContainer>
                <InnerContainer>
                   
                            <StyledFormArea>
                                <Text style={styles.label}>Nom du Medecin</Text>
                                <LeftIcon>
                                <Octicons name='person' size={24} color={brand} />
                                </LeftIcon>
                                <StyledTextInput  {...props} 
                                    placeholder=" Dr ... "
                                    placeholderTextColor={darkLight}
                                    value={props.medecinName}
                                   onChangeText={(text)=> props.setMedecinName(text)}                                
                                />
                                <Text style={styles.label}>Specialite</Text>
                                <SelectDropdownStyle>
                                    <SelectDropdown 
                                        selectedItem= {props.medecinSpecialite}
                                        data={specialitie}
                                        onSelect={(selectedItem, index) => {
                                        props.setMedecinSpecialite(selectedItem)
                                        setSelectedValue(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                        return item
                                        }}
                                        buttonStyle={styles.dropdownButton}
                                        buttonTextStyle={styles.dropdownButtonText}
                                        dropdownStyle={styles.dropdown}
                                        rowStyle={styles.dropdownRow}
                                        rowTextStyle={styles.dropdownRowText}
                                    />
                                </SelectDropdownStyle>
                                <Text style={styles.label}>Adresse</Text>
                               
                                <StyledTextInput  {...props} 
                                
                                    placeholder=" Bizerte centre, Batiment A "
                                    placeholderTextColor={darkLight}
                                    value={props.medecinAdresse}
                                    onChangeText={(text) => props.setMedecinAdresse(text)}                                   
                                />

                                <Text style={styles.label}>Numero</Text>
                                <StyledTextInput  {...props} 
                                    placeholder="12345678"
                                    placeholderTextColor={darkLight}
                                    value={props.medecinNum}
                                    onChangeText={(text) => props.setMedecinNum(text)}                                   
                                />
                                <Text style={styles.label}>Commentaire</Text>
                                <TextInput style={styles.comentaire} {...props} 
                                    placeholder=" ... "
                                    placeholderTextColor={darkLight}
                                    multiline={true}
                                    value={props.medecinCmnt}
                                    onChangeText={(text) => props.setMedecinCmnt(text)}                                   
                                />
                                
                                
                                <RegularButton2 style={{ justifyContent: 'center' , alignContent:'center' , alignSelf:'center', marginTop:20}} onPress ={() => {
                                    if (props.medecinName === '' ) {
                                    Alert.alert('Please fill in all fields');
                                    } else {
                                    props.handleAdd();
                                    navigation.navigate('Medecins');
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
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      marginBottom: 20,
  },
  comentaire: {
    //flex:1,
    backgroundColor :secondary,
    padding:25,
    paddingLeft:55,
    borderRadius: 20,
    fontSize:16,
    height:100,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:{width:2, height:4},
    shadowRadius:1,
    marginLeft:-10,
    marginRight:-10, 
    elevation:5,
    marginLeft:-10,
    marginRight:-10,
  },
  dropdownContainer: {
    backgroundColor: secondary,
    padding:15,
    paddingLeft:55,
    borderRadius: 20,
    height:60,
    marginVertical:3,
    marginBottom:10,
    color:tertiary,
    shadowOpacity:0.25,
    shadowOffset:2,
    shadowRadius:1,
    marginLeft:-10,
    marginRight:-10
 
   },
   dropdownButton: {
     backgroundColor: secondary,
     alignItems:'center',
     marginTop:-10,
     
     
   },
   dropdownButtonText: {
     fontSize: 16,
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