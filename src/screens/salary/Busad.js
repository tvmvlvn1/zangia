/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './style';
import {Colors} from '../../components/global/Colors';

const Busad = props => {
  const {salaryData} = props;
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Илүү цагийн нэмэгдэл:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.IluuTsagiinNemegdel}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          KPI 13р,14р,15р,16р сарын бонус:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.BodogdsonKPI}</Text>
      </View>

      {salaryData.GuitsetgehAjiltanEseh < 0 ? (
          <View style={styles.tsalin}>
            <Text style={styles.tsalinjihRowText}>Сарын бонус тооцох үр дүн:</Text>
            <Text style={styles.tsalinjihRowAmount}>
              {salaryData.SariinBonusTootsoh}
            </Text>
          </View>
      ) : (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>Улирлын бонус KPI үнэлгээний хувь:</Text>
          <Text style={styles.tsalinjihRowAmount}>
            {salaryData.UlirliinKPI}
          </Text>
            </View>
      )}

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Улирлын картанд шилжих бонус:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.UlirliinShiljihBonus}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Улирлын бонус олгох бонус:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.UlirliinOlgohBonus}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Үр дүн % - 100%:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.UrDunHuvi}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Амралтын мөнгө:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.AmraltMungu}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Актны мөнгө:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.AktMungu}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Жирэмсний мөнгө:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.JiremsenMungu}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Амралтын мөнгө:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.AmraltMungu}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Бусад нэмэгдэл:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.BusadNemegdel}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          Тасалсан (3) {salaryData.TasalsanMinut} минут:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.TasalsanMungu}
        </Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Нэмэгдлийн дүн:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.NemegdliinNiitDun}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Busad;
