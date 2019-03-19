import React, { Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import NavigationUtil from '../navigators/NavigatorUtil';
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';

class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(()=> {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        },2000)
    }

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Image
                    style={{flex:1}}
                    resizeMode={('repeat')}
                    source={require('../../res/1080x1920.png')}
                ></Image>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect (null,mapDispatchToProps)(WelcomePage);
