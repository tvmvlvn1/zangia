import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import styles from './style.js';
import {Colors} from '../../components/global/Colors.js';
import call from 'react-native-phone-call';
// import Contacts from 'react-native-contacts';
// import {PermissionsAndroid} from 'react-native';

const Detail = props => {
  const {item, phoneContacts} = props.route.params;

  const phoneCall = () => {
    const args = {
      number: item.phone,
      prompt: true,
    };
    call(args).catch(err => {
      Alert.alert('Алдаа гарлаа.', err.message);
    });
  };

  // const isDownload = () => {
  //   Alert.alert(
  //     'Анхааруулга мессеж',
  //     'Дугаар давхардсан үед дарж хуулахыг та зөвшөөрч байна уу ?',
  //     [
  //       {text: 'Тийм', onPress: () => saveContact()},
  //       {
  //         text: 'Үгүй',
  //         style: 'cancel',
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  // const ContactsinArray = (needle, haystack) => {
  //   var length = haystack.length;
  //   let carray = [];
  //   let myarray = [];
  //   for (var i = 0; i < length; i++) {
  //     if (
  //       (haystack[i].phoneNumbers.length > 0 &&
  //         needle.phoneNumbers[0].number !== undefined &&
  //         needle.phoneNumbers[0].number !== '' &&
  //         needle.phoneNumbers[0].number ==
  //           haystack[i].phoneNumbers[0].number
  //             .replace(/\s/g, '')
  //             .replace(/-/gi, '')
  //             .replace('(', '')
  //             .replace(')', '')
  //             .replace('+', '')
  //             .replace('976', '')) ||
  //       (haystack[i].phoneNumbers.length > 0 &&
  //         needle.phoneNumbers[1].number !== undefined &&
  //         needle.phoneNumbers[1].number !== '' &&
  //         needle.phoneNumbers[1].number ==
  //           haystack[i].phoneNumbers[0].number
  //             .replace(/\s/g, '')
  //             .replace(/-/gi, '')
  //             .replace('(', '')
  //             .replace(')', '')
  //             .replace('+', '')
  //             .replace('976', ''))
  //     ) {
  //       myarray.push(haystack[i]);
  //     }
  //   }
  //   if (myarray.length > 0) {
  //     return (carray = {status: true, contact: myarray});
  //   }

  //   return (carray = {status: false});
  // };

  // const saveContact = () => {
  //   var newContact = {
  //     // recordID: item.id,
  //     company: item.job,
  //     note: '',
  //     emailAddresses: [
  //       {
  //         label: 'work',
  //         email: item.email != null ? item.email : '',
  //       },
  //     ],
  //     //suffix: item.phone != null ? item.phone : "",
  //     familyName: '',
  //     middleName: item.department,
  //     givenName: item.username,
  //     phoneNumbers: [
  //       {
  //         label: 'work',
  //         number: item.workPhone != null ? item.workPhone : '',
  //       },
  //       {
  //         label: 'mobile',
  //         number: item.phone != null ? item.phone : '',
  //       },
  //     ],
  //     hasThumbnail: false,
  //   };

  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
  //     title: 'Permission to Write Contacts',
  //     message: 'MyContacts needs permission to write contacts',
  //   }).then(() => {
  //     var checkContact = ContactsinArray(newContact, phoneContacts);
  //     console.log(checkContact.status);
  //     if (checkContact.status) {
  //       let contacts = checkContact.contact;
  //       contacts.map(item => {
  //         deleteMyContact(item.recordID);
  //       });
  //     }
  //     newMyContact(newContact);

  //     // if (all == k + 1) {
  //     //   Alert.alert(
  //     //     'Нийт ' +
  //     //       this.state.download_allcounter +
  //     //       ' contact татагдаж дууслаа',
  //     //   );
  //     // }
  //   });
  // };
  // const deleteMyContact = deleteRecordId => {
  //   Contacts.deleteContact({recordID: deleteRecordId}, (err, recordID) => {
  //     if (err) {
  //       throw err;
  //     }
  //   });
  // };
  // const newMyContact = newContact => {
  //   Contacts.addContact(newContact, err => {
  //     if (err) throw err;
  //   });
  // };

  return (
    <ScrollView
      contentContainerStyle={{backgroundColor: Colors.background, flex: 1}}>
      <View style={styles.phoneDetails}>
        <Text style={styles.phoneDetailsText}>Ажилтны нэр</Text>
        <Text style={styles.phoneDetailsInfo}>{item.username}</Text>
      </View>
      <View style={styles.phoneDetails}>
        <Text style={styles.phoneDetailsText}>Албан тушаал</Text>
        <Text style={styles.phoneDetailsInfo}>{item.job}</Text>
      </View>
      <View style={styles.phoneDetails}>
        <Text style={styles.phoneDetailsText}>Салбар</Text>
        <Text style={styles.phoneDetailsInfo}>{item.department}</Text>
      </View>
      <View style={styles.phoneDetails}>
        <Text style={styles.phoneDetailsText}>Имэйл хаяг</Text>
        <Text style={styles.phoneDetailsInfo}>{item.email}</Text>
      </View>
      <View
        style={[
          {flexDirection: 'row', justifyContent: 'space-between'},
          styles.phoneDetails,
        ]}>
        <View>
          <Text style={styles.phoneDetailsText}>Ажлын гар утас</Text>
          <Text style={styles.phoneDetailsInfo}>{item.phone}</Text>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            phoneCall();
          }}>
          <Image
            resizeMode="contain"
            style={{width: 20, height: 20}}
            source={require('../../assets/images/phone-icon.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <View>
        <TouchableOpacity onPress={() => isDownload()} style={styles.button}>
          <Text style={styles.buttonText}>Татах</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

export default Detail;
