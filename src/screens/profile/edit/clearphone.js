import {TouchableOpacity} from 'react-native';
import React from 'react';
import Aicon from 'react-native-vector-icons/MaterialIcons';
import AlertPro from 'react-native-alert-pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeletePhone} from '../restService/self';

const Clearphone = props => {
  let AlertProp;
  const {setIsDeleted, setDeleteLoad} = props;

  const DeletePhoneAction = () => {
    AlertProp.close();
    setDeleteLoad(true);
    AsyncStorage.getItem('userInfo')
      .then(userInfo => {
        let user = JSON.parse(userInfo);
        DeletePhone(user.jwt)
          .then(() => {
            setIsDeleted(true);
            setDeleteLoad(false);
          })
          .catch(err => console.log(err, 'Error!'));
      })
      .catch(err => console.log(err, 'Error!'));
  };

  return (
    <>
      <TouchableOpacity
        style={{marginLeft: 12}}
        onPress={() => AlertProp.open()}>
        <Aicon name="clear" color="#a51c30" size={28} />
      </TouchableOpacity>
      <AlertPro
        ref={ref => (AlertProp = ref)}
        onConfirm={DeletePhoneAction}
        onCancel={() => AlertProp.close()}
        title="Холбоос дугаарыг устгах уу?"
        message="Өөрийн бүртгэлд бүртгэгдсэн утасны дугаарыг устгах уу?"
        textCancel="Цуцлах"
        textConfirm="Устгах"
        customStyles={{
          mask: {
            backgroundColor: 'transparent',
          },
          container: {
            borderWidth: 1,
            borderColor: '#1F4783',
            shadowColor: '#000000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          buttonCancel: {
            backgroundColor: '#4da6ff',
          },
          buttonConfirm: {
            backgroundColor: '#ffa31a',
          },
        }}
      />
    </>
  );
};

export default Clearphone;
