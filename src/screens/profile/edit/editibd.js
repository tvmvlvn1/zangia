import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../profile.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChangeIbdNumber} from '../restService/self.js';
import Alert from '../props/Alert.js';
import Improve from '../props/improve.js';
import Success from '../props/success.js';
import AIcon from 'react-native-vector-icons/Ionicons';

const EditIBD = props => {
  const {setPage, data, setIsloading, isLoading, setLoading} = props;

  const [alert, setAlert] = useState(false);
  const [getButton, setGetButton] = useState(false);
  const [getSuccess, setGetSuccess] = useState(false);
  const [warningTxt, setWarningTxt] = useState(
    '* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?',
  );

  const [ibdNumber, setIbdNumber] = useState('');

  useEffect(() => {
    start();
  }, []);

  const start = () => {
    setIbdNumber(data.ibd_number);
  };

  const SentData = async () => {
    if (!ibdNumber) {
      setWarningTxt('* тэмдгээр тэмдэглэгдсэн хэсгүүдийн заавал бөглөнө үү?');
      return setAlert(true);
    }

    setGetButton(true);

    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        ChangeIbdNumber(user.jwt, ibdNumber)
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
            <Text style={styles2.label}>* ТИН дугаар:</Text>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#3b5998',
                  fontSize: 20,
                  color: '#3d3d3d',
                  padding: 12,
                  marginTop: 20,
                }}
                value={ibdNumber}
                keyboardType="numeric"
                placeholder=""
                onChangeText={e => {
                  if (isNumeric(e) === true) {
                    setIbdNumber(e);
                  }
                }}
                maxLength={15}
              />
            </View>
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
  success: {
    borderWidth: 3,
    borderColor: 'green',
  },
});

export default EditIBD;
