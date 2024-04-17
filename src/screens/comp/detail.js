import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Header from '../../components/Header';

const Index = (props) => {
    const { navigation } = props
    const { datas } = props.route.params

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Тэмцээнд оролцогчид"} navigation={navigation}/>
            <View>
                <View style={{ backgroundColor: "#F0F0F0", padding: 15, borderRadius: 16, marginHorizontal: 15 }}>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 16, textAlign: "center" }}>{datas[0]?.competition_name?.name}</Text>
                </View>
                {datas[1].map((item, idx) => {
                    let imageSource;
                    const place = parseInt(datas[0].competition_name.place);
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
                                    <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 11 }}>{item?.ErpEmployee?.email}</Text>
                                    <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 14 }}>{item?.ErpEmployee?.first_name} .{item?.ErpEmployee?.last_name}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 15 }}>
                                    {(item?.point * 100).toFixed(0)}.0
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default Index;