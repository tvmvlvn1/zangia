import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import styles from './style';
import localApi from '../../api/localApi';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../components/global/Colors';

const Filter = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [depId, setDepId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [query, setQuery] = useState('');
  const [queryJob, setQueryJob] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    getDepartments();
    getJobs();
  }, []);

  const getDepartments = () => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('department', {jwt: user.jwt})
        .then(res => {
          if (res.data.code == 200) {
            setDepartments(res.data.data);
          } else if (res.data.code == 303) {
            logout();
          }
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа.₮₮₮', err.message);
        });
    });
  };

  const getJobs = () => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('position', {jwt: user.jwt, find: depId})
        .then(res => {
          if (res.data.code == 200) {
            setJobs(res.data.data);
          } else if (res.data.code == 303) {
            logout();
          }
        })
        .catch(err => {
          Alert.alert('Алдаа гарлаа111.', err.message);
        });
    });
  };

  const clearSearch = () => {
    setQuery('');
    setQueryJob('');
    setText('');
    setDepId(null);
    setJobId(null);
  };

  const findJob = query => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return jobs.filter(job => job.name.search(regex) >= 0);
  };

  const findDepartment = query => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return departments.filter(film => film.name.search(regex) >= 0);
  };

  const search = () => {
    navigation.navigate('RuleStack', {
      // jobId: jobId,
      // depId: depId,
      text: text,
    });
  };

  useEffect(() => {
    findDepartment(query);
  }, [query]);

  useEffect(() => {
    findJob(queryJob);
  }, [queryJob]);

  return (
    <View style={styles.filterBoard}>
      <View style={styles.filterTool}>
        {/* <View style={{zIndex: 7, marginBottom: 15}}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            listContainerStyle={{minHeight: 0, maxHeight: 200}}
            containerStyle={styles.autocompleteContainer}
            data={departments.length > 0 && depId ? [] : departments}
            defaultValue={query}
            onChangeText={text => {
              setQuery(text);
              setDepId(text != '' ? depId : '');
            }}
            placeholder="Хэлтэс,салбар бичнэ үү / криллээр /"
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    console.log(item);
                    setQuery(item.name);
                    setDepId(item.id);
                    getJobs();
                  }}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{marginBottom: 15, zIndex: 6}}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            listContainerStyle={{minHeight: 0, maxHeight: 200}}
            containerStyle={styles.autocompleteContainer}
            data={jobs.length > 0 && jobId ? [] : jobs}
            defaultValue={queryJob}
            onChangeText={text => {
              setQueryJob(text);
              setJobId(text != '' ? jobId : '');
            }}
            placeholder="  Албан тушаалаа бичнэ үү / криллээр /"
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setQueryJob(item.name);
                  setJobId(item.id);
                }}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View> */}
        <View>
          <TextInput
            style={{
              backgroundColor: '#fff',
              padding: 0,
              margin: 0,
              borderWidth: 0,
              width: '100%',
              height: 40,
              fontSize: 14,
              color: Colors.text,
              paddingHorizontal: 5,
            }}
            value={text}
            placeholder="Хайх түлхүүр үгээ бичнэ үү"
            placeholderTextColor="#999"
            onChangeText={text => setText(text)}
          />
        </View>
      </View>
      <View style={styles.filterBtn}>
        <TouchableOpacity
          style={styles.filterBtnSearch}
          onPress={() => search()}>
          <Text style={styles.filterBtnSearchText}>Хайх</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterBtnSearchClear}
          onPress={() => clearSearch()}>
          <Text style={styles.filterBtnSearchClearText}>Хайлт цэвэрлэх</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;
