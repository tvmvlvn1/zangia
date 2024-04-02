import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  Linking,
  Alert,
  Image,
  SafeAreaView,
  AppState,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import ForgetScreen from '../screens/forget/Forget';
import RecoverPass from '../screens/forget/Recover';
import CheckCode from '../screens/forget/CheckCode';
import NewPass from '../screens/forget/NewPass';
import NoInternet from '../components/global/NoInternet';
import QrScreen from '../screens/qr/TimeQr';
import TimeSheetScreen from '../screens/Timesheet';

import {AuthContext} from '../context/AuthContext';
import localApi from '../api/localApi';
import VersionCheck from 'react-native-version-check';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IdCardScreen from '../screens/IdCard';
import CustomDrawer from '../components/global/CustomDrawer';
import SalaryScreen from '../screens/salary';

//Rule router
import Rule from '../screens/rule';
import RuleView from '../screens/rule/RuleView';
import RuleFilter from '../screens/rule/filter';

//Abt router
import Abt from '../screens/abt';
import AbtView from '../screens/abt/AbtView';

//Restock router
import Restock from '../screens/restock';
import RestockList from '../screens/restock/RestockList';
import RestockView from '../screens/restock/RestockView';

// Profile router
import Profile from '../screens/profile';
import Self from '../screens/profile/edit/self';
import EditEducation from '../screens/profile/edit/education';

import Signature from '../screens/profile/signature';
import RegisterSignature from '../screens/profile/signature/registerSignature';

import Family from '../screens/profile/edit/family';
// import EditFamily from '../screens/profile/edit/editFamily';
// import ShowFamily from '../screens/profile/edit/showFamilyMember';

import DependentMember from '../screens/profile/edit/dependentMember';

import AddressScreen from '../screens/profile/edit/address';

//Absence Request
import Absence from '../screens/absence/index';
import AbsenceDetail from '../screens/absence/detail';
import CreateAbsenceRequest from '../screens/absence/createRequest';

// Position router
import Position from '../screens/position';

