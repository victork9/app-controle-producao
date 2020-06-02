import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput,ScrollView, Alert, Keyboard, ActivityIndicator,AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api';
import styles from './style'

export default function Logon() {
    const navigation = useNavigation()
    const [Usuario, setUsuario] = useState('');
    const [Senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUsuario('')
        setSenha('')
    }, [])

    async function login() {
        setLoading(true)
        if (Usuario == '') {
            Alert.alert("Campo usuário Vazio")
        } else if (Senha == '') {
            Alert.alert("Senha Vazia")
        } else {

            try {
                const response = await api.post('/login/', {
                    usuario: Usuario,
                    senha: Senha
                })
                if (response.data.status == 'Correto') {
                    await AsyncStorage.setItem('DataUser', JSON.stringify(response.data.cpf))
                    navigation.navigate('Tabs', {
                        screen: 'Home',
                        params: { user: response.data.cpf }
                    })
                    setLoading(false)
                    Keyboard.dismiss()
                } else if (response.data == 'Usuario Incorreto') {
                    Alert.alert("Usuário incorreto")
                    setLoading(false)
                } else if (response.data == 'Senha inválida') {
                    Alert.alert("Senha incorreta")
                    setLoading(false)
                } else if (response.data == 'Usuário não cadastrado') {
                    Alert.alert("Usuário não cadastrado")
                    setLoading(false)
                }


            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.containerBack}>
        <View>
            <View style={styles.containerIntCenter}>
                <TextInput

                    autoCapitalize='characters'
                    keyboardType='decimal-pad'
                    maxLength={12}
                    placeholder='CPF'
                    placeholderTextColor='#000'
                    style={styles.inputs}
                    onChangeText={text => setUsuario(text)}
                    value={Usuario}
                />
                <TextInput
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='SENHA'
                    placeholderTextColor='#000'
                    style={[styles.inputs, { marginTop: 10 }]}
                    onChangeText={text => setSenha(text)}

                />
                <View style={styles.textCenter}>
                    <TouchableOpacity onPress={() => navigation.navigate('CadastroUser')}
                        style={{ marginHorizontal: 20, }}>
                        <Text style={styles.infos}>Não possui Cadastro ?</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgetPass')}
                        style={{ marginHorizontal: 20, }}>
                        <Text style={styles.infos}>Esqueceu a senha ?</Text></TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={login}
                    style={styles.btnLogin}>
                    <Text style={styles.txtEntrar}>Entrar</Text>
                </TouchableOpacity>

                {loading == true ? 
                <View style ={{alignItems:'center', marginTop:20}}>
                <ActivityIndicator animating={loading} color="blue" size={50} /> 
                </View>
                : null}
            </View>

        </View>
        </ScrollView>
    )
}