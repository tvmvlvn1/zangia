import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Fumi  } from 'react-native-textinput-effects';
import Back from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient';

const ForgetScreen = props => {
  const [username, setUsername] = useState('');
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {
        isLoading ? 
          <Lottie
            autoPlay
            loop
            style={{ flex: 1, justifyContent: 'center' }}
            source={require('../../assets/lottie/loading.json')}
          />
        :
        <ImageBackground
          source={require("../../assets/images/forget.jpg")}
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '35%',
            }}
            resizeMode="cover"
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 50 : 15,
              left: 15,
              backgroundColor: '#F9F9F9',
              padding: 10,
              borderRadius: 20,
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Back name="arrowleft" size={16} color="#737373" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              width: '100%',
              height: '70%',
              bottom: 0,
              position: 'absolute',
              borderTopRightRadius: 40,
            }}
          >
            <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
              <Fumi
                placeholder='Нэвтрэх нэр'
                iconClass={FontAwesomeIcon}
                iconName={'user-o'}
                iconColor={'#97B6FE'}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                value={username}
                onChangeText={(text) => setUsername(text)}
                inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium" }}
              />
              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Хайх
                  </Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      }
    </View>
  );
};
export default ForgetScreen;
