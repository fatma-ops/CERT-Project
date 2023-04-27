import { createNativeStackNavigator } from "@react-navigation/native-stack";


import ListeMedecins from "./ListeMedecins";
import AddMedecin from "./AddMedecin";
import AfficheMedecin from "./AfficheMedecin";
import ModifyMedecin from "./ModifyMedecin";


const Stack = createNativeStackNavigator();
const Medecin = () => {
    return(
    <Stack.Navigator screenOptions={{
        headerShown : false}} >
        <Stack.Screen name="ListeMedecins" component={ListeMedecins} />
        <Stack.Screen name="AddMedecin" component={AddMedecin}  />
        <Stack.Screen name="AfficheMedecin" component={AfficheMedecin}  />
        <Stack.Screen name="ModifyMedecin" component={ModifyMedecin}  />





       





    </Stack.Navigator>
    );
}

export default Medecin;