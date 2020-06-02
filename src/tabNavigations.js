import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5, } from '@expo/vector-icons';
import CreateVistory from './pages/createVistory'
import ListVistory from './pages/listVistory';
import User from './pages/user';



const Tab = createBottomTabNavigator();


export default function Routes() {
    return (
            <Tab.Navigator
        
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                            return <Ionicons name={iconName} size={30} color={color} />;
                        } else if (route.name === 'CurrecyVistory') {
                            iconName = focused
                                ? 'file-invoice-dollar'
                                : 'file-invoice-dollar';
                            return <FontAwesome5 name={iconName} size={30} color={color} />;
                        }else if (route.name === 'User') {
                            iconName = focused
                                ? 'user-alt'
                                : 'user-alt';
                            return <FontAwesome5  name={iconName} size={25} color={color} />;
                        }

                        // You can return any component that you like here!

                    },
                   
                })}
                tabBarOptions={{
                    
                    activeTintColor: '#1E90FF',
                    inactiveTintColor: 'gray',
                    labelPosition: 'beside-icon',
                    style: {
                        backgroundColor: '#fff',
                      }
                }}
            >

                <Tab.Screen name="Home" options={{ title: '' }} component={CreateVistory} />
                <Tab.Screen name="CurrecyVistory" options={{ title: '' }} component={ListVistory} />
                <Tab.Screen name="User" options={{ title: '' }} component={User} />
            </Tab.Navigator>
       

    );
}