import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Fumi  } from 'react-native-textinput-effects';
import Back from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import localApi from '../../api/localApi';
import Lottie from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const ForgetScreen = props => {
  const [username, setUsername] = useState('');
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);

  const searchFingerCode = () => {
    if (username === "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Алдаа гарлаа !!!',
        textBody: 'Та хурууны кодоо оруулдгаа мартчихсан юм биш биз ?',
        textBodyStyle: { fontFamily: "Montserrat-Bold" }
      });
    } else {
      setIsLoading(true);

      localApi
        .post('searchFingerCode', {
          authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
          fingercode: username,
        })
        .then(res => {
          if (res.data.code === "200" && res.data.is_emp) {
            navigation.navigate('RecoverPass', { items: res.data.items });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Алдааны мэдээлэл',
              textBody: 'Та бүртгэлгүй байна !!!',
              button: 'Хаах',
              textBodyStyle: { fontFamily: "Montserrat-Bold" }
            });
          }
        })
        .catch(err => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдааны мэдээлэл',
            textBody: `${err.message}`,
            button: 'Хаах',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
          source={require("../../assets/images/forget.jpg")}
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
              borderTopRightRadius: 40,
            }}
          >
            <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
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
              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => searchFingerCode()}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Хайх
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
export default ForgetScreen;
