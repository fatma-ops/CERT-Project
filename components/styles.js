import styled from 'styled-components';
import Constants from 'expo-constants';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "1f2937",
  darkLight: "#9CA3AF",
  brand: '#034c81',
  green: '#42bd86',
  red: '#EF4444',
  accent :'#00ADB5',
  black:'#111111'
};
const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;
export const StyledContainer = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight +30 }px;
backgroud-color: ${primary};

`;

export const StyledContainer2 = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight -60}px;
backgroud-color: ${primary};

`;
export const StyledContainer3 = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight - 70}px;
backgroud-color: ${primary};

`;
export const StyledContainerPassword = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight + 180}px;
backgroud-color: ${primary};

`;
export const StyledContainerRestPassword = styled.View`
flex: 1;
padding: 25px;
padding-top: ${StatusBarHeight + 100}px;
backgroud-color: ${primary};

`;






export const InnerContainer = styled.View`
flex:1;
width:100%;
align-items:center;
`;

export const WelcomeContainer = styled(InnerContainer)`
padding:25px;
padding-top: 10px;
justify-content: center;


`;


export const PageLogo = styled.Image`
width:100%;
height:200px;
`;

export const Logo = styled.Image`
width:100%;
height:220px;
padding-top:100px;

`;


export const Avatar = styled.Image`
width:100px;
height:100px;
border-radius : 50px;
border-width:2px;
border-color:${secondary};
margin-bottom: 10px;
margin-top:10px;
`;
export const WelcomeImage = styled.Image`
height:50%;
min-width:100%;

`;


export const PageTitle = styled.Text`

font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};
padding-top:90px;

${(props) => props.welcome && `
font-size: 35px;

` }


`;

export const PageTitlePassword = styled.Text`

font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};
`;







export const PageSignup = styled.Text`
padding-top:90px;
font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};




${(props) => props.welcome && `
font-size: 35px;

` }
`;

export const Editprofile = styled.Text`
padding-top:90px;
margin-Bottom:40px

font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};



${(props) => props.EditProfileScreen && `
font-size: 35px;

` }

`;






export const SubTitle = styled.Text`
font-size: 18px;
margin-bottom: 25px;
letter-spacing: 1px;
font-weight: bold;
color: ${tertiary};
text-align:center;


${(props) => props.welcome && `
margin-bottom: 5px;
font-weight: normal;
` }


`;
export const StyledFormArea = styled.View`
width:90%;
`;
export const StyledTextInput = styled.TextInput`
background-color:${secondary};
padding:15px;
padding-left:55px;
border-radius: 20px;
font-size:16px;
height:60px;
margin-vertical:3px;
font-width:'b
margin-bottom:10px;
color:${tertiary};
shadow-opacity:0.25;
shadow-offset:2px;
shadow-radius:1px;
margin-left:-10px;
margin-right:-10px;



`;




export const StyledInputLabel = styled.Text`
color:${tertiary};
font-size:13px;
text-align:left;

`;
export const StyledInputLabel2 = styled.Text`
color:${tertiary};
font-size:15px;
text-align:left;
font-Weight: bold;



`;

export const LeftIcon = styled.View`
left:15px;
top:38px;
position:absolute;
z-index : 1;
`;

export const RightIcon = styled.TouchableOpacity`
right:15px;
top:38px;
position:absolute;
z-index : 1;
`;
export const CenterIcon = styled.TouchableOpacity`
right:15px;
top:38px;
position:absolute;
z-index : 1;
`;

export const StyledButton = styled.TouchableOpacity`
padding:15px;
background-color: ${brand};
justify-content: center;
align-items: center;
border-radius: 20px;
margin-vertical: 5px ;
height: 60px;
${(props) => props.google == true && `
background-color:${green};
flex-direction:row;
justify-content:center;


`}
`;
export const StyledButton2 = styled.TouchableOpacity`
padding:15px;
background-color: ${brand};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px ;
height: 60px;
${(props) => props.google == true && `
background-color:${green};
flex-direction:row;
justify-content:center;


`}
`;


export const ButtonText = styled.Text`
color:${primary};
font-size:16px;
Text-align:center;

${(props) => props.google == true && `
  padding: 5px;
`}
`;

export const MsgBox = styled.Text`
Text-align:center;
font-size:13px;
color: ${(props) => (props.type == 'SUCCESS'? green : red) };
`;


export const Motdepasse = styled.Text`
font-size:13px;
color:${brand};

`;
export const ViewMot = styled.View`
justify-content: center ;
flex-direction:row;
Text-align:left;
padding:10px;


`;
export const ViewImage = styled.View`
background-color:${secondary};
padding:15px;
padding-left:55px;
border-radius: 20px;
font-size:16px;
height:200px;
margin-vertical:3px;
margin-top:10px;
color:${tertiary};


`;



export const Line = styled.View`
height:1px;
width:100%;
background-color:${darkLight};
margin-vertical:10px;
`;

export const ExtraView = styled.View`
justify-content: center ;
flex-direction:row;
align-items:center;
padding:10px;

`;
export const ExtraView2 = styled.View`
justify-content: space-between;
flex-direction:row;
padding:10px;
margin:15px;
align-items:center;




`;

export const ExtraText = styled.Text`
justify-content: center ;
align-content:center;
color:${tertiary};
font-size:15px;


`;
export const TextLink = styled.TouchableOpacity`
justify-content: center ;
align-items: center ;

`;

export const TextLinkContent = styled.Text`
color: ${brand}
font-size:15px;
`;
