import React, { useState, } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import api from '../../services/api'
import styles from './style'

export default function CadUser() {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfsenha] = useState('')
    const [Confirm, setConfirm] = useState(false)
  
    function confirmCreate() {
        Alert.alert('Cadastrar Usuário', `Deseja Confirmar o cadastro ?`,
            [
                { text: 'Cancelar', onPress: () => console.log('Cancelar') },
                { text: 'OK', onPress: () => cadUser() }

            ],
            { cancelable: false });
    }
    async function cadUser() {
        if (email == ''
            || cpf == ''
            || senha == ''
            || confSenha == ''
        ) {
            Alert.alert("Preencha todos os campos")
        } else if (!email.includes('@') || !email.includes('.com')) {
            Alert.alert("O email não é um email válido")
        }


        else {
            try {
                const response = await api.post('/cadUser/', {
                    email: email,
                    cpfUser: cpf,
                    senhaUser: senha
                })
               
                Alert.alert(response.data)
                setCpf("")
                setEmail("")
                setSenha("")
                setConfsenha("")
                
                setTimeout(() => {
                    navigation.navigate('cadClients', {
                        idUser: cpf,
                        pagNavigate: "cadUser"
                    })
                }, 1000);
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <View style={{ alignItems: 'center', marginTop: 30,  }}>
                <Text style={{ fontSize: 25, opacity: 0.6 }}>Cadastro</Text>
            </View>
            <View style={styles.vwCadastro}>
                <ScrollView>
                    <Text style={{ fontSize: 17 }}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='characters'
                        keyboardType='email-address'
                        placeholder='Usuario@usuario.com'
                        placeholderTextColor='#BEBEBE'
                        style={styles.inputs}
                    />
                    <Text style={{ fontSize: 17, marginTop: 10 }}>Cpf</Text>
                    <TextInput
                        onChangeText={text => setCpf(text)}
                        keyboardType='decimal-pad'
                        maxLength={12}
                        placeholder='Cpf'
                        value={cpf}
                        placeholderTextColor='#BEBEBE'
                        style={styles.inputs}
                    />
                    <Text style={{ fontSize: 17, marginTop: 10 }}>Senha</Text>
                    <TextInput
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        secureTextEntry={true}
                        placeholder='Senha'
                        placeholderTextColor='#BEBEBE'
                        style={styles.inputs}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                        <Text style={{ fontSize: 17, marginTop: 10 }}>Confirme sua Senha</Text>
                        {(confSenha !== senha && Confirm == true ?
                         <Text style={{ fontSize: 17, marginTop: 10, opacity: 0.6, color: '#FF0000' }}>Senha não coincide</Text> 
                         : null)

                        }
                    </View>
                    <TextInput
                        value={confSenha}
                        onChangeText={(text) => { setConfsenha(text), (text == '' ? setConfirm(false) : setConfirm(true)) }}
                        keyboardType='default'
                        secureTextEntry={true}
                        placeholder='Senha'
                        placeholderTextColor='#BEBEBE'
                        style={styles.inputs}
                    />

                    <TouchableOpacity
                        onPress={confirmCreate}
                        style={styles.btnCad}>
                        <Text style={{ textAlign: "center", color: "#fff",fontSize:17 }}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>

        </>
    )
}