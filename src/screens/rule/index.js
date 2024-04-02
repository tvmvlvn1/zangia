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
import styles from './style.js';
import localApi from '../../api/localApi';
import {Colors} from '../../components/global/Colors.js';
import {AuthContext} from '../../context/AuthContext.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const Index = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [catId, setCatId] = useState('');
  const [page, setPage] = useState(1);
  // list доорхи loader ажиллуулах
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getRule();
  }, [page]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('RuleFilterStack')}
          style={{marginRight: 5}}>
          <Ionicons name="search-outline" size={30} color={Colors.text} />
        </TouchableOpacity>
      ),
    });

    if (isFocused) {
      setPage(1);
      getRule();
    }
  }, [isFocused]);

  const getRule = () => {
    page > 1 ? setLoading(true) : setIsLoading(true);

    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        console.log(
          '',
          JSON.stringify({
            title: props.route.params?.text,
          }),
        );
        localApi
          .post('mobileRule', {
            jwt: user.jwt,
            dep_map: user.dep_map,
            job_id: user.job_id,
            emp_id: user.emp_id,
            page: page,
            title: props.route.params?.text,
            limit: 25,
          })
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.length > 0) {
                if (page == 1) {
                  setData(res.data.data);
                } else {
                  setData([...data, ...res.data.data]);
                }
              } else {
                if (page == 1) {
                  setData([]);
                }
                setEndReached(true);
              }
            } else if (res.data.code == 303) {
              logout();
            }
            setIsLoading(false);
            setLoading(false);
          })
          .catch(err => {
            Alert.alert('Алдаа гарлаа.', err.message);
            setIsLoading(false);
            setLoading(false);
          });
      })
      .catch(err => {
        setIsLoading(false);
        setLoading(false);
        Alert.alert('Алдаа гарлаа.333', err.message);
      });
  };

  const RuleView = item => {
    navigation.navigate('RuleViewStack', {id: item.id, name: item.title});
  };

  const renderItem = ({item, idx}) => (
    <TouchableOpacity
      onPress={() => {
        RuleView(item);
      }}
      style={styles.item}
      key={idx}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.category}</Text>
        <Text style={styles.itemInfoText}>{item.title}</Text>
      </View>
      <View style={styles.itemInfoImage}>
        <TouchableOpacity
          onPress={() => {
            RuleView(item);
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

  const renderFooter = () => {
    if (loading || endReached) return null;

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
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (!loading && !endReached) setPage(page + 1);
          }}
          initialNumToRender={5}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={5}
          windowSize={5}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <Text style={{color: Colors.text, textAlign: 'center', marginTop: 10}}>
          Илэрц олдсонгүй
        </Text>
      )}
    </View>
  );
};

export default Index;
