import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/localApi.js';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext.js';
import Header from '../../components/Header.js';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient';

const Index = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getList();
  }, [isFocused]);

  const getList = () => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      api
        .post('AbsenceRequest', {
          jwt: user.jwt,
        })
        .then(res => {
          if (res.data.code == 200) {
            setData(res.data.data);
            setIsLoading(false);
          } else if (res.data.code == 303) {
            logout();
          } else {
            Alert.alert('Алдаа гарлаа !!!', `${res.data.message}`);
            setIsLoading(false);
          }
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа.', err.message);
          setIsLoading(false);
        });
    });
  };

  const RequestView = params => {
    navigation.navigate('AbsenceRequestDetail', {data: params});
  };

  if (isLoading) {
    return (
      <Lottie
        autoPlay
        loop
        style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}
        source={require('../../assets/lottie/loading.json')}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header name={"Чөлөөний хүсэлт"} navigation={navigation}/>
      <ScrollView style={{ marginBottom: "2%" }}>
        {
          data.map((item) => (
            <TouchableOpacity onPress={() => RequestView(item)} key={item.id} style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/absenceList.png")}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                    {
                      item.type_selection == 'unpaid_leave'
                        ? 'Цалингүй чөлөө'
                        : item.type_selection == 'sick_leave'
                        ? 'Өвчний чөлөө'
                        : item.type_selection == 'paid_leave'
                        ? 'Цалинтай чөлөө'
                        : item.type_selection == 'covid19'
                        ? 'Ковид 19 өвчний чөлөө'
                        : item.type_selection == 'annualleave_request' && 'Ээлжийн амралт'
                    }
                  </Text>
                  <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                    Шалтгаан ~ {item.name.length > 19 ? `${item.name.slice(0, 19)}...` : item.name}
                  </Text>
                  <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14 }}>
                    {
                      item.state == 'draft'
                        ? 'Ноорог'
                        : item.state == 'approve'
                        ? 'Батлах'
                        : item.state == 'approved'
                        ? 'Батлагдсан'
                        : item.state == 'reversed'
                        ? 'Буцаагдсан'
                        : item.state
                    }
                  </Text>
                </View>
              </View>
              <View>
                <SimpleLineIcons
                  name='arrow-right'
                  size={16}
                  color={'#1D1617'}
                />
              </View>
            </TouchableOpacity>
          ))        
        }
      </ScrollView>
      <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: "2%" }} onPress={() => navigation.navigate('CreateAbsence')}>
        <LinearGradient
          colors={[ '#92A3FD', '#9DCEFF' ]}
          style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
        > 
          <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
            Хүсэлт илгээх
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
