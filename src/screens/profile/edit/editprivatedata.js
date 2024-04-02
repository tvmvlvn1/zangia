import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './../profile.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChangeEmmergency} from '../restService/self';
import Alert from './../props/Alert';
import Improve from './../props/improve';
import Success from './../props/success';
import AIcon from 'react-native-vector-icons/Ionicons';

const Editprivatedata = props => {
  const {setPage, data, setIsloading, isLoading, setLoading} = props;

  const [alert, setAlert] = useState(false);
  const [getButton, setGetButton] = useState(false);
  const [getSuccess, setGetSuccess] = useState(false);
  const [warningTxt, setWarningTxt] = useState(
    '* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?',
  );

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    start();
  }, []);

  const start = () => {
    setPhone(data.rel_person_phone);
    setName(data.rel_person_name);
  };

  const SentData = async () => {
    if (!name || !phone) {
      setWarningTxt('* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?');
      return setAlert(true);
    }

    if (phone.length !== 8) {
      setWarningTxt('Буруу дугаар байна!');
      return setAlert(true);
    }

    setGetButton(true);

    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        ChangeEmmergency(user.jwt, name, phone)
          .then(() => {
            setGetButton(false);
            setGetSuccess(true);
          })
          .catch(err => {
            console.log(err, 'Error!');
            setGetButton(false);
          });
      })
      .catch(err => {
        console.log(err, 'Error!');
        setGetButton(false);
      });
  };

  function isNumeric(num) {
    return !isNaN(num);
  }

  return (
    <View>
      {alert && (
        <Alert setAlert={setAlert} title="Анхаар" warningTxt={warningTxt} />
      )}

      {getSuccess && (
        <View style={{height: '100%'}}>
          <Success
            setGetSuccess={setGetSuccess}
            onPress={() => {
              setPage('ListPage');
              setLoading(true);
              isLoading === 0 ? setIsloading(1) : setIsloading(0);
            }}
          />
        </View>
      )}
      <View style={{zIndex: -1}}>
        {getButton && <Improve />}
        <View style={{padding: 20, marginTop: 20}}>
          <View>
            <Text style={styles2.label}>* Таны хэн болох:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: name.length >= 2 ? '#3b5998' : '#eee',
                fontSize: 20,
                color: '#3d3d3d',
                padding: 12,
              }}
              value={name}
              placeholder="Таны хэн болох"
              onChangeText={e => setName(e)}
            />
          </View>
          <View>
            <Text style={styles2.label}>* Утасны дугаар:</Text>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: phone.length === 8 ? '#3b5998' : '#eee',
                  fontSize: 20,
                  color: '#3d3d3d',
                  padding: 12,
                  marginTop: 20,
                }}
                value={phone}
                keyboardType="numeric"
                placeholder="+976"
                onChangeText={e => {
                  if (isNumeric(e) === true) {
                    setPhone(e);
                  }
                }}
                maxLength={8}
              />
              {phone?.length === 8 && (
                <AIcon
                  name="checkbox-outline"
                  style={{
                    position: 'absolute',
                    right: 20,
                    fontSize: 25,
                    paddingTop: 15,
                  }}
                  color={'#3b5998'}
                />
              )}
            </View>
            {phone?.length !== 8 && phone?.length !== 0 && (
              <Text style={{color: '#a51c30', marginVertical: 12}}>
                Утасны дугаарын орон дутуу байна!
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.addressShowContainer, styles.mt20]}>
          <TouchableOpacity style={styles.addressEditButton} onPress={SentData}>
            <Text style={styles.addressEditButtonTitle}>
              Өөрчлөлтийг хадгалах
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  label: {
    color: '#3d3d3d',
    marginBottom: 12,
    marginTop: 20,
  },
});

export default Editprivatedata;
