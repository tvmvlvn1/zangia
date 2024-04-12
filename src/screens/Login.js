import React, { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localApi from '../api/localApi';
import {getUniqueId, getModel} from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import {AuthContext} from '../context/AuthContext';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import AntDesignIcons from "react-native-vector-icons/AntDesign"
import IoniconsIcons from "react-native-vector-icons/Ionicons"
import FeatherIcons from "react-native-vector-icons/Feather"
import { Fumi  } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native'

const LoginScreen = (props) => {
  const {navigation} = props;
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    getUniqueId().then(data => setUniqueId(data));
    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Өглөөний мэнд,';
    } else if (currentHour >= 12 && currentHour < 17) {
        return 'Өдрийн мэнд,';
    } else {
        return 'Үдшийн мэнд,';
    }
  };

  const fetchData = async () => {
    let loginData = await AsyncStorage.getItem('loginInfo');
    let loginUserData = await JSON.parse(loginData);
    if (loginUserData !== null) {
      setSaveLoginInfo(loginUserData.saveLoginInfo || false);
      setUsername(loginUserData.username);
      setPassword(loginUserData.password);
    }
  };

  const signIn = async () => {
    if(!username != '' && !password != '') {
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Алдаа гарлаа !!!',
            textBody: 'Та хурууны код, нууц үгээ оруулдгаа мартчихсан юм биш биз ?',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
    } else if (!username != '') {
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Алдаа гарлаа !!!',
            textBody: 'Та хурууны кодоо бичихээ мартчихсан юм биш биз ?',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
    } else if(!password != '') {
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Алдаа гарлаа !!!',
            textBody: 'Та нууц үгээ бичихээ мартчихсан юм биш биз ?',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
    } else {
      setIsLoading(true);
      
      localApi
        .post('auth', {
          username,
          password,
          platform: Platform.OS,
          version: VersionCheck.getCurrentVersion(),
        })
        .then(res => {
          if (res.data.code == '200') {
            setIsLoading(false);
            if (res.data.imei_check == 'CHECK') {
              if (res.data.imei != null) {
                if (uniqueId == res.data.imei) {
                  loginAuthenticated(res.data);
                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Алдааны мэдээлэл',
                        textBody: 'Та энэ утаснаас нэвтрэх эрхгүй байна. Өөр утсаар нэвтрэх хүсэлтэй байгаа бол Erp-аар хүсэлтээ илгээнэ үү !',
                        button: 'Хаах',
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                }
              } else {
                showAlert(getModel(), res.data);
              }
            } else if (res.data.imei_check == 'UNCHECK') {
              loginAuthenticated(res.data);
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Алдааны мэдээлэл',
                    textBody: 'Та нэвтрэх тохиргоо хийгдээгүй байна !',
                    button: 'Хаах',
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                })
            }
          } else if (res.data.code == '401') {
            setIsLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Алдааны мэдээлэл',
                textBody: `${res.data.message}`,
                button: 'Хаах',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
          } else {
            setIsLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Алдааны мэдээлэл',
                textBody: 'Нэвтрэх нэр эсвэл нууц үг буруу байна !',
                button: 'Хаах',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
          }
        })
        .catch(error => {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Алдааны мэдээлэл',
                textBody: `${error.message}`,
                button: 'Хаах',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
          setIsLoading(false);
        });
    }
  };

  const showAlert = (model, responseData) => {
    return Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Нэвтрэх тохиргоо',
        textBody: `Цаашид ${model} төхөөрөмжөөр нэвтрэх үү ?`,
        button: 'Тийм',
        onPressButton: () => showLoginAlert(responseData, true, model),
        textBodyStyle: { fontFamily: "Montserrat-Bold" }
    })
  };

  const showLoginAlert = (responseData, isLogin, model) => {
    return Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Нэвтрэх тохиргоо',
        textBody: `Цаашид ${model} төхөөрөмжөөр нэвтрэхийг зөвшөөрч байна.`,
        button: 'Зөвшөөрөх',
        onPressButton: () => loginAuthenticated(responseData, isLogin),
        textBodyStyle: { fontFamily: "Montserrat-Bold" }
    })
  };

  const setImeiCode = responseData => {
    localApi
      .post('changeImei', {
        imei: uniqueId,
        empid: responseData.emp_id,
        jwt: responseData.jwt,
      })
      .then(res => {
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Мэдэгдэл',
            textBody: `${res.data.message}`,
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
      })
      .catch(err => {
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Алдаа гарлаа !!!',
            textBody: `${err.message}`,
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
      });
  };

  const loginAuthenticated = async (responseData, isFirst = false) => {
    if (isFirst) {
      setImeiCode(responseData);
    }
    await AsyncStorage.setItem('userInfo', JSON.stringify(responseData));
    if (saveLoginInfo) {
      let obj = {};
      obj.username = username;
      obj.password = password;
      obj.saveLoginInfo = saveLoginInfo;
      await AsyncStorage.setItem('loginInfo', JSON.stringify(obj));
    } else {
      AsyncStorage.removeItem('loginInfo');
    }
    login(responseData.jwt);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {isLoading ? 
            <Lottie
                autoPlay
                loop
                style={{ flex: 1, justifyContent: 'center' }}
                source={require('../assets/lottie/loading.json')}
            />
        :
            <View style={{ flex: 1, justifyContent: "space-between", marginBottom: 20 }}>
                <View>
                    <View style={{ alignItems: "center", marginTop: "5%" }}>
                        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 18, color: "#000" }}>
                            {getGreeting()}
                        </Text>
                        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 22, color: "#000" }}>
                            Тавтай морилно уу
                        </Text>
                    </View>
                    <View style={{ margin: 20 }}>
                      <Fumi
                        placeholder='Хурууны код'
                        iconClass={FontAwesomeIcon}
                        iconName={'user-o'}
                        iconColor={'#97B6FE'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                        style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium" }}
                      />
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Fumi
                          placeholder='Нууц үг'
                          iconClass={SimpleLineIcons}
                          iconName={'lock'}
                          iconColor={'#97B6FE'}
                          iconSize={20}
                          iconWidth={40}
                          inputPadding={16}
                          secureTextEntry={isShow ? false : true}
                          value={password}
                          onChangeText={(text) => setPassword(text)}
                          inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                          style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginTop: 10, width: "80%" }}
                        />
                        <TouchableOpacity style={{ backgroundColor: "#F7F8F8", padding: 20, marginTop: 10, borderRadius: 20 }} onPress={() => setIsShow(!isShow)}>
                          <IoniconsIcons
                            name={isShow ? "eye-outline" : 'eye-off-outline'}
                            color={"#000"}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end", marginRight: 5 }}>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 14, color: "#ADA4A5" }} onPress={() => { navigation.navigate('Forget') }}>
                                Нууц үгээ мартсан уу ?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => signIn()}>
                        <LinearGradient
                            colors={[ '#92A3FD', '#9DCEFF' ]}
                            style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                        >   
                            <AntDesignIcons
                                name='login'
                                color={"#fff"}
                                size={20}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                                Нэвтрэх
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                        <View style={{ height: 1, backgroundColor: "#DDDADA", width: "45%" }}/>
                        <Image
                            source={require("../assets/images/loginArrow.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode='contain'
                        />
                        <View style={{ height: 1, backgroundColor: "#DDDADA", width: "45%" }}/>
                    </View>

                    <TouchableOpacity onPress={() => setSaveLoginInfo(!saveLoginInfo)}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                            <FeatherIcons
                              name='check-circle'
                              color={saveLoginInfo ? "#000" : "#ADA4A5"}
                              size={20}
                              style={{ marginRight: 5 }}
                            />
                            <Text style={{ fontFamily: "Montserrat-Medium", color: saveLoginInfo ? "#000" : '#ADA4A5' }}>
                                {saveLoginInfo ? "Нэвтрэх нэр үгийг нь хадгалчихсан шүү" : "Нэвтрэх нэр үгээ сануулах уу ?"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        }
    </SafeAreaView>
  );
};

export default LoginScreen;