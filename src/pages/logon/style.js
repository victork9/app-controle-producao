import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    containerBack: {
        backgroundColor: '#f0f0f5',
        flex: 1,
        alignItems:'center'
    },
    containerIntCenter: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    inputs: {
        height: 50,
        width: '70%',
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 7,
        borderColor: '#000',
        borderWidth: 1
    },
    textCenter: {
        marginTop: 16,
        flexDirection: "row",
        flex: 0,
        justifyContent: 'space-between'
    },
    infos: {
        fontSize: 16,
        fontWeight: '900'
    },
    btnLogin: {
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 7,
        height: 50,
        borderWidth: 1,
        backgroundColor: '#1E90FF',
        borderColor: 'white',
        width: '50%'
    },
    txtEntrar: {
        textAlign: "center",
        color: "#fff",
        fontSize: 17
    }
})