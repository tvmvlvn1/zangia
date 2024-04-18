import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity } from 'react-native';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import api from '../../../api/localApi.js';
import { AuthContext } from "../../../context/AuthContext.js";

const BottomSheet = ({ setStatus, isReverse, data, navigation }) => {
    const [ reason, setReason ] = useState("")
    const { logout } = useContext(AuthContext);
    const slide = React.useRef(new Animated.Value(300)).current;
    const slideUp = () => {
        Animated.timing(slide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slide, {
            toValue: 300,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        slideUp()
    })

    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus(false);
        }, 800)
    }

    const reverseAbsenceReq = async () => {
        await AsyncStorage.getItem('userInfo').then(userInfo => {
            let user = JSON.parse(userInfo);

            api.post("AbsenceRequestReverse", JSON.stringify({
                jwt: user.jwt,
                leave_id: data.id,
                reverse_reason: reason,
            })).then((res) => {
                if(res.data.data.result == 'success') {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        textBody: `Амжилттай буцаагдлаа`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                    
                    setTimeout(() => {
                        navigation.goBack();
                    }, 2000);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Алдаа гарлаа !!!',
                        textBody: `${res.data?.message}`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                    
                    setTimeout(() => {
                        navigation.goBack();
                    }, 1000);
                }
            })
        }).catch((err) => {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Алдаа гарлаа !!!',
                textBody: `${err.message}`,
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
            
            setTimeout(() => {
                logout();
            }, 1000);
        })
    };

    const deleteAbsenceReq = async () => {
        if (data.state == 'draft') {
            await AsyncStorage.getItem('userInfo').then(userInfo => {
                let user = JSON.parse(userInfo);

                api.post("AbsenceRequestDelete", JSON.stringify({
                    jwt: user.jwt,
                    leave_id: data.id,
                })).then((res) => {
                    if(res.data) {
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: 'Амжилттай илгээгдлээ',
                            textBody: `Таны ${data.date_from}-ээс ${data.date_to} хооронд үүсгэсэн чөлөөний хүсэлт устгагдлаа`,
                            textBodyStyle: { fontFamily: "Montserrat-Bold" }
                        })
                        
                        setTimeout(() => {
                            navigation.goBack();
                        }, 2000);
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Алдаа гарлаа !!!',
                            textBody: `${res.data?.message}`,
                            textBodyStyle: { fontFamily: "Montserrat-Bold" }
                        })
                    }
                })
            }).catch((err) => {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Алдаа гарлаа !!!',
                    textBody: `${err.message}`,
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                })
                
                setTimeout(() => {
                    logout();
                }, 1000);
            })
        } else {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Анхааруулах мессэж',
                textBody: `Зөвхөн ноорог төлөвтэй үед устгагдаж болно`,
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
        }
    };

    const nextStep = () => {
        if(reason == '') {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Алдаа гарлаа !!!',
                textBody: `Та шалтгаанаа бичээгүй байх шиг байна даа`,
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
        } else {
            if(isReverse) {
                reverseAbsenceReq()
            } else {
                deleteAbsenceReq()
            }
        }
    }

    return(
        <Pressable onPress={ closeModal } style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: '60%', }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontFamily: "Montserrat-Bold", color: "#000", textAlign: "center" }}>
                                    {isReverse ? "Ямар шалтааны улмаас буцаах гэж байгаа вэ ?" : "Ямар шалтааны улмаас устгах гэж байгаа вэ ?"}
                                </Text>
                            </View>
                            <Fumi
                                placeholder='Шалтгаан'
                                iconClass={FontAwesomeIcon}
                                iconName={'user-o'}
                                iconColor={'#97B6FE'}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={16}
                                value={reason}
                                onChangeText={(text) => setReason(text)}
                                inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                                style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginTop: 5 }}
                            />
                        </View>
                        <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center" }} onPress={() => nextStep()}>
                            <LinearGradient
                                colors={[ '#92A3FD', '#9DCEFF' ]}
                                style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                            > 
                                <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                                    {isReverse ? "Буцаах" : "Устгах"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
            
        </Pressable>
    )
}


export default BottomSheet;


const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#40A2E3',
        alignItems: 'center',
        marginTop: 15
    }
})