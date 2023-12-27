import * as React from 'react';
import {LoginScreen, SignupScreen} from '../screens';
import {RoutesName} from '../utils/Resource';

const AuthStack = Stack => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={RoutesName.LOGIN} component={LoginScreen} />
      <Stack.Screen name={RoutesName.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
