import React from "react";
import { View } from "react-native";
import {Agenda} from 'react-native-calendars';

import Header from '../../components/Header.js';

const Index = (props) => {
    const { navigation } = props
    return (
        <View style={{ flex: 1, backgroundColor: "#fff"}}>
            <Header name={"Календар"} navigation={navigation}/>
            <Agenda
                markingType={'multi-period'}
                monthFormat={'yyyy MM' + ' сар'}
                theme={{
                    agendaKnobColor: '#1660AB',
                    textDayFontFamily: 'Montserrat-Medium',
                    textMonthFontFamily: 'Montserrat-Medium',
                    textDayHeaderFontFamily: 'Montserrat-Medium',
                }} 
              />
        </View>
    )
}

export default Index;