import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {config} from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../components/global/Colors';

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
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
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
