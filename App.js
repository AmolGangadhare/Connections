import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ConnectionList from './src/screens/ConnectionListScreen';
import ConnectionProfileScreen from './src/screens/ConnectionProfileScreen';

const Stack = createStackNavigator();

/**
 * App.js
 * Added navigation here
 */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ConnectionList"
          component={ConnectionList}
          options={{title: 'Connection List'}}
        />
        <Stack.Screen
          name="ConnectionProfile"
          component={ConnectionProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
