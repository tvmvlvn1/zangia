import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetResult} from '../restService/self';
import Loader from '../props/LoaderScreen';
import ListSchool from './../props/listschool';
import Dots from './../props/dots';
import Header from '../../../components/Header.js';

const Education = ({navigation}) => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    start();
  }, []);

  const start = () => {
    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        GetResult(user.jwt)
          .then(async result => {
            await setData(result.data.data.education_ids);
            setLoader(false);
          })
          .catch(err => console.log(err, 'Error!'));
      })
      .catch(err => console.log(err, 'Error!'));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    start();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.bigcontainer}>
      <Header name={"Боловсрол"} navigation={navigation}/>
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loader ? (
          <View style={{paddingTop: 120}}>
            <Loader />
          </View>
        ) : (
          <>
            <View style={styles.listcontainers}>
              {data?.map((el, key) => (
                <ListSchool
                  title={el.school_name}
                  degree={el.degree}
                  key={key}
                />
              ))}
            </View>
            <Dots />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Education;

const styles = StyleSheet.create({
  bigcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#b4b4b4',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  title: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  itemtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: '#fff',
  },
  itemsubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  itemdegree: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 12,
    color: '#fff',
  },
  listcontainers: {backgroundColor: '#fff'},
});
