import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MIcon from 'react-native-vector-icons/Entypo'


const AddSelf = (props) => {

    const {
        navigation
    } = props


    return (
        <>
            <TouchableOpacity style={styles.addclustercontainer} onPress={navigation}>
                <MIcon
                name={'plus'}
                style={[styles.iconstyle, {color: '#fff'}]}
                size={28}
                />
            </TouchableOpacity>
        </>
    )
}

export default AddSelf

const styles = StyleSheet.create({
    addclustercontainer:{
        width: 50,
        height: 50,
        backgroundColor: '#3b5998',
        borderRadius: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25,
        right: 25
    }
})