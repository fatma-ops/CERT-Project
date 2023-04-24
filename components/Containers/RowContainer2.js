import React from 'react';

// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
const {primary} = Colors;
const StyledView = styled.View`
flex-direction: row ; 



`;
const RowContainer2 = (props) => {
    return <StyledView {...props}>
    {props.children}
    </StyledView>
};
export default RowContainer2;