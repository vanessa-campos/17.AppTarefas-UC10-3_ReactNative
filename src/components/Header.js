import React, { Component } from "react";
import { View, Text} from 'react-native';
import { header } from '../styles/index.js';

class Header extends Component {

    render() {
        return (
            <View>
                <View style={header.container}>
                    <Text style={header.title}>Tarefas</Text>
                    <Text style={header.date}>{new Date().toDateString()}</Text>
                </View>
            </View>
        )

    }

}

export default Header;