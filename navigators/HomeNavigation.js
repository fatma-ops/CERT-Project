import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListeAnalyse from "./../screens/AnalyseClass/ListeAnalyse";
import ListeVaccin from "./../screens/VaccinClass/ListeVaccin";
import AfficheVaccin from "./../screens/VaccinClass/AfficheVaccin";
import AddVaccin from "./../screens/VaccinClass/AddVaccin";
import ModifyVaccin from "./../screens/VaccinClass/ModifyVaccin";
import HomeScreen from "../screens/HomeScreen";
import Add from "../screens/AnalyseClass/Add";
import AfficheAnalyse from "../screens/AnalyseClass/AfficheAnalyse";
import ModifyAnalyse from "../screens/AnalyseClass/ModifyAnalyse";
import Analyse from "../screens/AnalyseClass/Analyse";
import Vaccin from "../screens/VaccinClass/Vaccin";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
    <Stack.Navigator >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="ListeAnalyse" component={ListeAnalyse}  />
        <Stack.Screen name="Add" component={Add}  />
        <Stack.Screen name="AfficheAnalyse" component={AfficheAnalyse}  />
        <Stack.Screen name="Analyse" component={Analyse}  />
        <Stack.Screen name="ModifyAnalyse" component={ModifyAnalyse}  />





        <Stack.Screen name="ListeVaccin" component={ListeVaccin}  />
        <Stack.Screen name="Vaccin" component={Vaccin}  />
        <Stack.Screen name="AfficheVaccin" component={AfficheVaccin}  />
        <Stack.Screen name="ModifyVaccin" component={ModifyVaccin}  />
        <Stack.Screen name="AddVaccin" component={AddVaccin}  />





    </Stack.Navigator>
    );
}

export default Navigation;