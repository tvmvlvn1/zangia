import React, {Component, useState} from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import localApi from '../../api/localApi';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import Lottie from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient';
import Back from 'react-native-vector-icons/AntDesign';
import { Fumi  } from 'react-native-textinput-effects';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

const CheckCode = props => {
  const {selectedItem} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const resendCode = () => {
    if (!isLoading) {
      setIsLoading(true);
      if (selectedItem) {
        localApi
          .post('sendCode', {
            name: selectedItem.name,
            type: selectedItem.type,
            empid: selectedItem.eid,
            authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
          })
          .then(res => {
            if (res.data.code == 200 && res.data.issent) {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Амжилттай илгээгдлээ',
                textBody: 'Таны хүсэлт дахин илгээгдлээ',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
              })
            } else {
              Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Алдааны мэдээлэл',
                textBody: `${res.data.message}`,
                button: 'Хаах',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
              })
            }
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Алдааны мэдээлэл',
              textBody: `${err.message}`,
              button: 'Хаах',
              textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
          });
      }
    }
  };

  const checkCode = () => {
    navigation.navigate('NewPass', {selectedItem: selectedItem});
    setIsLoading(true);
    localApi
      .post('checkSecurity', {
        password_security: code,
        empid: selectedItem.eid,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      })
      .then(res => {
        setIsLoading(true);
        if (res.data.code == 200) {
          navigation.navigate('NewPass', {selectedItem: selectedItem});
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдааны мэдээлэл',
            textBody: `Таны нууц үг шинэчлэх код буруу байна. Дахин шалгана уу !`,
            button: 'Хаах',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          })
        }
      })
      .catch(err => {
        setIsLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Алдааны мэдээлэл',
          textBody: `${err.message}. Таны нууц үг шинэчлэх код буруу байж магадгүй тул дахин шалгахыг хүсье !`,
          button: 'Хаах',
          textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {
        isLoading ? 
          <Lottie
            autoPlay
            loop
            style={{ flex: 1, justifyContent: 'center' }}
            source={require('../../assets/lottie/loading.json')}
          />
        :
        <ImageBackground
          source={require("../../assets/images/changePassword.png")}
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '35%',
            }}
            resizeMode="cover"
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 50 : 15,
              left: 15,
              backgroundColor: '#F9F9F9',
              padding: 10,
              borderRadius: 20,
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Back name="arrowleft" size={16} color="#737373" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              width: '100%',
              height: '70%',
              bottom: 0,
              position: 'absolute',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
              <View>
                <Fumi
                  placeholder='Нууц үг'
                  iconClass={SimpleLineIcons}
                  iconName={'lock'}
                  iconColor={'#97B6FE'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  value={code}
                  onChangeText={(text) => setCode(text)}
                  inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                  style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginTop: 10 }}
                />
                <View style={{ alignItems: "flex-end", marginRight: 5 }}>
                  <TouchableOpacity>
                      <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 14, color: "#ADA4A5" }} onPress={resendCode}>
                          Нууц үг дахин илгээх үү ?
                      </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={checkCode}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Шалгах
                  </Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      }
    </View>
  );
};

export default CheckCode;
