import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '../components/styles'
import Welcome from '../screens/User/Welcome'
import HomeScreen from '../screens/HomeScreen'
import AnalyseFlatList from '../screens/AnalyseFlatList'
import Vaccin from '../screens/VaccinClass/Vaccin'
import Analyse from '../screens/AnalyseClass/Analyse'
import Medecin from '../screens/MedecinClass/Medecin'
//import AddAnalyse from '../screens/AddAnalyse'


const { darkLight, brand } = Colors;


const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#fff"
    }
}

export default function NavBarre() {
    return (

        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Medecin"
                component={Medecin}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='folder' size={24} color={focused ? brand : darkLight} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='home' size={24} color={focused ? brand : darkLight} />
                            </View>
                        )
                    }
                }} />

            <Tab.Screen name="Vaccin"
                component={Vaccin}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                top: Platform.OS == "ios" ? -10 : -20,
                                width: Platform.OS == "ios" ? 50 : 60,
                                height: Platform.OS == "ios" ? 50 : 60,
                                borderRadius: Platform.OS == "ios" ? 25 : 30,
                                alignItems: "center",
                                justifyContent: 'center',
                                backgroundColor: brand
                            }}>
                                <FontAwesome name='plus' size={24} color='white' />

                            </View>
                        )
                    }
                }} />


            <Tab.Screen name="Analyse"
                component={Analyse}
                options={{

                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='bell' size={24} color={focused ? brand : darkLight} />
                            </View>
                        )
                    }
                }} />

            <Tab.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='user' size={24} color={focused ? brand : darkLight} />
                            </View>
                        )
                    }
                }} />




        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})