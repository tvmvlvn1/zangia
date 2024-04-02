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
import Validate from '../../components/global/validatePass';

const NewPass = props => {
  const {selectedItem} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  // Нууц үгийн шалгуур
  const regex = new RegExp(
    '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,25}',
  );
  const regexNumber = new RegExp('(?=.*[0-9])');
  const regexUpper = new RegExp('(?=.*[A-Z])');
  const regexSmall = new RegExp('(?=.*[a-z])');
  const regexSpecialCharacter = new RegExp('(?=.*[!@#$%^&*])');

  const updatePassword = () => {
    if (!regex.test(password))
      return Alert.alert(
        '',
        'Нууц үгээ санамжийн дагуу оруулна уу? Таны нууц үг хамгаалалт муу байж болзошгүй.',
      );
    setIsLoading(true);
    localApi
      .post('changePassword', {
        password: password,
        empid: selectedItem.eid,
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
      })
      .then(res => {
        setIsLoading(true);
        if (res.data.code == 200) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Алдаа.', res.data.message);
        }
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode={'on-drag'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Шинэ нууц үг үүсгэх</Text>
          <Text style={styles.infoText}>
            {selectedItem?.name.substring(0, 3)}**** гэсэн{' '}
            {selectedItem?.type == 0 ? 'хаяг' : 'утас'} руу илгээсэн нууц үг
            шинэчлэх кодыг оруулна уу.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Шинэ нууц үг"
              value={password}
              onChangeText={text => setPassword(text)}
              mode="outlined"
              style={styles.input}
              outlineStyle={{borderColor: Colors.primary}}
              secureTextEntry={true}
              theme={{
                colors: {
                  primary: Colors.primary,
                },
              }}
              left={<TextInput.Icon icon="lock-outline" />}
            />
          </View>
          <View style={styles.optionsContainer}>
            <Validate
              validated={regexUpper.test(password)}
              label="Том үсэг агуулсан байх."
            />
            <Validate
              validated={regexNumber.test(password)}
              label="Тоо агуулсан байх."
            />
            <Validate
              validated={regexSmall.test(password)}
              label="Жижиг үсэг агуулсан байх."
            />
            <Validate
              validated={regexSpecialCharacter.test(password)}
              label="Тусгай тэмдэгт агуулсан байх."
            />
            <Validate
              validated={password.length >= 8 ? true : false}
              label="8 ба түүнээс дээш оронтой байх."
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Буцах</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {flexDirection: 'row'}]}
              disabled={isLoading ? true : false}
              onPress={() => updatePassword()}>
              {isLoading && (
                <ActivityIndicator
                  color="white"
                  size="small"
                  style={{marginRight: 5}}
                />
              )}
              <Text style={styles.buttonText}>Шинэчлэх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NewPass;
