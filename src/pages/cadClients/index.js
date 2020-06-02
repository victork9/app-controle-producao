import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ToastAndroid,Alert, AsyncStorage } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './style'
import api from '../../services/api'
import {listClientes} from '../createVistory'
export default function cadClientes() {
    const navigation = useNavigation();
    const routes = useRoute();
    const [clientes, setClientes] = useState('')

function confirmarCadastro() {
    if(clientes == '') {
        Alert.alert("Insira o nome do cliente ")
    }else {
        Alert.alert('Confirmar Cadastro', `Deseja confirmar o cadastro do cliente ?`,
        [
            { text: 'Cancelar', onPress: () => console.log('Cancelar') },
            { text: 'OK', onPress: () => cadastroClientes() }

        ],
        { cancelable: false });
    }
}
    async function cadastroClientes() {
       
        try {
            const response = await api.post('/cadClientes/', {
                clientesName: clientes,
                fkCad: routes.params.idUser
            })
            // console.log(response)
            if(response.data == 'Existe'){
                Alert.alert("Cliente já está cadastrado")
            }else  if (response.data == 'Cadastrado') {
                ToastAndroid.show("Cadastrado", ToastAndroid.LONG)
                setClientes("")
                listClientes()
            } else {
                Alert.alert("Erro no cadastro")
            }
        } catch (err) {
            console.log(err)
            // ToastAndroid.show("Por favor conect-se á internet", ToastAndroid.LONG)
        }
    }

    function voltar () {
        if(routes.params.pagNavigate == 'user'){
            navigation.navigate('Tabs')
        }else {
            navigation.navigate('Logon')
        }
    }
    return (
        <>
           
                <Text style={styles.txtTop}>Cadastre seus clientes</Text>
            
            <View style={styles.vwCenter}>
                <TextInput
                    value={clientes}
                    onChangeText={text => setClientes(text.toUpperCase())}
                    placeholder="Ex: Oficina ABC"
                    placeholderTextColor='#BEBEBE'
                    autoCapitalize={'characters'}
                    style={styles.input}

                />
                <TouchableOpacity
                    onPress={confirmarCadastro}
                    style={styles.btnCad}>
                    <Text style={styles.txtCad}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:0, justifyContent:'flex-end', alignItems:"center", bottom:20}}>
                
                <TouchableOpacity
                    onPress={voltar}>
                    <Text style={{fontSize:25, color: '#1E90FF'}}>{routes.params.pagNavigate == 'user' ?"Voltar" : "Ir para Login"}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}