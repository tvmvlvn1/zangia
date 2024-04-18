/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import styles from './style.js';
import {Colors} from '../../components/global/Colors';
import AddPosition from '../profile/edit/addPosition';
import localApi from '../../api/localApi';
import {Alert, TouchableOpacity, View, FlatList, Text, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Header from '../../components/Header.js';
import Lottie from "lottie-react-native";

const Index = ({navigation}) => {
  const [isLoading, setIsloading] = useState(0);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [detailInfo, setDetailInfo] = useState('');

  useEffect(() => {
    localApi
      .get('MobilePosition')
      .then(res => {
        if (res.data.code == 200) {
          setPositions(res.data.data);
        }
      })
      .catch(err => {
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  }, []);

  const renderFooter = () => {
    if (loading || endReached) return null;
    return (
      <View style={{paddingVertical: 40, borderColor: '#CED0CE'}}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  };

  const renderItem = ({item, idx}) => {
    const nameParts = item.name.split('/');
    return (
      <View style={{ backgroundColor: "#F7F8F8", margin: 10, marginTop: 0, borderRadius: 16 }} key={idx}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/job-rotation.png")}
              style={{ width: 50, height: 50 }}
            />
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.positionNameName}>
                {nameParts[3]}
              </Text>
              <Text style={styles.heltesName}>
                {nameParts[2]}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.positionNameJob}>
                  {item.date} - 
                </Text>
                <Text style={styles.positionNameJob2}>
                  {" "}{item.stop_date}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => {
              setDetailInfo(nameParts[3]);
              setPage('AddPage');
            }}
          >
            <Text style={styles.positionNameJob10}>
              Анкет {"\n"}бөглөх
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header name={"Ажлын байр"} navigation={navigation}/>
      {page === '' ? (
        <>
          {positions.length > 0 ? (
            <FlatList
              data={positions}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              initialNumToRender={5}
              onEndReachedThreshold={0.5}
              maxToRenderPerBatch={5}
              windowSize={5}
              ListFooterComponent={renderFooter}
            />
          ) : (
            <View style={{ flex: .7, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 16, width: "80%", alignSelf: "center", fontFamily: "Montserrat-SemiBold", color: "#000" }}>
                Одоогоор зарлагдсан ажлын байр байхгүй байна шүү
              </Text>
            </View>
          )}
        </>
      ) : (
        page === 'AddPage' && (
          <AddPosition
            setPage={setPage}
            isLoading={isLoading}
            setIsloading={setIsloading}
            setLoading={setLoading}
            detailInfo={detailInfo}
          />
        )
      )}
    </View>
  );
};

export default Index;
