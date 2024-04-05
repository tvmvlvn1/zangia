import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import localApi from '../api/localApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIconsIcons from "react-native-vector-icons/EvilIcons"
import Event from '../components/Event';

const HomeScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState({})
  const [lotteryType, setLotteryType] = useState(0);

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Өглөөний мэнд,';
    } else if (currentHour >= 12 && currentHour < 17.) {
        return 'Өдрийн мэнд,';
    } else {
        return 'Үдшийн мэнд,';
    }
  };

  useEffect(() => {
    checkLottery();
  }, []);

  const checkLottery = async () => {
    await AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user)
      localApi
        .post('checkLottery', {jwt: user.jwt})
        .then(res => {
          if (res.data.data) {
            setLotteryType(res.data.data);
          }
        })
        .catch(err => {});
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center" }}>
        <View>
          <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 14, color: "#ADA4A5" }}>
            {getGreeting()}
          </Text>
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20, color: "#000", marginLeft: 3 }}>
            {user.name} .{user.lname}
          </Text>
        </View>
        <View>
          <EvilIconsIcons
            name={'bell'}
            color={"#000"}
            size={30}
            style={{ marginRight: 5, backgroundColor: "#F7F8F8", padding: 5, borderRadius: 10 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;