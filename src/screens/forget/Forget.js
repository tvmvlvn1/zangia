import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Linking,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../components/global/Colors';
import localApi from '../../api/localApi';
import styles from './style';

const ForgetScreen = props => {
  const [username, setUsername] = useState('');
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);

  const searchFingerCode = () => {
    setIsLoading(true);
    localApi
      .post('searchFingerCode', {
        authentication: '!@#$%^*()Qwerty123456789QAXRTYU',
        fingercode: username,
      })
      .then(res => {
        if (res.data.code == 200 && res.data.is_emp) {
          navigation.navigate('RecoverPass', {items: res.data.items});
        } else {
          Alert.alert('Алдаа', 'Та бүртгэлгүй байна');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err.message);
        Alert.alert('Алдаа гарлаа.', err.message);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode={'on-drag'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Бүртгэл хайх</Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Нэвтрэх нэр"
              value={username}
              keyboardType="numeric"
              onChangeText={text => setUsername(text)}
              mode="outlined"
              style={styles.input}
              outlineStyle={{borderColor: Colors.primary}}
              theme={{
                colors: {
                  primary: Colors.primary,
                },
              }}
              left={<TextInput.Icon icon="account-outline" />}
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
              onPress={() => searchFingerCode()}>
              {isLoading && (
                <ActivityIndicator
                  color="white"
                  size="small"
                  style={{marginRight: 5}}
                />
              )}
              <Text style={styles.buttonText}>Хайх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default ForgetScreen;
