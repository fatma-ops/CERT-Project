import React from 'react';

// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
import RegularText from '../Texts/RegularText';
const {primary , brand} = Colors;
const ButtonView = styled.TouchableOpacity`

padding: 15px;
background-color:${brand};
width : 45%
justify-content:center;
align-items:center;
border-radius:10px;
height:50px;
flex-direction:row;
justify-content: space-between;
margin-top:2px;





`;
const RegularButton3 = (props) => {
    return <ButtonView onPress={props.onPress} {...props}>
        <RegularText style = {[{color : primary} , {...props?.texStyle}]}> {props.children} </RegularText>
   
    </ButtonView>
};
export default RegularButton3;