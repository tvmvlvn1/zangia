import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import localApi from '../../../api/localApi';
import SignatureCapture from 'react-native-signature-capture';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/AuthContext';

const RegisterSignature = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);

  const signatureCaptureRef = useRef(null);
  const [firstImage, setFirstImage] = useState('');
  const [secondImage, setSecondImage] = useState('');
  const [thirdImage, setThirdImage] = useState('');
  const [whichImage, setWhichImage] = useState('');
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);
    });
  }, []);

  const saveSignature = () => {
    if (signatureCaptureRef.current) {
      signatureCaptureRef.current.saveImage();
    }
  };

  const resetSignature = () => {
    if (signatureCaptureRef.current) {
      signatureCaptureRef.current.resetImage();
    }
  };

  const handleSaveEvent = result => {
    if (!firstImage) {
      setFirstImage(result.encoded);
    } else if (!secondImage) {
      setSecondImage(result.encoded);
    } else if (!thirdImage) {
      setThirdImage(result.encoded);
    }
  };

  const alertMessage = text => {
    Alert.alert(
      'Анхааруулах мессэж',
      `Та ${
        text == 'first' ? 'Эхний' : text == 'second' ? 'Хоёрдохь' : 'Сүүлийн'
      } гарын үсгийг илгээхдээ итгэлтэй байна уу`,
      [
        {
          text: 'Үгүй',
          // onPress: () => console.log('Үгүй Pressed'),
          style: 'cancel',
        },
        {
          text: 'Илгээх',
          onPress: () => sendSignature(text),
        },
      ],
    );
  };

  const warningMessage = value => {
    setWhichImage(value);
    alertMessage(value);
  };

  const sendSignature = whichSignature => {
    try {
      setLoader(true);
      localApi
        .post('UpdateSignatureInfo', {
          jwt: user.jwt,
          signature_image:
            whichSignature == 'first'
              ? firstImage
              : whichSignature == 'second'
              ? secondImage
              : thirdImage,
        })
        .then(response => {
          if (response.data.code == '200') {
            Alert.alert('Амжилттай илгээгдлээ');
            navigation.goBack();
            setLoader(false);
          } else if (response.data.code == '303') {
            logout();
          } else {
            Alert.alert('Алдаа гарлаа.', response.data.message);
            setLoader(false);
          }
        })
        .catch(error => {
          Alert.alert('Алдаа гарлаа.', error.message);
        });
    } catch (e) {
      console.log('ERROR FOR UPDATING SIGNATURE---------->', e);
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
        <View style={{flex: 1}}>
          <SignatureCapture
            ref={signatureCaptureRef}
            showNativeButtons={false}
            minStrokeWidth={1}
            onSaveEvent={handleSaveEvent}
            maxStrokeWidth={25}
            style={{height: '40%', borderWidth: 1, borderColor: '#000'}}
            maxSize={276}
          />
          <ScrollView>
            <Text
              style={{
                padding: 10,
                color: '#000',
                fontSize: 16,
                fontWeight: 500,
              }}>
              Хадгалагдсан гарын үсэг
            </Text>
            {firstImage && (
              <TouchableOpacity
                onPress={() => {
                  warningMessage('first');
                }}
                style={{
                  flexDirection: 'row',
                  margin: 15,
                  marginTop: 0,
                  alignItems: 'center',
                }}>
                {whichImage == 'first' ? (
                  <Image
                    source={require('../../../assets/images/selected.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/select.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                )}
                <Image
                  source={{uri: `data:image/png;base64,${firstImage}`}}
                  resizeMode="contain"
                  style={{width: 100, height: 50}}
                />
              </TouchableOpacity>
            )}

            {secondImage && (
              <TouchableOpacity
                onPress={() => {
                  warningMessage('second');
                }}
                style={{
                  flexDirection: 'row',
                  margin: 15,
                  marginTop: 0,
                  alignItems: 'center',
                }}>
                {whichImage == 'second' ? (
                  <Image
                    source={require('../../../assets/images/selected.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/select.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                )}
                <Image
                  source={{uri: `data:image/png;base64,${secondImage}`}}
                  resizeMode="contain"
                  style={{width: 100, height: 50}}
                />
              </TouchableOpacity>
            )}

            {thirdImage && (
              <TouchableOpacity
                onPress={() => {
                  warningMessage('third');
                }}
                style={{
                  flexDirection: 'row',
                  margin: 15,
                  marginTop: 0,
                  alignItems: 'center',
                }}>
                {whichImage == 'third' ? (
                  <Image
                    source={require('../../../assets/images/selected.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/select.png')}
                    resizeMode="contain"
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                )}
                <Image
                  source={{uri: `data:image/png;base64,${thirdImage}`}}
                  resizeMode="contain"
                  style={{width: 100, height: 50}}
                />
              </TouchableOpacity>
            )}
          </ScrollView>
          <View
            style={{
              bottom: 11,
              position: 'absolute',
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            {thirdImage ? (
              <TouchableOpacity
                onPress={() => {
                  setThirdImage('');
                  setSecondImage('');
                  setFirstImage('');
                }}
                style={{
                  width: '45%',
                  padding: 10,
                  backgroundColor: '#3b5998',
                  borderRadius: 15,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                  Бүгдийг арилгах
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={resetSignature}
                style={{
                  width: '45%',
                  padding: 10,
                  backgroundColor: '#3b5998',
                  borderRadius: 15,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                  Арилгах
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={saveSignature}
              style={{
                width: '45%',
                padding: 10,
                backgroundColor: '#3b5998',
                borderRadius: 15,
              }}>
              <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                Хадгалах
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RegisterSignature;
