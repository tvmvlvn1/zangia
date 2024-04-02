import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/router/index';
import {AuthProvider} from './src/context/AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const App = () => {
  return (
    <AlertNotificationRoot>
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </AlertNotificationRoot>
  );
};

export default App;
