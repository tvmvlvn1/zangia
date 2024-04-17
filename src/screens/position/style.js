/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Colors} from '../../components/global/Colors';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    positionHeader: {
        backgroundColor: '#222831',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 250, 250, 0.2)',
    },
    positionHeaderText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    positionHeaderBtn: {
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: '#B4B4B8',
        borderWidth: 1,
        borderRadius: 5,
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ececec',
    },
    dates: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    positionName: {
        padding: 15,
        width: '80%',
        flexDirection: 'column',
    },
    heltesName: {
        fontSize: 11,
        fontFamily: "Montserrat-Medium"
    },
    phoneAction: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionNameName: {
        fontSize: 15,
        color: '#444444',
        fontFamily: "Montserrat-SemiBold"
    },
    positionNameJob: {
        fontSize: 12,
        color: '#2e5fa6',
        fontFamily: "Montserrat-Medium"
    },
    positionNameJob2: {
        fontSize: 12,
        color: '#dd4e42',
        fontFamily: "Montserrat-Medium"
    },
    positionNameJob3: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
    },
    positionIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionNameJob10: {
        borderRadius: 4,
        marginTop: 5,
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        color: "#000"
    },
});
