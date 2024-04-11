import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';

import localApi from '../api/localApi';
import { AuthContext } from '../context/AuthContext';

interface Event {
    id: number;
    eventname: string;
    images: string[];
}

function Index() {
    const [events, setEvents] = useState<Event[]>([]);
    const { logout } = useContext(AuthContext);
    const baseOptions = {
        vertical: false as const,
        width: 355,
        height: 330
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
        <View style={{ flex: 1, margin: "5%" }}>
            { events && events.length > 0 &&
                <>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 16, color: "#000" }}>
                        {events[0].eventname}
                    </Text>
                    <Carousel
                        {...baseOptions}
                        loop={false}
                        style={{ width: "100%", justifyContent: "center" }}
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
        </View>
    );
}

export default Index;