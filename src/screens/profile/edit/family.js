import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ListPerson from './../props/listperson';
import Addfamily from '../props/addfamily';
import {FamilyList} from '../restService/family';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../props/LoaderScreen';
import ShowFamilyMember from './showFamilyMember';
import EditFamilyMember from './editFamily';
import AddFamilyMember from './addFamily';

const Family = ({navigation}) => {
  const [isLoading, setIsloading] = useState(0);
  useEffect(() => {
    start();
    setPage('ListPage');
  }, [isLoading]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('');
  const [person, setPerson] = useState([]);
  let animation = React.createRef();

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    start();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const start = () => {
    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        FamilyList(user.jwt)
          .then(async success => {
            setData(success.data.data);
            setLoading(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.bigcontainer}>
      {page === 'ListPage' ? (
        <>
          <View style={[styles.mt20, styles.p20]}>
            <View>
              <View style={styles.tabtitle}>
                <Text style={styles.tabtitletext}>
                  Гэр бүлийн гишүүд ({data?.length ? data?.length : 0})
                </Text>
              </View>
              <ScrollView
                style={{height: Dimensions.get('window').height - 200}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {!loading ? (
                  data?.map((el, key) => (
                    <ListPerson
                      key={key}
                      data={el}
                      navigation={navigation}
                      setPage={setPage}
                      setPerson={setPerson}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </ScrollView>
            </View>
          </View>
          <Addfamily
            navigation={() => {
              setPage('AddPage');
            }}
          />
        </>
      ) : page === 'ShowDetial' ? (
        <ShowFamilyMember
          setPage={setPage}
          person={person}
          setPerson={setPerson}
          animation={animation}
          setIsloading={setIsloading}
          isLoading={isLoading}
        />
      ) : page === 'EditPage' ? (
        <EditFamilyMember
          setPage={setPage}
          person={person}
          setPerson={setPerson}
          isLoading={isLoading}
          setIsloading={setIsloading}
          setLoading={setLoading}
        />
      ) : (
        page === 'AddPage' && (
          <AddFamilyMember
            setPage={setPage}
            isLoading={isLoading}
            setIsloading={setIsloading}
            setLoading={setLoading}
          />
        )
      )}
    </View>
  );
};

export default Family;

const styles = StyleSheet.create({
  bigcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
  },
  mt20: {
    marginTop: 0,
  },
  tabtitle: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  tabtitletext: {
    color: '#3b5998',
    fontWeight: '700',
    fontSize: 18,
  },
  p20: {
    padding: 20,
  },
});
