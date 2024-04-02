import { StyleSheet, View } from 'react-native'
import React from 'react'

const Dots = () => {
    return (
        <View style={styles.container}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
        </View>
    )
}

export default Dots

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    dot:{
        width: 20,
        height: 20,
        borderRadius: 180,
        borderWidth: 3,
        borderColor: '#eee',
        marginRight: 12
    }
})