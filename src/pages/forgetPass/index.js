import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native'
import styles from './style'
import api from '../../services/api'
export default function ForgetPass() {
    const [email, setEmail] = useState("")

    async function verificaEmail() {
       
        try {
            const response = await api.post('/envioEmail/', {
                email: email
            })
            console.log(response)
            if (response.data == 'Existe') {
                Alert.alert("Verifique sua caixa de correios")
                setEmail("")
            } else {
                Alert.alert("Email não Existe")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Text style={styles.txtTop}>Insira seu email </Text>

            <View style={styles.vwCenter}>
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text.toUpperCase())}
                    placeholder="usuario@dominio.com"
                    placeholderTextColor='#BEBEBE'
                    style={styles.input}

                />
                <TouchableOpacity
                    onPress={verificaEmail}
                    style={styles.btnCad}>
                    <Text style={styles.txtCad}>Enviar Email</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}