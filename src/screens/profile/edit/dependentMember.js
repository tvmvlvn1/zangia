import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ListPerson from './../props/listrelation';
import AddSelf from '../props/addself';
import {RelationList} from '../restService/relation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../props/LoaderScreen';
import ShowRelationMember from './showRelation';
import EditRelationMember from './editRelation';
import AddRelationMember from './addDependentMember';
import Header from '../../../components/Header.js';

const DependentMember = ({navigation}) => {
  const [isLoading, setIsloading] = useState(0);
  useEffect(() => {
    start();
    setPage('ListPage');
  }, [isLoading]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('');
  const [person, setPerson] = useState([]);
  const [data, setData] = useState([]);
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

  const start = async () => {
    await AsyncStorage.getItem('userInfo')
      .then(async userInfo => {
        let user = JSON.parse(userInfo);
        await RelationList(user.jwt)
          .then(async success => {
            await setData(success.data.data);
            await setLoading(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.bigcontainer}>
      <Header name={"Хамааралтай гишүүд"} navigation={navigation}/>
      {page === 'ListPage' ? (
        <>
          <View style={[styles.mt20, styles.p20]}>
            <View>
              <View style={styles.tabtitle}>
                <Text style={styles.tabtitletext}>
                  Хамааралтай гишүүд ({data?.length ? data?.length : 0})
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
          <AddSelf
            navigation={() => {
              setPage('AddPage');
            }}
          />
        </>
      ) : page === 'ShowDetial' ? (
        <ShowRelationMember
          setPage={setPage}
          person={person}
          setPerson={setPerson}
          animation={animation}
          isLoading={isLoading}
          setIsloading={setIsloading}
        />
      ) : page === 'EditPage' ? (
        <EditRelationMember
          setPage={setPage}
          person={person}
          setPerson={setPerson}
          isLoading={isLoading}
          setIsloading={setIsloading}
          setLoading={setLoading}
        />
      ) : (
        page === 'AddPage' && (
          <AddRelationMember
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

export default DependentMember;

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
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
  },
  p20: {
    padding: 20,
    paddingTop: 0
  },
});
