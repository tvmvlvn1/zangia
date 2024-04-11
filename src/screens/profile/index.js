import React, {useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import styles from './profile.js';
import InformationScreen from './information';
import ProfileHeader from './props/profileHeader';
import {GetServer} from './restService/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

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
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color="#1660AB" />
        </View>
      ) : (
        <ScrollView style={styles.profileContainer}>
          <View style={{ flexDirection: "row", padding: 15, alignItems: "center" }}>
            <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", fontSize: 18, textAlign: "center", flex: 1 }}>
              Хувийн мэдээлэл
            </Text>
          </View>
          <ProfileHeader user={user} />

          <InformationScreen user={user} navigation={navigation} />
        </ScrollView>
      )}
    </View>
  );
};

export default Index;
