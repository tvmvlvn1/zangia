import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Tsalinjih from './Tsalinjih';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localApi from '../../api/localApi';
import {AuthContext} from '../../context/AuthContext';
import {Colors} from '../../components/global/Colors';
import Uuriin from './Uuriin';
import Busad from './Busad';
import Suutgal from './Suutgal';
import NiitTsalin from './NiitTsalin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style.js';
import RNPickerSelect from 'react-native-picker-select';
import {monthOptions} from '../../Global';
import Header from '../../components/Header.js';

const SalaryScreen = props => {
  const {navigation} = props;
  const layout = useWindowDimensions();
  const {logout} = useContext(AuthContext);

  let today = new Date();
  const [index, setIndex] = useState(0);
  const [salaryData, setSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState(today.getFullYear().toString());
  const [month, setMonth] = useState(today.getMonth());
  const [modalVisible, setModalVisible] = useState(false);

  const [routes] = useState([
    {key: 'first', title: 'ЦАЛИНЖИХ'},
    {key: 'second', title: 'ӨӨРИЙН МЭДЭЭЛЭЛ [1]'},
    {key: 'third', title: 'БУСАД НЭМЭГДЭЛ [2]'},
    {key: 'fourth', title: 'СУУТГАЛ'},
    {key: 'fifth', title: 'НИЙТ ЦАЛИН'},
  ]);

  useEffect(() => {
    getSalary();

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{marginRight: 5}}>
          <Ionicons name="search-outline" size={30} color={Colors.text} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const currentYear = new Date().getFullYear();

  const yearOptions = [
    {
      label: (currentYear - 1).toString(),
      value: currentYear - 1,
    },
    {
      label: currentYear.toString(),
      value: currentYear,
    },
  ];

  const renderScene = SceneMap({
    first: () => <Tsalinjih salaryData={salaryData} />,
    second: () => <Uuriin salaryData={salaryData} />,
    third: () => <Busad salaryData={salaryData} />,
    fourth: () => <Suutgal salaryData={salaryData} />,
    fifth: () => <NiitTsalin salaryData={salaryData} />,
  });

  const getSalary = () => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('mobileSalary', {year, month, jwt: user.jwt})
        .then(res => {
          if (res.data.code == 200) {
            setSalaryData(res.data.data[0]);
          } else if (res.data.code == 303) {
            logout();
          }
          setIsLoading(false);
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа.', err.message);
          setIsLoading(false);
        });
    });
  };

  const searchSalary = () => {
    setModalVisible(false);
    getSalary();
  };

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={{color: '#333'}}>Уншиж байна...</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header name={"Цалингийн мэдээлэл"} navigation={navigation}/> 
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalFilterRow}>
              <Text style={styles.linetitle}>Он:</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  value={year}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: 'Сонгох', value: null}}
                  style={{
                    inputIOS: {
                      fontSize: 14,
                    },
                    inputAndroid: {
                      fontSize: 14,
                    },
                  }}
                  onValueChange={value => setYear(value)}
                  items={yearOptions}
                />
              </View>
            </View>
            <View style={styles.modalFilterRow}>
              <Text style={styles.linetitle}>Сар:</Text>
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  value={month}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: 'Сонгох', value: null}}
                  style={{
                    inputIOS: {
                      fontSize: 14,
                    },
                    inputAndroid: {
                      fontSize: 14,
                    },
                  }}
                  onValueChange={value => setMonth(value)}
                  items={monthOptions}
                />
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonSearch]}
              onPress={() => searchSalary()}>
              <Text style={styles.textStyle}>Хайх</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Болих</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: Colors.primary}}
            tabStyle={{width: 150}}
            scrollEnabled={true}
            style={{backgroundColor: Colors.primary}}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width + 1000}}
        style={{backgroundColor: Colors.white}}
      />
    </View>
  );
};

export default SalaryScreen;
