import React, {useEffect, useState} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import styles from './profile.js';
import Lottie from 'lottie-react-native';
import InformationScreen from './information';
import ProfileHeader from './props/profileHeader';
import {GetServer} from './restService/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header.js';

const Index = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await request(PERMISSIONS.ANDROID.NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          setIsEnabled((previousState) => !previousState);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдааны мэдээлэл',
            textBody: 'Та зөвхөн Settings-ээс идэвхжүүлэх боломжтой байна',
            button: 'Хаах',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          })
        }
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Алдаа гарлаа !!!',
          textBody: `${error}`,
          textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
      }
    } else if (Platform.OS === 'ios') {
      try {
        const result = await request(PERMISSIONS.IOS.NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
          setIsEnabled((previousState) => !previousState);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Алдааны мэдээлэл',
            textBody: 'Та зөвхөн Settings-ээс идэвхжүүлэх боломжтой байна',
            button: 'Хаах',
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
          })
        }
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Алдаа гарлаа !!!',
          textBody: `${error}`,
          textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
      }
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  fetchUserData = () => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);

      GetServer(user.jwt)
        .then(response => {
          console.log(response.data.message);
        })
        .catch(err => console.log(err, 'Error from Server!'));
    });
  };

  return (
    <View style={styles.container}>
      <Header name={"Хувийн мэдээлэл"} navigation={navigation}/>
      {isLoading ? (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
      ) : (
        <ScrollView style={styles.profileContainer}>
          <ProfileHeader user={user} />

          <InformationScreen user={user} navigation={navigation} isEnabled={isEnabled} setIsEnabled={setIsEnabled} toggleSwitch={toggleSwitch}/>
        </ScrollView>
      )}
    </View>
  );
};

export default Index;
