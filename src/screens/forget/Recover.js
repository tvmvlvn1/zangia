import React, {Component, useState} from 'react';
import {
  Image,
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import localApi from '../../api/localApi';
import styles from './style';

const RecoverPass = props => {
  const {items} = props.route.params;
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItems = () => {
    const viewItems = items.map((item, i) =>
      item.type == 0 ? (
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedItem(item)}
          style={styles.checkboxContainer}>
          {selectedItem != item ? (
            <View style={styles.checkbox}></View>
          ) : (
            <View style={styles.checkboxCheckedContainer}>
              <View style={styles.checkboxChecked} />
            </View>
          )}
          <Text style={{marginLeft: 5, color: '#000'}}>
            {item.name.substring(0, 3) +
              '*****' +
              item.name.substring(
                item.name.indexOf('@') - 1,
                item.name.indexOf('@'),
              ) +
              '@***'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedItem(item)}
          style={styles.checkboxContainer}>
          {selectedItem != item ? (
            <View style={styles.checkbox}></View>
          ) : (
            <View style={styles.checkboxCheckedContainer}>
              <View style={styles.checkboxChecked} />
            </View>
          )}
          <Text style={{marginLeft: 5, color: '#000'}}>
            +976 {item.name.substring(0, 3)}***
            {item.name.slice(-2)}
          </Text>
        </TouchableOpacity>
      ),
    );
    return viewItems;
  };

  const sendCode = () => {
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
            setIsLoading(false);
            navigation.navigate('CheckCode', {selectedItem: selectedItem});
          } else {
            Alert.alert('Алдаа гарлаа.', res.data.message);
          }
        })
        .catch(err => {
          setIsLoading(false);
          Alert.alert('Алдаа гарлаа.', err.message);
        });
    } else {
      setIsLoading(false);
      Alert.alert('Алдаа.', 'Та нууц үг хүлээн авах төрлөө сонгоно уу.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode={'on-drag'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Нууц үг сэргээх</Text>
          <Text style={styles.infoText}>
            Нууц үгээ шинэчлэх кодыг хэрхэн авах вэ?
          </Text>
          <View style={styles.optionsContainer}>{renderItems()}</View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Буцах</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {flexDirection: 'row'}]}
              disabled={isLoading ? true : false}
              onPress={() => sendCode()}>
              {isLoading && (
                <ActivityIndicator
                  color="white"
                  size="small"
                  style={{marginRight: 5}}
                />
              )}
              <Text style={styles.buttonText}>Илгээх</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RecoverPass;
