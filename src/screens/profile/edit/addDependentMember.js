import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {InsertRelation} from '../restService/relation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert1 from './../props/Alert';
import Improve from '../props/improve';
import Success from '../props/success';
import AIcon from 'react-native-vector-icons/Ionicons';
import {familyOptions} from '../../../Global';
import RNPickerSelect from 'react-native-picker-select';

const AddDependentMember = ({setPage, isLoading, setIsloading, setLoading}) => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [contact_number, setcontact_number] = useState('');
  const [department, setdepartment] = useState('');
  const [job_position, setjob_position] = useState('');
  const [dropdown_list_id, setdropdown_list_id] = useState(1);
  const [relationName, setRelationName] = useState('Хоосон!');
  const [warningTxt, setWarningTxt] = useState(
    '* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?',
  );

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const SentData = async () => {
    setGetButton(true);

    if (
      !first_name ||
      !last_name ||
      !contact_number ||
      !department ||
      !job_position ||
      !dropdown_list_id
    ) {
      setWarningTxt('* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?');
      setGetButton(false);
      return setAlert(true);
    }

    if (contact_number.length !== 8) {
      setWarningTxt('Буруу дугаар байна!');
      setGetButton(false);
      return setAlert(true);
    }

    setGetButton(true);

    const data = {
      first_name,
      last_name,
      contact_number,
      department,
      job_position,
      dropdown_list_id,
      relationName:
        dropdown_list_id &&
        familyOptions
          .filter(function (item) {
            return item.value == dropdown_list_id;
          })
          .map(function ({label}) {
            return {label};
          })[0].label,
    };

    await AsyncStorage.getItem('userInfo')
      .then(async userInfo => {
        let user = JSON.parse(userInfo);
        InsertRelation(user.jwt, data)
          .then(res => {
            if (res.data.code == 200) {
              setSuccess(true);
              setGetButton(false);
              setfirst_name('');
              setlast_name('');
              setcontact_number('');
              setdepartment('');
              setjob_position('');
            } else {
              setGetButton(false);
              Alert.alert('Алдаа гарлаа.', res.data.message);
            }
          })
          .catch(err => {
            setGetButton(false);

            Alert.alert('Алдаа гарлаа.', err.message);
          });
      })
      .catch(err => {
        setGetButton(false);
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  const [getButton, setGetButton] = useState(false);

  function isNumeric(num) {
    return !isNaN(num);
  }

  return (
    <>
      {alert && (
        <Alert1 setAlert={setAlert} title="Анхаар" warningTxt={warningTxt} />
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
        <View
          style={{height: Dimensions.get('window').height - 120, zIndex: -1}}>
          {getButton && <Improve />}
          <ScrollView style={{paddingHorizontal: 20}}>
            <View style={styles.modalbody}>
              <View style={styles.addboxjustcontainer}>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>* Овог:</Text>
                  <TextInput
                    value={last_name}
                    onChangeText={e => setlast_name(e)}
                    style={[
                      styles.input,
                      {borderColor: last_name.length >= 2 ? '#3b5998' : '#eee'},
                    ]}
                  />
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>* Нэр:</Text>
                  <TextInput
                    value={first_name}
                    onChangeText={e => setfirst_name(e)}
                    style={[
                      styles.input,
                      {
                        borderColor:
                          first_name.length >= 2 ? '#3b5998' : '#eee',
                      },
                    ]}
                  />
                </View>
                <View style={[styles.line, {marginBottom: 30}]}>
                  <Text style={styles.linetitle}>* Утас:</Text>
                  <View style={{justifyContent: 'center'}}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor:
                            contact_number.length === 8 ? '#3b5998' : '#eee',
                        },
                      ]}
                      keyboardType="numeric"
                      placeholder="+976"
                      value={contact_number}
                      onChangeText={e => {
                        if (isNumeric(e) === true) {
                          setcontact_number(e);
                        }
                      }}
                      maxLength={8}
                    />
                    {contact_number?.length === 8 && (
                      <AIcon
                        name="checkbox-outline"
                        style={{position: 'absolute', right: 20, fontSize: 25}}
                        color={'#3b5998'}
                      />
                    )}
                  </View>
                  {contact_number?.length !== 8 &&
                    contact_number?.length !== 0 && (
                      <Text style={{color: '#a51c30', marginVertical: 12}}>
                        Утасны дугаарын орон дутуу байна!
                      </Text>
                    )}
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>* Салбар:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          department.length >= 2 ? '#3b5998' : '#eee',
                      },
                    ]}
                    value={department}
                    onChangeText={e => setdepartment(e)}
                  />
                </View>
                <View style={styles.line}>
                  <Text style={styles.linetitle}>* Албан тушаал:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          job_position.length >= 2 ? '#3b5998' : '#eee',
                      },
                    ]}
                    value={job_position}
                    onChangeText={e => setjob_position(e)}
                  />
                </View>
                <View style={[styles.line, {marginBottom: 30}]}>
                  <Text style={styles.linetitle}>* Таны хэн болох:</Text>

                  <View
                    style={[
                      styles.input,
                      {
                        borderColor: dropdown_list_id ? '#3b5998' : '#eee',
                      },
                    ]}>
                    <RNPickerSelect
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
                      onValueChange={value => {
                        setdropdown_list_id(value);
                      }}
                      items={familyOptions}
                    />
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.linkcontainer} onPress={SentData}>
              <Text style={styles.linktitle}>Хадгалах</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AddDependentMember;

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
    padding: 12,
    fontSize: 20,
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
  },
  linetitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  line: {
    marginBottom: 10,
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
});
