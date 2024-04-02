import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {config} from '../../Global';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../components/global/Colors';

const RuleView = props => {
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {visible && (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      )}
      <WebView
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
        source={{
          uri:
            config.service_url +
            '/rule/viewMobile?id=' +
            props.route.params.id +
            '&token=' +
            user.jwt,
        }}
      />
    </View>
  );
};
export default RuleView;
