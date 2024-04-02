import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import localApi from '../api/localApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../components/global/Colors';
import {AuthContext} from '../context/AuthContext';

const TimeSheetScreen = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);

  LocaleConfig.locales['mn'] = {
    monthNames: [
      '1 сар',
      '2 сар',
      '3 сар',
      '4 сар',
      '5 сар',
      '6 сар',
      '7 сар',
      '8 сар',
      '9 сар',
      '10 сар',
      '11 сар',
      '12 сар',
    ],

    dayNames: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
    dayNamesShort: ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'],
  };

  const badgeArray = {
    Хоцролт: 'orange',
    Таслалт: 'red',
  };

  LocaleConfig.defaultLocale = 'mn';

  const [markedDatesText, setMarkedDatesText] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [desc, setDesc] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [dateText, setDateText] = useState('black');
  const [monthDetails, setMonthDetails] = useState([]);

  useEffect(() => {
    let date = new Date();
    fetchData(date);
  }, []);

  onRefresh = () => {
    fetchData(new Date(currentDate));
  };

  fetchData = date => {
    showTTime(
      date.toISOString().substring(0, 10),
      date.getFullYear(),
      date.getMonth() + 1,
    );
  };

  showTTime = (dateTime, year, month) => {
    setIsLoading(true);
    setCurrentDate(dateTime);

    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('mobileTime', {jwt: user.jwt, year: year, month: month})
        .then(res => {
          setMonthDetails(null);
          if (res.data.code == 200) {
            if (res.data.data1) {
              data1 = res.data.data1;
              setMonthDetails(data1);
            }
            let colorArray = {
              less: 'orange',
              absent: 'red',
              offsite_work: 'blue',
              covid19: 'blue',
              quarantine: 'blue',
              annual_leave: 'blue',
            };
            let day = '';
            let color = '';
            let detail = '';
            let markedDates = '{';
            if (res.data.data.length > 0) {
              res.data.data.map(o => {
                if (day != o.col2.split('T')[0]) {
                  color = 'green';
                  detail = '"intime":"' + o.col4 + '",';
                  if (colorArray[o.col5] && o.col5 != 'normal') {
                    color = colorArray[o.col5];
                  }
                  markedDates =
                    markedDates +
                    '"' +
                    o.col2.split('T')[0] +
                    '":' +
                    '{"textColor":"white","startingDay": true,"color": "' +
                    'pink' +
                    '","desc": "' +
                    o.col9 +
                    '","endingDay": true,"detailTime": {' +
                    detail.slice(0, -1) +
                    '} },';
                } else {
                  detail =
                    detail +
                    (o.col8 ? '"outtime":"' : '"intime":"') +
                    o.col4 +
                    '",';
                  if (colorArray[o.col5] && o.col5 != 'normal') {
                    color = colorArray[o.col5];
                  }
                  markedDates =
                    markedDates +
                    '"' +
                    o.col2.split('T')[0] +
                    '":' +
                    '{"textColor":"white","startingDay": true,"color": "' +
                    color +
                    '","desc": "' +
                    o.col9 +
                    '","endingDay": true,"detailTime": {' +
                    detail.slice(0, -1) +
                    '} },';
                }
                day = o.col2.split('T')[0];
              });
              markedDates = markedDates.slice(0, -1);
            }
            setMarkedDatesText(JSON.parse(markedDates + '}'));
          } else if (res.data.code == 303) {
            logout();
          }

          setIsLoading(false);
        })
        .catch(err => Alert.alert('Алдаа гарлаа', err.message));
    });
  };

  const showDetail = day => {
    function addZero(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    var obj = markedDatesText;

    if (obj[day] != undefined) {
      var intime = new Date(obj[day]['detailTime']['intime']);
      var outtime = new Date(obj[day]['detailTime']['outtime']);
      var desc = obj[day]['desc'];
      var color = obj[day]['color'];

      setModalVisible(true);
      setInTime(
        addZero(intime.getHours()) + ':' + addZero(intime.getMinutes()),
      );
      if (obj[day]['detailTime']['outtime']) {
        setOutTime(
          obj[day]['detailTime']['intime'] != obj[day]['detailTime']['outtime']
            ? addZero(outtime.getHours()) + ':' + addZero(outtime.getMinutes())
            : '',
        );
      } else {
        setOutTime(null);
      }
      setDesc(desc);
      setCurrentColor(color);
      setDateText(day);
    }
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
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Цагийн дэлгэрэнгүй - {dateText}
            </Text>
            <Text style={[styles.timeText, {color: currentColor}]}>
              Төлөв: {desc}
            </Text>
            <Text style={styles.timeText}>Ирсэн цаг: {inTime}</Text>
            {outTime && (
              <Text style={styles.timeText}>Явсан цаг: {outTime}</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Хаах</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <Calendar
          current={currentDate}
          // disableArrowRight={true}
          enableSwipeMonths={true}
          markedDates={markedDatesText}
          renderArrow={direction =>
            direction == 'right' ? (
              <Text style={{color: '#666', fontSize: 14}}>Дараах сар</Text>
            ) : (
              <Text style={{color: '#666', fontSize: 14}}>Өмнөх сар</Text>
            )
          }
          onDayPress={day => {
            showDetail(day.dateString);
          }}
          markingType={'period'}
          onMonthChange={month => {
            showTTime(month.dateString, month.year, month.month);
          }}
        />
        <View style={{margin: 10}}></View>

        {monthDetails &&
          monthDetails.map((object, i) => {
            let badgeColor = 'blue';
            if (object.col2) {
              if (badgeArray[object.col2]) badgeColor = badgeArray[object.col2];
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: badgeColor,
                      width: 10,
                      height: 10,
                      borderRadius: 50,
                      paddingHorizontal: 5,
                    }}></View>

                  <Text style={{color: Colors.text, marginHorizontal: 5}}>
                    {object.col2}: {Math.floor(object.col3 / 60)} цаг{' '}
                    {object.col3 % 60} мин
                  </Text>
                </View>
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

export default TimeSheetScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  item: {
    paddingVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  itemDetail: {fontSize: 16, justifyContent: 'center'},
  badge: {
    height: 14,
    width: 14,
    borderRadius: 180,
    alignSelf: 'center',
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
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
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#333',
  },
  timeText: {
    color: '#333',
  },
});
