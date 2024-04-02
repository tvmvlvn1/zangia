import React, {useContext, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import localApi from '../api/localApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import AIcon from 'react-native-vector-icons/AntDesign';
import {Colors} from './global/Colors';

export const Event = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('mobileEventHome', {
          jwt: user.jwt,
          dep_map: user.dep_map,
          job_id: user.job_id,
          emp_id: user.emp_id,
        })
        .then(res => {
          if (res.data.code == '200') {
            setEvents(res.data.data);
            console.log(res.data.data);
            if (res.data.data.length > 0) {
              setVisible(true);
            }
          } else if (res.data.code == '303') {
            logout();
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  const readEvent = event_id => {
    AsyncStorage.getItem('userInfo').then(userInfo => {
      let user = JSON.parse(userInfo);
      localApi
        .post('mobileEventRead', {
          jwt: user.jwt,
          event_id: event_id,
        })
        .then(res => {
          if (res.data.code == '200') {
            setVisible(false);
          } else if (res.data.code == '303') {
            logout();
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.centeredView}>
        {events && events.length > 0 && (
          <View style={styles.modalView}>
            <Text style={styles.title}>{events[0].eventname}</Text>
            <Text style={styles.description}>{events[0].description}</Text>
            {events[0].images && events[0].images.length > 0 && (
              <Image
                resizeMode="contain"
                style={{
                  height: 250,
                  width: '100%',
                  marginVertical: 2,
                }}
                source={{
                  uri: events[0].images[0],
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => readEvent(events[0].id)}
              style={styles.confirmModal}>
              <Text style={styles.confirmText}>Танилцлаа</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeModal}>
              <AIcon name="close" style={styles.closeBtn} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 12,
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  closeBtn: {
    color: '#000',
    fontSize: 25,
    padding: 10,
  },
  confirmModal: {
    backgroundColor: Colors.primary,
    marginTop: 10,
    borderRadius: 8,
    width: 100,
  },
  confirmText: {
    color: Colors.white,
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  closeModal: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  title: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 15,
  },
  description: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '300',
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
});

export default Event;
