import React , {useState , useEffect} from 'react';

// styled components
import styled from 'styled-components';
import { Colors } from '../styles';
import SmallText from '../Texts/SmallText';
import PressableText from '../Texts/PressableText';
import RowContainer from '../Containers/RowContainer'
const {primary , brand , red , green} = Colors;

const StyledView = styled.View`
align-items: center ; 
`;

const ResendText = styled(SmallText)`
color : ${brand};

${(props) => {
const {resendStatus} = props;
if(resendStatus == 'échoué!'){
    return ` color : ${red}`;
}else if (resendStatus == 'Envoyé!'){
    return `color : ${green}`;
}
}}

`;




const ResendTimer = ({activeResend ,setActiveResend,targetTimeInSeconds ,resendEmail,resendStatus,...props}) => {
  const [timeLeft , setTimeLeft] = useState(null);
  const [targetTime , setTargetTime] = useState(null);

  let resendTimerInterval;

const triggerTimer = (targetTimeInSeconds = 30) => {
  setTargetTime(targetTimeInSeconds);
  setActiveResend(false);
  const finalTime = +new Date() + targetTimeInSeconds * 1000;
 resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000 );
}
const calculateTimeLeft = (finalTime) => {
    const diffrence = finalTime - +new Date();
    if(diffrence >= 0){
        setTimeLeft(Math.round(diffrence/1000));
    }else {
        clearInterval(resendTimerInterval);
        setActiveResend(true);
        setTimeLeft(null);
    }

}
useEffect(() => {
    triggerTimer(targetTimeInSeconds);

    return () => {
        clearInterval(resendTimerInterval);
    };
} , []);

    return(<StyledView {...props}>
    <RowContainer> 
    <SmallText> Vous n’avez pas reçu l’e-mail ?</SmallText>
    <PressableText 
    onPress={() => resendEmail(triggerTimer)} 
    disabled ={!activeResend} 
    style = {{opacity : !activeResend ? 0.65 : 1 }}>
        <ResendText resendStatus={resendStatus} >
        {resendStatus}
        </ResendText>
        </PressableText>
        </RowContainer>


    {!activeResend && (<SmallText> en <SmallText style ={{ fontWeight : 'bold'}}> {timeLeft || targetTime} </SmallText>seconde(s)</SmallText>)}

    </StyledView>);
};
export default  ResendTimer;