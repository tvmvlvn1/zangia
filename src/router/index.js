import React, {useEffect, useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

import LoginScreen from '../screens/Login';
import ForgetScreen from '../screens/forget/Forget';
import NoInternet from '../components/global/NoInternet';
import {AuthContext} from '../context/AuthContext';
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

const Navigation = () => {
  const {isLoading, userToken, setIsLoading} = useContext(AuthContext);
  const [netInfo, setNetInfo] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });

    getNetInfo();
    return () => {
      unsubscribe();
    };
  }, [netInfo]);

  const getNetInfo = () => {
    NetInfo.fetch().then(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <Lottie
        autoPlay
        loop
        style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}
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
