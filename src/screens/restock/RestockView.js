import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import Lottie from 'lottie-react-native';
import {config} from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RestockView = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const {id} = props.route.params;

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading && (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
      )}
      <WebView
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        source={{
          uri:
            config.service_url +
            '/restock/viewMobile?id=' +
            id +
            '&token=' +
            user.jwt,
        }}
      />
    </View>
  );
};

export default RestockView;
