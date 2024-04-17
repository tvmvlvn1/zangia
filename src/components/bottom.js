import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Pressable } from 'react-native';

const BottomSheet = ({ setStatus, dateText, desc, inTime, outTime }) => {
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

    return(
        <Pressable onPress={ closeModal } style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: '40%', }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontFamily: "Montserrat-Bold", color: "#000" }}>
                            Цагийн дэлгэрэнгүй
                        </Text>
                        <Text style={{ fontSize: 14, fontFamily: "Montserrat-Medium" }}>
                            {dateText}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontFamily: "Montserrat-Medium" }}>
                        {desc} төлөвтэй
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", padding: 10, borderRadius: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Image
                                source={require("../assets/images/timesheet.png")}
                                style={{ width: 40, height: 40 }}
                            />
                            <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", marginLeft: 5 }}>
                                Ирсэн цаг
                            </Text>
                        </View>
                        <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", fontSize: 16 }}>
                            {inTime}:00
                        </Text>
                    </View>
                    {outTime &&
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F7F8F8", padding: 10, borderRadius: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Image
                                    source={require("../assets/images/timesheet.png")}
                                    style={{ width: 40, height: 40 }}
                                />
                                <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", marginLeft: 5 }}>
                                    Тарсан цаг
                                </Text>
                            </View>
                            <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", fontSize: 16 }}>
                                {outTime}:00
                            </Text>
                        </View>
                    }
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