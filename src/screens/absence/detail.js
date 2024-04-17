import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../../api/localApi.js';
import Lottie from 'lottie-react-native';

const AbsenceRequestDetail = props => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [reverseReason, setReverseReason] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reverseModalVisible, setReverseModalVisible] = useState(false);

  const sendRequest = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        'AbsenceRequestDraftSend',
        JSON.stringify({
          jwt: props.route.params.user.jwt,
          leave_id: props.route.params.data.id,
        }),
      );

      if (response.data?.data?.result == 'success') {
        setLoading(false);
        Alert.alert(
          'Амжилттай',
          `Таны ${props.route.params.data.date_from}-ээс ${props.route.params.data.date_to} хооронд үүсгэсэн чөлөөний хүсэлт илгээгдлээ`,
          [
            {
              text: 'Дуусгах',
              onPress: () => props.navigation.goBack(),
            },
          ],
        );
      } else if (
        response.data?.message == 'succcesfully sent' &&
        response.data?.data == null
      ) {
        setLoading(false);
        Alert.alert('Амжилтгүй хүсэлт', `ERP систем дээр алдаа гарлаа`, [
          {
            text: 'Дуусгах',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      } else {
        setLoading(false);
        Alert.alert('Амжилтгүй', `Таны хүсэлт илгээгдэх боломжгүй`, [
          {
            text: 'Дуусгах',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const reverseAbsenceReq = async () => {
    try {
      setLoading(true);
      const response = await api.post('AbsenceRequestReverse', {
        jwt: props.route.params.user.jwt,
        leave_id: props.route.params.data.id,
        reverse_reason: reverseReason,
      });

      if (response.data.data.result == 'success') {
        setLoading(false);
        setReverseModalVisible(false);
        Alert.alert('Амжилттай буцаагдлаа', [
          {
            text: 'Дуусгах',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      } else {
        setLoading(false);
        setReverseModalVisible(false);
        Alert.alert('Алдаа гарлаа !!!', `${response.data.data.msg}`, [
          {
            text: 'Дуусгах',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      }
    } catch (e) {
      console.log('ERROR FOR REVERSE FUNCTION', e);
    }
  };

  const deleteAbsenceReq = async () => {
    setModalVisible(!modalVisible);
    if (props.route.params.data.state == 'draft') {
      try {
        setLoading(true);
        const response = await api.post(
          'AbsenceRequestDelete',
          JSON.stringify({
            jwt: props.route.params.user.jwt,
            leave_id: props.route.params.data.id,
          }),
        );

        if (response.data) {
          setReason('');
          setLoading(false);
          Alert.alert(
            'Амжилттай',
            `Таны ${props.route.params.data.date_from}-ээс ${props.route.params.data.date_to} хооронд үүсгэсэн чөлөөний хүсэлт устгагдлаа`,
            [
              {
                text: 'Дуусгах',
                onPress: () => props.navigation.goBack(),
              },
            ],
          );
        } else {
          setReason('');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert(
        'Анхааруулах мессэж',
        'Зөвхөн ноорог төлөвтэй үед устгагдаж болно',
        [
          {
            text: 'Дуусгах',
            onPress: () => props.navigation.goBack(),
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
      ) : (
        <View style={styles.container}>
          {modalVisible && (
            <Modal
              animationType="fade"
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    source={require('../../assets/images/asking.png')}
                    resizeMode="contain"
                    style={{height: '50%', marginTop: 5}}
                  />
                  <Text style={styles.modalText}>
                    Ямар шалтааны улмаас устгах гэж байгаа вэ ?
                  </Text>
                  <View style={{paddingTop: 10, marginBottom: 10}}>
                    <Text style={styles.inputText}>Устгах шалтгаан</Text>
                    <View style={styles.input}>
                      <Image
                        source={require('../../assets/images/reasonable.png')}
                        style={{
                          marginBottom: 5,
                          marginTop: 5,
                          height: 41,
                          width: 41,
                        }}
                      />
                      <TextInput
                        placeholderTextColor="#000"
                        style={{
                          flex: 1,
                          height: 50,
                          textAlign: 'right',
                          backgroundColor: '#fff',
                          fontSize: 16,
                        }}
                        value={reason}
                        onChangeText={makerFirstName =>
                          setReason(makerFirstName)
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      marginBottom: 8,
                    }}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          setReason('');
                        }}>
                        <Text style={styles.buttonText}>Буцах</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.secondButton}
                        onPress={() => deleteAbsenceReq()}>
                        <Text style={[styles.buttonText, {color: '#0858A3'}]}>
                          Дараах
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {reverseModalVisible && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={reverseModalVisible}
              onRequestClose={() => {
                setReverseModalVisible(!reverseModalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image
                    source={require('../../assets/images/asking.png')}
                    resizeMode="contain"
                    style={{height: '50%', marginTop: 5}}
                  />
                  <Text style={styles.modalText}>
                    Ямар шалтааны улмаас буцаах гэж байгаа вэ ?
                  </Text>
                  <View style={{paddingTop: 10, marginBottom: 10}}>
                    <Text style={styles.inputText}>Буцаах шалтгаан</Text>
                    <View style={styles.input}>
                      <Image
                        source={require('../../assets/images/reasonable.png')}
                        style={{
                          marginBottom: 5,
                          marginTop: 5,
                          height: 41,
                          width: 41,
                        }}
                      />
                      <TextInput
                        placeholderTextColor="#000"
                        style={{
                          flex: 1,
                          height: 50,
                          textAlign: 'right',
                          backgroundColor: '#fff',
                          fontSize: 16,
                        }}
                        value={reverseReason}
                        onChangeText={reverseRea =>
                          setReverseReason(reverseRea)
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      marginBottom: 8,
                    }}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setReverseModalVisible(!reverseModalVisible);
                          setReverseReason('');
                        }}>
                        <Text style={styles.buttonText}>Буцах</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.secondButton}
                        onPress={() => reverseAbsenceReq()}>
                        <Text style={[styles.buttonText, {color: '#0858A3'}]}>
                          Дараах
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          <ScrollView
            style={{opacity: modalVisible || reverseModalVisible ? 0.4 : 1}}>
            <View style={styles.innercontainer}>
              <Text style={styles.text}>Чөлөөний төрөл</Text>
              <Text style={styles.secondText}>
                {props.route.params.data.type_selection == 'unpaid_leave'
                  ? 'Цалингүй чөлөө'
                  : props.route.params.data.type_selection == 'sick_leave'
                  ? 'Өвчний чөлөө'
                  : props.route.params.data.type_selection == 'paid_leave'
                  ? 'Цалинтай чөлөө'
                  : props.route.params.data.type_selection == 'covid19'
                  ? 'Ковид 19 өвчний чөлөө'
                  : props.route.params.data.type_selection ==
                      'annualleave_request' && 'Ээлжийн амралт'}
              </Text>
            </View>
            <View style={styles.line} />
            <Text style={[styles.text, {paddingLeft: 14, paddingTop: '5%'}]}>
              Үргэлжлэх хугацаа
            </Text>
            <View
              style={[
                styles.innercontainer,
                {paddingTop: '5%', paddingLeft: '8%'},
              ]}>
              <Text style={[styles.text, {fontSize: 15}]}>Эхлэх өдөр</Text>
              <Text style={styles.secondText}>
                {moment(props.route.params.data.date_from).format('LLLL')}
              </Text>
            </View>
            <View
              style={[
                styles.innercontainer,
                {paddingTop: '5%', paddingLeft: '8%'},
              ]}>
              <Text style={[styles.text, {fontSize: 15}]}>Дуусах өдөр</Text>
              <Text style={styles.secondText}>
                {moment(props.route.params.data.date_to).format('LLLL')}
              </Text>
            </View>
            <View style={styles.line} />
            <View style={[styles.innercontainer, {paddingTop: 18}]}>
              <Text style={styles.text}>Шалтгаан</Text>
              <Text style={styles.secondText}>
                {props.route.params?.data?.description}
              </Text>
            </View>
            <View style={styles.line} />
            <View style={[styles.innercontainer, {paddingTop: 18}]}>
              <Text style={styles.text}>Төлөв</Text>
              <Text style={styles.secondText}>
                {props.route.params?.data?.state == 'draft'
                  ? 'Ноорог'
                  : props.route.params?.data?.state == 'approve'
                  ? 'Батлах'
                  : props.route.params?.data?.state == 'approved'
                  ? 'Батлагдсан'
                  : props.route.params?.data?.state == 'reversed'
                  ? 'Буцаагдсан'
                  : props.route.params?.data?.state}
              </Text>
            </View>
          </ScrollView>
          <View
            style={[
              styles.buttonMainContainer,
              {opacity: modalVisible || reverseModalVisible ? 0.4 : 1},
            ]}>
            <View style={styles.buttonContainer}>
              {props.route.params.data.state == 'draft' ||
              props.route.params.data.state == 'reversed' ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => sendRequest()}>
                  <Text style={styles.buttonText}>Илгээх</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => props.navigation.goBack()}>
                  <Text style={styles.buttonText}>Буцах</Text>
                </TouchableOpacity>
              )}
              {props.route.params.data.state == 'draft' ||
              props.route.params.data.state == 'reversed' ? (
                <TouchableOpacity
                  style={styles.secondButton}
                  onPress={() => setModalVisible(true)}>
                  <Text style={[styles.buttonText, {color: '#0858A3'}]}>
                    Устгах
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.secondButton}
                  onPress={() => setReverseModalVisible(true)}>
                  <Text style={[styles.buttonText, {color: '#0858A3'}]}>
                    Буцаах
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AbsenceRequestDetail;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  inputText: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 100,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5A5A5A',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: '60%',
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    width: '87%',
  },
  buttonMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 15,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#0858A3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '43%',
  },
  secondButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '43%',
    borderWidth: 1,
    borderColor: '#0858A3',
  },
  line: {
    marginTop: '5%',
    alignSelf: 'center',
    width: '95%',
    color: 'red',
    borderWidth: 0.2,
    borderColor: 'black',
  },
  innercontainer: {
    paddingTop: '13%',
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343434',
    textAlign: 'left',
    width: '45%',
  },
  secondText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5A5A5A',
    textAlign: 'right',
    width: '45%',
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});
