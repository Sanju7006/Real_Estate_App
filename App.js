
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import MainNavigator from './navigation/MainNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <SafeAreaProvider>
      <NavigationContainer>
       <MainNavigator />
     </NavigationContainer>
   </SafeAreaProvider>
  );
}

