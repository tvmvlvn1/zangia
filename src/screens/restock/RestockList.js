import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useContext} from 'react';
import styles from '../rule/style';
import localApi from '../../api/localApi';
import Lottie from 'lottie-react-native';
import {AuthContext} from '../../context/AuthContext';

const RestockList = props => {
  const {logout} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post(`mobileRestock`, {
          is_food: props.route.params.is_food,
          jwt: user.jwt,
          dep_map: user.dep_map,
          job_id: user.job_id,
          dep_id: user.dep_id,
          emp_id: user.emp_id,
        })
        .then(res => {
          if (res.data.code == 303) {
            logout();
          }
          setData(res.data.data);
          setIsLoading(false);
        })
        .catch(err => {
          Alert.alert(err.message);
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <ScrollView>
        {!isLoading && data ? (
          data.map((item, i) => (
            <TouchableOpacity
              style={styles.item}
              key={i}
              onPress={() =>
                props.navigation.navigate('RestockViewStack', {id: item.id})
              }>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.section_id}</Text>
                <Text style={styles.itemInfoText}>{item.title}</Text>
              </View>

              <Image
                resizeMode="stretch"
                style={{width: 40, height: 40}}
                source={require('../../assets/images/rule-arrow.png')}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Lottie
            autoPlay
            loop
            style={{ flex: 1, justifyContent: 'center' }}
            source={require('../../assets/lottie/loading.json')}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default RestockList;
