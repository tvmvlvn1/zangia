import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './abtstyle.js';
import localApi from '../../api/localApi';
import {Colors} from '../../components/global/Colors.js';
import {AuthContext} from '../../context/AuthContext.js';
import Lottie from 'lottie-react-native';

const Index = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [catId, setCatId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    getAbt();
  }, []);

  const getAbt = () => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);
      localApi
        .post('mobileAbt', {
          jwt: user.jwt,
          dep_map: user.dep_map,
          job_id: user.job_id,
          emp_id: user.emp_id,
        })
        .then(res => {
          if (res.data.code == 200) {
            setData(res.data.data);
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

  const AbtView = item => {
    navigation.navigate('AbtViewStack', {id: item.id, name: item.title, user});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        AbtView(item);
      }}
      style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.departmentname}</Text>
        <Text style={styles.itemInfoText}>{item.jobname}</Text>
      </View>
      <View style={styles.itemInfoImage}>
        <TouchableOpacity
          onPress={() => {
            AbtView(item);
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
    <View style={[styles.container]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

export default Index;
