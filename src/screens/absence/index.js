import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './asbencestyle.js';
import api from '../../api/localApi.js';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext.js';
import Header from '../../components/Header.js';
import LinearGradient from 'react-native-linear-gradient';

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
      <Lottie
        autoPlay
        loop
        style={{ flex: 1, justifyContent: 'center' }}
        source={require('../../assets/lottie/loading.json')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header name={"Чөлөөний хүсэлт"} navigation={navigation}/>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        onEndReachedThreshold={0.2}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
      <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", bottom: 60, position: "absolute", width: "90%", alignSelf: "center" }} onPress={() => navigation.navigate('CreateAbsence', {user: user})}>
        <LinearGradient
          colors={[ '#92A3FD', '#9DCEFF' ]}
          style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
        >   
          <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
            Шинэ хүсэлт
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
