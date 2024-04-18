import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions  } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import localApi from '../api/localApi';
import { AuthContext } from '../context/AuthContext';

interface Event {
    id: number;
    eventname: string;
    images: string[];
}

const { width: deviceWidth } = Dimensions.get('window');
const marginHorizontal = 20;
const adjustedWidth = deviceWidth - (2 * marginHorizontal);

function Index({ navigation }: any) {
    const [events, setEvents] = useState<Event[]>([]);
    const navigations = [
        {
            "name": "Цагийн мэдээ",
            "desc": "Ажилтны ирцийн мэдээлэл",
            "navi": "TimeSheetStack",
            "image": require("../assets/images/calendar.png")
        },
        {
            "name": "Дотоод журам",
            "desc": "Дүрэм, журам, стандарт",
            "navi": "RuleStack",
            "image": require("../assets/images/guarantee.png")
        },
        {
            "name": "Тодорхойлолт",
            "desc": "Ажлын байрны тодорхойлолт",
            "navi": "AbtStack",
            "image": require("../assets/images/jobT.png")
        },
        {
            "name": "Өрөлт",
            "desc": "Дэлгүүрийн өрөлт",
            "navi": "RestockStack",
            "image": require("../assets/images/biotechnology.png")
        },
    ]
    const { logout } = useContext(AuthContext);
    const baseOptions = {
        vertical: false as const,
        width: adjustedWidth,
        height: 330
    };
    const baseOptionsSli = {
        vertical: false as const,
        width: adjustedWidth,
        height: 130
    };

    useEffect(() => {
        getEvent();
    }, []);
    
    const getEvent = async () => {
        await AsyncStorage.getItem('userInfo').then(userInfo => {
            if (userInfo) {
                let user = JSON.parse(userInfo);
                
                localApi
                .post('mobileEventHome', {
                    jwt: user.jwt,
                    dep_map: user.dep_map,
                    job_id: user.job_id,
                    emp_id: user.emp_id,
                })
                .then(res => {
                    if (res.data.data.length > 0) {
                        setEvents(res.data.data);
                    }
                    else if (res.data.code == '303') {
                        logout();
                    }            
                })
                .catch(err => {
                    console.log(err.message);
                });
            } else {
                logout()
            }
        });
    };

    const readEvent = async (event_id: number) => {
        await AsyncStorage.getItem('userInfo').then(userInfo => {
            if(userInfo) {
                let user = JSON.parse(userInfo);
                localApi
                .post('mobileEventRead', {
                    jwt: user.jwt,
                    event_id: event_id,
                })
                .then(res => {
                    if (res.data.code == '303') {
                        logout();
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
            } else {
                logout()
            }
        });
    };         
      
    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            { events && events.length > 0 &&
                <>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 16, color: "#000", marginBottom: 5 }}>
                        {events[0].eventname}
                    </Text>
                    <Carousel
                        {...baseOptions}
                        loop={false}
                        style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}
                        autoPlay={false}
                        autoPlayInterval={1000}
                        data={events}
                        pagingEnabled={true}
                        onSnapToItem={(index) => console.log("current index:", index)}
                        renderItem={() => (
                            <View style={{ flex: 1, marginLeft: 3 }}>
                                <Image source={{ uri: events[0].images[0] }} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
                                <TouchableOpacity onPress={() => readEvent(events[0].id)} style={{ position: 'absolute', top: 0, left: 0, justifyContent: 'flex-end', alignItems: 'flex-start', padding: 8, backgroundColor: "#98B9FE", borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                    <Text style={{ color: "#fff", fontFamily: "Montserrat-SemiBold", fontSize: 15 }}>
                                        Танилцлаа
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            }
            <Carousel
                {...baseOptionsSli}
                loop={false}
                style={{ width: "100%", justifyContent: "center" }}
                autoPlay={false}
                autoPlayInterval={1000}
                data={navigations}
                pagingEnabled={true}
                onSnapToItem={(index) => console.log("current index:", index)}
                renderItem={({item}) => (
                    <View style={{ alignItems: "center", marginRight: 5  }}>
                        <LinearGradient 
                            colors={[ '#9CCBFF', '#9DCEFF' ]}
                            style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, width: "100%", alignItems: "center", borderRadius: 20 }}
                        >
                            <View>
                                <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}>
                                    {item.name}
                                </Text>
                                <View style={{ marginLeft: 3 }}>
                                    <Text style={{ fontFamily: "Montserrat-Regular", color: "#fff" }}>
                                        {item.desc}
                                    </Text>
                                    <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={() => navigation.navigate(item.navi)}>
                                        <LinearGradient
                                            colors={[ '#98B9FE', '#98BCFE' ]}
                                            style={{ width: "100%", borderRadius: 50, alignItems: "center", flexDirection: "row", justifyContent: "center", padding: 7 }}
                                        >   
                                            <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff' }}>
                                                Зочлох
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Image
                                    source={item.image}
                                    style={{ width: 70, height: 70 }}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                )}
            />
        </View>
    );
}

export default Index;
