import React, { useState, useEffect } from 'react'
import { View, Text, Alert, TextInput, TouchableOpacity, FlatList, ToastAndroid, Linking,SafeAreaView, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import api from '../../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import styles from './style'

export default function ListVistory() {

    const routes = useRoute()
    const navigation = useNavigation()
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const d = new Date().getMonth();
    const [month, setMonth] = useState(d);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valores, setvalores] = useState([]);
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    async function listVistoRelizadas() {
        if (mes > 12) {
            ToastAndroid.show("Mês inválido", ToastAndroid.LONG)
            return;
        } else if (mes != '' && mes < 10) {
            if (mes.includes("0")) {
                setMonth(mes.replace("0", "") - 1)
            } else {
                setMonth(mes - 1)
            }
        } else {
            setMonth(mes - 1)
        }
        if (mes == '') {
            setMonth(d)
        }

        const DataUser = await AsyncStorage.getItem('DataUser')

        try {
            const response = await api.post('/listVistRealizadas/', {
                idVisto: DataUser.toString(),
                mesFiltro: mes.trim(),
                anoFiltro: ano.trim()
            })
            // console.log(response.data)
            await setvalores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        listVistoRelizadas()
    }, [])

    async function goToDetalhes(name) {
        setLoading(true)

        const DataUser = await AsyncStorage.getItem('DataUser')
        var dataAtual;
        if (mes > 12) {
            ToastAndroid.show("Mês inválido", ToastAndroid.LONG)
            return;
        } else if (mes != '' && mes < 10) {
            if (mes.includes("0")) {
                dataAtual = mes
            } else {
                dataAtual = `0${mes}`
            }
        } else {
            dataAtual = mes
        }
        if (mes == '') {
            if (d < 10) {
                dataAtual = `0${d + 1}`
            }
            else {
                dataAtual = d + 1
            }
        }
        const anoAtual = new Date().getFullYear()
        try {
            const response = await api.post('/listVistDetalhes/', {
                nomeCLiente: name,
                mesVistoria: dataAtual,
                anoVistoria: ano ? ano : anoAtual,
                idUser: DataUser,
                nameMes: monthNames[month]
            })
            // no retorno da api ele abre a versão selecionada em pdf
            if (response.data.status == 'ok') {
                Linking.openURL(`./pdf/${response.data.caminho}`).catch((err) => {
                    console.log(err)
                })
            }
            setTimeout(async () => {
                await api.post('deletarPdf', {
                    caminho: `./pdfs/${response.data.caminho}`
                })
            }, 5000)
            setLoading(false)
        } catch (Err) {
            Alert.alert("erro ao exibir o pdf")
        }

    }

    function limpaCampo() {
        setAno("");
        setMes("");
        listVistoRelizadas();
    }

    return (
        <SafeAreaView >
            <View style={styles.containerFiltros}>

                <Text style={{ fontSize: 20 }}>Filtros:</Text>
                <TextInput
                    value={mes}
                    onChangeText={text => setMes(text)}
                    placeholder='Mês'
                    maxLength={2}
                    autoCapitalize='characters'
                    placeholderTextColor='#696969'
                    keyboardType='decimal-pad'
                    style={[styles.inputsFiltro, { width: '20%' }]}
                />

                <TextInput
                    value={ano}
                    onChangeText={text => setAno(text)}
                    placeholder='Ano'
                    maxLength={4}
                    autoCapitalize='characters'
                    placeholderTextColor='#696969'
                    keyboardType='decimal-pad'
                    style={[styles.inputsFiltro, { width: '25%' }]}
                />
                <View>
                    <TouchableOpacity onPress={listVistoRelizadas}>
                        <MaterialCommunityIcons name={'file-search-outline'} size={40} color={'#000'} />
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.vwCenter}>

                <Text style={styles.month}>{monthNames[month]}</Text>
                <TouchableOpacity style={{ left: 20, position: 'absolute' }} onPress={listVistoRelizadas}>
                    <Text style={styles.txtVwCenter}>Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ right: 20, position: 'absolute' }} onPress={limpaCampo}>
                    <Text style={styles.txtVwCenter}>Limpar</Text>
                </TouchableOpacity>
            </View>
            {loading == true ?
                <View style={styles.spinner}>
                    <ActivityIndicator color='#1E90FF' style={{ opacity: 1 }} size={60} animating={loading} />

                </View> : null}
            <FlatList
                data={valores}
                onRefresh={listVistoRelizadas}
                style={{ marginBottom: 100, marginTop: 40 }}
                refreshing={refreshing}
                keyExtractor={valor => String(valor.id)}
                
                renderItem={({ item }) => (

                    <View style={styles.vwFlat}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>{item.clienteVistoria}</Text>
                        <Text style={styles.txtFlat}>Total realizadas: {item.countColum}</Text>
                        <Text style={styles.txtFlat}>Valor á receber: {` `}
                            {

                                Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(item.valueVistor)}
                        </Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center', heigth: 100, }}>
                            <TouchableOpacity onPress={() => goToDetalhes(item.clienteVistoria)}

                                style={styles.btnVer} >
                                <Text style={styles.txtVer}>Verificar Realizadas</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            />
        </SafeAreaView>
    )
}