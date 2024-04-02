import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Alert,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './asbencestyle.js';
import api from '../../api/localApi.js';
import {Colors} from '../../components/global/Colors.js';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext.js';

const Index = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getList();
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getList = () => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);
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
    navigation.navigate('AbsenceRequestDetail', {data: params, user: user});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        RequestView(item);
      }}
      style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>
          {item.type_selection == 'unpaid_leave'
            ? 'Цалингүй чөлөө'
            : item.type_selection == 'sick_leave'
            ? 'Өвчний чөлөө'
            : item.type_selection == 'paid_leave'
            ? 'Цалинтай чөлөө'
            : item.type_selection == 'covid19'
            ? 'Ковид 19 өвчний чөлөө'
            : item.type_selection == 'annualleave_request' && 'Ээлжийн амралт'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
          }}>
          <Text
            style={[styles.itemInfoText, {fontWeight: '500', fontSize: 15}]}>
            {moment(item.date_from).format('LLLL')}{' '}
          </Text>
          <Text style={{alignSelf: 'center', marginRight: 5}}>~</Text>
          <Text
            style={[styles.itemInfoText, {fontWeight: '500', fontSize: 15}]}>
            {moment(item.date_to).format('LLLL')}
          </Text>
        </View>
        <Text
          style={[styles.itemInfoText, {fontWeight: '700', fontSize: 13.5}]}>
          Шалтгаан ~ {item.name}
        </Text>
        <Text style={[styles.itemInfoText, {fontWeight: '700', fontSize: 13}]}>
          {item.state == 'draft'
            ? 'Ноорог'
            : item.state == 'approve'
            ? 'Батлах'
            : item.state == 'approved'
            ? 'Батлагдсан'
            : item.state == 'reversed'
            ? 'Буцаагдсан'
            : item.state}
        </Text>
      </View>
      <View style={styles.itemInfoImage}>
        <TouchableOpacity
          onPress={() => {
            RequestView(item);
          }}>
          <Image
            resizeMode="stretch"
            style={{width: 40, height: 40}}
            source={require('../../assets/images/rule-arrow.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        onEndReachedThreshold={0.2}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAbsence', {user: user})}
        style={{
          width: 45,
          height: 45,
          borderRadius: 50,
          backgroundColor: '#0858A3',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 10,
          position: 'absolute',
          right: 10,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            alignSelf: 'center',
            marginBottom: 4,
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
