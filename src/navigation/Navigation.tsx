import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Movie} from '../interfaces/movieInterface';
import {DetailScreen} from '../screens/DetailScreen';
import {HomeScreen} from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
