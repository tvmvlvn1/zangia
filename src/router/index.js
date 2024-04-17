import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Platform,
  Linking,
  AppState,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Lottie from 'lottie-react-native';
import LoginScreen from '../screens/Login';
import ForgetScreen from '../screens/forget/Forget';
import RecoverPass from '../screens/forget/Recover';
import CheckCode from '../screens/forget/CheckCode';
import NewPass from '../screens/forget/NewPass';
import NoInternet from '../components/global/NoInternet';

import {AuthContext} from '../context/AuthContext';
import localApi from '../api/localApi';
import VersionCheck from 'react-native-version-check';
import IntroScreen from '../screens/Intro'

import Bottom from "./bottom"

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  const [intro, setIntro] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchIntro();
  }, []);

  const fetchIntro = async () => {
    try {
      setIsLoading(true)
      const introValue = await AsyncStorage.getItem('intro');
      setIntro(JSON.parse(introValue));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      {!isLoading &&
        <AuthStack.Navigator
          initialRouteName={intro ? 'Login' : 'Intro'}
          screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Intro" component={IntroScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Forget" component={ForgetScreen} />
          <AuthStack.Screen name="RecoverPass" component={RecoverPass} />
          <AuthStack.Screen name="CheckCode" component={CheckCode} />
          <AuthStack.Screen name="NewPass" component={NewPass} />
        </AuthStack.Navigator>
      }
    </>
  );
};

const InternetStack = createStackNavigator();
const InternetStackScreen = () => (
  <InternetStack.Navigator
    initialRouteName="NetworkFail"
    screenOptions={{headerShown: false}}>
    <InternetStack.Screen name="NetworkFail" component={NoInternet} />
  </InternetStack.Navigator>
);

const Navigation = ({navigation}) => {
  const {isLoading, userToken, setIsLoading, logout} = useContext(AuthContext);
  const [netInfo, setNetInfo] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    setIsLoading(true);
    // Subscribe to network state updates
    checkVersion();
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });

    getNetInfo();
    return () => {
      unsubscribe();
    };
  }, [netInfo]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current, userToken);

      if (userToken) {
        localApi
          .post('checkToken', {jwt: userToken})
          .then(res => {
            console.log(res.data, 'success');
            if (res.data.code == '303') {
              logout();
            }
          })
          .catch(err => console.log(err.message, 'fails'));
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });
  };

  const checkVersion = () => {
    if (Platform.OS == 'android') {
      VersionCheck.getLatestVersion({
        provider: 'playStore', // for Android
      }).then(latestVersion => {
        if (VersionCheck.getCurrentVersion() < latestVersion) {
          // showAlert();
        }
      });
    } else {
      checkIosVersion(VersionCheck.getCurrentVersion());
    }
  };

  const showAlert = () => {
    return Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Шинэчлэл хийх',
      textBody: `Сүүийн хувилбарыг  [Зөвшөөрөх]  дарж шинэчилнэ үү`,
      button: 'Зөвшөөрөх',
      onPressButton: () => updateVersion(),
      textBodyStyle: { fontFamily: "Montserrat-Bold" }
    })
  };

  const updateVersion = () => {
    if (Platform.OS == 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.nominemp',
      ); // open store if update is needed.
    } else {
      Linking.openURL(
        'itms-services://?action=download-manifest&url=https://local.nomin.mn/app/manifest.plist',
      ); // open store if update is needed.
    }
  };

  const checkIosVersion = async version => {
    localApi
      .post('checkVersion', {
        version: version,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      })
      .then(res => {
        if (res.data.code != '200') {
          showAlert();
        }
      })
      .catch(err => {
        // Alert.alert('Алдаа гарлаа checkIosVersion', err.message);
      });
  };

  if (isLoading) {
    // We haven't finished checking for the token yet
    return (
      <Lottie
        autoPlay
        loop
        style={{ flex: 1, justifyContent: 'center' }}
        source={require('../assets/lottie/loading.json')}
      />
    );
  }
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!netInfo ? (
        <RootStack.Screen
          name="NoInternet"
          component={InternetStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : userToken ? (
        <RootStack.Screen name="App" component={Bottom} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default Navigation;
