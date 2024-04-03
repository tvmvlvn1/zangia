import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import localApi from '../../api/localApi';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import Lottie from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient';
import Back from 'react-native-vector-icons/AntDesign';
import { Fumi  } from 'react-native-textinput-effects';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Validate from '../../components/global/validatePass';

const NewPass = props => {
  const {selectedItem} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const regex = new RegExp(
    '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,25}',
  );
  const regexNumber = new RegExp('(?=.*[0-9])');
  const regexUpper = new RegExp('(?=.*[A-Z])');
  const regexSmall = new RegExp('(?=.*[a-z])');
  const regexSpecialCharacter = new RegExp('(?=.*[!@#$%^&*])');

  const updatePassword = () => {
    if (!regex.test(password))
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Алдаа гарлаа !!!',
        textBody: 'Нууц үгээ санамжийн дагуу оруулна уу? Таны нууц үг хамгаалалт муу байж болзошгүй.',
        textBodyStyle: { fontFamily: "Montserrat-Bold" }
      });

    setIsLoading(true);
    localApi
      .post('changePassword', {
        password: password,
        empid: selectedItem.eid,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      })
      .then(res => {
        setIsLoading(true);
        if (res.data.code == 200) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Амжилттай',
            textBody: `Таныг нэвтрэх хэсэг рүү шилжүүллээ шүү`,
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          });

          setTimeout(() => {
            navigation.navigate('Login')
          }, 1000);
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдаа гарлаа !!!',
            textBody: `${res.data.message}`,
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          });
        }
      })
      .catch(err => {
        setIsLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Алдаа гарлаа !!!',
          textBody: `${err.message}`,
          textBodyStyle: { fontFamily: "Montserrat-Bold" }
        });
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
          source={require("../../assets/images/lastchangePass.png")}
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
                  placeholder='Шинэ нууц үг'
                  iconClass={SimpleLineIcons}
                  iconName={'lock'}
                  iconColor={'#97B6FE'}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                  style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginTop: 10 }}
                />
                <View style={{ marginTop: 10 }}>
                  <Validate
                    validated={regexUpper.test(password)}
                    label="Том үсэг агуулсан байх."
                  />
                  <Validate
                    validated={regexNumber.test(password)}
                    label="Тоо агуулсан байх."
                  />
                  <Validate
                    validated={regexSmall.test(password)}
                    label="Жижиг үсэг агуулсан байх."
                  />
                  <Validate
                    validated={regexSpecialCharacter.test(password)}
                    label="Тусгай тэмдэгт агуулсан байх."
                  />
                  <Validate
                    validated={password.length >= 8 ? true : false}
                    label="8 ба түүнээс дээш оронтой байх."
                  />
                </View>
              </View>

              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={updatePassword}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Шинэчлэх
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

export default NewPass;
