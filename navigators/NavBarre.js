import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '../components/styles'
import Welcome from '../screens/User/Welcome'
import Vaccin from '../screens/VaccinClass/Vaccin'
import Depenses from '../screens/Depenses'
//import AddAnalyse from '../screens/AddAnalyse'

import ListeRappel from '../screens/RappelClass/ListeRappel'
import HomeNavigation from './HomeNavigation'

import Medecin from '../screens/MedecinClass/Medecin'
import dossier from '../screens/DossierClass/dossier'

const { darkLight, brand , red } = Colors;
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
                name="dossier"
                component={dossier}
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
                name="HomeNavigation"
                component={HomeNavigation} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='home' size={24} color={focused ? brand : darkLight} />
                            </View>
                        )
                    }
                }} />

            <Tab.Screen name="Medecin"
                component={Medecin}
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
                                backgroundColor:brand
                            }}>
                                <FontAwesome name='plus' size={24} color='white' />

                            </View>
                        )
                    }
                }} />


            <Tab.Screen name="ListeRappel"
                component={ListeRappel}
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