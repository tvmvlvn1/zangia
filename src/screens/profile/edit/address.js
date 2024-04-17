import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './../profile.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetAddress} from '../restService/address';
import {GetProvidences} from '../restService/props';
import LoaderScreen from '../props/LoaderScreen';
import Editaddress from './editaddress';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header.js';

const Address = ({navigation}) => {
  const [data, setData] = useState([]);
  const [providences, setProvidences] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [NowProvidence, setNowProvidence] = useState(0);
  const [NowSoum, setNowSoum] = useState(0);
  const [soumsData, setSoumsData] = useState([]);
  const [providenceDatas, setProvidenceDatas] = useState([]);

  const [loader, setLoader] = useState(true);
  const [deleteLoad, setDeleteLoad] = useState(false);

  const [page, setPage] = useState('');
  const [isLoading, setIsloading] = useState(0);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    start();
    setPage('IndexPage');
  }, [isLoading]);

  const start = async () => {
    setLoading(true);
    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        GetAddress(user.jwt)
          .then(async result => {
            if (result.data.code == 200) {
              await setData(result.data.data);
              GetProvidences()
                .then(async response => {
                  await setProvidences(response.data.data);
                  GetFilter(
                    response.data.data,
                    result.data.data.districtId,
                    result.data.data.suburbId,
                  );
                  setProvidenceDatas(response.data.data);
                  setSoumsData(response.data.sdata);
                  setLoading(false);
                  setLoader(false);
                })
                .catch(err => console.log(err, 'Error!'));
            }
          })
          .catch(err => console.log(err, 'Error!'));
      })
      .catch(err => console.log(err, 'error'));
  };

  const GetFilter = (datas, key, sou) => {
    datas.filter(el => {
      if (el.id === key) {
        setNowProvidence(el.name);
        el.soums.filter(getSoum => {
          if (getSoum.id === sou) {
            setNowSoum(getSoum.name);
          }
        });
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    start();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Header name={"Хаягийн мэдээлэл"} navigation={navigation}/>
      {page === 'IndexPage' ? (
        <>
          {loading ? (
            <View style={{paddingTop: 100}}>
              <LoaderScreen />
            </View>
          ) : (
            <ScrollView
              style={styles.smallContainer}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                  <Text style={styles.listItemBigTitle}>Гэрийн хаяг</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      Аймаг / Дүүрэг
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      {NowProvidence}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      Сум / Хороо
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      {NowSoum}{NowSoum.length < 3 && ` хороо`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      Тоот
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000" }}>
                      {data?.toot}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginTop: "10%" }} 
                  // onPress={() => setPage('EditPage')}
                >
                  <LinearGradient
                      colors={[ '#92A3FD', '#9DCEFF' ]}
                      style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                  > 
                      <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                          Засварлах
                      </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </>
      ) : (
        page === 'EditPage' && (
          <Editaddress
            setPage={setPage}
            isLoading={isLoading}
            setIsloading={setIsloading}
            setLoading={setLoader}
            sData={soumsData}
            providenceDatas={providenceDatas}
            data={data}
          />
        )
      )}
    </View>
  );
};

export default Address;
