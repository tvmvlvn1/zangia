import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from '@react-native-async-storage/async-storage';

import localApi from '../api/localApi';

const foodImages = [
    "https://local.nomin.mn/uploads/files/post/image/758119cdc1777e2a0566bcd355f650f5_2820_0.jpg",
    "https://local.nomin.mn/uploads/files/post/image/eb2b6696c962b71876afca0754a7af69_2701_0.jpg"
];

function Index() {
    const [data] = useState(foodImages);
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
          let user = JSON.parse(userInfo);
          localApi
            .post('mobileEventHome', {
              jwt: user.jwt,
              dep_map: user.dep_map,
              job_id: user.job_id,
              emp_id: user.emp_id,
            })
            .then(res => {
                console.log(res.data);
            //   if (res.data.code == '200') {
            //     console.log(res.data);
            //   }
            })
            .catch(err => {
              console.log(err.message);
            });
        });
      };

    return (
        <View style={{ flex: 1, marginBottom: "5%" }}>
            <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 16, color: "#000", margin: 10 }}>
                Анхааруулах мэдээ
            </Text>
            <Carousel
                {...baseOptions}
                loop={false}
                style={{ width: "100%", justifyContent: "center" }}
                autoPlay={false}
                autoPlayInterval={1000}
                data={data}
                pagingEnabled={true}
                onSnapToItem={(index) => console.log("current index:", index)}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, marginLeft: 3 }}>
                        <Image source={{ uri: item }} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
                    </View>
                )}
            />
        </View>
    );
}

export default Index;
