import React, { useState, useContext } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import localApi from '../api/localApi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcons from "react-native-vector-icons/AntDesign"
import {Fumi} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native'

const LoginScreen = (props) => {
  const {navigation} = props;
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const signIn = async () => {
    if (!username != '') {
      Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Алдаа гарлаа !!!',
          textBody: 'Та нэвтрэх нэрээ бичихээ мартчихсан юм биш биз ?',
          textBodyStyle: { fontFamily: "Montserrat-Bold" }
      })
    } else {
      setIsLoading(true);
      localApi.get(`api/user-permissions?filters[username][$eq]=${username}`).then((res) => {
        if (res.data.data.length > 0) {
          loginAuthenticated(res.data.data[0])
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Алдаа гарлаа',
            textBody: 'Та системд бүртгэлгүй байна !!!',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          })
        }
      }).catch(error => {
          console.error("Error fetching user data:", error);
      }).finally(() => {
        setIsLoading(false);
      })
    }
  };

  const loginAuthenticated = async (responseData) => {
    await AsyncStorage.setItem('userInfo', JSON.stringify(responseData)).then(() => {
      login("userFound");
    }).catch((e) => {
      console.log(e, "<---------------- ERROR FOR AsyncStorage Login Function");
    })
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
                        placeholder='Нэвтрэх нэр'
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
                    </View>
                    <View style={{ alignItems: "flex-end", marginRight: 5 }}>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 14, color: "#ADA4A5" }} onPress={() => {navigation.navigate('Forget')}}>
                                Нэвтрэх нэрээ мартсан уу ?
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

                    <TouchableOpacity onPress={() => {
                      loginAuthenticated("GUEST")
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5 }}>
                          <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                            Login as guest
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