import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {AuthContext} from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    setIsLoading(true);
    await AsyncStorage.getItem("userInfo").then((res) => {
      if(res) {
        const parsedData = JSON.parse(res);
        setUserData(parsedData);
      } else {
        logout();
      }
    }).catch((e) => {
      console.log(e, "user not found --->", e);
      logout();
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
      <Header name={"Хувийн мэдээлэл"} navigation={navigation}/>
      {isLoading ? (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Lottie
              autoPlay
              loop
              style={{ width: 250, height: 200 }}
              source={require('../../assets/lottie/user.json')}
            />
            <Text style={{ fontFamily: "Montserrat-Medium", color: '#000', textAlign: "center", width: "85%", fontSize: 16 }}>
              {userData?.attributes?.username} таны одоогийн эрх {userData?.attributes?.is_admin ? "админ" : "хэрэглэгчийн"} эрхтэй байна шүү
            </Text>
          </View>
          <View style={{ width: "90%", marginBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={logout}>
              <LinearGradient
                colors={[ '#92A3FD', '#9DCEFF' ]}
                style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
              >   
                <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                  Системээс гарах
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Index;
