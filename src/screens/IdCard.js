import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../components/global/Colors';

const IdCardScreen = props => {
  const {navigation} = props;
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
    <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 320,
          height: 507,
          position: 'relative',
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        {user && (
          <Image
            resizeMode="contain"
            style={{
              height: '90%',
              width: '70%',
              top: 14,
              position: 'absolute',
            }}
            source={{uri: user.img}}
          />
        )}
        <Image
          resizeMode="contain"
          style={{width: 320, height: '100%'}}
          source={require('../assets/images/vnemleh.png')}
        />
        <Text style={styles.profileName}>
          {user.lname}.{user.name}
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
    fontWeight: '700',
    fontSize: 18,
    position: 'absolute',
    top: 383,
  },
  departmentName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 10,
    fontStyle: 'italic',
    // fontFamily: 'notoserif',
    position: 'absolute',
    top: 428,
    width: '100%',
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    lineHeight: 11,
  },
  jobName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 10,
    fontStyle: 'italic',
    position: 'absolute',
    top: 448,
    width: '100%',
    textAlign: 'center',
    lineHeight: 12,
  },
  registerName: {
    color: '#1660AB',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    position: 'absolute',
    top: 306,
    width: '100%',
    textAlign: 'center',
  },
  cardNumber: {
    color: '#f15540',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16,
    position: 'absolute',
    bottom: 98,
    width: '100%',
    right: 70,
    textAlign: 'right',
  },
  cardDate: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 20,
    position: 'absolute',
    bottom: 40,
    width: '100%',
    textAlign: 'right',
    right: 36,
    color: '#fff',
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 1,
    textShadowColor: '#1660AB',
  },
  closeButton: {
    zIndex: 50,
    position: 'absolute',
    top: 25,
    right: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});
