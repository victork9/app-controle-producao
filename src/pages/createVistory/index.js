import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, ScrollView, Picker, TextInput, TouchableOpacity, BackHandler, Alert, SafeAreaView } from 'react-native'
import api from '../../services/api'
import styles from './style'


export default function CreateVistory() {
    const routes = useRoute()
    const navigation = useNavigation()
    const [cliente, setCliente] = useState([]);
    const [ClienteSelected, setClienteSelected] = useState('');
    const [tipo, setTipo] = useState("");
    const [tipoSin, setTipoSin] = useState("");
    const [valor, setValor] = useState("");
    const [sinistro, setSinistro] = useState("");
    const [placa, setPlaca] = useState("");

    // Alert.alert("teste")

    function confirmCreate() {
        Alert.alert('Confirmar Vistoria', `Deseja Confirmar o cadastro ?`,
            [
                { text: 'Cancelar', onPress: () => console.log('Cancelar') },
                { text: 'OK', onPress: () => addProd() }

            ],
            { cancelable: false });
    }

    async function listClientes() {
        const response = await api.post('/listClientes/', {
            identificador: routes.params.user
        })
        setCliente(response.data)
    }

    useEffect(() => {
        listClientes();
    }, [])



    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.

            if (routes.name != 'Home') {
                navigation.goBack();
                return false;
            }
            return true;
        });
    })

    async function addProd() {
        if (cliente == [] || tipo
            == "" || tipoSin == "" || valor == "") {
            Alert.alert("Preencha todos os campos da vistoria")
        } else {
            try {
                const response = await api.post('cadProd', {
                    cliente: ClienteSelected,
                    tipo: tipo,
                    tipoSin: tipoSin,
                    valor: valor,
                    placa: placa.toUpperCase(),
                    sinistro: sinistro,
                    idUser: routes.params.user
                })
                console.log(response)
                if (response.data == 'Realizado') {
                    setTipo("")
                    setPlaca("")
                    setSinistro("")
                    setTipoSin("")
                    setValor("")
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <SafeAreaView style={{ margin: 10, flex: 1 }}>
            <View style ={{marginTop:10}}>
                <Text style={styles.txtTop}>Cadastro de Produção</Text>
            </View>
            <ScrollView>
                <View style={styles.containerPrin}>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 17, }}>Cliente:</Text>
                            <TouchableOpacity
                                onPress={listClientes}>
                                <Text style={{ fontSize: 15, color: '#1E90FF' }}>Atualizar Clientes</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vwpickerItem}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={ClienteSelected}
                                style={styles.pickerItem}
                                onValueChange={(item) => setClienteSelected(item)}
                            >
                                <Picker.Item color='#696969' label="Selecione um cliente" value="" />
                                {cliente.map((item, index) => (

                                    <Picker.Item key={index} label={item.Clientes} value={item.Clientes} />
                                ))}

                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, }}>Tipo:</Text>
                        <View style={styles.vwpickerItem}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={tipo}
                                style={styles.pickerItem}
                                onValueChange={(itemValue) => setTipo(itemValue)}
                            >
                                <Picker.Item color='#696969' label="Inicial / Complemento" value="" />
                                <Picker.Item label="INICIAL" value="INICIAL" />
                                <Picker.Item label="COMPLEMENTO" value="COMPLEMENTO" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, }}>Placa:</Text>
                        <TextInput
                            value={placa}
                            onChangeText={text => setPlaca(text.toUpperCase())}
                            placeholder='Ex: ABC1234'
                            maxLength={7}
                            autoCapitalize='characters'
                            placeholderTextColor='#696969'

                            style={styles.inputs}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, }}>Sinistro:</Text>
                        <TextInput
                            value={sinistro}
                            onChangeText={(text) => setSinistro(text)}
                            placeholder='Ex: 0145847'
                            placeholderTextColor='#696969'
                            keyboardType='decimal-pad'
                            style={styles.inputs}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, }}>Tipo de Sinistro:</Text>
                        <View style={styles.vwpickerItem}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={tipoSin}
                                style={styles.pickerItem}
                                onValueChange={(itemValue) => setTipoSin(itemValue)}
                            >
                                <Picker.Item color='#696969' label="Selecione um tipo de sinistro" value="" />
                                <Picker.Item label="LEVE" value="LEVE" />
                                <Picker.Item label="PESADOS" value="PESADOS" />
                                <Picker.Item label="OUTROS BENS" value="OUTROS BENS" />
                                <Picker.Item label="OUTROS" value="OUTROS" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, }}>Valor:</Text>
                        <TextInput
                            value={valor}
                            onChangeText={text => setValor(text)}
                            placeholder='Ex: R$99,99'
                            placeholderTextColor='#696969'
                            keyboardType='decimal-pad'
                            style={styles.inputs}
                        />
                    </View>



                    <View style={styles.vwEnd}>
                        <TouchableOpacity onPress={confirmCreate}
                            style={styles.btnCad}>
                            <Text style={styles.txtCad}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView >
    )
}