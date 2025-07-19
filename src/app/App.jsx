import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaintenanceList from '../components/MaintenanceList';
import AddMaintenance from '../components/AddMaintenance';
import BreakdownList from '../components/BreakdownList';
import AddBreakdown from '../components/AddBreakdown';
import Insurance from '../components/Insurance';
// import MaintenanceList from '../components/MaintenanceList';

// import Maintenance from './src/components'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Работы" component={MaintenanceList} />
        <Stack.Screen name="Добавить работу" component={AddMaintenance} />
        <Stack.Screen name="Поломки" component={BreakdownList} />
        <Stack.Screen name="Добавить поломку" component={AddBreakdown} />
        <Stack.Screen name="Страховка" component={Insurance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}