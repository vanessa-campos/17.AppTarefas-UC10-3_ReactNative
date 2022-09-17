import { StyleSheet } from "react-native";


const header = StyleSheet.create({
        container:{
            backgroundColor: '#e8e84d', height: 100, 
        },
        title:{
            fontSize: 30, fontWeight: "500", color: 'white', marginHorizontal: 20, marginTop: 15, 
            borderBottomColor: "gray", borderBottomWidth: 2, 
        },
        date:{
            fontSize: 20, fontWeight: "400", color: 'gray', marginLeft: 20, 
        },
})

const cadastro = StyleSheet.create({
    container:{
        flex: 1, margin: 20, borderTopColor: "gray", borderTopWidth: 2, paddingTop: 20, 
    },
    container2:{ 
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, 
    },
    texto:{
        flex: 1, fontSize: 15, marginBottom: 10, 
    },
    input:{
        flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', 
        marginBottom: 10, padding: -10, fontSize: 13, backgroundColor: "#ebe7d1", 
    },
})

const tarefa = StyleSheet.create({
    background:{
        marginHorizontal: 20, paddingTop: 10, borderRadius: 20, flex: 1 
    },
    container:{
        flexDirection: "row", justifyContent: 'space-between', alignItems: "center", fontSize: 12, 
    },
    container1:{
        flex: 3, flexDirection: "row", justifyContent: "space-between", alignItems: "center", 
    },
    container2:{
        flex: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: 'flex-end', alignItems: "center",
    },
    texto:{
        fontSize: 12, fontWeight: "300", color: 'gray', 
    },
    data:{
        flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: 10, fontWeight: "300", 
    },
    button:{
        width: 60, marginLeft: 10, backgroundColor: '#e0c52b', borderRadius: 5, padding: 3, alignItems: "center", marginBottom: 5
    },
    textButton: {
        color: 'white', fontSize: 10, fontWeight: '500'
    }
})

export { header, cadastro, tarefa };