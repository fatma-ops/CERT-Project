import React , {useContext,useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import { StatusBarHeight } from '../../components/shared';
import {  Octicons, AntDesign, Fontisto , Entypo , MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import MessageModal from '../../components/Modals/MessageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import RowContainer from '../../components/Containers/RowContainer'
import { ngrokLink } from '../../config';
import SelectDropdown from 'react-native-select-dropdown';
import { RadioButton } from 'react-native-paper';



import
  
    {Colors , StyledInputLabel, StyledTextInput,LeftIcon,    SelectDropdownStyle ,
      StyledContainer, InnerContainer, StyledFormArea, PageSignup, SubTitle, Editprofile, MsgBox, ButtonText, StyledButton, StyledContainer2, ExtraView, ExtraText, TextLink, TextLinkContent, StyledContainerRestPassword, StyledEtoile
  


} from '../../components/styles';
import IconHeader from '../../components/Icons/IconHeader';
import RowContainer2 from '../../components/Containers/RowContainer2';
const { brand, darkLight, primary , tertiary , secondary} = Colors;

const EditProfileScreen = ({navigation , route}) => {

//context
    const [nom, setNom] = useState(route.params.nom);
    const [prenom, setPrenom] = useState(route.params.prenom);
    const [email, setEmail] = useState(route.params.email);
    const [genre, setGenre] = useState(route.params.genre);

    const [allergie, setAllergie] = useState(route.params.allergie);
    const [groupeSanguin, setGroupeSanguin] = useState(route.params.groupeSanguin);
    const {storedCredentials , setStoredCredentials}=useContext(CredentialsContext);

    const {  _id} = storedCredentials;
    console.log(storedCredentials._id)

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [modalVisible , setModalVisible] = useState(false);
const [modalMessageType , setModalMessageType] = useState('');


const [headerText , setHeaderText]= useState('');
const [modalMessage , setModalMessage] = useState('');
const [buttonText , setButtonText] = useState('');

const groupesanguin = [
  'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
  
];
const buttonHandler = () => {
    if(modalMessageType === 'success'){
        //do something
        navigation.goBack();

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
       
        const handleMessage = (message, type = 'FAILED') => {
          setMessage(message);
          setMessageType(type);
      }
      const handleSave = async (credentials , setSubmitting) => {
        setSubmitting(true);
      
        try {
          const response = await fetch(`${ngrokLink}user/${_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id:credentials._id,
              nom: credentials.nom,
              prenom: credentials.prenom,
              allergie: credentials.allergie,
              groupeSanguin: credentials.groupeSanguin,
              genre: credentials.genre

            })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Update the state with the updated user information
            setNom(data.nom);
            
            setPrenom(data.prenom);
            setAllergie(data.allergie);
            setGroupeSanguin(data.groupeSanguin);
            setGenre(data.genre);

            AsyncStorage.setItem('DossierMedicaleCredentials', JSON.stringify(credentials))
            .then(() => {
              setStoredCredentials(credentials);
            })
      
            // Show a success message to the user
            ShowModal('success', "Profile mis à jour", "Votre profile a été mis à jour avec succès !", 'OK');
          } else {
            // Show an error message to the user
            handleMessage(data.message, 'FAILED');
          }
        } catch (error) {
          console.error(error);
          // Show an error message to the user
          handleMessage('Erreur.', 'FAILED');
        } finally {
          setSubmitting(false);
        }
      };
      
    return(
  <KeyboardAvoidingWrapper>
  <StyledContainerRestPassword>
      <StatusBar style="transparent" />
      
      <IconHeader name ="account-edit-outline" style ={{marginBottom : 30 , marginTop:StatusBarHeight-90}} />

      <InnerContainer>
     
          <Formik
              initialValues={{_id:_id, prenom: prenom , nom: nom,email:email ,groupeSanguin:groupeSanguin , allergie:allergie,genre:genre  }}
              onSubmit={(values, { setSubmitting }) => {
                  if (values.prenom == '' ||values.nom == '' ) {
                    handleMessage('Veuillez remplir tous les champs obligatoires');
                    ShowModal('Failed', "échec", "Veuillez remplir tous les champs obligatoires!", 'OK');

                    setSubmitting(false);
                      
                  }
                  else { 
                    handleSave(values, setSubmitting);
                  }
              }}
          >
              {({ handleChange, handleBlur,setFieldValue, handleSubmit, values, isSubmitting }) => (
                  <StyledFormArea>
                      <MyTextInput
                          label="Nom"
                          etoile="*"
                          icon="person"
                          placeholder=" Entrer votre nom "
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('nom')}
                          onBlur={handleBlur('nom')}
                          value={values.nom}

                      />
                       <MyTextInput
                          label="Prénom"
                          etoile="*"
                          icon="person"
                          placeholder="Entrer votre prénom"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('prenom')}
                          onBlur={handleBlur('prenom')}
                          value={values.prenom}

                      />
                     <Text style={styles.label}>Genre <Text style={{ color: 'red' }}>*</Text></Text> 
        <View style={{ flexDirection: 'row', marginLeft:50 , alignItems:'center' }}>

        <RadioButton
          value='Homme'
          status={values.genre === 'Homme' ? 'checked' : 'unchecked'}
          onPress={() => setFieldValue('genre', 'Homme')} // Update genre field value
        />
        <Text style={{ fontSize: 14 }}>Homme </Text>
        <RadioButton
          value='Femme'
          status={values.genre === 'Femme' ? 'checked' : 'unchecked'}
          onPress={() => setFieldValue('genre', 'Femme')} // Update genre field value
        />
        <Text style={{ fontSize: 14 }}>Femme </Text>
        </View>  
        <Text style={styles.label}>Groupe sanguin</Text> 

                     <SelectDropdownStyle>    
                
                <SelectDropdown
                   label="Groupe sanguin"
                  
                   
                   data={groupesanguin}
       
                   onSelect={(selectedItem, index) => {
                     setFieldValue('groupeSanguin', selectedItem);
                   }}
                   buttonTextAfterSelection={(selectedItem, index) => {
                     return selectedItem;
                   }}
                   rowTextForSelection={(item, index) => {
                     return item;
                   }}
                   renderDropdownIcon={() => (
                       <AntDesign name="caretdown" size={16} color={brand} style={styles.dropdownIcon} />
                     )}
                   buttonStyle={styles.dropdownButton}
                   buttonTextStyle={styles.dropdownButtonText}
                   dropdownStyle={styles.dropdown}
                   rowStyle={styles.dropdownRow}
                   rowTextStyle={styles.dropdownRowText}
                   defaultButtonText={values.groupeSanguin ? values.groupeSanguin : 'Choisir votre groupe sanguin '}
                   >
                        
                              
                       
                       </SelectDropdown>
                     
                 </SelectDropdownStyle>
                      <MyTextInput2
                          label="Allergie"
                          icon="allergy"
                          placeholder=""
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('allergie')}
                          onBlur={handleBlur('allergie')}
                          value={values.allergie}
                          
                          
                      />
                      <MsgBox >
                                </MsgBox>
                               
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                       Enregistrer
                                    </ButtonText>
                                </StyledButton>}

                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>}
                                <ExtraView>
                                    
                                    <TextLink onPress={() => navigation.goBack()}>
                                        <TextLinkContent>
                                           Annuler
                                        </TextLinkContent>
                                    </TextLink>
                                </ExtraView>

                  </StyledFormArea>)}
          </Formik>
      </InnerContainer>

      <MessageModal 
                  modalVisible={modalVisible} 
                  buttonHandler = {buttonHandler} 
                  type = {modalMessageType} 
                  headerText = {headerText}
                  message={modalMessage}
                  buttonText={buttonText} /> 
  </StyledContainerRestPassword>
</KeyboardAvoidingWrapper>


);
};
const MyTextInput = ({ label, icon , etoile,  ...props  }) => {
  return (
      <View>
          <LeftIcon>
              <Octicons name={icon} size={24} color={brand} />

          </LeftIcon>
          <RowContainer2>
          <StyledInputLabel> {label}  </StyledInputLabel>
          <StyledEtoile> {etoile}  </StyledEtoile>
          </RowContainer2>
          <StyledTextInput  {...props} />
         

      </View>
  );

};
const MyTextInput2 = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
      <View>
          <StyledInputLabel> {label} </StyledInputLabel>
          <StyledTextInput  {...props} />
          <LeftIcon>
              <MaterialCommunityIcons name={icon} size={24} color={brand} />
          </LeftIcon>
          {isPassword && (
              <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color={darkLight} />
              </RightIcon>

          )}

      </View>
  );

};


export default EditProfileScreen; 
const styles = StyleSheet.create({
   
   heelo:{
    flexDirection:'row'
   },
   label: {
    fontSize: 13,
    marginBottom: 5,
    color:tertiary
  },
  




dropdownButtonText: {
  fontSize: 17,
  color: '#333',

},
dropdown: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  width: '100%',
  marginBottom: 20,
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
alignSelf:"center",
marginTop: -10,

width: '97%', // Ajoutez cette ligne pour définir la largeur du bouton à 100%
},
dropdownButtonText: {
 fontSize: 17,
 color: brand ,
 alignItems:'center',

 marginLeft: -27, // Espace à gauche de l'icône



},
dropdownIcon: {
left:15,
position:'absolute',
zIndex:1,     

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