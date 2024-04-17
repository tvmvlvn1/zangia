import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import localApi from '../../../api/localApi';
import Lottie from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/AuthContext';

const Index = props => {
  const {navigation, user} = props;
  const {logout} = useContext(AuthContext);

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getSignature();
  }, [isFocused]);

  const getSignature = async () => {
    try {
      setLoader(true);
      AsyncStorage.getItem('userInfo').then(userInfo => {
        let user = JSON.parse(userInfo);

        localApi
          .post('GetSignatureInfo', {
            jwt: user.jwt,
          })
          .then(response => {
            if (response.data.code == 200) {
              setData(
                response.data.data.signature_image &&
                  response.data.data.signature_image,
              );
              setLoader(false);
            } else if (response.data.code == 303) {
              setLoader(false);
              logout();
            } else {
              Alert.alert('Алдаа гарлаа.', response.data.message);
              setLoader(false);
            }
          });
      });
    } catch (e) {
      console.log('ERROR FOR LOADING GET SIGNATURE SERVICE ----------->', e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {loader ? (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../../assets/lottie/loading.json')}
        />
      ) : (
        <>
          {!data ? (
            <View style={{justifyContent: 'center'}}>
              <LottieView
                loop={true}
                style={{
                  alignSelf: 'center',
                  width: 410,
                }}
                source={require('./../../../assets/lottie/notfound.json')}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#000',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                Танд одоогоор бүртгэлтэй гарын үсэг байхгүй байна
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 19,
                  color: '#000',
                  textAlign: 'left',
                  padding: 15,
                }}>
                Таны одоогийн гарын үсэг
              </Text>
              <View
                style={{
                  width: '90%',
                  height: '50%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                }}>
                <Image
                  source={{uri: `data:image/png;base64,${data}`}}
                  resizeMode="contain"
                  style={{width: '100%', height: '100%', alignSelf: 'center'}}
                />
              </View>
            </View>
          )}
          <View
            style={{
              bottom: 15,
              position: 'absolute',
              alignSelf: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterSignatureStack')}
              style={{
                backgroundColor: '#3b5998',
                width: '90%',
                alignSelf: 'center',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 17, alignSelf: 'center'}}>
                Шинэ бүртгэл үүсгэх
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Index;
