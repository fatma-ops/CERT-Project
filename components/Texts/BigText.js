import React from 'react';

// styled components
import styled from 'styled-components';
import { StatusBarHeight } from '../shared';
import { Colors } from '../styles';
const {tertiary} = Colors;
const StyledText = styled.Text`
font-size:15px;
color: ${tertiary};
text-align:center;

`;
const BigText = (props) => {
    return <StyledText {...props}>
    {props.children}
    </StyledText>
};
export default BigText;