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
import AsyncStorage from '@react-native-async-storage/async-storage';
import localApi from '../../api/localApi';

const DetailScreen = props => {
    const {data, alreadySaved} = props.route.params
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData();
    }, []);  

    const getUserData = async () => {
        await AsyncStorage.getItem("userInfo").then((res) => {
            if(res) {
                const parsedData = JSON.parse(res);
                setUserData(parsedData);
            }
        }).catch((e) => {
            console.log(e, "user not found --->", e);
        })
    }

    const alertSMS = () => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Анхаарна уу !!!',
            textBody: 'Та устгахдаа итгэлтэй байна уу?',
            button: 'Устгах',
            autoClose: 500,
            onPressButton: () => {
                deleteProduct();
                deleteSavedProduct();
            },
        })
    }

    const deleteProduct = () => {
        localApi.delete(`api/products/${data?.id}`).then(() => {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                textBody: 'Амжилттай устгагдлаа !!!',
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })

            setTimeout(() => {
                navigation.goBack()
            }, 500);
        }).catch((e) => {
            console.log(e);
        })
    }

    const deleteSavedProduct = async () => {
        if(userData !== "GUEST") {
            localApi.delete(`api/saved-products/${data?.id}`).then(() => {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBody: 'Амжилттай жагсаалтаас хасагдлаа !!!',
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                })
    
                setTimeout(() => {
                    navigation.goBack()
                }, 500);
            }).catch((e) => {
                console.log(e);
            })
        } else {
            const newDataId = data.id;

            await AsyncStorage.getItem("savedProduct")
                .then((res) => {
                    if (res) {
                        const parsedData = JSON.parse(res);
                        const updatedData = parsedData.filter(item => item.id !== newDataId);
                        AsyncStorage.setItem("savedProduct", JSON.stringify(updatedData))
                            .then(() => {
                                Toast.show({
                                    type: ALERT_TYPE.SUCCESS,
                                    textBody: 'Амжилттай  жагсаалтаас хасагдлаа !!!',
                                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                                })
                    
                                setTimeout(() => {
                                    navigation.goBack()
                                }, 500);
                            })
                            .catch((error) => {
                                console.log("Error removing item from AsyncStorage:", error);
                            });
                    }
                })
                .catch((e) => {
                    console.log(e, "user not found --->", e);
                });
        }
    }
    
    const saveProduct = async () => {
        if (userData === "GUEST") {
            try {
                const savedData = await AsyncStorage.getItem("savedProduct");
                let dataArray;
            
                if (savedData === null || savedData === "") {
                    dataArray = [data];
                } else {
                    dataArray = JSON.parse(savedData);
                    const exists = dataArray.some(item => item.id === data.id);
            
                    if (!exists) {
                        dataArray = [...dataArray, data];
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            textBody: 'Та аль хэдийнээ хадгалаад авчихсан байна шүү',
                            textBodyStyle: { fontFamily: "Montserrat-Bold" }
                        })
                        return;
                    }
                }
            
                await AsyncStorage.setItem("savedProduct", JSON.stringify(dataArray));
            
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBody: 'Амжилттай хадгалагдлаа !!!',
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                });
            } catch (error) {
                console.log("Error saving product:", error);
            }            
        } else {
            localApi.post("api/saved-products", JSON.stringify({
                "data": {
                  "name": data.attributes.name,
                  "description": data.attributes.description
                }
            })).then(() => {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBody: 'Амжилттай хадгалагдлаа !!!',
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                });
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    
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
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: userData?.attributes?.is_admin ? "center" : "flex-start"}}>
                <View>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: '#000', textTransform: "uppercase" }}>
                        {data?.attributes?.name}
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12, color: "#ADA4A5" }}>
                        {data?.attributes?.description}
                    </Text>
                </View>
                {userData?.attributes?.is_admin &&
                    <View style={{ flexDirection: "row", gap: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProduct", {data: data})}>
                            <MaterialIcons
                                name='edit-square'
                                size={24}
                                color={"#ADA4A5"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alertSMS()}>
                            <MaterialIcons
                                name='delete-forever'
                                size={24}
                                color={"#ADA4A5"}
                            />
                        </TouchableOpacity>
                    </View>
                }
              </View>
              <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => {
                if(alreadySaved == "true") {
                    deleteSavedProduct()
                } else {
                    saveProduct()
                }
              }}>
                <LinearGradient
                  colors={[ '#92A3FD', '#9DCEFF' ]}
                  style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                >  
                  <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                    {alreadySaved == "true" ? "Жагсаалтаас хасах" : "Хадгалах"}
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
