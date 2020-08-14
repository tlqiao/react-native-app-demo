/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import SearchPage from './SearchPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchResults from './SearchResult';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchPage}></Stack.Screen>
        <Stack.Screen name="Result" component={SearchResults}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
