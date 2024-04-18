import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../components/Header.js';
import styles from '../rule/style';

const Index = props => {
  const {navigation} = props;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header name={"Дэлгүүрийн өрөлт"} navigation={navigation}/>
      <TouchableOpacity
        onPress={() => navigation.navigate('RestockListStack', {is_food: 1})}
        style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}></Text>
          <Text style={styles.itemInfoText}>Хүнс</Text>
        </View>
        <Image
          resizeMode="stretch"
          style={{width: 40, height: 40}}
          source={require('../../assets/images/rule-arrow.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('RestockListStack', {is_food: 0})}
        style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}></Text>
          <Text style={styles.itemInfoText}>Хүнс бус</Text>
        </View>
        <Image
          resizeMode="stretch"
          style={{width: 40, height: 40}}
          source={require('../../assets/images/rule-arrow.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('RestockListStack', {is_food: 2})}
        style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}></Text>
          <Text style={styles.itemInfoText}>Технологи</Text>
        </View>
        <Image
          resizeMode="stretch"
          style={{width: 40, height: 40}}
          source={require('../../assets/images/rule-arrow.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
