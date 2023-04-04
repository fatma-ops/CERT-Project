import React from 'react';

// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
const {primary} = Colors;
const StyledView = styled.View`
flex-direction: row ; 
align-items: center ; 
margin-top:15px;
justify-content: space-between;


`;
const RowContainer = (props) => {
    return <StyledView {...props}>
    {props.children}
    </StyledView>
};
export default RowContainer;