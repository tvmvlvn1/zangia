/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import styles from './style.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localApi from '../../api/localApi.js';
import {AuthContext} from '../../context/AuthContext.js';
import {Colors} from '../../components/global/Colors.js';
import call from 'react-native-phone-call';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';

const Index = props => {
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
  const [endReached, setEndReached] = useState(false);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadCounter, setDownloadCounter] = useState(0);
  const [readyDownload, setReadyDownload] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneFilterStack')}
          style={{marginRight: 5}}>
          <Ionicons name="search-outline" size={30} color={Colors.text} />
        </TouchableOpacity>
      ),
    });

    if (isFocused) {
      setPage(1);
      getList();
    }
  }, [isFocused]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Permission to Read Contacts',
      message: 'MyContacts needs permission to read contacts',
    }).then(() => {
      Contacts.getAll().then(contacts => {
        setPhoneContacts(contacts);
        setReadyDownload(true);
      });
    });

    setIsDownloaded(false);

    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      setUser(user);
      localApi
        .post('mobilePhone', {
          jwt: user.jwt,
          page: 1,
          limit: 1,
          find: '',
          dep_id: '',
          job_id: '',
          pick: 1,
        })
        .then(res => {
          if (res.data.code == 200) {
            setAllUser(res.data.alluser);
          }
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа.777', err.message);
        });
    });
  }, []);

  useEffect(() => {
    getList();
  }, [page]);

  const phoneCall = phoneNumber => {
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    call(args).catch(err => {
      Alert.alert('Алдаа гарлаа.', err.message);
    });
  };

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
            find: props.route.params?.text,
            dep_id: props.route.params?.depId ? props.route.params?.depId : props.route.params?.selectedDepId,
            job_id: props.route.params?.jobId,
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
            setIsLoading(false);
            setLoading(false);
            Alert.alert('Алдаа гарлаа.222', err.message);
          });
      })
      .catch(err => {
        setIsLoading(false);
        setLoading(false);
        Alert.alert('Алдаа гарлаа.333', err.message);
      });
  };

  const downloadContacts = () => {
    Alert.alert(
      'Анхааруулга мессеж',
      'Дугаар давхардсан үед дарж хуулахыг та зөвшөөрч байна уу ?',
      [
        {text: 'Тийм', onPress: () => getDownloads()},
        {
          text: 'Үгүй',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  getDownloads = () => {
    if (readyDownload) {
      setIsDownloaded(true);

      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Permission to Write Contacts',
          message: 'MyContacts needs permission to write contacts',
        },
      ).then(() => {
        startDownloading();
      });
    } else {
      Alert.alert('Утасны контактыг шалгаж байна. Дахин оролдоно уу.');
    }
  };

  const startDownloading = async () => {

    if (props.route.params?.selectedDepId) {
      data.map((item, k) => {
        var newContact = {
          company: item.job,
          note: '',
          emailAddresses: [
            {
              label: 'work',
              email: item.email != null ? item.email : '',
            },
          ],
          familyName: '',
          middleName: item.department,
          givenName: item.username,
          phoneNumbers: [
            {
              label: 'work',
              number: item.workPhone != null ? item.workPhone : '',
            },
            {
              label: 'mobile',
              number: item.phone != null ? item.phone : '',
            },
          ],
          hasThumbnail: false,
        };
        saveContact(newContact, k, data.length);
      });
    } else {
      allUser.map((item, k) => {
        var newContact = {
          company: item.job,
          note: '',
          emailAddresses: [
            {
              label: 'work',
              email: item.email != null ? item.email : '',
            },
          ],
          //suffix: item.phone != null ? item.phone : "",
          familyName: '',
          middleName: item.department,
          givenName: item.username,
          phoneNumbers: [
            {
              label: 'work',
              number: item.workPhone != null ? item.workPhone : '',
            },
            {
              label: 'mobile',
              number: item.phone != null ? item.phone : '',
            },
          ],
          hasThumbnail: false,
        };
        saveContact(newContact, k, allUser.length);
      });
    }
  };

  const saveContact = async (newContact, k, all) => {
    setDownloadCounter(k + 1);
    var checkContact = ContactsinArray(newContact, phoneContacts);
    console.log(k + 1, '/', allUser.length, '\t', checkContact.status);
    if (checkContact.status) {
      let contacts = checkContact.contact;
      contacts.map(item => {
        deleteMyContact(item.recordID);
      });
    }
    await newMyContact(newContact);
    
    if (all == k + 1) {
      props.route.params?.selectedDepId ? (Alert.alert(`${(JSON.stringify(data[0].department))} - ийн: ` + data.length + ' жагсаалт татагдав.')) : (Alert.alert('Нийт: ' + allUser.length + ' жагсаалт татагдав.'));
      Contacts.getAll().then(contacts => {
        setPhoneContacts(contacts);
      });
      setIsDownloaded(false);
      setDownloadCounter(0);
    }
  };

  const deleteMyContact = async deleteRecordId => {
    Contacts.deleteContact({recordID: deleteRecordId})
      .then(res => {
        console.log('delete', res);
      })
      .catch(err => {
        // Alert.alert('Контакт татахад алдаа гарлаа.1', err.message);
      });
  };

  const newMyContact = async newContact => {
    Contacts.addContact(newContact)
      .then(res => {
        console.log('adding contact', res);
      })
      .catch(err => {
        // Alert.alert('Контакт татахад алдаа гарлаа.', err.message);
      });
  };

  const ContactsinArray = (needle, haystack) => {
    let carray = [];
    let myarray = [];
    let i = 0;

    for (i = 0; i < haystack.length; i++) {
      if (
        (haystack[i].phoneNumbers.length > 0 &&
          needle.phoneNumbers[0].number !== undefined &&
          needle.phoneNumbers[0].number !== '' &&
          needle.phoneNumbers[0].number ==
            haystack[i].phoneNumbers[0].number
              .replace(/\s/g, '')
              .replace(/-/gi, '')
              .replace('(', '')
              .replace(')', '')
              .replace('+', '')
              .replace('976', '')) ||
        (haystack[i].phoneNumbers.length > 0 &&
          needle.phoneNumbers[1].number !== undefined &&
          needle.phoneNumbers[1].number !== '' &&
          needle.phoneNumbers[1].number ==
            haystack[i].phoneNumbers[0].number
              .replace(/\s/g, '')
              .replace(/-/gi, '')
              .replace('(', '')
              .replace(')', '')
              .replace('+', '')
              .replace('976', '')) ||
        (haystack[i].phoneNumbers.length > 1 &&
          needle.phoneNumbers[0].number !== undefined &&
          needle.phoneNumbers[0].number !== '' &&
          needle.phoneNumbers[0].number ==
            haystack[i]?.phoneNumbers[1].number
              .replace(/\s/g, '')
              .replace(/-/gi, '')
              .replace('(', '')
              .replace(')', '')
              .replace('+', '')
              .replace('976', '')) ||
        (haystack[i].phoneNumbers.length > 1 &&
          needle.phoneNumbers[1].number !== undefined &&
          needle.phoneNumbers[1].number !== '' &&
          needle.phoneNumbers[1].number ==
            haystack[i]?.phoneNumbers[1].number
              .replace(/\s/g, '')
              .replace(/-/gi, '')
              .replace('(', '')
              .replace(')', '')
              .replace('+', '')
              .replace('976', ''))
      ) {
        myarray.push(haystack[i]);
      }
    }
    if (myarray.length > 0) {
      return (carray = {status: true, contact: myarray});
    }

    return (carray = {status: false});
  };

  const renderItem = ({item, idx}) => (
    <View style={styles.item} key={idx}>
      <TouchableOpacity
        style={styles.phoneName}
        onPress={() =>
          navigation.navigate('PhoneDetailStack', {item, phoneContacts})
        }>
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
      <View style={styles.phoneListHeader}>
        <TouchableOpacity
          style={styles.phoneListHeaderBtn}
          onPress={() => downloadContacts()}>
          {isDownloaded ? (
            <Text style={styles.phoneListHeaderText}>
              {props.route.params?.selectedDepId ? `Татагдаж байна...  ${(downloadCounter + '/' + data.length)}` : `Татагдаж байна...  ${downloadCounter + '/' + allUser.length}`}
            </Text>
          ) : (
            <Text style={styles.phoneListHeaderText}>
                {!props.route.params?.selectedDepId ? "Бүх утасны жагсаалт татаж авах" : "Энэ хэлтэсийн утасны жагсаалт татаж авах"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
