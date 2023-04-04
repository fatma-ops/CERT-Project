import React from "react";
import {View , Text , Image , StyleSheet, Button , TouchableOpacity,TouchableNativeFeedback , Platform} from 'react-native'
import {Colors} from "./styles";
const { brand } = Colors;


const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
      }

    return (
       

    <View style={styles.product}>

      <View style={styles.touchable}>
    
     <TouchableCmp onPress={props.onViewDetail} useForeground>
      <View>
           <View style={styles.imageContainer}>
             <Image style={styles.image} source={{uri:props.image}}/>
           </View>
          <View style={styles.details}>
             <Text style= {styles.title}>{props.title}</Text>
             <Text style= {styles.price}>{props.price}</Text>
           </View>
          <View style={styles.actions}> 

               <Button color={brand} title="View Details" onPress={props.onViewDetail}/>
           </View>
      </View>



     </TouchableCmp>
    
        
    
   
        
    
      </View>
    </View>
    
    
    );
    
    
};
const styles = StyleSheet.create({
    product: {
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0 , height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20,
       
        
      },
      touchable:{
        overflow:"hidden",
        borderRadius:10,
      },
      image:{
        width:'100%',
        height:'100%'
      },
      title: {
        fontSize: 18,
        marginVertical: 2
      },
      price: {
        fontSize: 14,
        color: '#888'
     
      },
      actions:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
      },
      details:{
        alignItems:'center',
        height:'15%',
        padding:10,
        height: '25%',
        paddingHorizontal:20
      },
      imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
      }


});

export default ProductItem
