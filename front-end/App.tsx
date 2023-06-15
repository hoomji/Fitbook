import * as React from 'react';
// Screens
import Home from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import BottomSheetScreen from './src/screens/BottomSheetScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './src/screens/LoginScreen';
import ResetLoginScreen from './src/screens/ResetLoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Overview' }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ResetLogin" component={ResetLoginScreen} />
          <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;