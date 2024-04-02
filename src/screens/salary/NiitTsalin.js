import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './style';
import {Colors} from '../../components/global/Colors';

const NiitTsalin = props => {
  const {salaryData} = props;
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          Олговол зохих цалин [1]+[2]:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.OlgovolZohihTsalin}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          Таны саятан санд нэмэгдсэн 10%:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.SaytanSand}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Авлага:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Avlaga}</Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>
          Таны саятан сангийн үлдэгдэл:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.saytan_san_bal}
        </Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Хамгийн сүүлд авсан огноо:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.saytan_san_date}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Хоолны нэмэгдэл:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.HoolniiNemegdel}
        </Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Олгосон урьдчилгаа 18-нд:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.OlgosonUrdchilgaaTsalin}
        </Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>Гарт олгох 3-нд:</Text>
        <Text style={styles.tsalinjihRowAmount}>
          {salaryData.OlgosonGuitsetgelTsalin}
        </Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>Хоолны хөнгөлөлт картанд:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.Coin}</Text>
      </View>

      <View style={styles.tsalin}>
        <Text style={styles.tsalinjihRowText}>
          13-р,14-р,15-р,16-р сарын цалин картанд:
        </Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.OlgosonKPI}</Text>
      </View>

      <View style={[styles.tsalin, styles.grayBg]}>
        <Text style={styles.tsalinjihRowText}>НИЙТ ОЛГОХ:</Text>
        <Text style={styles.tsalinjihRowAmount}>{salaryData.NiitOlgoh}</Text>
      </View>
    </ScrollView>
  );
};

export default NiitTsalin;
