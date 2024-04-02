import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Delete from '../props/delete';
import Deleting from '../props/deleting';
import {familyOptions} from '../../../Global';

const ShowFamilyMember = props => {
  const {setPage, setPerson, person, animation, isLoading, setIsloading} =
    props;

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    animation.current.play();
  }, [person]);

  const family = familyOptions
    .filter(function (item) {
      return item.value == person.dropdown_list_id;
    })
    .map(function ({label}) {
      return {label};
    });

  return (
    <View style={styles.bigcontainer}>
      <ScrollView style={[styles.body, {zIndex: -1}]}>
        {isDeleting && <Deleting />}
        <View style={styles.profileHeader}>
          <LottieView
            ref={animation}
            loop={true}
            style={{
              width: 110,
              marginRight: 30,
            }}
            source={require('../../../assets/lottie/Profile.json')}
          />
          <View style={styles.profileTitle}>
            <Text style={styles.headTxt}>{person.name}</Text>
            <Text style={styles.subTxt}>{person.organization}</Text>
            {!person.job_position && <Text>{person.job_position}</Text>}
            {family && <Text>{family[0]?.label}</Text>}
          </View>
          <View style={{position: 'absolute', right: 20, top: 20}}>
            <TouchableOpacity
              style={styles.linkbtn}
              onPress={() => {
                setPage('EditPage');
              }}>
              <Icon name="pencil" style={styles.listitemmoreicon} size={22} />
            </TouchableOpacity>
            <Delete
              person={person}
              method="family"
              setPage={setPage}
              setIsloading={setIsloading}
              isLoading={isLoading}
              setIsDeleting={setIsDeleting}
            />
          </View>
        </View>
        <View style={styles.modalbody}>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5, styles.bw1, styles.bc]}>
              №:{' '}
            </Text>
            <Text style={[styles.f2, styles.p5, styles.bw1, styles.bc]}>
              {person.id}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5, styles.bw1, styles.bc]}>
              Утас:{' '}
            </Text>
            <Text style={[styles.f2, styles.p5, styles.bw1, styles.bc]}>
              {person.contact_number}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5, styles.bw1, styles.bc]}>
              Төрсөн он/сар/өдөр:{' '}
            </Text>
            <Text style={[styles.f2, styles.p5, styles.bw1, styles.bc]}>
              {person.date_of_birth}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5]}>Регистер: </Text>
            <Text style={[styles.f2, styles.p5]}>{person.registry_number}</Text>
          </View>
        </View>
        <View style={styles.modalbody}>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5, styles.bw1, styles.bc]}>
              Системд бүртгэсэн:{' '}
            </Text>
            <Text style={[styles.f2, styles.p5, styles.bw1, styles.bc]}>
              {person.created_at}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.f1, styles.p5, {paddingTop: 10}]}>
              Сүүлд засварласан:{' '}
            </Text>
            <Text style={[styles.f2, styles.p5]}>{person.updated_at}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowFamilyMember;

const styles = StyleSheet.create({
  bigcontainer: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  profileTitle: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  headTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTxt: {
    fontSize: 14,
    marginVertical: 4,
  },
  modalbody: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  f1: {
    flex: 1,
  },
  f3: {
    flex: 3,
  },
  f2: {
    flex: 2,
  },
  p5: {
    padding: 5,
  },
  bw1: {
    borderBottomWidth: 1,
  },
  bc: {
    borderColor: '#eee',
    paddingVertical: 8,
  },
  linkbtn: {
    borderWidth: 1,
    borderColor: '#3b5998',
    padding: 10,
    borderRadius: 90,
  },
  listitemmoreicon: {
    color: '#3b5998',
  },
});
