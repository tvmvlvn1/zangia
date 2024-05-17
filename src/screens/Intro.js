import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroScreen = props => {
  const {navigation} = props;

  const navigator = async () => {
    try {
      await AsyncStorage.setItem("intro", JSON.stringify(true));
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <LinearGradient
      colors={[ '#92A3FD', '#9DCEFF' ]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", color: '#fff', fontSize: 16 }}>
            Мобайл аппликейшн хөгжүүлэлтийн ур чадвар шалгах даалгавар - Зангиа Портал ХХК / Тэмүүлэн .Б /
          </Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, padding: 20, alignItems: "center", margin: 20 }} onPress={navigator}>
          <Text style={{ fontFamily: "Montserrat-Bold", color: '#97B6FE' }}>
            Үргэлжлүүлэх
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default IntroScreen;
