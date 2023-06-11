import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import React, { useState, useEffect, useRef , useContext } from "react";
import { Text, View, Button, Platform, Keyboard, TextInput , StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import appLogo from '../../assets/img/logo3.png';
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { InnerContainer, SelectDropdownStyle,Colors, StyledContainer, StyledFormArea, MsgBox, ButtonText, TextLink, ExtraView, TextLinkContent } from "../../components/styles";
import SelectDropdown from "react-native-select-dropdown";
import { ScreenWidth } from "../../components/shared";
import { CredentialsContext } from '../../components/CredentialsContext';
import axios from "axios";
import { ngrokLink } from "../../config";
import { AntDesign } from "@expo/vector-icons";
import RegularButton from "../../components/Buttons/RegularButton";
const { brand, darkLight, primary, red, tertiary,secondary } = Colors;


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AddRappel({navigation}) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
const { email } = storedCredentials;


  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const schedulePushNotification = async (values) => {
    Keyboard.dismiss();

    const now = new Date();

    for (let i = 0; i < values.nombreJours; i++) {
      const day = new Date(values.startDate);
      day.setDate(values.startDate.getDate() + i);

      // Planifier la notification du matin
      const morningScheduledDateTime = new Date(values.morningDateTime);
      morningScheduledDateTime.setFullYear(day.getFullYear());
      morningScheduledDateTime.setMonth(day.getMonth());
      morningScheduledDateTime.setDate(day.getDate());
      const morningSeconds = Math.round(
        (morningScheduledDateTime.getTime() - now.getTime()) / 1000
      );
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Dossier médical",
          body: `N'oubliez pas de prendre votre médicament [${values.nommedicament}] le matin.`,
          data: { data: "goes here" },
          sound: 'notification.wav',
          icon: appLogo,
        },
        trigger: { seconds: morningSeconds },
      });

      // Planifier la notification du midi
      const noonScheduledDateTime = new Date(values.noonDateTime);
      noonScheduledDateTime.setFullYear(day.getFullYear());
      noonScheduledDateTime.setMonth(day.getMonth());
      noonScheduledDateTime.setDate(day.getDate());
      const noonSeconds = Math.round(
        (noonScheduledDateTime.getTime() - now.getTime()) / 1000
      );
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Dossier médical",
          body: `N'oubliez pas de prendre votre médicament [${values.nommedicament}] à midi.`,
          data: { data: "goes here" },
          sound: 'notification.wav',
          icon: appLogo,
        },
        trigger: { seconds: noonSeconds },
      });

      // Planifier la notification du soir
      const eveningScheduledDateTime = new Date(values.eveningDateTime);
      eveningScheduledDateTime.setFullYear(day.getFullYear());
      eveningScheduledDateTime.setMonth(day.getMonth());
      eveningScheduledDateTime.setDate(day.getDate());
      const eveningSeconds = Math.round(
        (eveningScheduledDateTime.getTime() - now.getTime()) / 1000
      );
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Dossier médical",
          body: `N'oubliez pas de prendre votre médicament [${values.nommedicament}] le soir.`,
          data: { data: "goes here" },
          sound: 'notification.wav',
          icon: appLogo,
        },
        trigger: { seconds: eveningSeconds },
      });
    }

    setSuccessMessage("Notifications planifiées avec succès !");
  };

  const handleStartDatePickerChange = (values, selectedDate) => {
    const currentDate = selectedDate || values.startDate;
    values.setFieldValue("startDate", currentDate);
  };

  const handleMorningPickerChange = (values, selectedDate) => {
    const currentDate = selectedDate || values.morningDateTime;
    values.setFieldValue("morningDateTime", currentDate);
  };

  const handleNoonPickerChange = (values, selectedDate) => {
    const currentDate = selectedDate || values.noonDateTime;
    values.setFieldValue("noonDateTime", currentDate);
  };

  const handleEveningPickerChange = (values, selectedDate) => {
    const currentDate = selectedDate || values.eveningDateTime;
    values.setFieldValue("eveningDateTime", currentDate);
  };
   // Fetch the list of contacts from the database____________________________________________________________
 const [traitements, setTraitements] = useState([]);
 useEffect(() => {
   axios.get(`${ngrokLink}traitement/traitements/${email}?cache_bust=123456789}`)
     .then(response => {
       setTraitements(response.data);
     })
     .catch(error => console.log(error));
 }, [email]);
 
 
 const options = traitements.flatMap(traitement => traitement.medicaments.map(medicament => medicament.nommedicament));

  const submitRappel = async (values, setSubmitting) => {
    try {
      handleMessage(null);
      setSubmitting(true);    
        await schedulePushNotification(values);

      const data = {
        nommedicament: values.nommedicament,
        nombreJours: values.nombreJours,
        startDate: values.startDate.toISOString(), // Convertir la date en format ISO string
        morningDateTime: values.morningDateTime.toISOString(),
        noonDateTime: values.noonDateTime.toISOString(),
        eveningDateTime: values.eveningDateTime.toISOString(),
        userEmail:email,
      };

      const response = await axios.post(`${ngrokLink}rappel/add`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data);
      setSubmitting(false);

      navigation.navigate('ListeRappel');
    } catch (error) {
      setSubmitting(false);

      handleMessage(error.message);
      console.error(error);
    }
  };


  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

 
  

  return (
<>
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <AntDesign name="left" size={25} color={brand} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>  Ajouter un Rappel</Text>
  </View>

      <KeyboardAvoidingWrapper>
      <StyledContainer>
      <InnerContainer>


      <Formik
        initialValues={{
          nommedicament: "",
          nombreJours: 1,
          startDate: new Date(),
          morningDateTime: new Date(),
          noonDateTime: new Date(),
          eveningDateTime: new Date(),
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.nommedicament === '') {
           
            handleMessage('Veuillez remplir tous les champs obligatoires');
            setSubmitting(false);

          } else {
            submitRappel(values, setSubmitting);
          }
        }}

      >
        {({ handleChange, handleSubmit, values, setFieldValue , isSubmitting }) => (
                    <StyledFormArea>

<Text style={styles.label}>Médicament<Text style={{ color: 'red' }}>*</Text></Text>

<SelectDropdownStyle>
  <SelectDropdown
    data={options}
    onSelect={(selectedItem, index) => {
      setFieldValue('nommedicament', selectedItem);
    }} 
    renderDropdownIcon={() => (
      <AntDesign name="caretdown" size={16} color={brand} />
    )} 
    defaultButtonText="Choisir médicament"

    buttonStyle={styles.dropdownButton}
    buttonTextStyle={styles.dropdownButtonText}
    dropdownStyle={styles.dropdown}
    rowStyle={styles.dropdownRow}
    rowTextStyle={styles.dropdownRowText}
  />
</SelectDropdownStyle>


<Text style={styles.label}>Date </Text> 

            
              <DateTimePicker
              onPress={() => setFieldValue("showStartDateDateTimePicker", true)}
                value={values.startDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) =>
                  handleStartDatePickerChange({ values, setFieldValue }, selectedDate)
                }
              />
            
            <View style={{flexDirection:'row', marginTop:10, marginBottom:25}}>
<Text style={styles.label}>Répéter pendant  </Text>

<TextInput
style={[styles.input]}
onChangeText={handleChange("nombreJours")}
keyboardType="numeric"
placeholder="1"
value={values.nombreJours}
/>
<Text style={styles.label}>  jours</Text></View>


<Text style={{ color: brand, fontSize:17 , fontWeight:'bold' }}>Choisir les heures du rappel </Text>
<View style={{ height: 20 }} />


            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <Text style={styles.label}>Matin </Text> 

              <DateTimePicker
                value={values.morningDateTime}
                mode="time"
                display="default"
                onChange={(event, selectedDate) =>
                  handleMorningPickerChange({ values, setFieldValue }, selectedDate)
                }
                onPress={() => setFieldValue("showMorningDateTimePicker", true)}
              />
              </View>
              <View style={{ height: 20 }} />

            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <Text style={styles.label}>Midi</Text> 

              <DateTimePicker
                value={values.noonDateTime}
                mode="time"
                display="default"
                onChange={(event, selectedDate) =>
                  handleNoonPickerChange({ values, setFieldValue }, selectedDate)
                }
                onPress={() => setFieldValue("showNoonDateTimePicker", true)}
              />
              </View>
            

            <View style={{ height: 20 }} />
            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>

            <Text style={styles.label}>Soir</Text> 

              <DateTimePicker
                value={values.eveningDateTime}
                mode="time"
                display="default"
                onChange={(event, selectedDate) =>
                  handleEveningPickerChange({ values, setFieldValue }, selectedDate)
                }
                onPress={() => setFieldValue("showEveningDateTimePicker", true)}
              />
            </View>

           

             <MsgBox type={messageType}>
                  {message}
                </MsgBox>
                {!isSubmitting && <RegularButton onPress={handleSubmit} style={{ justifyContent: 'center', alignSelf:'center'}}>
                                    <ButtonText>
                                    Appuyez pour planifier les notifications                                    </ButtonText>
                                </RegularButton>}

                                {isSubmitting && <RegularButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </RegularButton>}
                  <ExtraView>
                             
                              <TextLink onPress={() => navigation.goBack()}>
                                  <TextLinkContent style={{ justifyContent: 'center' , alignContent:'center' , alignSelf:'center'}} >
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
      </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
      enableLights: true,
      enableVibration: true,
      showBadge: true,
      icon: appLogo,
    });
  }

  return token;
}
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
    height:90,
    marginVertical:-65,
    marginLeft:50,
    //marginTop:-65,
    marginRight:50,
    marginBottom:-3,
  },
  header: {
    flexDirection: 'row',
  alignContent: 'center',
  //justifyContent:'space-between',
  marginTop: 20,
  paddingBottom: 15,
  borderBottomWidth: 0.25,
  borderBottomColor: darkLight,
  marginLeft: -15,
  marginRight: -25,

  },
  headerTitle: {
    fontWeight: 'bold',
  fontSize: 20,
  color: brand,
  alignItems:'center',
  marginLeft:20,

  },
  backButton: {
    marginRight: 50,
  marginLeft: ScreenWidth - 380,
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