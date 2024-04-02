import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const ListRelation = ({data, navigation, setPage, setPerson}) => {
  return (
    <View style={styles.boxcontainer}>
      <Icon name={'shield-checkmark'} style={styles.iconstyle} size={28} />
      <TouchableOpacity
        onPress={() => {
          setPage('ShowDetial');
          setPerson(data);
        }}
        style={styles.persondetial}>
        <Text
          style={
            styles.personname
          }>{`${data.last_name} ${data.first_name}`}</Text>
        <View style={{flex: 1}}>
          <Text style={styles.persontitle}>{data.department}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPage('ShowDetial');
          setPerson(data);
        }}>
        <MIcon
          name={'keyboard-arrow-right'}
          style={[styles.iconstyle, {color: '#3b5998'}]}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListRelation;

const styles = StyleSheet.create({
  boxcontainer: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconstyle: {
    color: '#15640C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  persondetial: {
    flex: 6,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  personname: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  persontitle: {
    fontSize: 13,
    color: '#15640C',
  },
});
