import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChangeAddress} from '../restService/address';
import LoaderScreen from '../props/LoaderScreen';
import Alert from './../props/Alert';
import Improve from './../props/improve';
import Success from './../props/success';
import RNPickerSelect from 'react-native-picker-select';

import styles from './../profile.js';

const Editaddress = props => {
  const {setPage, setIsloading, isLoading, sData, providenceDatas, data} =
    props;

  const [soumsData, setSoumsData] = useState([]);
  const [soumsDataTemp, setSoumsDataTemp] = useState([]);
  const [providences, setProvidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [NowProvidence, setNowProvidence] = useState(0);
  const [NowSoum, setNowSoum] = useState(0);
  const [NowToot, setNowToot] = useState('');

  const [getButton, setGetButton] = useState(false);
  const [getSuccess, setGetSuccess] = useState(false);
  const [provinceItems, setProvinceItems] = useState([]);
  const [soumItems, setSoumItems] = useState([]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    start();
  }, []);

  const start = async () => {
    setNowProvidence(data.districtId);
    setNowSoum(data.suburbId);
    setNowToot(data.toot);
    setSoumsData(sData);
    setProvidences(providenceDatas);
    setProvinceItems(
      providenceDatas.map(row => ({value: row.id, label: row.name})),
    );
    setSoumItems(sData.map(row => ({value: row.id, label: row.name})));
    setGetButton(false);
    setGetSuccess(false);
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    start();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [alert, setAlert] = useState(false);

  const SentData = async () => {
    setGetButton(true);

    if (!NowProvidence || !NowSoum || !NowToot) {
      setGetButton(false);
      return setAlert(true);
    }

    const data = {NowProvidence, NowSoum, NowToot};

    AsyncStorage.getItem('userInfo')
      .then(async userInfo => {
        let user = JSON.parse(userInfo);
        await ChangeAddress(user.jwt, data)
          .then(res => {
            if (res) {
              setGetButton(false);
              setGetSuccess(true);
            }
          })
          .catch(err => console.log(err, 'Error Change Address!'));
      })
      .catch(err => console.log(err, 'Error Read'));
  };

  return (
    <View>
      {alert && (
        <Alert
          setAlert={setAlert}
          title="Анхаар"
          warningTxt="* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?"
        />
      )}
      {loading ? (
        <LoaderScreen />
      ) : getSuccess ? (
        <Success
          setGetSuccess={setGetSuccess}
          onPress={() => {
            setPage('IndexPage');
            setLoading(true);
            isLoading === 0 ? setIsloading(1) : setIsloading(0);
          }}
        />
      ) : (
        <View style={{zIndex: 1}}>
          {getButton && <Improve />}
          <ScrollView
            style={styles.bigcontainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View>
              <View style={styles.line}>
                <Text style={[styles.linetitle, styles.mt20]}>
                  * Аймаг / Хот сонгоно уу
                </Text>

                <View
                  style={[
                    styles.input,
                    styles.br12,
                    {justifyContent: 'center'},
                  ]}>
                  <RNPickerSelect
                    value={NowProvidence}
                    placeholder={{label: 'Сонгох', value: null}}
                    style={{
                      placeholder: {color: '#000'},
                      inputIOS: {
                        fontSize: 20,
                      },
                      inputAndroid: {
                        fontSize: 20,
                      },
                    }}
                    onValueChange={value => {
                      setNowSoum(0);
                      setNowProvidence(value);
                      setSoumsDataTemp(
                        soumsData.filter(data => data.providence === value),
                      );
                      setSoumItems(
                        soumsDataTemp.map(row => ({
                          value: row.id,
                          label: row.name,
                        })),
                      );
                    }}
                    items={provinceItems}
                  />
                </View>
              </View>

              {soumsDataTemp?.length !== 0 && (
                <View style={styles.line}>
                  <Text style={[styles.linetitle, styles.mt20]}>
                    * Сум / Дүүрэг сонгоно уу
                  </Text>
                  <View
                    style={[
                      styles.input,
                      styles.br12,
                      {justifyContent: 'center'},
                    ]}>
                    <RNPickerSelect
                      value={NowSoum}
                      placeholder={{label: 'Сонгох', value: null}}
                      style={{
                        placeholder: {color: '#000'},
                        inputIOS: {
                          fontSize: 20,
                        },
                        inputAndroid: {
                          fontSize: 20,
                        },
                      }}
                      onValueChange={value => {
                        setNowSoum(value);
                      }}
                      items={soumItems}
                    />
                  </View>
                </View>
              )}

              <View style={styles.line}>
                <Text style={[styles.linetitle, styles.mt20]}>
                  * Баг / хороо, гэрийн хаяг
                </Text>
                <TextInput
                  style={[styles.input, styles.br12]}
                  onChangeText={e => setNowToot(e)}
                  value={NowToot}
                />
              </View>

              <View style={[styles.addressShowContainer, styles.mt20]}>
                <TouchableOpacity
                  style={[
                    styles.addressEditButton,
                    {backgroundColor: '#55cc66'},
                  ]}
                  onPress={SentData}>
                  <Text style={styles.addressEditButtonTitle}>
                    Өөрчлөлтийг хадгалах
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.addressEditButton,
                    {backgroundColor: '#efbf31'},
                  ]}
                  onPress={() => {
                    setPage('IndexPage');
                    setLoading(true);
                    isLoading === 0 ? setIsloading(1) : setIsloading(0);
                  }}>
                  <Text
                    style={[styles.addressEditButtonTitle, {color: '#000'}]}>
                    Буцах
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Editaddress;
