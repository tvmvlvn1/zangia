import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';

import localApi from '../../api/localApi';
import {AuthContext} from '../../context/AuthContext';

const BottomSheet = ({ setStatus, setSelected }) => {
    const [data, setData] = useState([]);
    const {logout} = useContext(AuthContext);
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

    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        await AsyncStorage.getItem('userInfo').then(userInfo => {
          let user = JSON.parse(userInfo);
          localApi
            .post('department', {jwt: user.jwt})
            .then(res => {
              if (res.data.code == 200) {
                let newArray = res.data.data.map((item) => {
                  return { key: item.id, value: item.name }
                });
    
                setData(newArray)
              } else if (res.data.code == 303) {
                logout();
              }
            })
            .catch(err => {
              Alert.alert('Алдаа гарлаа.₮₮₮', err.message);
            });
        });
    };

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: '60%' }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontFamily: "Montserrat-Bold", color: "#000" }}>
                                    Салбар газар хэлтэс
                                </Text>
                            </View>
                            <SelectList 
                                placeholder='Салбар газар, Хэлтэс'
                                setSelected={(e) => {
                                    setSelected(e)
                                    setStatus(false)
                                }} 
                                data={data}
                                search={true} 
                                boxStyles={{ borderRadius: 10, marginTop: 10 }}
                                fontFamily="Montserrat-Medium"
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                    setSelected(null)
                                    setStatus(false)
                                }} style={{ width: "100%", alignSelf: "center" }}>
                                <LinearGradient 
                                    colors={[ '#9CCBFF', '#9DCEFF' ]}
                                    style={{ padding: 15, borderRadius: 99, alignItems: "center" }}
                                >
                                    <Text style={{ color: "#fff", fontFamily: "Montserrat-SemiBold", fontSize: 16 }}>
                                        Хайлт цэвэрлэх
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
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
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
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