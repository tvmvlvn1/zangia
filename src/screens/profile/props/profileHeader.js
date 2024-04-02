import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import styles from './../profile';
import IconClass from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/AuthContext';

const ProfileHeader = ({navigation, user}) => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.profileItem}>
      <View style={styles.profile}>
        <View style={styles.image}>
          <Image
            style={{
              width: 58,
              height: 58,
              borderRadius: 58 / 2,
              overflow: 'hidden',
            }}
            source={{uri: user.img}}
          />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameName}>
            {user.lname}.{user.name}
          </Text>
          <Text>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <IconClass name="logout" style={styles.logouticon} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
