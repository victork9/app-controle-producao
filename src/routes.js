import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logon from './pages/logon';
import CadastroUser from './pages/cadUser';
import ForgetPass from './pages/forgetPass';
import Tabs from './tabNavigations';
import cadClients from './pages/cadClients';


const Stack = createStackNavigator();

export default function Routes() {
    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Logon">
                <Stack.Screen name="Logon" component={Logon} />
                <Stack.Screen name="CadastroUser" component={CadastroUser} />
                <Stack.Screen name="ForgetPass" component={ForgetPass} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen  name="cadClients" component={cadClients} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}