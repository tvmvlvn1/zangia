/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './style';
import {Colors} from '../../components/global/Colors';

const Tsalinjih = props => {
  const {salaryData} = props;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Бодогдсон цалин [1]:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.BodogdsonTsalin}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Регистрийн дугаар:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Register}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Сүлжээ цалин:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.SuljeeTsalin}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Тогтмол цалин:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.TogtmolTsalin}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Гүйцэтгэлээрх цалин:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.GuitsetgelTsalin}
        </Text>
      </View>

      {/* {salaryData.GuitsetgehAjiltanEseh < 0 ? (
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
      </View> */}

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Гүйцэтгэл1</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Guitsetgel1}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Дундаж төлөвлөгөө1</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.DundajTuluvluguu1}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Биелэлт1</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Bielelt1}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Гүйцэтгэл бодогдсон цалин1</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.GuitsetgelBodogdsonTsalin1}
        </Text>
      </View>

      {salaryData.Guitsetgel2 != 0 && (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>Гүйцэтгэл2</Text>
          <Text style={styles.tsalinjihRowAmount}>
            {salaryData.Guitsetgel2}
          </Text>
        </View>
      )}

      {salaryData.Guitsetgel2 != 0 && (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>Дундаж төлөвлөгөө2</Text>
          <Text style={styles.tsalinjihRowAmount}>
            {salaryData.DundajTuluvluguu2}
          </Text>
        </View>
      )}

      {salaryData.Guitsetgel2 != 0 && (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>Биелэлт2</Text>
          <Text style={styles.tsalinjihRowAmount}>{salaryData.Bielelt2}</Text>
        </View>
      )}

      {salaryData.Guitsetgel2 != 0 && (
        <View style={styles.tsalin}>
          <Text style={styles.tsalinjihRowText}>
            Гүйцэтгэл бодогдсон цалин2
          </Text>
          <Text style={styles.tsalinjihRowAmount}>
            {salaryData.GuitsetgelBodogdsonTsalin2}
          </Text>
        </View>
      )}

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Сарын фонд цаг:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.SariinFondTsag}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Ажилласан цаг:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.AjillasanTsag}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Илүү ажилласан цаг:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.IluuAjillasanTsag}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Цалингийн зөрүү:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.TsalingiinZoruu}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Tsalinjih;