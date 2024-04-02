import {TouchableOpacity, Text, View} from 'react-native';
import * as React from 'react';
import styles from './profile.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Aicon from 'react-native-vector-icons/AntDesign';
import MCicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eicon from 'react-native-vector-icons/Entypo';
import Ficon from 'react-native-vector-icons/FontAwesome';
import FAicon5 from 'react-native-vector-icons/FontAwesome5';

const Information = ({user, navigation}) => {
  return (
    <>
      <View style={styles.listItemBigContainer}>
        <Text style={styles.listItemBigTitle}>Үндсэн мэдээлэл</Text>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>Албан тушаал</Text>
            <Text style={styles.listItemTitle}>{user.job}</Text>
          </View>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>Салбар</Text>
            <Text style={styles.listItemTitle}>{user.department}</Text>
          </View>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>Боловсролын зэрэг</Text>
            <Text style={styles.listItemTitle}>Бакалавр</Text>
          </View>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>Имэйл</Text>
            <Text style={styles.listItemTitle}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>
              Байгууллагын утасны дугаар
            </Text>
            <Text style={styles.listItemTitle}>
              {user.phone ? user.phone : 'Холбогдоогүй!'}
            </Text>
          </View>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="shield" style={styles.listitemicon} size={22} />
          </View>
          <View style={styles.listitembody}>
            <Text style={styles.listItemSubtitle}>Ажилтны код</Text>
            <Text style={styles.listItemTitle}>{user.fingercode}</Text>
          </View>
        </View>
      </View>
      <View style={styles.listItemBigContainer}>
        <Text style={styles.listItemBigTitle}>Хувийн мэдээлэл</Text>
        <View style={styles.lictItemContainer}>
          <View>
            <Aicon name="profile" style={styles.listitemicon} size={22} />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() => navigation.navigate('EditInformationStack')}>
            <Text style={styles.listItemTitle}>Хувийн мэдээлэл</Text>
            <Text style={styles.listItemSubtitle}>Хувийн мэдээллийг хянах</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() => navigation.navigate('EditInformationStack')}>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lictItemContainer}>
          <View>
            <MCicon
              name={'cast-education'}
              style={styles.listitemicon}
              size={22}
            />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() => navigation.navigate('EditEducationStack')}>
            <Text style={styles.listItemTitle}>Боловсрол</Text>
            <Text style={styles.listItemSubtitle}>Боловсролын лавлагаа</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() => navigation.navigate('EditEducationStack')}>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="users" style={styles.listitemicon} size={22} />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() => navigation.navigate('FamilyStack')}>
            <Text style={styles.listItemTitle}>Гэр бүлийн мэдээлэл</Text>
            <Text style={styles.listItemSubtitle}>
              Гэр бүлийн мэдээллийг хянах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() => navigation.navigate('FamilyStack')}>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lictItemContainer}>
          <View>
            <Eicon name="add-user" style={styles.listitemicon} size={22} />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() => navigation.navigate('RelationStack')}>
            <Text style={styles.listItemTitle}>
              Хамааралтай гишүүдийн мэдээлэл
            </Text>
            <Text style={styles.listItemSubtitle}>
              Хамааралтай гишүүдийн мэдээллийг хянах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() => navigation.navigate('RelationStack')}>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lictItemContainer}>
          <View>
            <Ficon name="home" style={styles.listitemicon} size={22} />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() =>
              navigation.navigate('AddressStack', {navigation, user})
            }>
            <Text style={styles.listItemTitle}>Хаягийн мэдээлэл</Text>
            <Text style={styles.listItemSubtitle}>
              Хаягийн мэдээллийг хянах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() =>
              navigation.navigate('AddressStack', {navigation, user})
            }>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lictItemContainer}>
          <View>
            <FAicon5 name="signature" style={styles.listitemicon} size={19} />
          </View>
          <TouchableOpacity
            style={styles.listitembody}
            onPress={() => navigation.navigate('SignatureStack')}>
            <Text style={styles.listItemTitle}>Гарын үсэг</Text>
            <Text style={styles.listItemSubtitle}>
              Гарын үсгийн мэдээллийг хянах
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listitemorecontainer}
            onPress={() => navigation.navigate('SignatureStack')}>
            <Icon
              name="keyboard-arrow-right"
              style={styles.listitemmoreicon}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Information;
