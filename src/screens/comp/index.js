import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Lottie from "lottie-react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/Header';
import localApi from '../../api/localApi';

const Index = (props) => {
    const { navigation } = props
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getComp()
    }, [])

    const getComp = async () => {
        setIsLoading(true)
        await AsyncStorage.getItem("userInfo").then(async (res) => {
            let user = JSON.parse(res);

            await localApi.post("getCompetitions", JSON.stringify({
                "emp_id": user?.emp_id
              })).then((res) => {
                if(res.data.data.length > 0) {
                    setData(res.data.data)
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Алдаа гарлаа !!!',
                        textBody: `Одоогоор тэмцээн уралдаан зарлагдаагүй байна`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
    
                    setTimeout(() => {
                        navigation.goBack()
                    }, 1000);
                }
            }).catch((e) => {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Алдаа гарлаа !!!',
                    textBody: `${e}`,
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                })
    
                setTimeout(() => {
                    navigation.goBack()
                }, 1000);
            }).finally(() => {
                setIsLoading(false)
            })
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Тэмцээн уралдаан"} navigation={navigation}/>
            {
                isLoading ? 
                    <Lottie
                        autoPlay
                        loop
                        style={{ flex: 1, justifyContent: 'center' }}
                        source={require('../../assets/lottie/loading.json')}
                    />
                :
                <View>
                    {data.map((item, idx) => (
                        <TouchableOpacity onPress={() => navigation.navigate("DetailCompScreen", {datas: item})} key={idx} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", margin: 15, marginBottom: 0, padding: 15, borderRadius: 16 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Image
                                    source={require("../../assets/images/trophy.png")}
                                    style={{ width: 38, height: 38 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 12 }}>{item[0]?.competition_name?.description}</Text>
                                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 16 }}>{item[0]?.competition_name?.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("DetailCompScreen", {datas: item})}>
                                <SimpleLineIcons
                                    name='arrow-right'
                                    size={16}
                                    color={'#1D1617'}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            }
        </View>
    )
}

export default Index;