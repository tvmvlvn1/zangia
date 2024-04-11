import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../../context/AuthContext';

const ProfileHeader = ({ user }) => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {user.img ?
            <Image
              style={{
                backgroundColor: "#fff",
                width: 58,
                height: 58,
                borderRadius: 20,
                overflow: 'hidden',
              }}
              source={{uri: user.img}}
            /> :
            <Image
              style={{
                backgroundColor: "#fff",
                width: 42,
                height: 42,
                borderRadius: 0,
                overflow: 'hidden',
              }}
              source={require("../../../assets/images/kitty.png")}
            />
          }

          <View style={{ marginLeft: "5%"}}>
            <Text style={{ color: "#000", fontFamily: "Montserrat-Medium" }}>
              {user.lname}. {user.name}
            </Text>
            <Text style={{ color: "#7B6F72", fontFamily: "Montserrat-Regular", fontSize: 13 }}>
              {user.email}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={logout}>
          <LinearGradient 
            colors={[ '#92A3FD', '#9DCEFF' ]}
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 20 }}
          >
            <View style={{ alignItems: "center", paddingLeft: 25, paddingRight: 25, padding: 5 }}>
              <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                Гарах
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;