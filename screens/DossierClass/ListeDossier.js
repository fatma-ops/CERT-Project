import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet,screenHeight, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
import { StatusBarHeight } from '../../components/shared';
import { StatusBar } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { ngrokLink } from '../../config';
import { Swipeable } from 'react-native-gesture-handler';
import RoundIconBtn from '../../components/RoundIconBtn';
import AddDossierModal from '../../components/Modals/AddDossierModal';
import UpdateDossierModal from '../../components/Modals/UpdateDossierModal'
const { brand, darkLight, primary,secondary,tertiary } = Colors;
 
const ListeDossier = ({ navigation , route }) => {
  const [dossier, setDossier] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [reloadList, setReloadList] = useState(false);


  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  //const screenHeight = Dimensions.get('window').height;

  const { email } = storedCredentials;

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ngrokLink}dossier/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      setResult(data);
      setReloadList(true);
      navigation.navigate('ListeDossier');
    } catch (err) {
      console.error(err);
      setResult('Erreur');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  
  useEffect(() => {
    axios.get(`${ngrokLink}dossier/dossiers/${email}?cache_bust=${Date.now()}`)
      .then(response => setDossier(response.data))
      .catch(error => console.log(error));
  }, [email, reloadList])

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);


  const handleAddDossier = async (nom) => {
    try {
      const response = await fetch(`${ngrokLink}dossier/Add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, userEmail: storedCredentials.email }),
      });
      const data = await response.json();
      setReloadList(true);
      console.log('Dossier ajouté:', data);
      setModalVisibleAdd(false);
    } catch (err) {
      console.error(err);
      // Gérer les erreurs de requête
    }
  };
  

  const closeModalAdd = () => {
    setModalVisibleAdd(false);
  };


  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
const [selectedDossierId, setSelectedDossierId] = useState(null);

const handleUpdate = async (id, newNom) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${ngrokLink}dossier/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom: newNom }), 
    });
    const data = await response.json();
    setResult(data);
    setReloadList(true);

  } catch (err) {
    console.error(err);
    setResult('Erreur');
  } finally {
    setIsLoading(false);
    setModalVisibleUpdate(false); 
  }
};
  
  
  return (
    <View style={[styles.analyseContainer2]}>
      <StatusBar style="light" />
      <View style={styles.headingContainer}>
        <Text style={styles.headerTitle}>Mes dossiers</Text>
      </View>
  
      {isLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (

        <FlatList
          style={styles.item}
          data={dossier}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => (
            <Swipeable
              renderRightActions={(progress, dragX) => (
                <View style={{ flexDirection: 'row', marginTop: 2, marginRight: -135, justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDossierId(item._id);
                      setModalVisibleUpdate(true);
                    }}
                    style={[
                      styles.updateButton,
                      { transform: [{ translateX: dragX }] },
                    ]}
                  >
                    <MaterialIcons name="edit" size={37} color='white' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    style={[
                      styles.deleteButton,
                      { transform: [{ translateX: dragX }] },
                    ]}
                  >
                    <MaterialIcons name="delete" size={37} color='white' />
                  </TouchableOpacity>
                </View>
              )}
            >
  
              <TouchableOpacity
                onPress={() => {                    
                navigation.navigate('HomeScreen') }}

                style={styles.liste}
              >
                <View style={styles.itemContainer}>
                  <Image
                    source={require('../../assets/img/dossierbleu.png')}
                    style={styles.image}
                  />
  
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.nom}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
          
        />
      )}
  
      <UpdateDossierModal
        visible={modalVisibleUpdate}
        onClose={() => setModalVisibleUpdate(false)}
        onUpdate={(newNom) => handleUpdate(selectedDossierId, newNom)}
        oldNom={selectedDossierId ? dossier.find(item => item._id === selectedDossierId)?.nom : ''}
      />
  
      <View style={styles.addButtonContainer}>
        <AddDossierModal
          visible={modalVisibleAdd}
          onClose={closeModalAdd}
          onAdd={handleAddDossier}

        />
        <TouchableOpacity onPress={() => setModalVisibleAdd(true)}>
          <RoundIconBtn
            onPress={() => setModalVisibleAdd(true)}
            antIconName='addfolder'
            style={styles.addBtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  };

const styles = StyleSheet.create({
  analyseContainer:{
    paddingTop:10,
    paddingHorizontal:0,
    marginBottom:100,
    opacity:0.9,
    justifyContent:'space-between',
    //backgroundColor:'white',
    height:1000,

},
analyseContainer2:{

 
},
header2: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // To center the header
  marginHorizontal:-10 , // To remove the left and right padding
  paddingHorizontal: 10, // To add the padding back
  marginTop:StatusBarHeight ,

},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:StatusBarHeight +30,

  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: darkLight,

  marginRight:-50,
  marginLeft:10,
},
headerTitle: {
  fontWeight: '400',
  fontSize: 30,
  color:'white',
  marginLeft:110,
  marginRight:50,
 //alignContent :'center'
},
backButton: {
  marginRight: 10,
  marginLeft: -9,
},

divider:{
    width:'100%',
    height:2,
    marginTop:5,
    marginBottom:5,
},
dateContainer:{
  //marginTop:10,
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  marginLeft:200,
  marginTop:-20,
},
text:{
  marginTop:15,
   // fontWeight:'400',
    fontSize:20,
},
text2:{
 marginTop:5,
    fontSize:20,
    color:brand,
},
date: {
    fontSize: 16,
    color: 'gray',
    //marginLeft:60,
  //marginTop:-25
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    marginTop:5,
    
  },
item:{ 
  marginTop:-5,
    //marginLeft:20,
    marginRight:-5,
    //alignItems:'center',
    marginBottom:15,
    //width:350,
    padding:10,
    //backgroundColor:'red'
},
liste:{
  fontSize:19,
  //fontWeight:'600',
  opacity:0.8,
  marginTop:15,
  shadowOpacity:0.25,
  shadowOffset:{width:0.75, height:2},
  shadowRadius:2,
  elevation:5,
  backgroundColor:'white',
  borderRadius:15,
  marginLeft:20,
  marginRight:15 ,
  marginBottom:5,
  height:90,
  //backgroundColor:brand
},
index:{
    fontSize:20,
    fontWeight:'800',
    color:brand
},
headingContainer2:{
  fontWeight:'700',
  color:brand,
  ///justifyContent:'space-between',
  alignItems :'center'


},
headingContainer:{
   flexDirection:'row',
   //justifyContent:'space-between',
   alignItems :'center',
   backgroundColor:brand,
   height:120,
   borderBottomLeftRadius:30, 
   borderBottomRightRadius:30, 
   borderTopLeftRadius:30, 
   borderTopRightRadius:30,
   marginTop:20,  
   margin:0.5,

   
},
button:{
    width:50,
    borderRadius:100,
    //justifyContent:'space-between',
   
    marginLeft:10,
   // height:50,
    marginTop :40,
    //marginBottom : 20
},
buttonText:{
    color:brand,
    fontSize:32,
    fontWeight:'800'
},
scrollView:{
    marginBottom:10,
},
analyse:{
    //flexDirection:'row',
    width:'100%',
    color:'black',
    fontWeight:'bold',
    alignItems:'center',
    backgroundColor:{brand}

},


delete:{
    fontWeight:'700',
    fontSize:15
},


emptyAnalyseContainer:{
    alignItems:'center',
    marginTop:140,
},
emptyAnalyseText:{
    fontWeight:'600',
    fontSize:15,
    justifyContent:'center',
    textAlign:'justify'
},

container: {

  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.5,
  marginTop:StatusBarHeight 

},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  color:'white',
  padding:20,
},
image: {
  width: 50, // Adjust the width as needed
  height: 50, // Adjust the height as needed
  marginRight: 10, // Adjust the margin as needed
  resizeMode: 'contain', 
  marginLeft:10, 
},
textContainer: {
  flex: 1,
  marginBottom:10 ,
  marginTop:10,
  backgroundColor:'white'

},
deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20,
    //paddingRight: 20,
    height: '82%',
    width:'27%',
    //margingleft:900,
    //marginRight:2,
    marginTop:15,
    //marginBottom:15,
    borderRadius:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:1},
    shadowRadius:2,
    elevation:5,
  },
  updateButton: {
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    paddingLeft: 20,
    //paddingRight: 20,
    height: '82%',
    width:'27%',
    //margingleft:-90,
    marginRight:2,
    marginTop:15,
    //marginBottom:15,
    borderRadius:10,
    shadowOpacity:0.25,
    shadowOffset:{width:0.75, height:1},
    shadowRadius:2,
    elevation:5,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom:-35,
    zIndex: 1, 
    borderRadius: 50,

  },
  addButtonContainer: {
    position: 'relative',
    zIndex: 1,
  }

}) 

export default ListeDossier;