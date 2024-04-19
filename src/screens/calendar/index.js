import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Agenda } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../api/localApi.js';
import Header from '../../components/Header.js';

const Index = (props) => {
    const { navigation } = props
    const [data, setData] = useState({})

    useEffect(() => {
        getList();
    }, []);
    
    const getList = async () => {
        await AsyncStorage.getItem('userInfo').then(userInfo => {
          let user = JSON.parse(userInfo);
          api
            .post('mobileCalendar', JSON.stringify({
                "jwt": user.jwt,
                "year": new Date().getFullYear(),
                "month": new Date().getMonth() + 1,
                "dep_map": [
                    "88",
                    "254",
                    "1628",
                    "2"
                ],
                "job_id": "4080",
                "emp_id": "32814",
                "dep_id": "88",
                "type": "0"
            }))
            .then(res => {
                if(res.data.data != []) {
                    setData(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    const renderItem = (item) => {
        return (
            <View style={{ backgroundColor: "#F7F8F8", flex: 1, justifyContent: "center",  margin: 10, borderRadius: 16, padding: 10 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: "Montserrat-Medium",
                        color: '#1660AB',
                        fontSize: 16,
                    }}
                >
                    {item.name}
                </Text>
                <Image
                    source={{ uri: item.images[0] ? item.images[0] : "https://i.pinimg.com/originals/d3/dc/7e/d3dc7e93893bd4ad5d73009f763e4a48.jpg" }}
                    style={{ width: "100%", height: 300, borderRadius: 16, alignSelf: "center", marginTop: 10 }}
                />
            </View>
        );
    }    

    const generateMarkedDates = (data) => {
        const markedDates = {};
        Object.keys(data).forEach(date => {
            if (data[date].length > 0) {
                const periods = data[date].map(event => ({
                    startingDay: true,
                    endingDay: true,
                    color: '#5f9ea0',
                }));

                markedDates[date] = { periods };
            }
        });
    
        return markedDates;
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff"}}>
            <Header name={"Календар"} navigation={navigation}/>
            <Agenda
                items={data}
                markingType={'multi-period'}
                monthFormat={'yyyy MM' + ' сар'}
                renderItem={renderItem}
                theme={{
                    agendaKnobColor: '#1660AB',
                    textDayFontFamily: 'Montserrat-Medium',
                    textMonthFontFamily: 'Montserrat-Medium',
                    textDayHeaderFontFamily: 'Montserrat-Medium',
                    reservationsBackgroundColor: '#fff', 
                }} 
                markedDates={generateMarkedDates(data)}
              />
        </View>
    )
}

export default Index;