import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import Icon from 'react-native-vector-icons/EvilIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DatePickerModal} from 'react-native-paper-dates';
import moment from 'moment';
import api from '../../api/localApi.js';
import Lottie from 'lottie-react-native';

const CreateRequest = props => {
  const [showDatePickerStartDate, setShowDatePickerStartDate] = useState(false);
  const [showDatePickerEndDate, setShowDatePickerEndDate] = useState(false);
  const [visibleStartTime, setVisibleStartTime] = useState(false);
  const [visibleEndTime, setVisibleEndTime] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTimeOriginal, setStartTimeOriginal] = useState('');
  const [endTimeOriginal, setEndTimeOriginal] = useState('');
  const [showDropDownPaid, setShowDropDownPaid] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dataQuery, setDataQuery] = useState(
    JSON.stringify({
      type_selection: '',
      type_selection_for_paid_leaves: '',
      date_from: '',
      date_to: '',
      description: '',
    }),
  );
  const [typeSelectionForAbsence, setTypeSelectionForAbsence] = useState(
    dataQuery.type_selection,
  );

  const onConfirmStartTime = (event, time) => {
    if (time && event.type === 'set') {
      const date = new Date(event.nativeEvent.timestamp);
      const timestamphours = date.getHours();
      const timestampminutes = date.getMinutes();
      const formattedTime = `${timestamphours
        .toString()
        .padStart(2, '0')}:${timestampminutes.toString().padStart(2, '0')}`;

      const gmtDate = new Date(startTimeOriginal);
      const year = gmtDate.getFullYear();
      const month = (gmtDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
      const day = gmtDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${formattedTime}`;
      setStartTime(formattedDate);
      handleInput(
        dataQuery.type_selection,
        dataQuery.type_selection_for_paid_leaves,
        formattedDate,
        dataQuery.date_to,
        dataQuery.description,
      );
      setVisibleStartTime(false);
    }
  };

  const onConfirmEndTime = (event, time) => {
    if (time && event.type === 'set') {
      const date = new Date(event.nativeEvent.timestamp);
      const timestamphours = date.getHours();
      const timestampminutes = date.getMinutes();
      const formattedTime = `${timestamphours
        .toString()
        .padStart(2, '0')}:${timestampminutes.toString().padStart(2, '0')}`;

      const gmtDate = new Date(endTimeOriginal);
      const year = gmtDate.getFullYear();
      const month = (gmtDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
      const day = gmtDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${formattedTime}`;
      setEndTime(formattedDate);
      handleInput(
        dataQuery.type_selection,
        dataQuery.type_selection_for_paid_leaves,
        dataQuery.date_from,
        formattedDate,
        dataQuery.description,
      );
      setVisibleEndTime(false);
    }
  };

  const handleConfirmStartDate = output => {
    setStartingDate(moment(output.date).format('LL'));
    setStartTimeOriginal(output.date);
    setShowDatePickerStartDate(false);
  };

  const handleConfirmEndDate = output => {
    setShowDatePickerEndDate(false);
    setEndingDate(moment(output.date).format('LL'));
    setEndTimeOriginal(output.date);
  };

  const handleInput = (
    type_selection,
    type_selection_for_paid_leaves,
    date_from,
    date_to,
    description,
  ) => {
    setDataQuery({
      ...dataQuery,
      type_selection,
      type_selection_for_paid_leaves,
      date_from,
      date_to,
      description,
    });
  };

  useEffect(() => {
    handleInput(
      typeSelectionForAbsence,
      dataQuery.type_selection_for_paid_leaves,
      dataQuery.date_from,
      dataQuery.date_to,
      dataQuery.description,
    );
  }, [typeSelectionForAbsence]);

  const warning = (title, message) => {
    if (title === 'Амжилттай бүртгэгдлээ') {
      Alert.alert(title, message, [
        {
          text: 'Дуусгах',
          onPress: () => props.navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert(title, message, [
        {
          text: 'ОК',
          onPress: () => console.log('ОК Pressed'),
        },
      ]);
    }
  };

  const warningForAbsenceRequest = () => {
    if (
      !dataQuery.type_selection ||
      !dataQuery.description ||
      !dataQuery.date_from ||
      !dataQuery.date_to
    ) {
      warning(
        'Алдаа гарлаа',
        'Хоосон талбар байна. Талбаруудыг бөглөнө үү !!!',
      );
      over();
    } else {
      Alert.alert(
        'Чөлөөний хүсэлт',
        'Чөлөөний хүсэлт илгээхдээ итгэлтэй байна уу?',
        [
          {
            text: 'Цуцлах',
            onPress: () => console.log('Цуцлах Pressed'),
            style: 'cancel',
          },
          {text: 'Илгээх', onPress: () => sendNewAbsenceReq()},
        ],
      );
    }
  };

  const sendNewAbsenceReq = async () => {
    try {
      setApiLoader(true);
      await api
        .post(
          'AbsenceRequestCreate',
          JSON.stringify({
            jwt: props.route.params.user.jwt,
            type_selection: dataQuery.type_selection,
            type_selection_for_paid_leaves:
              dataQuery.type_selection_for_paid_leaves,
            description: dataQuery.description,
            date_from: dataQuery.date_from,
            date_to: dataQuery.date_to,
          }),
        )
        .then(res => {
          if (res.data?.data?.result == 'success') {
            warning(
              'Амжилттай бүртгэгдлээ',
              'Амжилттай чөлөөний хүсэлт үүслээ.',
            );
            setApiLoader(false);
            over();
          } else {
            warning('Алдаа гарлаа', res.data.data.msg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log('ERROR FOR CALLING AbsenceRequestCreate ------>', e);
    }
  };

  const over = () => {
    setDataQuery(
      JSON.stringify({
        type_selection: '',
        type_selection_for_paid_leaves: '',
        date_from: '',
        date_to: '',
        description: '',
      }),
    );
  };

  const category = [
    {label: 'Цалингүй чөлөө', value: 'unpaid_leave'},
    {label: 'Цалинтай чөлөө', value: 'paid_leave'},
    {label: 'Өвчний чөлөө', value: 'sick_leave'},
    {label: 'Ковид 19 өвчний чөлөө', value: 'covid19'},
    {label: 'Ээлжийн амралт', value: 'annualleave_request'},
  ];

  const paidCategory = [
    {label: 'Цалинтай сургалт', value: 'paid_training'},
    {label: 'Хэсэгчлэн', value: 'partially_paid_leave'},
    {label: 'Quarantine', value: 'quarantine'},
    {label: 'Аав болсны 10 хоног', value: 'new_father'},
    {label: 'Шинэхэн гэрлэсний 5 хоног', value: 'honey_moon'},
    {label: 'Ажил явдал', value: 'close_relative'},
    {label: 'Эрүүл мэндийн чөлөөний цаг', value: 'health_care'},
    {label: 'School police', value: 'school_police'},
    {label: 'Өвчтөн асрах 3 хоног', value: 'take_care_for_patient'},
    {label: 'Хичээлийн шинэ жилийн эхний өдөр', value: 'firstday_of_school'},
    {label: 'Бусад', value: 'out_of_rule'},
  ];

  return (
    <>
      {apiLoader ? (
        <Lottie
          autoPlay
          loop
          style={{ flex: 1, justifyContent: 'center' }}
          source={require('../../assets/lottie/loading.json')}
        />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView style={{flex: 1, marginBottom: '20%'}}>
            <View style={{padding: 20}}>
              <View style={{marginBottom: 10}}>
                <DropDown
                  label={'Чөлөөний төрөл'}
                  mode="outlined"
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={typeSelectionForAbsence}
                  setValue={value => {
                    setTypeSelectionForAbsence(value);
                  }}
                  list={category.map(item => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
              </View>
              {dataQuery.type_selection == 'paid_leave' && (
                <View style={{marginBottom: 10}}>
                  <DropDown
                    label={'Цалинтай чөлөөний төрөл'}
                    mode="outlined"
                    visible={showDropDownPaid}
                    showDropDown={() => setShowDropDownPaid(true)}
                    onDismiss={() => setShowDropDownPaid(false)}
                    value={dataQuery.type_selection_for_paid_leaves}
                    setValue={value => {
                      handleInput(
                        dataQuery.type_selection,
                        value,
                        dataQuery.date_from,
                        dataQuery.date_to,
                        dataQuery.description,
                      );
                    }}
                    list={paidCategory.map(item => ({
                      label: item.label,
                      value: item.value,
                    }))}
                  />
                </View>
              )}
              <Text style={{fontSize: 14, fontWeight: '700'}}>
                Үргэлжлэх хугацаа
              </Text>
              {startTime == '' && (
                <TouchableOpacity
                  onPress={() => setShowDatePickerStartDate(true)}
                  style={{zIndex: 1}}>
                  <View style={{paddingTop: 10}}>
                    <Text style={styles.inputText}>Эхлэх өдөр</Text>
                    <View style={[styles.input, {paddingVertical: 10}]}>
                      <Icon
                        name="calendar"
                        size={28}
                        color="black"
                        style={{marginRight: 5, marginTop: 10, marginBottom: 4}}
                      />
                      <Text style={styles.text}>{startingDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {startingDate && (
                <TouchableOpacity
                  onPress={() => setVisibleStartTime(true)}
                  style={{zIndex: 1}}>
                  <View style={{paddingTop: 10}}>
                    <Text style={styles.inputText}>
                      Эхлэх өдөр /Цаг, минут/
                    </Text>
                    <View style={[styles.input, {paddingVertical: 10}]}>
                      <Icon
                        name="calendar"
                        size={28}
                        color="black"
                        style={{marginRight: 5, marginTop: 10, marginBottom: 4}}
                      />
                      <Text style={styles.text}>{startTime}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {endTime == '' && (
                <TouchableOpacity
                  onPress={() => setShowDatePickerEndDate(true)}
                  style={{zIndex: 1}}>
                  <View style={{paddingTop: 10}}>
                    <Text style={styles.inputText}>Дуусах өдөр</Text>
                    <View style={[styles.input, {paddingVertical: 10}]}>
                      <Icon
                        name="calendar"
                        size={28}
                        color="black"
                        style={{marginRight: 5, marginTop: 10, marginBottom: 4}}
                      />
                      <Text style={styles.text}>{endingDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {endingDate && (
                <TouchableOpacity
                  onPress={() => setVisibleEndTime(true)}
                  style={{zIndex: 1}}>
                  <View style={{paddingTop: 10}}>
                    <Text style={styles.inputText}>
                      Дуусах өдөр /Цаг, минут/
                    </Text>
                    <View style={[styles.input, {paddingVertical: 10}]}>
                      <Icon
                        name="calendar"
                        size={28}
                        color="black"
                        style={{marginRight: 5, marginTop: 10, marginBottom: 4}}
                      />
                      <Text style={styles.text}>{endTime}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              <View
                style={{
                  width: '100%',
                  height: 1.5,
                  backgroundColor: '#ececec',
                  marginTop: 5,
                }}
              />
              <View style={{paddingTop: 10, marginBottom: 10}}>
                <Text style={styles.inputText}>Шалтгаан</Text>
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
                    value={dataQuery.description}
                    onChangeText={makerFirstName =>
                      handleInput(
                        dataQuery.type_selection,
                        dataQuery.type_selection_for_paid_leaves,
                        dataQuery.date_from,
                        dataQuery.date_to,
                        makerFirstName,
                      )
                    }
                  />
                </View>
              </View>
              <TouchableOpacity style={{zIndex: 1}}>
                <View style={{paddingTop: 10}}>
                  <Text style={styles.inputText}>Ажилтан</Text>
                  <View style={[styles.input, {paddingVertical: 10}]}>
                    <Image
                      source={require('../../assets/images/employee.png')}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: 'center',
                      }}
                    />
                    <Text style={styles.text}>
                      {`${props.route.params.user.name}` +
                        ' ' +
                        '.' +
                        `${props.route.params.user.lname}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{zIndex: 1}}>
                <View style={{paddingTop: 10}}>
                  <Text style={styles.inputText}>Албан тушаал</Text>
                  <View style={[styles.input, {paddingVertical: 10}]}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/89/89902.png',
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: 'center',
                        marginLeft: 3,
                      }}
                    />
                    <Text style={styles.text}>
                      {props.route.params.user.job}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{zIndex: 1}}>
                <View style={{paddingTop: 10}}>
                  <Text style={styles.inputText}>Хэлтэс</Text>
                  <View style={[styles.input, {paddingVertical: 10}]}>
                    <Image
                      source={require('../../assets/images/visitor.png')}
                      style={{
                        height: 31,
                        width: 31,
                        marginLeft: 5,
                        alignSelf: 'center',
                      }}
                    />
                    <Text style={styles.text}>
                      {props.route.params.user.department}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ zIndex: 1 }} >
                                <View style={{ paddingTop: 10 }}>
                                    <Text style={styles.inputText}>
                                    Ажилд орсон огноо 
                                    </Text>
                                    <View style={[styles.input, {paddingVertical: 10}]}>
                                        <Icon
                                            name="calendar"
                                            size={28}
                                            color="black"
                                            style={{ marginRight: 5, marginTop: 10, marginBottom: 4 }}
                                        />
                                        <Text style={styles.text}>2022-05-04</Text> 
                                    </View>
                                </View>
                            </TouchableOpacity> */}
              {/* <View style={{ marginTop: 8 }}>
                                <DropDown
                                    label={'Орлох ажилтан'}
                                    mode='outlined'
                                    visible={showDropDownSubstituteEmployee}
                                    showDropDown={() => setShowDropDownSubtituteEmployee(true)}
                                    onDismiss={() => setShowDropDownSubtituteEmployee(false)}
                                    value={dataQuery.subtituteEmployee}
                                    setValue={value => {
                                        handleInput(dataQuery.type_selection, dataQuery.type_selection_for_paid_leaves, dataQuery.date_from, dataQuery.date_to, dataQuery.description, dataQuery.worker, dataQuery.position, dataQuery.department, dataQuery.firstDate, value)
                                    }}
                                    list={category.map(item=> ({label: item.value, value: item.value}))}
                                />
                            </View> */}
            </View>
          </ScrollView>
          {showDatePickerStartDate && (
            <DatePickerModal
              visible={showDatePickerStartDate}
              mode="single"
              onDismiss={() => setShowDatePickerStartDate(false)}
              date={date}
              onConfirm={handleConfirmStartDate}
            />
          )}
          {visibleStartTime && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onConfirmStartTime}
            />
          )}
          {showDatePickerEndDate && (
            <DatePickerModal
              visible={showDatePickerEndDate}
              mode="single"
              onDismiss={() => setShowDatePickerEndDate(false)}
              date={date}
              onConfirm={handleConfirmEndDate}
            />
          )}
          {visibleEndTime && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onConfirmEndTime}
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => warningForAbsenceRequest()}>
            <View>
              <Text style={{color: '#fff', fontSize: 17}}>Илгээх</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({
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
  },
  button: {
    bottom: 15,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#0858A3',
    height: 43,
    borderRadius: 15,
  },
  text: {
    color: '#000',
    marginTop: 5,
    fontSize: 16,
    marginRight: 5,
    textAlign: 'right',
    width: '80%',
  },
});
