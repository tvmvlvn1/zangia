import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Header from '../components/Header.js';
import {AuthContext} from '../context/AuthContext';
import localApi from '../api/localApi';
import { useIsFocused } from '@react-navigation/native';

const Favourite = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {logout} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [savedProducts, setSavedProducts] = useState([])

  useEffect(() => {
    getUserData();
  }, [isFocused])

  const getUserData = () => {
    AsyncStorage.getItem("userInfo").then((res) => {
      if(res) {
        const parsedData = JSON.parse(res);
        getProducts(parsedData)
      } else {
        logout();
      }
    }).catch((e) => {
      logout();
    })
  }

  const getProducts = (parsedData) => {
    if (parsedData == "GUEST") {
      setIsLoading(true)
      AsyncStorage.getItem("savedProduct").then((res) => {
        const parsed = JSON.parse(res);
        setSavedProducts(parsed)
      })
    } else {
      setIsLoading(true)
      localApi.get("api/saved-products?&sort[updatedAt]=DESC").then((res) => {
        if(res.data.data.length > 0) {
          setSavedProducts(res.data.data)
        } else {
          setSavedProducts([])
        }
      })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <Lottie
        autoPlay
        loop
        style={{ flex: 1, justifyContent: 'center' }}
        source={require('../assets/lottie/loading.json')}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header name={"Хадгалагдсан бараа"} navigation={props.navigation}/>
      {savedProducts && savedProducts?.length > 0 ?
        <ScrollView style={{ marginBottom: "2%" }}>
          {savedProducts.map((item) => {
            return (
              <TouchableOpacity 
                onPress={() => props.navigation.navigate("ProductDetail", {data: item, alreadySaved: "true"})}
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", marginHorizontal: 20, padding: 10, marginBottom: 5, borderRadius: 13 }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View>
                    <Image
                      source={{ uri: "https://preview.thenewsmarket.com/Previews/ADID/StillAssets/640x480/651512.jpg" }}
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 14, color: "#000" }}>
                      {item.attributes.name}
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12, color: "#ADA4A5" }}>
                      {item.attributes.description}
                    </Text>
                  </View>
                </View>
                <View>
                  <SimpleLineIcons
                    name={'arrow-right'}
                    color={"#000"}
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        : 
        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 14, color: "#000", textAlign: "center" }}>
          Хоосон байна
        </Text>
      }
    </View>
  );
};

export default Favourite;
