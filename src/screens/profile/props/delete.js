import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertPro from 'react-native-alert-pro';
import {DropFamily} from '../restService/family';
import {DropRelation} from '../restService/relation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Delete = props => {
  let AlertPororo;
  const {
    person,
    method,
    setPage,
    setIsloading,
    isLoading,
    setIsDeleting,
    isDeleting,
  } = props;

  const DeleteFunction = async () => {
    await AlertPororo.close();
    if (method === 'family') {
      await setIsDeleting(true);
      AsyncStorage.getItem('userInfo')
        .then(userInfo => {
          let user = JSON.parse(userInfo);
          DropFamily(user.jwt, person.id)
            .then(result => {
              isLoading === 1 ? setIsloading(0) : setIsloading(1);
              setIsDeleting(false);
              setPage('ListPage');
            })
            .catch(err => Alert.alert('Алдаа гарлаа', err.message));
        })
        .catch(err => Alert.alert('Алдаа гарлаа', err.message));
    }

    if (method === 'relation') {
      await setIsDeleting(true);
      AsyncStorage.getItem('userInfo')
        .then(userInfo => {
          let user = JSON.parse(userInfo);
          DropRelation(user.jwt, person.id)
            .then(result => {
              isLoading === 1 ? setIsloading(0) : setIsloading(1);
              setIsDeleting(false);
              setPage('ListPage');
            })
            .catch(err => Alert.alert('Алдаа гарлаа', err.message));
        })
        .catch(err => Alert.alert('Алдаа гарлаа', err.message));
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => AlertPororo.open()}
        disabled={isDeleting && true}>
        <Icon name="trash" style={styles.listitemmoreicon} size={22} />
      </TouchableOpacity>
      <AlertPro
        ref={async ref => {
          AlertPororo = ref;
        }}
        onConfirm={DeleteFunction}
        onCancel={() => {
          AlertPororo.close();
        }}
        title={
          method !== 'family'
            ? `${person.last_name} ${person.first_name}`
            : `${person.name}`
        }
        message={
          method === 'family'
            ? `"${person.name}" гэр бүлийн гишүүний мэдээллийг устгахдаа бэлэн үү?`
            : `${person.last_name} ${person.first_name} Хамааралтай гишүүний мэдээллийг устгах уу?`
        }
        textConfirm="Устгах"
        textCancel="Цуцлах"
        customStyles={{
          mask: {
            backgroundColor: 'transparent',
          },
          container: {
            borderWidth: 1,
            borderColor: '#eee',
            shadowColor: '#000000',
            shadowOpacity: 0.1,
            shadowRadius: 20,
          },
          buttonCancel: {
            backgroundColor: '#a51c30',
          },
          buttonConfirm: {
            backgroundColor: '#4ef542',
          },
        }}
      />
    </>
  );
};

export default Delete;

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3b5998',
    padding: 10,
    borderRadius: 90,
  },
  listitemmoreicon: {
    color: '#3b5998',
  },
});
