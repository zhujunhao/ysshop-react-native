import React, { Component } from 'react';
import { StyleSheet, View, Image,Dimensions,AsyncStorage } from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import { connect } from 'react-redux';
var WINDOW = Dimensions.get("window");
var width = WINDOW.width;

class WelcomePage extends Component {
    componentDidMount() {
        //AsyncStorage.removeItem('isFirst')
        this.timer = setTimeout(()=> {
            AsyncStorage.getItem('isFirst').then((value) => {
                // 重置到首页
                if (value == 'toHome') {
                    NavigatorUtil.resetToHomePage({
                        navigation: this.props.navigation
                    })
                // 重置到引导页
                } else {
                    NavigatorUtil.resetToSlidePage({
                        navigation: this.props.navigation
                    })
                }
            }).catch(() => {
                NavigatorUtil.resetToSlidePage({
                    navigation: this.props.navigation
                })
            });
        },3000)
    }

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Image
                    style={styles.imgBox}
                    resizeMode={'center'}
                    source={require('../../res/qd.jpg')}
                ></Image>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect (null,mapDispatchToProps)(WelcomePage);

const styles = StyleSheet.create({
    imgBox: {
        flex:1,
        width: width,
        backgroundColor: '#fff'
    }

});