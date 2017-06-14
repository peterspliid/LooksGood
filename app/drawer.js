'use strict';

import React, { Component } from 'react';

import {
    DrawerLayoutAndroid,
    View,
    Text,
    TouchableHighlight,
    BackHandler,
} from 'react-native';


export default class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.activateBack = this.activateBack.bind(this);
        this.deactivateBack = this.deactivateBack.bind(this);
    }
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                Im in the Drawer
                </Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                ref={el => this.drawer = el}
                drawerWidth={200}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
                onDrawerOpen={this.activateBack}
                onDrawerClose={this.deactivateBack}>
            <TouchableHighlight onPress={this.openDrawer}>
                <Text>Open</Text>
            </TouchableHighlight>
            {this.props.children}
            </DrawerLayoutAndroid>
        );
    }
    openDrawer() {
        this.drawer && this.drawer.openDrawer();
    }

    closeDrawer() {
        this.drawer && this.drawer.closeDrawer();
        return true;
    }

    activateBack() {
        BackHandler.addEventListener('hardwareBackPress', this.closeDrawer);
    }

    deactivateBack() {
        BackHandler.removeEventListener('hardwareBackPress', this.closeDrawer);
    }
}
