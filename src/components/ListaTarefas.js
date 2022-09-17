import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { tarefa } from '../styles/index';

export default class ListaTarefas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        }
    }

    styleAtraso() {
        if (this.props.DataDia == this.state.day && this.props.DataMes <= this.state.month && this.props.DataAno <= this.state.year) {
            return { color: 'orange', fontSize: 12, fontWeight: "300",  }
        } else if (this.props.DataDia < this.state.day && this.props.DataMes <= this.state.month && this.props.DataAno <= this.state.year) {
            return { color: 'red', fontSize: 12, fontWeight: "300",  }
        } else {
            return { color: 'gray',fontSize: 12, fontWeight: "300",  }
        }
    }

    styleConcluido() {
        if (this.props.Concluido == 'Encerrado') {
            return { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }
        } else {
            return { textDecorationLine: 'none' }
        }
    }

    render() {
        return (
            <View style={tarefa.container}>
                <View style={tarefa.container1}>
                    <Text style={tarefa.texto}>{this.props.id}</Text>
                    <Text style={tarefa.texto}>{this.props.Descricao}</Text>
                    <View style={tarefa.data}>
                        <Text style={this.styleAtraso()}>{this.props.DataDia}</Text>
                        <Text style={this.styleAtraso()}>/</Text>
                        <Text style={this.styleAtraso()}>{this.props.DataMes}</Text>
                        <Text style={this.styleAtraso()}>/</Text>
                        <Text style={this.styleAtraso()}>{this.props.DataAno}</Text>
                    </View>
                    <Text style={tarefa.texto}>{this.props.Prioridade}</Text>
                    <Text style={tarefa.texto}>{this.props.Concluido}</Text>
                </View>
                <View style={tarefa.container2}>
                    <View style={tarefa.button}>
                        <TouchableOpacity onPress={() => { this.props.concluir(this.props.id) }}><Text style={tarefa.textButton}>Concluir</Text></TouchableOpacity>
                    </View>
                    <View style={tarefa.button}>
                        <TouchableOpacity onPress={() => { this.props.deletar(this.props.id) }}><Text style={tarefa.textButton}>Excluir</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
