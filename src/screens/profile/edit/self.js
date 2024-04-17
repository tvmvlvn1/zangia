import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Eicon from 'react-native-vector-icons/Entypo';
import Aicon from 'react-native-vector-icons/AntDesign';
import styles from './../profile';
import {GetResult} from '../restService/self';
import Success from './../props/success';
import Loader from '../props/LoaderScreen';
import EditPrivatePhone from './editprivatephone';
import EditEmmergency from './editprivatedata';
import Improve from './../props/improve';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditIBD from './editibd';
import Header from '../../../components/Header.js';

const Self = ({navigation}) => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState('');
  const [isLoading, setIsloading] = useState(0);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    start();
    setPage('ListPage');
    setIsDeleted(false);
  }, [isLoading, isDeleted]);

  const start = () => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);
      GetResult(user.jwt)
        .then(async result => {
          console.log(result.data.data);
          await setData(result.data.data);
          setLoader(false);
        })
        .catch(err => console.log(err, 'Error!'));
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    start();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Header name={"Хувийн мэдээлэл"} navigation={navigation}/>
      {page === 'ListPage' ? (
        <>
          {isDeleted ? (
            <Success setGetSuccess={setIsDeleted} page="self" />
          ) : (
            <View>
              {loader ? (
                <View style={{paddingTop: 120}}>
                  <Loader />
                </View>
              ) : (
                <>
                  {deleteLoad && <Improve />}
                  <ScrollView
                    contentContainerStyle={{height: '100%'}}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }>
                    <View style={[styles.listItemBigContainer]}>
                      <Text style={styles.listItemBigTitle}>
                        Хувийн мэдээлэл
                      </Text>
                      <View style={[styles.lictItemContainer]}>
                        <View>
                          <Eicon
                            name="shield"
                            style={styles.listitemicon}
                            size={22}
                          />
                        </View>
                        <View style={styles.listitembody}>
                          <Text style={styles.listItemSubtitle}>
                            Утасны дугаар
                          </Text>
                          <Text style={styles.listItemTitle}>
                            {data?.work_phone ? data?.work_phone : '+976'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setPage('EditPage');
                          }}>
                          <Aicon name="edit" size={22} />
                        </TouchableOpacity>
                        {/* <ClearPhone
                          setIsDeleted={setIsDeleted}
                          setDeleteLoad={setDeleteLoad}
                        /> */}
                      </View>
                      <View style={styles.lictItemContainer}>
                        <View>
                          <Eicon
                            name="shield"
                            style={styles.listitemicon}
                            size={22}
                          />
                        </View>
                        <View style={styles.listitembody}>
                          <Text style={styles.listItemSubtitle}>
                            Яаралтай үед холбоо барих утасны дугаар
                          </Text>
                          <Text style={styles.listItemTitle}>
                            {data?.rel_person_phone
                              ? data?.rel_person_phone
                              : 'Бүртгэгдээгүй'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setPage('EditEmmergency');
                          }}>
                          <Aicon name="edit" size={22} />
                        </TouchableOpacity>
                        {/* <ClearEmmergency
                          setIsDeleted={setIsDeleted}
                          setDeleteLoad={setDeleteLoad}
                        /> */}
                      </View>
                      <View style={styles.lictItemContainer}>
                        <View>
                          <Eicon
                            name="shield"
                            style={styles.listitemicon}
                            size={22}
                          />
                        </View>
                        <View style={styles.listitembody}>
                          <Text style={styles.listItemSubtitle}>
                            ТИН дугаар
                          </Text>
                          <Text style={styles.listItemTitle}>
                            {data?.ibd_number
                              ? data?.ibd_number
                              : 'Бүртгэгдээгүй'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setPage('EditIBD');
                          }}>
                          <Aicon name="edit" size={22} />
                        </TouchableOpacity>
                        {/* <ClearEmmergency
                          setIsDeleted={setIsDeleted}
                          setDeleteLoad={setDeleteLoad}
                        /> */}
                      </View>
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          )}
        </>
      ) : page === 'EditPage' ? (
        <EditPrivatePhone
          setPage={setPage}
          data={{
            phone: data.work_phone == 'False' ? '' : data.work_phone,
          }}
          isLoading={isLoading}
          setIsloading={setIsloading}
          setLoading={setLoader}
        />
      ) : page === 'EditEmmergency' ? (
        <EditEmmergency
          setPage={setPage}
          data={{
            rel_person_phone: data.rel_person_phone,
            rel_person_name: data.rel_person_name,
          }}
          isLoading={isLoading}
          setIsloading={setIsloading}
          setLoading={setLoader}
        />
      ) : (
        page === 'EditIBD' && (
          <EditIBD
            setPage={setPage}
            data={{
              ibd_number: data.ibd_number,
            }}
            isLoading={isLoading}
            setIsloading={setIsloading}
            setLoading={setLoader}
          />
        )
      )}
    </View>
  );
};

export default Self;
