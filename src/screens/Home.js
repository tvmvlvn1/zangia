import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import localApi from '../api/localApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {AuthContext} from '../context/AuthContext';
import Lottie from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = props => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState({});
  const [page, setPage] = useState(1)
  const {logout} = useContext(AuthContext);
  const [productDatas, setProductDatas] = useState([])
  const [totalPages, setToatalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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
    getUserData();
    getProductDatas();
  }, [page, totalPages, isFocused]);  

  const getUserData = async () => {
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
    })
  }

  const getProductDatas = async () => {
    setIsLoading(true)
    localApi.get(`api/products?populate=product_image&pagination[page]=${page}&pagination[pageSize]=10&sort[updatedAt]=DESC`)
    .then((res) => {
      if(res.data.data.length > 0) {
        setProductDatas(res.data.data)
        setToatalPages(res.data.meta.pagination.pageCount);
      } else {
        setProductDatas([])
      }
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false)
    })
  }

  if (isLoading) {
    return (
      <Lottie
        autoPlay
        loop
        style={{flex: 1, justifyContent: 'center', backgroundColor: "#fff"}}
        source={require('../assets/lottie/loading.json')}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center" }}>
        <View>
          <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 14, color: "#ADA4A5" }}>
            {getGreeting()}
          </Text>
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20, color: "#000", marginLeft: 4 }}>
            {userData?.attributes?.username || "Guest view"}
          </Text>
        </View>
        {userData?.attributes?.is_admin &&
          <TouchableOpacity onPress={() => {
            navigation.navigate("AddNewProduct")
          }}>
            <AntDesign
              name={'addfile'}
              color={"#000"}
              size={20}
              style={{ marginRight: 5, backgroundColor: "#F7F8F8", padding: 10, borderRadius: 10 }}
            />
          </TouchableOpacity>
        }
      </View>
      {/* list */}
      <ScrollView style={{ marginBottom: "2%" }} ref={scrollViewRef} scrollEventThrottle={16}>
        {productDatas?.map((item) => {
          return (
            <TouchableOpacity 
              onPress={() => navigation.navigate("ProductDetail", {data: item})}
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
        {/* pagination control */}
        {totalPages > 1 &&
          <View style={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePageChange(index + 1)}
                style={[styles.pageIndicator, index === page - 1 && styles.activePage]}
              >
                <Text style={{color: index === page - 1 ? "#fff" : '#000'}}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 16,
  },
  pageIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activePage: {
    backgroundColor: 'black',
  }
});