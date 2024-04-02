import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './style';
import {Colors} from '../../components/global/Colors';

const Uuriin = props => {
  const {salaryData} = props;
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Огноо:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.PayrollYear} он {salaryData.PayrollMonth}-р сар
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          Дараа сарын дундаж төлөвлөгөө1:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.DaraaSariinDundajTuluvluguu1}
        </Text>
      </View>

      {salaryData.DaraaSariinDundajTuluvluguu2 != 0 && (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>
            Дараа сарын дундаж төлөвлөгөө2:
          </Text>
          <Text style={styles.tsalinjihRowAmount}>
            {salaryData.DaraaSariinDundajTuluvluguu2}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Uuriin;
