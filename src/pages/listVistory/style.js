import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    containerFiltros: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#1E90FF',
        borderWidth: 2,
        padding: 5,
        marginHorizontal: 15,
        marginTop: 10
    },
    inputsFiltro: {
        borderBottomWidth: 1,
        height: 50,
        fontSize: 17,
        textAlign: 'center',
        borderColor: '#000'
    },
    vwCenter: {
        flexDirection: "row",
        marginTop: 15, width: '100%'
    },
    month: {
        fontSize: 25,
        position: 'absolute',
        right: 0,
        left: 0,
        textAlign: "center"
    },
    txtVwCenter: {
        fontSize: 20,
        textAlignVertical: 'center',
        marginTop: 5,
        color: '#1E90FF'
    },
    vwFlat: {
        backgroundColor: '#DCDCDC',
        padding: 10, flex: 1, margin: 20
    },
    txtFlat: {
        fontSize: 17,
        marginTop: 15
    },
    btnVer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        height: 40,
        borderColor: '#1E90FF',
        backgroundColor: '#1E90FF',
        width: '70%',
        borderRadius: 7
    },
    txtVer: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    spinner: {
        position: "absolute",
        zIndex: 10,
        justifyContent: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})