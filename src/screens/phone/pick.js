import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localApi from '../../api/localApi.js';
import {AuthContext} from '../../context/AuthContext.js';
import {Colors} from '../../components/global/Colors.js';

const Pick = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // list доорхи loader ажиллуулах
  const [loading, setLoading] = useState(false);
  const [depId, setDepId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getList();
  }, [page]);

  const getList = () => {
    page > 1 ? setLoading(true) : setIsLoading(true);
    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        setUser(user);

        localApi
          .post('mobilePhone', {
            jwt: user.jwt,
            page: page,
            limit: 25,
            find: text,
            dep_id: depId,
            job_id: jobId,
          })
          .then(res => {
            if (res.data.code == 200) {
              setData([...data, ...res.data.data]);
            } else if (res.data.code == 303) {
              logout();
            }
            setIsLoading(false);
            setLoading(false);
            setData(res.data.data);
          })
          .catch(err => {
            setIsLoading(false);
            setLoading(false);
            Alert.alert('Алдаа гарлаа.', err.message);
          });
      })
      .catch(err => {
        setIsLoading(false);
        setLoading(false);
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.phoneName}
        onPress={() => navigation.navigate('PhoneDetailStack', {item})}>
        <Text style={styles.phoneNameName}>
          {item.username} - {item.phone}
        </Text>
        <Text style={styles.phoneNameJob}>{item.department}</Text>
      </TouchableOpacity>
      <View style={styles.phoneAction}>
        <TouchableOpacity
          onPress={() => {
            phoneCall(item.phone);
          }}>
          <Image
            resizeMode="contain"
            style={{width: 35, height: 35}}
            source={require('../../assets/images/phone-icon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (loading) return null;

    return (
      <View
        style={{
          paddingVertical: 40,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
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
    <View style={{backgroundColor: Colors.background, flex: 1}}>
      <View style={styles.phoneListHeader}>
        <TouchableOpacity
          style={styles.phoneListHeaderBtn}
          onPress={() =>
            navigation.navigate('PhoneDownloadStack', {jobId, depId, text})
          }>
          <Text style={styles.phoneListHeaderText}>
            Утасны жагсаалт татаж авах
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={() => {
          if (!loading) setPage(page + 1);
        }}
        initialNumToRender={5}
        onEndReachedThreshold={0.2}
        maxToRenderPerBatch={5}
        windowSize={5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Pick;
