import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/router/index';
import {AuthProvider} from './src/context/AuthContext';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#213B78');
    } else {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, []);

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
