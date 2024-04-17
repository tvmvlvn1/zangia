import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  Image
} from 'react-native';
import call from 'react-native-phone-call';
import Back from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header.js';

const Detail = (props) => {
  const { navigation } = props
  const { item } = props.route.params;

  const phoneCall = () => {
    const args = {
      number: item.phone,
      prompt: true,
    };
    call(args).catch(err => {
      Alert.alert('Алдаа гарлаа.', err.message);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground
        source={require("../../assets/images/detailPhone.jpg")}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '35%',
          borderTopRightRadius: 40,
        }}
        resizeMode="cover">
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 50 : 15,
            left: 15,
            backgroundColor: '#F9F9F9',
            padding: 10,
            borderRadius: 20,
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Back name="arrowleft" size={16} color="#737373" />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '70%',
            bottom: 0,
            position: 'absolute',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <ScrollView style={{ padding: 10, marginBottom: 20 }}>
            <View style={{ margin: 7 }}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 18
                  }}>
                  {item.username}
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 15
                  }}>
                  @{item.department}
                </Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", padding: 10, borderRadius: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/job.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  <Text style={{ fontFamily: 'Montserrat-Regular', color: "#7B6F72", marginLeft: 5 }}>
                    Албан тушаал
                  </Text>
                </View>

                <Text style={{ fontFamily: 'Montserrat-Regular', color: "#000", fontSize: 12 }}>
                  {item.job?.length > 21 ? item.job?.substring(0, 21) + '...' : item.job}
                </Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", padding: 10, borderRadius: 20, marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/job.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  <Text style={{ fontFamily: 'Montserrat-Regular', color: "#7B6F72", marginLeft: 5 }}>
                    Имэйл хаяг
                  </Text>
                </View>

                <Text style={{ fontFamily: 'Montserrat-Regular', color: "#000", fontSize: 12 }}>
                  {item.email?.length > 21 ? item.email?.substring(0, 21) + '...' : item.email}
                </Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", padding: 10, borderRadius: 20, marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/job.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  <Text style={{ fontFamily: 'Montserrat-Regular', color: "#7B6F72", marginLeft: 5 }}>
                    Ажлын гар утас
                  </Text>
                </View>

                <Text style={{ fontFamily: 'Montserrat-Regular', color: "#000", fontSize: 12 }}>
                  {item.phone?.length > 21 ? item.phone?.substring(0, 21) + '...' : item.phone}
                </Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: 20 }} onPress={() => phoneCall()}>
            <LinearGradient
              colors={[ '#92A3FD', '#9DCEFF' ]}
              style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
            >   
              <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                Залгах
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Detail;