// Phone router
import Phone from '../screens/phone';
import PhoneDetail from '../screens/phone/detail';
import PhoneDownload from '../screens/phone/pick';
import PhoneFilter from '../screens/phone/filter';
import IntroScreen from '../screens/Intro'

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

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="HomeStack"
    screenOptions={{
      headerShown: true,
      headerStyle: {},
      headerTitleStyle: {
        fontSize: 14,
      },
      headerBackTitle: 'Буцах',
      headerBackTitleStyle: {
        fontSize: 14,
      },
      headerBackgroundContainerStyle: {
        backgroundColor: '#fff',
      },
    }}>
    <HomeStack.Group>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: '',
          headerBackground: () => (
            <SafeAreaView>
              <Image
                style={{
                  width: 200,
                  marginTop: 4,
                  marginLeft: 10,
                }}
                resizeMode="contain"
                source={require('../assets/logo.png')}
              />
            </SafeAreaView>
          ),
        }}
      />
      <HomeStack.Screen
        name="TimeSheetStack"
        component={TimeSheetScreen}
        options={{title: 'Ирцийн мэдээлэл'}}
      />

      <HomeStack.Screen
        name="SalaryStack"
        component={SalaryScreen}
        options={{title: 'Цалингийн мэдээлэл'}}
      />

      <HomeStack.Screen
        name="JobPosition"
        component={Position}
        options={{title: 'Нээлттэй ажлын байр'}}
      />

      {/* Дүрэм журам */}
      <HomeStack.Screen
        name="RuleStack"
        component={Rule}
        options={{title: 'Дүрэм, журам, стандарт'}}
      />
      <HomeStack.Screen
        name="RuleViewStack"
        component={RuleView}
        options={{title: 'Дүрэм, журам, стандарт'}}
      />
      <HomeStack.Screen
        name="RuleFilterStack"
        component={RuleFilter}
        options={{title: 'Хайх'}}
      />

      {/* Ажлын байрны тодорхойлолт */}
      <HomeStack.Screen
        name="AbtStack"
        component={Abt}
        options={{title: 'Ажлын байрны тодорхойлолт'}}
      />
      <HomeStack.Screen
        name="AbtViewStack"
        component={AbtView}
        options={{title: 'Ажлын байрны тодорхойлолт'}}
      />

      {/* Дэлгүүрийн өрөлт */}
      <HomeStack.Screen
        name="RestockStack"
        component={Restock}
        options={{title: 'Дэлгүүрийн өрөлт'}}
      />
      <HomeStack.Screen
        name="RestockListStack"
        component={RestockList}
        options={{title: 'Дэлгүүрийн өрөлт'}}
      />
      <HomeStack.Screen
        name="RestockViewStack"
        component={RestockView}
        options={{title: 'Дэлгүүрийн өрөлт'}}
      />

      {/* Ажилтны мэдээлэл */}
      <HomeStack.Screen
        name="UserProfileStack"
        component={Profile}
        options={{title: 'Ажилтны мэдээлэл'}}
      />
      <HomeStack.Screen
        name="EditInformationStack"
        component={Self}
        options={{title: 'Ажилтны мэдээлэл'}}
      />
      <HomeStack.Screen
        name="EditEducationStack"
        component={EditEducation}
        options={{title: 'Боловсролын мэдээлэл'}}
      />

      <HomeStack.Screen
        name="SignatureStack"
        component={Signature}
        options={{title: 'Гарын үсэг'}}
      />
      <HomeStack.Screen
        name="RegisterSignatureStack"
        component={RegisterSignature}
        options={{title: 'Гарын үсэг'}}
      />

      <HomeStack.Screen
        name="FamilyStack"
        component={Family}
        options={{title: 'Гэр бүлийн гишүүд'}}
      />
      {/* <HomeStack.Screen
        name="EditFamilyStack"
        component={EditFamily}
        options={{title: 'Гэр бүлийн гишүүд'}}
      />
      <HomeStack.Screen
        name="ShowFamilyStack"
        component={ShowFamily}
        options={{title: 'Гэр бүлийн гишүүд'}}
      /> */}

      <HomeStack.Screen
        name="RelationStack"
        component={DependentMember}
        options={{title: 'Хамааралтай гишүүд'}}
      />

      <HomeStack.Screen
        name="AddressStack"
        component={AddressScreen}
        options={{title: 'Хаягийн мэдээлэл'}}
      />

      {/* Чөлөөний хүсэлт */}
      <HomeStack.Screen
        name="AbsenceRequest"
        component={Absence}
        options={{title: 'Чөлөөний хүсэлт'}}
      />
      <HomeStack.Screen
        name="AbsenceRequestDetail"
        component={AbsenceDetail}
        options={{title: 'Дэлгэрэнгүй чөлөөний хүсэлт'}}
      />
      <HomeStack.Screen
        name="CreateAbsence"
        component={CreateAbsenceRequest}
        options={{title: 'Дэлгэрэнгүй чөлөөний хүсэлт'}}
      />

      <HomeStack.Screen
        name="PhoneStack"
        component={Phone}
        options={{title: 'Утасны жагсаалт'}}
      />
      <HomeStack.Screen
        name="PhoneDetailStack"
        component={PhoneDetail}
        options={{title: 'Утасны жагсаалт'}}
      />
      <HomeStack.Screen
        name="PhoneDownloadStack"
        component={PhoneDownload}
        options={{title: 'Утасны жагсаалт'}}
      />
      <HomeStack.Screen
        name="PhoneFilterStack"
        component={PhoneFilter}
        options={{title: 'Хайх'}}
      />
    </HomeStack.Group>

    <HomeStack.Group
      screenOptions={{presentation: 'transparentModal', headerShown: false}}>
      <HomeStack.Screen name="IdCardScreen" component={IdCardScreen} />
    </HomeStack.Group>
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="TabHome"
      component={HomeStackScreen}
      options={{
        tabBarItemStyle: {display: 'none'},
        headerShown: false,
        title: 'Нүүр хуудас',
        tabBarLabel: 'Нүүр хуудас',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/idcard.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="TabIdCard"
      // харуулахгүй component
      component={HomeStackScreen}
      options={{
        // tabBarItemStyle: {display: 'none'},
        headerShown: false,
        title: 'Ажлын үнэмлэх',
        tabBarLabel: 'Ажлын үнэмлэх',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/idcard.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
      listeners={({navigation}) => ({
        tabPress: e => {
          e.preventDefault();
          navigation.navigate('IdCardScreen');
        },
      })}
    />
    <Tab.Screen
      name="QrScreen"
      component={QrScreen}
      options={{
        title: 'Цаг бүртгэл',
        tabBarLabel: 'Цаг бүртгэл',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/qrcode.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{headerShown: false, drawerPosition: 'right'}}>
    <Drawer.Screen
      name="DrawerHome"
      component={TabScreen}
      options={{
        title: 'Нүүр хуудас',
      }}
    />
    <Drawer.Screen
      name="DrawerRule"
      component={TabScreen}
      options={{
        title: 'Дүрэм журам стандарт',
      }}
      listeners={({navigation}) => ({
        drawerItemPress: e => {
          e.preventDefault();
          navigation.navigate('RuleStack');
        },
      })}
    />
    <Drawer.Screen
      name="DrawerAbt"
      component={TabScreen}
      options={{
        title: 'Ажлын байрны тодорхойлолт',
      }}
      listeners={({navigation}) => ({
        drawerItemPress: e => {
          e.preventDefault();
          navigation.navigate('AbtStack');
        },
      })}
    />
    <Drawer.Screen
      name="DrawerRestock"
      component={TabScreen}
      options={{
        title: 'Дэлгүүрийн өрөлт',
      }}
      listeners={({navigation}) => ({
        drawerItemPress: e => {
          e.preventDefault();
          navigation.navigate('RestockStack');
        },
      })}
    />
    <Drawer.Screen
      name="DrawerAbsence"
      component={TabScreen}
      options={{
        title: 'Чөлөөний хүсэлт',
      }}
      listeners={({navigation}) => ({
        drawerItemPress: e => {
          e.preventDefault();
          navigation.navigate('AbsenceRequest');
        },
      })}
    />
  </Drawer.Navigator>
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
          showAlert();
        }
      });
    } else {
      checkIosVersion(VersionCheck.getCurrentVersion());
    }
  };

  const showAlert = () => {
    return Alert.alert(
      'Шинэчлэл хийх',
      'Сүүийн хувилбарыг  [OK]  дарж шинэчилнэ үү',
      [
        {
          text: 'Болих',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '[OK]', onPress: () => updateVersion()},
      ],
      {cancelable: false},
    );
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#1660AB" size="large" />
      </View>
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
        <RootStack.Screen name="App" component={DrawerScreen} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default Navigation;
