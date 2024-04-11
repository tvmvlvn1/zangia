import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import {Colors} from '../../components/global/Colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/index';
import {HeaderBackButton} from '@react-navigation/elements';
import {isLocationEnabled} from 'react-native-device-info';

const QrScreen = props => {
  const [qrvalue, setQrvalue] = useState('');
  const [viewFocused, setViewFocused] = useState(true);
  const [active, setActive] = useState(true);
  const [status, setStatus] = useState(false);
  const [messageShow, setMessageShow] = useState(false);
  const [message, setMessage] = useState('');
  const [startValue, setStartValue] = useState(new Animated.Value(0));
  const {navigation} = props;

  useEffect(() => {
    _animationFinishCallback();
    onOpenScanner();

    const subscribe = navigation.addListener('focus', () => {
      onOpenScanner();
      setViewFocused(true);
    });
    const unsubscribe = navigation.addListener('blur', () => {
      setViewFocused(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return function cleanup() {
      unsubscribe();
    };
  }, [navigation]);

  const _animationFinishCallback = () => {
    Animated.timing(startValue, {
      toValue: 2,
      timing: 1200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(startValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    });
  };

  const AlertMessage = (message, status) => {
    setStatus(status);
    setMessageShow(true);
    setMessage(message);
  };

  const onOpenScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraAndroidPermission() {
        try {
          const res = await check(PERMISSIONS.ANDROID.camera);

          if (res === 'granted') {
          } else if (res === 'denied') {
            const res2 = await request(PERMISSIONS.ANDROID.camera, {
              title: 'Camera Permission',
              message: 'App needs access to your camera',
            });
          }
        } catch (err) {
          Alert.alert('Алдаа гарлаа', err.message);
        }
      }

      async function requestLocationAndroidPermission() {
        try {
          const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (res === RESULTS.GRANTED) {
            isLocationEnabled().then(enabled => {
              if (enabled) {
                showLocation();
              } else {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 10000,
                  fastInterval: 5000,
                })
                  .then(data => {
                    showLocation();
                  })
                  .catch(err => {
                    Alert.alert('Алдаа гарлаа', err.message);
                    // Alert.alert('Байршилаа асаана уу?');
                  });
              }
            });
          } else if (res === RESULTS.DENIED) {
            const rest2 = await requestMultiple(
              [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
              {
                title: 'Location Permission',
                message: 'App needs access to your Location',
              },
            );
            if (
              rest2[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == RESULTS.GRANTED
            ) {
              showLocation();
            }
          }
        } catch (err) {
          // Alert.alert('Алдаа гарлаа', err.message);
        }
      }

      // Calling the camera permission function
      requestCameraAndroidPermission();
      requestLocationAndroidPermission();
    } else if (Platform.OS == 'ios') {
      async function requestCameraIOSPermission() {
        try {
          const res = await check(PERMISSIONS.IOS.CAMERA);
          if (res === 'granted') {
          } else if (res === 'denied') {
            await request(PERMISSIONS.IOS.CAMERA, {
              title: 'Camera Permission',
              message: 'App needs access to your camera',
            });
          }
        } catch (err) {
          // Alert.alert('Алдаа гарлаа', err.message);
        }
      }

      async function requestLocationIOSPermission() {
        try {
          const res = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
          const locationWhenInUse = await check(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (
            res === RESULTS.GRANTED ||
            locationWhenInUse === RESULTS.GRANTED
          ) {
            showLocation();
          } else if (
            res === RESULTS.DENIED &&
            locationWhenInUse === RESULTS.DENIED
          ) {
            const rest2 = await request(PERMISSIONS.IOS.LOCATION_ALWAYS, {
              title: 'Location Permission',
              message: 'App needs access to your Location',
            });
            const locationWhenInUse2 = await request(
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              {
                title: 'Location Permission',
                message: 'App needs access to your Location',
              },
            );
            if (
              rest2 == RESULTS.GRANTED ||
              locationWhenInUse2 === RESULTS.GRANTED
            ) {
              showLocation();
            }
          } else if (
            res === RESULTS.UNAVAILABLE &&
            locationWhenInUse === RESULTS.UNAVAILABLE
          ) {
            Alert.alert(
              'Алдаа',
              'Та гар утасныхаа Location-ийг унтраагаад асаана уу.',
            );
          } else if (
            res === RESULTS.BLOCKED &&
            locationWhenInUse === RESULTS.BLOCKED
          ) {
            Alert.alert(
              'Алдаа гарлаа.',
              'Та гар утасныхаа байршлын тохиргоог хийнэ үү.\nЗаавар: Settings->EmployeeApp->Location->While using the app эсвэл Always-г сонгоно.',
            );
          }
        } catch (err) {
          // Alert.alert('Алдаа гарлаа', err.message);
        }
      }
      // Calling the camera permission function
      requestCameraIOSPermission();
      requestLocationIOSPermission();
    } else {
      setQrvalue('');
    }
  };

  const onBarcodeScan = qrValue => {
    if (active) {
      setActive(false);
      readByQR(qrValue);
    }
  };

  const readByQR = async qrData => {
    try {
      await AsyncStorage.getItem('userInfo').then(userInfo => {
        let user = JSON.parse(userInfo);
        Geolocation.getCurrentPosition(
          position => {
            if (position.mocked == false) {
              api
                .post(`info/save`, {
                  enrollNumber: user.fingercode,
                  token: qrData,
                  imei: user.imei,
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude,
                })
                .then(response => {
                  const res = response.data;
                  if (res.status == 1) {
                    setStatus(true);
                    AlertMessage(res.message, true);
                  } else {
                    setStatus(false);
                    AlertMessage(res.message, false);
                  }
                })
                .catch(error => {
                  setStatus(false);
                  AlertMessage(error.message, false);
                });
            } else {
              AlertMessage('Байршлын мэдээлэл өөрчилсөн байна!', false);
            }
          },
          error => {
            Alert.alert('Байршил тогтооход алдаа гарлаа!', error.message);
          }
        );
      });
    } catch (error) {
      setStatus(false);
      AlertMessage(error.message, false);
    }
  };

  const onSuccess = status => {
    setActive(true);
    setMessageShow(false);
  };
  const customMarker = () => {
    return (
      <Animated.View>
        <Animated.Image
          resizeMode="contain"
          source={require('../../assets/qr/camera_border.png')}
          style={{
            width: Dimensions.get('window').width * 0.6,
            height: '100%',
            transform: [
              {
                scale: startValue,
              },
            ],
          }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {viewFocused && (
        <QRCodeScanner
          reactivateTimeout={3000}
          reactivate={true}
          showMarker={true}
          customMarker={customMarker()}
          bottomViewStyle={{
            padding: 20,
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
          bottomContent={
            <Text
              style={{
                color: '#1660AB',
                textAlign: 'center',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'uppercase',
                fontFamily: "Montserrat-Medium"
              }}
            >
              QR уншуулах
            </Text>
          }
          topViewStyle={{padding: 10, flex: 1, height: '100%'}}
          ref={node => {
            return node;
          }}
          onRead={e => {
            onBarcodeScan(e.data);
          }}
        />
      )}
      {messageShow ? (
        <View style={styles.msgBackground}>
          <View style={styles.msg}>
            <View style={styles.alert}>
              <Animated.Image
                resizeMode="contain"
                source={
                  status
                    ? require('../../assets/qr/success.png')
                    : require('../../assets/qr/unsuccess.png')
                }
                style={{
                  width: 50,
                  height: 50,
                  transform: [
                    {
                      scale: startValue,
                    },
                  ],
                }}
              />
              <Text
                style={{
                  color: status ? 'green' : 'red',
                  width: '100%',
                  textAlign: 'center',
                  margin: 10,
                  fontFamily: "Montserrat-Medium"
                }}>
                {message}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  width: '80%',
                  padding: 10,
                  alignItems: 'center',
                  backgroundColor: status ? 'green' : 'red',
                }}
                onPress={() => onSuccess(status)}>
                <Text style={{color: '#fff', padding: 0, margin: 0, fontFamily: "Montserrat-Medium"}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default QrScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {color: '#fff'},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 50,
    marginTop: 10,
  },
  input: {flex: 1, backgroundColor: '#fff'},
  logo: {width: 105, height: 60},
  title: {color: Colors.primary, fontWeight: '700', fontSize: 16},
  msgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  msg: {
    position: 'absolute',
    zIndex: 9999,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
