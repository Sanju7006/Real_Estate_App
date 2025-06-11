
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import PropertyCard from '../components/propertycard';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabs} />
      <Stack.Screen name="PropertyCard" component={PropertyCard} />
      <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />
    </Stack.Navigator>
  );
}
