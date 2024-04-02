import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './style';
import {Colors} from '../../components/global/Colors';

const Suutgal = props => {
  const {salaryData} = props;
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>НДШимтгэл:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.NDShimtgel}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>ХАОАТатвар:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.HAOATatvar}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Авлага:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Avlaga}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Бусад суутгал:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.BusadSuutgal}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Тушаалаар суутгал:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.TushaalaarSuutgal}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Бонусаас суутгал:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.BonusaasSuutgal}
        </Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Суутгалын дүн:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.SuutgaliinNiitDun}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Suutgal;
