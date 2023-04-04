import React from 'react';

// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
import RegularText from '../Texts/RegularText';
const {primary , brand} = Colors;
const ButtonView = styled.TouchableOpacity`

padding: 15px;
background-color:${brand};
width : 100%
border-radius:10px;
left : 10px;
height:60px;


`;
const RegularButton = (props) => {
    return <ButtonView onPress={props.onPress} {...props}>
        <RegularText style = {[{color : primary} , {...props?.texStyle}]}> {props.children} </RegularText>
   
    </ButtonView>
};
export default RegularButton;