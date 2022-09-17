import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View, Button, TextInput } from 'react-native';

import Database from './src/database/Database'
import Header from './src/components/Header'
import Tarefa from './src/models/Tarefa';
import ListaTarefas from './src/components/ListaTarefas';
import { cadastro, tarefa } from './src/styles';

export default class App extends Component {

  Conectar = () => {
    const banco = new Database()
    banco.Conectar()
    banco.Desconectar()
  }

  constructor(props) {
    super(props)
    this.state = {
      Descricao: "", DataDia: "", DataMes: "", DataAno: "", Prioridade: "", Concluido: "", listaTarefas: []
    }
    this.ListarTarefas()
  }

  ListarTarefas = () => {
    const banco = new Database()
    banco.Listar().then(lista => { this.setState({ listaTarefas: lista }) })
  }

  CadastrarTarefa = (Descricao, DataDia, DataMes, DataAno, Prioridade, Concluido) => {
    const novaTarefa = new Tarefa(Descricao, DataDia, DataMes, DataAno, Prioridade, "Em aberto")
    const banco = new Database()
    banco.Inserir(novaTarefa)
    this.ListarTarefas()
  }

  ConcluirTarefa = (id) => {
    const banco = new Database()
    banco.Concluir(id)
    this.ListarTarefas()
  }

  DeletarTarefa = (id) => {
    const banco = new Database()
    banco.Deletar(id)
    this.ListarTarefas()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ScrollView style={tarefa.background}>
          {this.state.listaTarefas.map(tarefa => (
            <ListaTarefas key={tarefa.id} tarefa={tarefa} id={tarefa.id} Descricao={tarefa.Descricao} DataDia={tarefa.DataDia} DataMes={tarefa.DataMes} DataAno={tarefa.DataAno} Prioridade={tarefa.Prioridade} Concluido={tarefa.Concluido} concluir={this.ConcluirTarefa} deletar={this.DeletarTarefa} />
          ))}
        </ScrollView>
        {/* Entradas de informacoes */}
        <View style={cadastro.container}>
          <View style={cadastro.container2}>
            <Text style={cadastro.texto}>• Descrição:</Text>
            <TextInput style={cadastro.input} placeholder="Digite a descrição" onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
          </View>
          <View style={cadastro.container2}>
            <Text style={cadastro.texto}>• Data do Término:</Text>
            <View style={cadastro.input}>
              <TextInput placeholder={new Date().getDate().toString()} onChangeText={(valor) => { this.setState({ DataDia: valor }) }} />
              <Text>/</Text>
              <TextInput placeholder={(new Date().getMonth() + 1).toString()} onChangeText={(valor) => { this.setState({ DataMes: valor }) }} />
              <Text>/</Text>
              <TextInput placeholder={new Date().getFullYear().toString()} onChangeText={(valor) => { this.setState({ DataAno: valor }) }} />
            </View>
          </View>
          <View style={cadastro.container2}>
            <Text style={cadastro.texto}>• Prioridade:</Text>
            <TextInput style={cadastro.input} placeholder="(Alta/Baixa)" onChangeText={(valor) => { this.setState({ Prioridade: valor }) }} />
          </View>
          <Button color={"#e0c52b"} title={"Adicionar nova tarefa"} onPress={() => { this.CadastrarTarefa(this.state.Descricao, this.state.DataDia, this.state.DataMes, this.state.DataAno, this.state.Prioridade, this.state.Concluido) }} />
        </View>
      </SafeAreaView >
    )
  }
}
