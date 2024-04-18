import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity, Image, ScrollView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const BottomSheet = ({ setStatus, type, setType, setPaidType }) => {
    const [isPaid, setIsPaid] = useState(false)
    const slide = React.useRef(new Animated.Value(300)).current;
    const category = [
        {label: 'Цалингүй чөлөө', value: 'unpaid_leave'},
        {label: 'Цалинтай чөлөө', value: 'paid_leave'},
        {label: 'Өвчний чөлөө', value: 'sick_leave'},
        {label: 'Ковид 19 өвчний чөлөө', value: 'covid19'},
        {label: 'Ээлжийн амралт', value: 'annualleave_request'},
    ];

    const paidCategory = [
        {label: 'Цалинтай сургалт', value: 'paid_training'},
        {label: 'Хэсэгчлэн', value: 'partially_paid_leave'},
        {label: 'Quarantine', value: 'quarantine'},
        {label: 'Аав болсны 10 хоног', value: 'new_father'},
        {label: 'Шинэхэн гэрлэсний 5 хоног', value: 'honey_moon'},
        {label: 'Ажил явдал', value: 'close_relative'},
        {label: 'Эрүүл мэндийн чөлөөний цаг', value: 'health_care'},
        {label: 'School police', value: 'school_police'},
        {label: 'Өвчтөн асрах 3 хоног', value: 'take_care_for_patient'},
        {label: 'Хичээлийн шинэ жилийн эхний өдөр', value: 'firstday_of_school'},
        {label: 'Бусад', value: 'out_of_rule'},
    ];
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
            <Pressable style={{ width: '100%', height: '70%', }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View style={{ width: "100%" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {isPaid &&
                                <TouchableOpacity onPress={() => setIsPaid(false)}>
                                    <SimpleLineIcons
                                        name='arrow-left'
                                        size={18}
                                        color={'#1D1617'}
                                    />
                                </TouchableOpacity>
                            }
                            <Text style={{ fontSize: 16, fontFamily: "Montserrat-Bold", color: "#000" }}>
                                {isPaid ? "Цалинтай чөлөөний төрөл" : "Чөлөөний төрөл"}
                            </Text>
                        </View>
                        <ScrollView>
                            {!isPaid ?
                                <>
                                    {category.map((item) => (
                                        <TouchableOpacity 
                                            key={item.value}
                                            onPress={() => {
                                                setType(item.value)
                                                if(item.value != "paid_leave") {
                                                    closeModal()
                                                } else {
                                                    setIsPaid(true)
                                                }
                                            }}
                                        >
                                            <View style={{ marginTop: 10, padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Image
                                                        source={require("../../../assets/images/categories.png")}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", fontSize: 15, marginLeft: 10 }}>
                                                        {item.label}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <SimpleLineIcons
                                                        name='arrow-right'
                                                        size={16}
                                                        color={'#1D1617'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </> 
                                :
                                <>
                                    {paidCategory.map((item) => (
                                        <TouchableOpacity 
                                            key={item.value}
                                            onPress={() => {
                                                setPaidType(item.value)
                                                closeModal()
                                            }}
                                        >
                                            <View style={{ marginTop: 10, padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Image
                                                        source={require("../../../assets/images/categories.png")}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", fontSize: 15, marginLeft: 10 }}>
                                                        {item.label}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <SimpleLineIcons
                                                        name='arrow-right'
                                                        size={16}
                                                        color={'#1D1617'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            }
                        </ScrollView>
                    </View>
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