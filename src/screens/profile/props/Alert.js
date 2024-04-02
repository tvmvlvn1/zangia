import React, { Component } from 'react'
import { StyleSheet } from "react-native";
import AlertPro from "react-native-alert-pro";

export class Alert extends Component {
  
    render() {
        const {
            setAlert,
            title,
            warningTxt
        } = this.props

        let check = true


        return (
            <>
                <AlertPro
                ref={async(ref) => {
                    this.AlertPro = await ref
                    if(this.AlertPro){
                        await this.AlertPro.open()
                    }
                    check = await false
                }}
                onConfirm={() => {
                    if(!check){
                        this.AlertPro.close()
                    }
                    setAlert(false)
                }}
                onClose={() => {
                    if(!check){
                        this.AlertPro.close()
                    }
                    setAlert(false)
                }}
                title={title}
                message={warningTxt}
                textConfirm="Хаах"
                showCancel={false}
                customStyles={{
                    mask: {
                    backgroundColor: "transparent"
                    },
                    container: {
                    borderWidth: 1,
                    borderColor: "#eee",
                    shadowColor: "#000000",
                    shadowOpacity: 0.1,
                    shadowRadius: 20
                    },
                    buttonCancel: {
                    backgroundColor: "#a51c30"
                    },
                    buttonConfirm: {
                    backgroundColor: "#a51c30"
                    }
                }}
                />
        </>
        )
    }
}

export default Alert