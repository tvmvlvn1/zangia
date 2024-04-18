import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import Header from '../../components/Header';

const Index = (props) => {
    const { navigation } = props;
    const { datas } = props.route.params;

    const cleanedDatas = {
        competition: {
            ...datas.competition,
            participants: datas.competition.participants.filter(item => item.ErpEmployee !== null)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Тэмцээнд оролцогчид"} navigation={navigation}/>
            <ScrollView style={{ marginBottom: "5%" }}>
                <TouchableOpacity onPress={() => console.log(cleanedDatas.competition.place)} style={{ backgroundColor: "#F0F0F0", padding: 15, borderRadius: 16, marginHorizontal: 15 }}>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 16, textAlign: "center" }}>{cleanedDatas.competition.name}</Text>
                </TouchableOpacity>
                {cleanedDatas.competition.participants.map((item, idx) => {
                    let imageSource;
                    const place = parseInt(cleanedDatas.competition.place);
                    if (idx + 1 <= place) {
                        imageSource = require("../../assets/images/trophy-star.png");
                    } else {
                        imageSource = require("../../assets/images/battle.png");
                    }

                    return (
                        <View key={idx} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", margin: 15, marginBottom: 0, padding: 15, borderRadius: 16 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Image
                                    source={imageSource}
                                    style={{ width: 38, height: 38 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 11 }}>{item.ErpEmployee.email}</Text>
                                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14 }}>{item.ErpEmployee.first_name} . {item.ErpEmployee.last_name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => console.log(item.ErpEmployee)}>
                                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 15 }}>
                                    {(item?.point * 100).toFixed(0)}.0
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Index;
