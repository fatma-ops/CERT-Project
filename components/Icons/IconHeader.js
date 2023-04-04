import React from 'react';
import styled from 'styled-components';
import { ScreenHeight , StatusBarHeight } from '../shared';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    Colors,
} from './../styles';
const {  primary , secondary , brand } = Colors;

const IconBg = styled.View`


background-color:${secondary};
width: ${ScreenHeight * 0.15}px;
height: ${ScreenHeight * 0.15}px;
border-radius:${ScreenHeight * 0.2}px;
justify-content: center;
align-items:center;
align-self:center;
`;
const IconHeader= ({name ,  color , ...props}) => {
    return (
    <IconBg style = {{...props.style}}><MaterialCommunityIcons name={name} size={ StatusBarHeight * 1.2 } color={color ? color : brand }/>
    
    </IconBg>
    );
};
export default IconHeader;