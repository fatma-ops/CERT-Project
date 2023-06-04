import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native';
import { CredentialsContext } from '../../components/CredentialsContext';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../components/styles';
const { green, brand, darkLight, primary, secondary,tertiary } = Colors;
import { StatusBarHeight } from '../../components/shared';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ngrokLink } from '../../config';
import NotFound from '../../components/NotFound';


const AnalyseFlatList = ({ navigation }) => {
  const [analyses, setAnalyses] = useState([]);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [imageData, setImageData] = useState(null);

  const { email } = storedCredentials;


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnalyses, setFilteredAnalyses] = useState([]);
  const handleOnSearchInput = (text) => {
    setSearchQuery(text);
      const filtered = analyses.filter(
        (item) =>
          item &&
          item.title &&
          item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAnalyses(filtered);
    };
  useEffect(() => {
    axios.get(`${ngrokLink}analyse/${email}?cache_bust=123456789`)
      .then(response => setAnalyses(response.data))
      .catch(error => console.log(error));
  }, [email]);

  

  return (
   
    <View style={[styles.analyseContainer2]}>
    <StatusBar style="white" />

<View style={styles.headingContainer}>
<View style ={{flexDirection:'column'}}>
<View style={styles.header2}>
<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
<AntDesign name="left" size={25} color='white' />
</TouchableOpacity>
<View>
<Text style={styles.headerTitle}>Mes analyses</Text></View>
</View>
<View style={{width:280 , paddingHorizontal:12 , height:170 }}>
<StatusBar style="Light" />
<SearchBar
value={searchQuery}
onChangeText={handleOnSearchInput}
containerStyle={{ marginVertical: 15, marginTop:25}}
/>

</View>
</View>

<View >
<TouchableOpacity
style={[styles.button]}
onPress={() => navigation.navigate('AddAnalyse')}
>
<MaterialIcons name="add" size={25} color='white' />
<Text style={{ marginLeft: -15, color: 'white' }}> Ajouter</Text>
</TouchableOpacity>
</View>

</View>

<View style={{ flexDirection: 'row', alignContent: 'center', marginTop:5 , paddingHorizontal:12}}>
<Text style={{ fontWeight: '700', fontSize: 18, color: brand}}>
Totale:
</Text>
<Text style={{ fontWeight: '700', fontSize: 18, color: brand }}>
{analyses ? analyses.length : 0}
</Text>
</View>

<FlatList
style={styles.liste}
///contentInset={{ bottom:160 }}
data={analyses}
keyExtractor={(item, index) => String(index)}
renderItem={({ item, index }) => (
<TouchableOpacity
onPress={() =>
navigation.navigate("AnalyseDetail", {
selectedAnalyse: item,
})
}
style={styles.item}
>
<View style={styles.itemContainer}>
<Image
source={require('../../assets/img/blood-sample.png')}
style={styles.image}
/>
<View style={styles.textContainer}>
<Text style={styles.title}>{item.title}</Text>
<Text style={styles.dateContainer}>{item.date}</Text>
<Text style={styles.text2}>{item.type}</Text>
</View>
</View>
</TouchableOpacity>
)}
/>

</View>

);

};

const styles = StyleSheet.create({
analyseContainer:{
paddingTop:10,
paddingHorizontal:0,
///marginBottom:100,
opacity:0.9,
justifyContent:'space-between',
//backgroundColor:'white',
//height:1000,

},
analyseContainer2:{
paddingBottom:200,

//marginBottom:70,
//opacity:1,
//justifyContent:'space-between',
//height:1000
},
header2: {
flexDirection: 'row',
alignItems: 'center',
paddingLeft: 10,
backgroundColor:brand,
marginTop:90,
},

headerTitle: {
fontWeight: 'bold',
fontSize: 20,
color:'white',
marginLeft:85


},

header: {
flexDirection: 'row',
alignItems: 'center',
marginTop:StatusBarHeight -30,

paddingBottom: 20,
borderBottomWidth: 1,
borderBottomColor: darkLight,

marginRight:-50,
marginLeft:10,
},

backButton: {

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
marginLeft:180,
marginTop:-18,
},
text:{
marginTop:15,
// fontWeight:'400',
fontSize:20,
},
text2:{
marginTop:5,
fontSize:15,
color:brand,
marginLeft:5,
marginBottom:20,
},
title: {
fontWeight: 'bold',
fontSize: 18,
//marginBottom: 5,
marginTop:15,
marginLeft:5,
},

item:{ 
marginTop:-6,
marginLeft:10,
marginRight:10,
//alignItems:'center',
borderTopWidth: 1,
borderTopColor: darkLight,
marginBottom:10
},
liste:{
fontSize:19,
fontWeight:'600',
opacity:0.8,
marginTop:5,
shadowOpacity:0.25,
shadowOffset:{width:0.75, height:2},
shadowRadius:2,
elevation:5,
backgroundColor:'white',
borderRadius:15,
marginLeft:15,
marginRight:15,

},
index:{
fontSize:20,
fontWeight:'800',
color:brand
},
headingContainer2:{
fontWeight:'700',
color:brand,
justifyContent:'space-between',


},
headingContainer:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
backgroundColor:brand,
height:150


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

searchContainer:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
marginVertical:8,
},
searchButton:{
alignItems:"center",
justifyContent:'center',
width:60,
borderRadius:5,
height:40
},
searchButtonText:{
color:"#fff",
fontWeight:'700',
fontSize:12,
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
},
image: {
width: 50, // Adjust the width as needed
height: 50, // Adjust the height as needed
marginRight: 10, // Adjust the margin as needed
resizeMode: 'contain', // Choose the appropriate resizeMode
},
textContainer: {
flex: 1,
},

date: {
fontSize: 16,
color: 'gray',
},
}) 
export default AnalyseFlatList;
