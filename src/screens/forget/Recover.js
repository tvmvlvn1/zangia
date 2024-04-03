import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';
import Back from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcons from "react-native-vector-icons/Feather"
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import Lottie from 'lottie-react-native'

import localApi from '../../api/localApi';

const RecoverPass = props => {
  const {items} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})

  const sendCode = () => {
    if (selectedItem !== {}) {
      setIsLoading(true);

      localApi
        .post('sendCode', {
          name: selectedItem.name,
          type: selectedItem.type,
          empid: selectedItem.eid,
          authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
        })
        .then(res => {
          if (res.data.code == 200 && res.data.issent) {
            navigation.navigate('CheckCode', {selectedItem: selectedItem});
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Алдааны мэдээлэл',
              textBody: `${res.data.message}`,
              button: 'Хаах',
              textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
          }
        })
        .catch(err => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдааны мэдээлэл',
            textBody: `${err.message}`,
            button: 'Хаах',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          })
        }).finally(() => {
          setIsLoading(false);
        })
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Алдаа гарлаа !!!',
        textBody: 'Та нууц үг хүлээн авах төрлөө сонгохгүй бол нууц үгээ шинэчлэж чадахгүй шүү !',
        textBodyStyle: { fontFamily: "Montserrat-Bold" }
      })
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
          source={require("../../assets/images/sendCode.jpg")}
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
            }}
          >
            <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
              <View>
                {items.map((item) => {
                  return (
                    <TouchableOpacity onPress={() => setSelectedItem(item)}>
                      <View style={{margin: 7}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                          }}>
                          <FeatherIcons
                            name='check-circle'
                            color={selectedItem === item ? '#000' : "#ADA4A5"}
                            size={20}
                            style={{ marginRight: 5 }}
                          />
                          <View>
                            <Text
                              style={{
                                color: selectedItem === item ? '#000' : '#ADA4A5',
                                fontFamily: 'Montserrat-Medium',
                                textAlign: 'right',
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          height: 1,
                          backgroundColor: selectedItem === item ? '#000' : '#e5e5e5',
                        }}
                      />
                    </TouchableOpacity>
                  )
                })}
              </View>

              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => sendCode()}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Илгээх
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

export default RecoverPass;
