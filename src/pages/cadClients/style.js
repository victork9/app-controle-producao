import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    txtTop: {
        fontSize: 23,
        opacity: 0.6,
        textAlign: "center",
        marginTop: 20,
    },
    vwCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    input: {
        fontSize: 17,
        borderRadius: 7,
        borderWidth: 1,
        marginTop: 15,
        borderColor: '#1E90FF',
        width: '60%',
        height: 50,
        padding: 10
    },
    btnCad: {
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 7,
        height: 50,
        borderWidth: 1,
        backgroundColor: '#1E90FF',
        borderColor: 'white',
        width: '70%'
    },
    txtCad: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18
    }
})