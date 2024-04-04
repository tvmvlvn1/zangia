import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import Lottie from 'lottie-react-native'

export const NoInternet = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Lottie
        source={require('../../assets/lottie/noInternet.json')}
        autoPlay
        loop
        style={{ flex: 1, justifyContent: "center" }}
      />
    </SafeAreaView>
  );
};

export default NoInternet;
