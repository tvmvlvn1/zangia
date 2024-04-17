import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {config} from '../../Global';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import Header from '../../components/Header.js'

const RuleView = props => {
  const {navigation} = props;
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header name={props.route.params?.name} navigation={navigation}/>
      {visible && (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
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
