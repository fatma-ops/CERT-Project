import React  from 'react';
import { Text } from 'react-native';
import { Modal } from 'react-native';
import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import RegularText from '../Texts/RegularText';
import { StyledButton } from '../styles';
// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
const {primary , black , red , green ,brand ,  tertiary} = Colors;
import BigText from '../Texts/BigText';
import RegularButton from '../Buttons/RegularButton';
import RegularButton2 from '../Buttons/RegularButton2';

import RowContainer from '../Containers/RowContainer';
import RegularButton3 from '../Buttons/RegularButton3';

import { TouchableOpacity } from 'react-native';
const ModalPressableContainer = styled.Pressable`
flex:1;
padding:25px;
background-color:rgba(0,0,0,0.7);
justify-content:center;



`;
const ModalView = styled.View `
background-color:${primary};
border-radius:20px;
width:100%;
padding:35px;
align-items:center;
elevation:5;
shadow-color:${black};
shadow-offset:0px 2px;
shadow-opacity:0.25;
shadow-radius:4px;


`;
const MessageModalImage = ({ modalVisible , buttonHandler ,buttonHandler2, type , headerText , message , buttonText }) => {
    return  <Modal animationType = 'slide' visible={modalVisible}
    transparent={true} >
        <ModalPressableContainer onPress={buttonHandler}> 
         
         <ModalView>
           
            <BigText style = {{ fontSize:25 , color: tertiary, marginVertical: 10 }}> {headerText} </BigText>
             <RegularText style = {{marginBottom : 20}}> {message} </RegularText>
             <RowContainer style = {{justifycontent: 'space-between'}}>

                <TouchableOpacity onPress={buttonHandler} >
                <AntDesign name='close'  size={28} color={brand} style={{ padding: 10, marginRight: 10,}} />
        </TouchableOpacity>
                <AntDesign name='check' onPress={buttonHandler} size={28} color={green} />


             </RowContainer>
         </ModalView>
        </ModalPressableContainer>
    </Modal>
};
export default MessageModalImage;