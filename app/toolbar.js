'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ToolbarAndroid,
} from 'react-native';

export default class MyToolbar extends Component {
    render() {
        return (
            <ToolbarAndroid
                style={{height: 50, backgroundColor: 'black'}}
                title={this.props.title}
                navIcon={require('../img/menu.png')}
                titleColor={'white'}
                onIconClicked={this.props.sidebarRef}/>
        );
    }
}