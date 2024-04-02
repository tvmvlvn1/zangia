/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View, Text, TextInput} from 'react-native';
import styles from './style';
import localApi from '../../api/localApi';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../components/global/Colors';
import { SelectList } from 'react-native-dropdown-select-list';


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
  const [selected, setSelected] = React.useState("");
  const [data, setData] = React.useState([]);

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
            let newArray = res.data.data.map((item) => {
              return { key: item.id, value: item.name }
            });

            setData(newArray)
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
    setSelected(null);
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
    console.log('search');
    navigation.navigate('PhoneStack', {
      jobId: jobId,
      depId: depId,
      text: text,
      selectedDepId: selected,
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
            placeholder="   Нэр эсвэл утас бичнэ үү / криллээр /"
            placeholderTextColor="#999"
            onChangeText={text => setText(text)}
          />
        </View>
      </View>
        <View style={styles.dropDown}>
          <SelectList 
          placeholder='Салбар газар, Хэлтэс'
          setSelected={setSelected} 
          fontFamily='lato'
          data={data}
          search={true} 
          boxStyles={{ borderRadius: 0 }}
        />
        </View>
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

  );
};

export default Filter;
