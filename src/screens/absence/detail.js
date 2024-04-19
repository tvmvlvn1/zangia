import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import BottomSheet from "./components/bottom";
import Header from '../../components/Header.js';
import { AuthContext } from "../../context/AuthContext.js";
import api from '../../api/localApi.js';

const Detail = (props) => {
    const { navigation } = props;
    const { data } = props.route.params;
    const { logout } = useContext(AuthContext);
    const [status, setStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isReverse, setrIsReserve] = useState(false)

    const sendRequest = async () => {
        setIsLoading(true)
        await AsyncStorage.getItem('userInfo').then(userInfo => {
            let user = JSON.parse(userInfo);

            api.post("AbsenceRequestDraftSend", JSON.stringify({
                jwt: user.jwt,
                leave_id: data.id,
            })).then((res) => {
                if(res.data?.data?.result == 'success') {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Амжилттай илгээгдлээ',
                        textBody: `Таны ${data.date_from}-ээс ${data.date_to} хооронд үүсгэсэн чөлөөний хүсэлт илгээгдлээ`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                    
                    setTimeout(() => {
                        navigation.goBack();
                    }, 1000);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Алдаа гарлаа !!!',
                        textBody: `${res.data.data.msg}`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                    
                    setTimeout(() => {
                        navigation.goBack();
                    }, 1000);
                }
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
            }).finally(() => {
                setIsLoading(false)
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
        }).finally(() => {
            setIsLoading(false)
        })
    };

    if (isLoading) {
        return (
            <Lottie
                autoPlay
                loop
                style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}
                source={require('../../assets/lottie/loading.json')}
            />
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Чөлөөний хүсэлт"} navigation={navigation}/>
            <ScrollView>
                <View style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                        Төрөл
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14 }}>
                        {
                            data.type_selection == 'unpaid_leave'
                                ? 'Цалингүй чөлөө'
                                : data.type_selection == 'sick_leave'
                                ? 'Өвчний чөлөө'
                                : data.type_selection == 'paid_leave'
                                ? 'Цалинтай чөлөө'
                                : data.type_selection == 'covid19'
                                ? 'Ковид 19 өвчний чөлөө'
                                : data.type_selection ==
                                    'annualleave_request' && 'Ээлжийн амралт'
                        }
                    </Text>
                </View>
                <View style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                        Эхлэх өдөр
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14, width: "50%", textAlign: "right" }}>
                        {moment(data.date_from).format('LLLL')}
                    </Text>
                </View>
                <View style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                        Дуусах өдөр
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14, width: "50%", textAlign: "right" }}>
                        {moment(data.date_to).format('LLLL')}
                    </Text>
                </View>
                <View style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                        Шалтгаан
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14, width: "50%", textAlign: "right" }}>
                        {data?.description}
                    </Text>
                </View>
                <View style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>
                        Төлөв
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14, width: "50%", textAlign: "right" }}>
                        {
                            data?.state == 'draft'
                                ? 'Ноорог'
                                : data?.state == 'approve'
                                ? 'Батлах'
                                : data?.state == 'approved'
                                ? 'Батлагдсан'
                                : data?.state == 'reversed'
                                ? 'Буцаагдсан'
                                : data?.state
                        }
                    </Text>
                </View>
            </ScrollView>
            { 
                data.state == 'draft' || data.state == 'reversed' ?
                    <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: "2%" }} onPress={() => sendRequest()}>
                        <LinearGradient
                            colors={[ '#9DCEFF', '#92A3FD' ]}
                            style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                        > 
                            <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                                Хүсэлт илгээх
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity> : null
            }
            { 
                data.state == 'draft' || data.state == 'reversed' ?
                    <TouchableOpacity 
                        style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: "2%" }} 
                        onPress={() => {
                            setrIsReserve(false)
                            setTimeout(() => {
                                setStatus(true)
                            }, 500);
                        }}
                    >
                        <LinearGradient
                            colors={[ '#92A3FD', '#9DCEFF' ]}
                            style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                        > 
                            <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                                Устгах
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                :
                <TouchableOpacity 
                    style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: "2%" }} 
                    onPress={() => {
                        setrIsReserve(true)
                        setTimeout(() => {
                            setStatus(true)
                        }, 500);
                    }}
                >
                    <LinearGradient
                        colors={[ '#92A3FD', '#9DCEFF' ]}
                        style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                    > 
                        <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                            Буцаах
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            }
            { status && <BottomSheet setStatus={setStatus} isReverse={isReverse} data={data} navigation={navigation}/> }
        </View>
    )
}

export default Detail;