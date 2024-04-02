import React, {Component, useState} from 'react';
import {
  Image,
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import localApi from '../../api/localApi';
import styles from './style';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../components/global/Colors';
import {ScrollView} from 'react-native-gesture-handler';

const CheckCode = props => {
  const {selectedItem} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const resendCode = () => {
    if (!isLoading) {
      setIsLoading(true);
      if (selectedItem) {
        localApi
          .post('sendCode', {
            name: selectedItem.name,
            type: selectedItem.type,
            empid: selectedItem.eid,
            authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
          })
          .then(res => {
            if (res.data.code == 200 && res.data.issent) {
              Alert.alert('Таны хүсэлт дахин илгээгдлээ');
            } else {
              Alert.alert('Алдаа гарлаа.', res.data.message);
            }
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            Alert.alert('Алдаа гарлаа.', err.message);
          });
      } else {
        setIsLoading(false);
        Alert.alert('Алдаа.', 'Та нууц үг хүлээн авах төрлөө сонгоно уу.');
      }
    }
  };

  const checkCode = () => {
    console.log(
      JSON.stringify({
        password_security: code,
        empid: selectedItem.eid,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      }),
    );
    setIsLoading(true);
    localApi
      .post('checkSecurity', {
        password_security: code,
        empid: selectedItem.eid,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      })
      .then(res => {
        setIsLoading(true);
        if (res.data.code == 200) {
          navigation.navigate('NewPass', {selectedItem: selectedItem});
        } else {
          Alert.alert('Алдаа.', 'Таны нууц үг шинэчлэх код буруу байна.');
        }
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert('Алдаа.', 'Таны нууц үг шинэчлэх код буруу байна.');
        // Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode={'on-drag'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Шинэчлэх код оруулах</Text>
          <Text style={styles.infoText}>
            {selectedItem?.name.substring(0, 3)}**** гэсэн{' '}
            {selectedItem?.type == 0 ? 'хаяг' : 'утас'} руу илгээсэн нууц үг
            шинэчлэх кодыг оруулна уу.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Шинэчлэх код"
              value={code}
              keyboardType="numeric"
              onChangeText={text => setCode(text)}
              mode="outlined"
              style={styles.input}
              outlineStyle={{borderColor: Colors.primary}}
              theme={{
                colors: {
                  primary: Colors.primary,
                },
              }}
              left={<TextInput.Icon icon="lock-outline" />}
            />
          </View>
          <TouchableOpacity
            style={styles.resendContainer}
            onPress={() => resendCode()}>
            <Text style={{color: Colors.primary}}>Дахин илгээх</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Буцах</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {flexDirection: 'row'}]}
              disabled={isLoading ? true : false}
              onPress={() => checkCode()}>
              {isLoading && (
                <ActivityIndicator
                  color="white"
                  size="small"
                  style={{marginRight: 5}}
                />
              )}
              <Text style={styles.buttonText}>Шалгах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CheckCode;
