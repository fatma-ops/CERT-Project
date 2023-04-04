import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Analyse from '../screens/AddAnalyse'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '../components/styles'
import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import AnalyseFlatList from '../screens/AnalyseFlatList'
import AnalyseDetail from '../screens/AnalyseDetail'
import Vaccin from '../screens/Vaccin'
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
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='folder' size={24} color={focused ? brand : darkLight} />
                                <Text style={{ fontSize: 12, color: "grey" }} > Dossier </Text>
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="AnalyseFlatList"
                component={AnalyseFlatList} options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='home' size={24} color={focused ? brand : darkLight} />
                                <Text style={{ fontSize: 12, color: "grey" }} >     Home     </Text>
                            </View>
                        )
                    }
                }} />

            <Tab.Screen name="Transcation"
                component={Analyse}
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


            <Tab.Screen name="AnalyseDetail"
                component={AnalyseDetail}
                options={{
                    
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='bell' size={24} color={focused ? brand : darkLight} />
                                <Text style={{ fontSize: 12, color: "grey" }} >   Notification   </Text>
                            </View>
                        )
                    }
                }} />

            <Tab.Screen
                name="Vaccin"
                component={Vaccin}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Entypo name='cog' size={24} color={focused ? brand : darkLight} />
                                <Text style={{ fontSize: 12, color: "grey" }} >     Parametre    </Text>
                            </View>
                        )
                    }
                }} />




        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})