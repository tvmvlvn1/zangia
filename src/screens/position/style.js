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
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#fff'
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
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    phoneAction: {
        width: '20%',
        borderLeftColor: '#eee',
        borderLeftWidth: 1,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionNameName: {
        fontSize: 18,
        color: '#444444',
        fontWeight: '400',
    },
    positionNameJob: {
        marginTop: 5,
        fontSize: 12,
        color: '#2e5fa6',
        // fontWeight: '400',
    },
    positionNameJob2: {
        marginTop: 5,
        fontSize: 12,
        color: '#dd4e42',
        fontWeight: '400',
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
        fontWeight: '400',
    },
});
