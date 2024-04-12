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
      <ScrollView>
        {/* categories */}
        <View style={{ alignItems: "center" }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "90%", alignItems: "center", borderRadius: 20 }}
          >
            <View>
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Цагийн мэдээ
              </Text>
              <View style={{ marginLeft: 3 }}>
                <Text style={{ fontFamily: "Montserrat-Regular", color: "#fff" }}>
                  Ажилтны ирцийн мэдээлэл
                </Text>
                <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={() => navigation.navigate('TimeSheetStack')}>
                  <LinearGradient
                      colors={[ '#98B9FE', '#98BCFE' ]}
                      style={{ width: "100%", borderRadius: 50, alignItems: "center", flexDirection: "row", justifyContent: "center", padding: 7 }}
                  >   
                    <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff' }}>
                      Зочлох
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Image
                source={require("../assets/images/calendar.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
          </LinearGradient>
        </View>

        <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('UserProfileStack')}>
              <Image
                source={require("../assets/images/userIco.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Хувийн мэдээлэл
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
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Утасны жагсаалт
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
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('JobPosition')}>
              <Image
                source={require("../assets/images/job-offer.png")}
                style={{ width: 55, height: 55 }}
              />
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Ажлын байр
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20 }}>
          <LinearGradient 
            colors={[ '#9CCBFF', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "49%", alignItems: "center", borderRadius: 20 }}
          >
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('TimeSheetStack')}>
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
            <TouchableOpacity style={{ alignItems: "center", width: "100%" }} onPress={() => navigation.navigate('SalaryStack')}>
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
        {/* event */}
        <Carousel/>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;