import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import localApi from '../api/localApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIconsIcons from "react-native-vector-icons/EvilIcons";
import LinearGradient from 'react-native-linear-gradient';
import Carousel from '../components/carousel';

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
          console.log(res.data);
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
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20, color: "#000", marginLeft: 4 }}>
            {user.name} .{user.lname}
          </Text>
        </View>
        <TouchableOpacity>
          <EvilIconsIcons
            name={'bell'}
            color={"#000"}
            size={30}
            style={{ marginRight: 5, backgroundColor: "#F7F8F8", padding: 5, borderRadius: 10 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: "2%" }}>
        {/* categories */}
        <Carousel navigation={navigation}/>
        <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('JobPosition')}>
              <Image
                source={require("../assets/images/job-offer.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff", textAlign: "center" }}>
                Нээлттэй ажлын байр
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('PhoneStack')}>
              <Image
                source={require("../assets/images/3d-contact.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff", textAlign: "center" }}>
                Ажилчдын утасны жагсаалт
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('SalaryStack')}>
              <Image
                source={require("../assets/images/money.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Цалин
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('CompScreen')}>
              <Image
                source={require("../assets/images/competition.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Тэмцээн
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('CalendarStack')}>
              <Image
                source={require("../assets/images/calendar1.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Календар
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('AbsenceRequest')}>
              <Image
                source={require("../assets/images/absence.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Чөлөө
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;