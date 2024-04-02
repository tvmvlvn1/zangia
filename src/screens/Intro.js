import React from 'react';
import {
  Image,
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
          <Image
            source={require("../assets/images/logo.png")}
            style={{ justifyContent: "center", width: "90%", height: 50, alignSelf: "center" }}
            resizeMode='contain'
          />
          <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", color: '#fff', fontSize: 16 }}>
            Ажилтны апп
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
