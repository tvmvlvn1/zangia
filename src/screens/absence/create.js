import React, { useCallback, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Lottie from 'lottie-react-native';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header.js';
import ListBottom from "./components/listBottom.js"
import api from "../../api/localApi.js";

const Detail = (props) => {
    const { navigation } = props;
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [paidType, setPaidType] = useState("");
    const [multiOpen, setMultiOpen] = useState(false)
    const [dates, setDates] = useState([])
    const [timeOpen, setTimeOpen] = useState(false)
    const [endTimeOpen, setEndTimeOpen] = useState(false)
    const [reason, setReason] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [locale, setLocale] = useState('en-GB')
    const [time, setTime] = useState({
        hours: "",
        minutes: ""
    })
    const [endTime, setEndTime] = useState({
        hours: "",
        minutes: ""
    })
    let timeDate = new Date()
    let eneTimeDate = new Date()
    time.hours !== undefined && timeDate.setHours(time.hours)
    time.minutes !== undefined && timeDate.setMinutes(time.minutes)
    endTime.hours !== undefined && eneTimeDate.setHours(endTime.hours)
    endTime.minutes !== undefined && eneTimeDate.setMinutes(endTime.minutes)

    const onDismissMulti = useCallback(() => {
        setMultiOpen(false)
    }, [])

    const onChangeMulti = useCallback((params) => {
        setMultiOpen(false)
        setDates(params.dates)
    }, [])

    const onDismissTime = useCallback(() => {
        setTimeOpen(false)
    }, [setTimeOpen])

    const onDismissEndTime = useCallback(() => {
        setEndTimeOpen(false)
    }, [setEndTimeOpen])

    const onConfirmTime = useCallback(
        ({ hours, minutes }) => {
            setTimeOpen(false)
            setTime({ hours, minutes })
        },
        [setTimeOpen, setTime]
    )

    const onConfirmEndTime = useCallback(
        ({ hours, minutes }) => {
            setEndTimeOpen(false)
            setEndTime({ hours, minutes })
        },
        [setEndTimeOpen, setEndTime]
    )

    const timeFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat(locale, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        [locale]
    )

    const dateFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
        [locale]
    )

    const warningForAbsenceRequest = () => {
        if (
          !type ||
          !time.hours ||
          !endTime.hours ||
          !reason ||
          dates.length < 1
        ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Талбар хоосон байна',
                textBody: `Та дахин нэг шалгана уу !!!`,
                textBodyStyle: { fontFamily: "Montserrat-Bold" }
            })
        } else {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Чөлөөний хүсэлт',
            textBody: 'Чөлөөний хүсэлт илгээхдээ итгэлтэй байна уу?',
            button: 'Тийм',
            onPressButton: () => sendNewAbsenceReq(),
            textBodyStyle: { fontFamily: "Montserrat-Bold" }
        })
        }
    };

      const sendNewAbsenceReq = async () => {
        setIsLoading(true);
        await AsyncStorage.getItem('userInfo').then(userInfo => {
            let user = JSON.parse(userInfo);
            const firstDate = dates[0];
            const endDate = dates[1];
            const nextDayDate = new Date(firstDate);
            const endDayDate = new Date(endDate);
            nextDayDate.setDate(nextDayDate.getDate());
            endDayDate.setDate(endDayDate.getDate());
            const formattedDate = nextDayDate.toLocaleDateString('mn', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-');
            const endFormattedDate = nextDayDate.toLocaleDateString('mn', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-');
            
            api.post("AbsenceRequestCreate", JSON.stringify({
                jwt: user.jwt,
                type_selection: type,
                type_selection_for_paid_leaves: paidType,
                description: reason,
                date_from: formattedDate + " " + timeFormatter.format(timeDate) + ":00",
                date_to: endFormattedDate + " " + timeFormatter.format(eneTimeDate) + ":00",
            })).then((res) => {
                console.log(res.data);
                if (res.data?.data?.result == 'success') {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Амжилттай илгээгдлээ',
                        textBody: 'Амжилттай чөлөөний хүсэлт үүслээ.',
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                    
                    setTimeout(() => {
                        navigation.goBack();
                    }, 2000);
                  } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Алдаа гарлаа !!!',
                        textBody: `${res.data.message}`,
                        textBodyStyle: { fontFamily: "Montserrat-Bold" }
                    })
                  }
            }).catch((err) => {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Алдаа гарлаа !!!',
                    textBody: `${err.message}`,
                    textBodyStyle: { fontFamily: "Montserrat-Bold" }
                })
            }).finally(() => {
                setIsLoading(false);
            })
        })
      };

    if (isLoading) {
        return (
          <Lottie
            autoPlay
            loop
            style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}
            source={require('../../assets/lottie/loading.json')}
          />
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header name={"Хүсэлт илгээх"} navigation={navigation}/>
            <DatePickerModal
                locale={locale}
                mode="multiple"
                visible={multiOpen}
                onDismiss={onDismissMulti}
                dates={dates}
                onConfirm={onChangeMulti}
            />
            <TimePickerModal
                locale={locale}
                visible={timeOpen}
                onDismiss={onDismissTime}
                onConfirm={onConfirmTime}
                hours={time.hours}
                minutes={time.minutes}
            />
            <TimePickerModal
                locale={locale}
                visible={endTimeOpen}
                onDismiss={onDismissEndTime}
                onConfirm={onConfirmEndTime}
                hours={endTime.hours}
                minutes={endTime.minutes}
            />
            <View style={{ justifyContent: "space-between", flex: 1 }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        setStatus(true) 
                    }}>
                        <View style={{ marginTop: 10, padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={require("../../assets/images/categories.png")}
                                    style={{ width: 30, height: 30 }}
                                />
                                <Text style={{ fontFamily: "Montserrat-Medium", color: "#000", fontSize: 15, marginLeft: 10 }}>
                                    {type && 
                                        type === "unpaid_leave" ? "Цалингүй чөлөө" :  
                                        type === "paid_leave" ? "Цалинтай чөлөө" : 
                                        type === "sick_leave" ? "Өвчний чөлөө" : 
                                        type === "covid19" ? "Ковид 19 өвчний чөлөө" : 
                                        type === "annualleave_request" ? "Ээлжийн амралт" : 
                                        "Чөлөөний төрөл"
                                    }
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
                    <TouchableOpacity onPress={() => setMultiOpen(true)} style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <View >
                        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 11 }}>
                        Эхлэх, дуусах өдөр
                        </Text>
                        <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 13 }}>
                        {dates
                            ?.map((d) => dateFormatter.format(d))
                            .filter(Boolean)
                            .join(', ') || 'Сонгогдсон өдөр байхгүй'}
                        </Text>
                    </View>
                    <View>
                        <SimpleLineIcons
                        name='arrow-right'
                        size={16}
                        color={'#1D1617'}
                        />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTimeOpen(true)} style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <View >
                        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 11 }}>
                        Эхлэх - цаг, минут
                        </Text>
                        <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 13 }}>
                            {time &&
                            time.hours !== undefined &&
                            time.minutes !== undefined
                                ? timeFormatter.format(timeDate) + ":00"
                                : 'No time selected.'}
                        </Text>
                    </View>
                    <View>
                        <SimpleLineIcons
                        name='arrow-right'
                        size={16}
                        color={'#1D1617'}
                        />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEndTimeOpen(true)} style={{ padding: 15, borderRadius: 16, backgroundColor: "#F7F8F8", marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <View >
                        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 11 }}>
                            Дуусах - цаг, минут
                        </Text>
                        <Text style={{ fontFamily: "Montserrat-SemiBold", color: "#1D1617", fontSize: 13 }}>
                            {endTime &&
                                endTime.hours !== undefined &&
                                endTime.minutes !== undefined
                                    ? timeFormatter.format(eneTimeDate) + ":00"
                                    : 'No time selected.'}
                        </Text>
                    </View>
                    <View>
                        <SimpleLineIcons
                        name='arrow-right'
                        size={16}
                        color={'#1D1617'}
                        />
                    </View>
                    </TouchableOpacity>
                    <Fumi
                        placeholder='Шалтгаан'
                        iconClass={FontAwesomeIcon}
                        iconName={'user-o'}
                        iconColor={'#97B6FE'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                        inputStyle={{ fontFamily: "Montserrat-Medium", color: "#000", marginBottom: 13, fontSize: 15 }}
                        style={{ backgroundColor: "#F7F8F8", borderRadius: 14, fontFamily: "Montserrat-Medium", marginHorizontal: 20, }}
                    />
                </View>
                <TouchableOpacity 
                    style={{ backgroundColor: "#fff", borderRadius: 99, alignItems: "center", marginHorizontal: 20, marginBottom: "2%" }} 
                    onPress={() => warningForAbsenceRequest()}
                >
                    <LinearGradient
                        colors={[ '#92A3FD', '#9DCEFF' ]}
                        style={{ width: "100%", padding: 20, borderRadius: 99, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
                    > 
                        <Text style={{ fontFamily: "Montserrat-Bold", color: '#fff', textTransform: "uppercase" }}>
                            Илгээх
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            { status && <ListBottom setStatus={setStatus} type={type} setType={setType} setPaidType={setPaidType} /> }
        </View>
    )
}

export default Detail;