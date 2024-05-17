import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Back from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient';
import {ALERT_TYPE, Toast, Dialog} from 'react-native-alert-notification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fumi} from 'react-native-textinput-effects';
import localApi from '../../api/localApi';

const DetailScreen = props => {
    const {navigation} = props;
    const {data} = props.route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        if(data?.attributes) {
            setName(data?.attributes?.name)
            setDesc(data?.attributes?.description)
        }
    }, []); 

    const editFunc = () => {
        localApi.put(`api/products/${data?.id}`, {
            "data": {
                "name": name,
                "description": desc
            }
        })
            .then(() => {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBody: 'Амжилттай шинэчлэгдлээ !!!',
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                });
    
                setTimeout(() => {
                    navigation.navigate("HomeStack");
                }, 500);
            })
            .catch((error) => {
                console.log("Error editing product:", error);
            });
    };    
    
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
          source={{ uri: "https://preview.thenewsmarket.com/Previews/ADID/StillAssets/640x480/651512.jpg"}}
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '40%',
          }}
          resizeMode="cover"
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 40 : 15,
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
              height: '65%',
              bottom: 0,
              position: 'absolute',
              borderTopRightRadius: 40,
            }}
          >
            <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
                <View>
                    <Fumi
                        label='Барааны нэр'
                        labelStyle={{ fontFamily: "Montserrat-Medium" }}
                        iconClass={Ionicons}
                        iconName={'document-text-outline'}
                        iconColor={'#97B6FE'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                        style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium" }}
                    />
                    <Fumi
                        label='Барааны тайлбар'
                        labelStyle={{ fontFamily: "Montserrat-Medium" }}
                        iconClass={Ionicons}
                        iconName={'document-text-outline'}
                        iconColor={'#97B6FE'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={desc}
                        onChangeText={(text) => setDesc(text)}
                        inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                        style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginTop: 10 }}
                    />
                </View>
              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => {
                editFunc()
              }}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    Шинэчлэх
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
export default DetailScreen;
