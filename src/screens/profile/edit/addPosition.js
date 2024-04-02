/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Improve from '../props/improve';
import Success from '../props/success';
import DateTimePicker from '@react-native-community/datetimepicker';
import localApi from '../../../api/localApi';
import {AuthContext} from '../../../context/AuthContext';
import {SelectList} from 'react-native-dropdown-select-list';
import {Colors} from '../../../components/global/Colors';

const AddPosition = ({
  setPage,
  isLoading,
  setIsloading,
  setLoading,
  detailInfo,
}) => {
  const {userToken} = useContext(AuthContext);
  const [dood, setDood] = useState('');
  const [deed, setDeed] = useState('');
  const [dateOfPosition, setDateOfPosition] = useState(new Date());
  const [jobs, setJobs] = useState([]);
  const {logout} = useContext(AuthContext);
  const [dropdownListId, setDropdownListId] = useState('');
  const [dropdownListId2, setDropdownListId2] = useState('');
  const [dropdownListId3, setDropdownListId3] = useState('');
  const [warningTxt, setWarningTxt] = useState(
    '* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?',
  );
  const [showDate, setShowDate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getButton, setGetButton] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDateOfPosition(currentDate);
  };

  useEffect(() => {
    getJobPositions();
  }, []);

  const getJobPositions = () => {
    localApi
      .post('Position', {
        jwt: userToken,
        find: '',
      })
      .then(res => {
        if (res.data.code == 200) {
          let newArray = res.data.data.map(item => {
            return {key: item.id, value: item.name};
          });
          setJobs(newArray);
        } else if (res.data.code == 303) {
          logout();
        }
      })
      .catch(err => {
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  const SentPosition = async () => {
    setGetButton(true);
    if (!dood || !deed || !dateOfPosition) {
      setWarningTxt('* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?');
      setGetButton(false);
      return setAlert(true);
    }
    setGetButton(true);
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);

      const body = {
        params: {
          worker: detailInfo?.id,
          employee_id: user.emp_id,
          job_id: detailInfo?.name_job,
          availability: dateOfPosition.toISOString().split('T')[0],
          position_name3: dropdownListId3,
          position_name2: dropdownListId2,
          salary_min: dood.replace(/,/g, ''),
          salary_max: deed.replace(/,/g, ''),
        },
      };
      localApi
        .post('CreateAnket', body)
        .then(res => {
          if (res.data.result) {
            Alert.alert('Таны анкет амжилттай илгэлээ');
            setSuccess(true);
          } else {
            Alert.alert('Регистертэй анкет үүссэн байна.');
            setGetButton(false);
          }
        })
        .catch(err => {
          Alert.alert('Алдаатай хүсэлт.', err.message);
        });
    });
  };

  return (
    <View style={{flex: 1}}>
      {alert && (
        <Alert setAlert={setAlert} title="Анхаар" warningTxt={warningTxt} />
      )}

      {success ? (
        <Success
          setGetSuccess={setSuccess}
          onPress={() => {
            setPage('ListPage');
            setLoading(true);
            isLoading === 0 ? setIsloading(1) : setIsloading(0);
          }}
        />
      ) : (
        <ScrollView style={{paddingHorizontal: 20}}>
          <SafeAreaView>
            {getButton && <Improve />}
            <View style={styles.modalbody}>
              <View style={styles.addboxjustcontainer}>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Таны сонирхож буй
                    ажлын байр:
                  </Text>
                  <View style={[]}>
                    <Text style={{color: Colors.text, fontSize: 18}}>
                      {detailInfo?.job}
                    </Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Таны сонирхож буй
                    албан тушаал2:
                  </Text>
                  <View style={[styles.input]}>
                    <SelectList
                      placeholder="Сонгох"
                      setSelected={setDropdownListId2}
                      data={jobs}
                      search={true}
                      boxStyles={{borderRadius: 10}}
                    />
                  </View>
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Таны сонирхож буй
                    албан тушаал3:
                  </Text>
                  <View style={[styles.input]}>
                    <SelectList
                      placeholder="Сонгох"
                      setSelected={setDropdownListId3}
                      data={jobs}
                      search={true}
                      boxStyles={{borderRadius: 10}}
                    />
                  </View>
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Цалингийн хэмжээ дээд:
                  </Text>
                  <TextInput
                    style={[
                      styles.input2,
                      {
                        borderColor:
                          dood.replace(/\D/g, '').length >= 2
                            ? '#3b5998'
                            : '#eee',
                      },
                    ]}
                    value={dood
                      .replace(/\D/g, '')
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChangeText={e =>
                      setDood(
                        e
                          .replace(/\D/g, '')
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Цалингийн хэмжээ доод:
                  </Text>
                  <TextInput
                    style={[
                      styles.input2,
                      {
                        borderColor:
                          deed.replace(/\D/g, '').length >= 2
                            ? '#3b5998'
                            : '#eee',
                      },
                    ]}
                    value={deed
                      .replace(/\D/g, '')
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChangeText={e =>
                      setDeed(
                        e
                          .replace(/\D/g, '')
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>
                    <Text style={styles.special}>* </Text>Ажилд орох боломжтой
                    хугацаа:
                  </Text>
                  <TouchableOpacity onPress={() => setShowDate(true)}>
                    <Text style={[styles.input2, {borderColor: '#3b5998'}]}>
                      {dateOfPosition.toISOString().split('T')[0]}
                    </Text>
                  </TouchableOpacity>
                  {showDate && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateOfPosition}
                      mode={'date'}
                      onChange={onChangeDate}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.linkcontainer}
                onPress={SentPosition}>
                <Text style={styles.linktitle}>Хадгалах</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
};

export default AddPosition;

const styles = StyleSheet.create({
  addboxjustcontainer: {
    paddingVertical: 20,
    paddingBottom: 5,
  },
  modalbody: {
    flex: 4,
  },
  addboxheader: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addboxtitle: {
    fontSize: 16,
    color: '#3b5998',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    fontSize: 20,
    padding: 0,
    borderColor: '#eee',
    backgroundColor: Colors.white,
    color: '#000',
    borderRadius: 6,
  },
  input2: {
    width: '100%',
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    borderColor: '#eee',
    backgroundColor: '#f7f7f7',
    color: '#000',
    borderRadius: 10,
  },
  linetitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  line: {
    marginBottom: 10,
  },
  selecttimestamp: {
    width: '100%',
    backgroundColor: '#f7f7f7',
  },
  linkcontainer: {
    width: '100%',
    padding: 12,
    marginTop: 22,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
  },
  linktitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  special: {
    color: '#a51c30',
    fontWeight: 'bold',
    marginRight: 12,
  },
  lineJustRegistration: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cog: {
    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  cogs: {
    borderWidth: 1,
    borderColor: '#eee',
    flex: 8,
    fontSize: 20,
    padding: 12,
    backgroundColor: '#f7f7f7',
  },
});
