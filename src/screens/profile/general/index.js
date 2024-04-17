import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import Header from '../../../components/Header';
import { AuthContext } from '../../../context/AuthContext';

const Index = (props) => {
    const { navigation } = props;
    const [ user, setUser ] = useState({});
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await AsyncStorage.getItem('userInfo').then((res) => {
            let userI = JSON.parse(res);

            if(userI) {
                setUser(userI)
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Алдаа гарлаа !!!',
                    textBody: `Хэрэглэгчийн мэдээлэл олдсонгүй !!!`,
                    textBodyStyle: { fontFamily: "Montserrat-Bold" },
                    titleStyle: { fontFamily: "Montserrat-Bold" },
                })
                
                setTimeout(() => {
                    logout()
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
                logout()
            }, 1000);
        })
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Үндсэн мэдээлэл"} navigation={navigation}/>
            <View style={{ padding: 20}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", width: "40%", textAlign: "left" }}>
                        Албан тушаал
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", width: "50%", textAlign: "right" }}>
                        {user?.job}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", width: "40%", textAlign: "left" }}>
                        Салбар
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", width: "50%", textAlign: "right" }}>
                        {user?.sector}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", width: "40%", textAlign: "left" }}>
                        Имэйл
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", width: "50%", textAlign: "right" }}>
                        {user?.email}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", width: "40%", textAlign: "left" }}>
                        Байгууллагын утасны дугаар
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", width: "50%", textAlign: "right" }}>
                        {user?.workPhone}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#F7F8F8", borderRadius: 16, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", width: "40%", textAlign: "left" }}>
                        Ажилтны хурууны код
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", width: "50%", textAlign: "right" }}>
                        {user?.fingercode}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Index;