import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../components/global/Colors';

const IdCardScreen = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      setUser(JSON.parse(userInfo));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={{color: '#333'}}>Уншиж байна...</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', backgroundColor: "#fff", width: "100%", alignItems: "center" }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 320,
          height: 507,
          position: 'relative',
          backgroundColor: '#fff'
        }}>
        {user && (
          <Image
            resizeMode="contain"
            style={{
              height: '90%',
              width: '72%',
              top: 14,
              position: 'absolute',
            }}
            source={{uri: user.img}}
          />
        )}
        <Image
          resizeMode="contain"
          style={{ width: 320, height: '100%', borderRadius: 20 }}
          source={require('../assets/images/vnemleh.png')}
        />
        <Text style={styles.profileName}>
          {user.lname}. {user.name}
        </Text>
        <Text style={styles.departmentName}>
          {user.sector ? user.sector : user.department}
        </Text>
        <Text style={styles.jobName}>{user.job}</Text>
      </View>
    </View>
  );
};

export default IdCardScreen;

const styles = StyleSheet.create({
  profileName: {
    color: '#000',
    fontSize: 18,
    position: 'absolute',
    top: 383,
    fontFamily: "Montserrat-Bold"
  },
  departmentName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 10,
    position: 'absolute',
    top: 428,
    width: '100%',
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    lineHeight: 11,
    fontFamily: "Montserrat-MediumItalic"
  },
  jobName: {
    color: '#000',
    fontSize: 10,
    position: 'absolute',
    top: 448,
    width: '100%',
    textAlign: 'center',
    lineHeight: 12,
    fontFamily: "Montserrat-MediumItalic"
  },
});
