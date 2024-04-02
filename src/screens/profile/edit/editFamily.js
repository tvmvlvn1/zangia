import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Alert from './../props/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFamily} from '../restService/family';
import Improve from '../props/improve';
import Success from '../props/success';
import AIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {familyOptions, regs} from '../../../Global';

const EditFamily = props => {
  const {setPage, person, setPerson, setIsloading, isLoading, setLoading} =
    props;

  useEffect(() => {
    start();
  }, [person]);

  const [successSms, setSuccessSms] = useState('');

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [organization, setOrganization] = useState('');
  const [registryNumber, setRegistryNumber] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const relationName = 'Хоосон!';
  const [dropdownListId, setDropdownListId] = useState('');
  const [warningTxt, setWarningTxt] = useState(
    '* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?',
  );

  const [reg1, setReg1] = useState('А');
  const [reg2, setReg2] = useState('А');

  const start = () => {
    setReg1(person.registry_number.charAt(0).toUpperCase());
    setReg2(person.registry_number.charAt(1).toUpperCase());
    setName(person.name || '');
    setContactNumber(person.contact_number || '');
    setDateOfBirth(
      person.date_of_birth ? new Date(person.date_of_birth) : new Date(),
    );
    setOrganization(person.organization || '');
    setRegistryNumber(person.registry_number.slice(2, 10) || '');
    setJobPosition(person.job_position || '');
    setDropdownListId(person.dropdown_list_id || 1);
  };

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const SentData = () => {
    if (
      !name ||
      !contactNumber ||
      !dateOfBirth ||
      !organization ||
      !registryNumber ||
      !jobPosition ||
      !dropdownListId
    ) {
      setWarningTxt('* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?');
      return setAlert(true);
    }

    if (contactNumber.length !== 8) {
      setWarningTxt('Буруу дугаар байна!');
      return setAlert(true);
    }

    if (registryNumber.length !== 8) {
      setWarningTxt(
        `"${reg1}${reg2}${registryNumber}" Регистерийн дугаар буруу байна!`,
      );
      return setAlert(true);
    }

    setOnLoad(true);

    const data = {
      name,
      contactNumber,
      dateOfBirth: dateOfBirth.toISOString().split('T')[0],
      organization,
      registryNumber: reg1 + reg2 + registryNumber,
      jobPosition,
      relationName,
      dropdownListId,
    };

    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        UpdateFamily(user.jwt, data, person.id)
          .then(res => {
            if (res.data.success) {
              setOnLoad(false);
              setSuccess(true);
              setSuccessSms(res.data.message);
            }
          })
          .catch(err => {
            console.log(err, 'Error!');
            setOnLoad(false);
          });
      })
      .catch(err => {
        console.log(err, 'Error!');
        setOnLoad(false);
      });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDateOfBirth(currentDate);
  };

  function isNumeric(num) {
    return !isNaN(num);
  }

  return (
    <View>
      {alert && (
        <Alert setAlert={setAlert} title="Анхаар" warningTxt={warningTxt} />
      )}

      <ScrollView>
        <View
          style={{
            height: Dimensions.get('window').height - 120,
            zIndex: -1,
            marginBottom: 20,
          }}>
          {onLoad && <Improve />}
          {success && (
            <Success
              setGetSuccess={setSuccess}
              onPress={() => {
                setPage('ListPage');
                setLoading(true);
                setPerson([]);
                isLoading === 0 ? setIsloading(1) : setIsloading(0);
              }}
            />
          )}
          <View style={styles.modalbody}>
            <View style={styles.addboxjustcontainer}>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Таны хэн болох:
                </Text>
                <View
                  style={[
                    styles.input,
                    {
                      borderColor: dropdownListId ? '#3b5998' : '#eee',
                    },
                  ]}>
                  <RNPickerSelect
                    value={dropdownListId}
                    placeholder={{label: 'Сонгох', value: null}}
                    style={{
                      placeholder: {color: '#000'},
                      inputIOS: {
                        fontSize: 20,
                      },
                      inputAndroid: {
                        fontSize: 20,
                      },
                    }}
                    onValueChange={value => setDropdownListId(value)}
                    items={familyOptions}
                  />
                </View>
              </View>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Нэр:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {borderColor: name.length >= 2 ? '#3b5998' : '#eee'},
                  ]}
                  value={name}
                  onChangeText={e => setName(e)}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Төрсөн огноо:
                </Text>
                <TouchableOpacity onPress={() => setShowDate(true)}>
                  <Text style={[styles.input, {borderColor: '#3b5998'}]}>
                    {dateOfBirth.toISOString().split('T')[0]}
                  </Text>
                </TouchableOpacity>
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dateOfBirth}
                    mode={'date'}
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Регистерийн дугаар:
                </Text>
              </View>
              {registryNumber?.length !== 8 && registryNumber?.length !== 0 && (
                <Text style={{color: '#a51c30', marginVertical: 12}}>
                  Буруу регистерийн дугаар байна!
                </Text>
              )}
              <View style={styles.lineJustRegistration}>
                <View
                  style={[
                    styles.cog,
                    {
                      borderColor:
                        registryNumber.length === 8 ? '#3b5998' : '#eee',
                    },
                  ]}>
                  <RNPickerSelect
                    value={reg1}
                    placeholder={{label: 'Сонгох', value: null}}
                    style={{
                      placeholder: {color: '#000'},
                      inputIOS: {
                        fontSize: 20,
                        textAlign: 'center',
                      },
                      inputAndroid: {
                        fontSize: 20,
                        textAlign: 'center',
                      },
                    }}
                    onValueChange={value => setReg1(value)}
                    items={regs}
                  />
                </View>
                <View
                  style={[
                    styles.cog,
                    {
                      borderColor:
                        registryNumber.length === 8 ? '#3b5998' : '#eee',
                    },
                  ]}>
                  <RNPickerSelect
                    value={reg2}
                    placeholder={{label: 'Сонгох', value: null}}
                    style={{
                      placeholder: {color: '#000'},
                      inputIOS: {
                        fontSize: 20,
                        textAlign: 'center',
                      },
                      inputAndroid: {
                        fontSize: 20,
                        textAlign: 'center',
                      },
                    }}
                    onValueChange={value => setReg2(value)}
                    items={regs}
                  />
                </View>
                <TextInput
                  style={[
                    styles.cogs,
                    {
                      borderColor:
                        registryNumber.length === 8 ? '#3b5998' : '#eee',
                    },
                  ]}
                  value={registryNumber}
                  onChangeText={e => {
                    if (isNumeric(e) === true) {
                      setRegistryNumber(e);
                    }
                  }}
                  keyboardType="numeric"
                  placeholder="exp: 123... etc"
                  maxLength={8}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Хаана ажилладаг:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        organization.length >= 2 ? '#3b5998' : '#eee',
                    },
                  ]}
                  value={organization}
                  onChangeText={e => setOrganization(e)}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Албан тушаал:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {borderColor: jobPosition.length >= 1 ? '#3b5998' : '#eee'},
                  ]}
                  value={jobPosition}
                  onChangeText={e => setJobPosition(e)}
                />
              </View>
              <View style={[styles.line]}>
                <Text style={styles.linetitle}>
                  <Text style={styles.special}>* </Text>Холбоо барих утас:
                </Text>
                <View style={{justifyContent: 'center'}}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor:
                        contactNumber.length === 8 ? '#3b5998' : '#eee',
                      fontSize: 20,
                      color: '#000',
                      padding: 12,
                      backgroundColor: '#f7f7f7',
                    }}
                    value={contactNumber}
                    keyboardType="numeric"
                    placeholder="+976"
                    onChangeText={e => {
                      if (isNumeric(e) === true) {
                        setContactNumber(e);
                      }
                    }}
                    maxLength={8}
                  />
                  {contactNumber?.length === 8 && (
                    <AIcon
                      name="checkbox-outline"
                      style={{
                        position: 'absolute',
                        right: 20,
                        fontSize: 25,
                        paddingTop: 5,
                      }}
                      color={'#3b5998'}
                    />
                  )}
                </View>
                {contactNumber?.length !== 8 && contactNumber?.length !== 0 && (
                  <Text style={{color: '#a51c30', marginVertical: 12}}>
                    Утасны дугаарын орон дутуу байна!
                  </Text>
                )}
              </View>
              <TouchableOpacity style={styles.linkcontainer} onPress={SentData}>
                <Text style={styles.linktitle}>Өөрчлөлтийг хадгалах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditFamily;

const styles = StyleSheet.create({
  addboxjustcontainer: {
    paddingVertical: 20,
    paddingBottom: 5,
  },
  modalbody: {
    flex: 4,
    paddingHorizontal: 20,
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
    padding: 12,
    borderColor: '#eee',
    backgroundColor: '#f7f7f7',
    color: '#000',
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
    marginTop: 12,
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
