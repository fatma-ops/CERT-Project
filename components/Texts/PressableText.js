import React from 'react';

// styled components
import styled from 'styled-components';
import SmallText from './SmallText';

import { Colors } from '../styles';

const {primary, brand} = Colors;

const StyledPressable = styled.Pressable`
padding-vertical : 5px;
align-self: center;
`;
const PressableText = (props) => {
    return (
     <StyledPressable onPress={props.onPress} {...props}>
      <SmallText style = {{ color : brand}} >{props.children}</SmallText>

     </StyledPressable>
    )
};
export default PressableText;