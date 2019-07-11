import React,{ Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, AsyncStorage} from 'react-native';
import Swiper from 'react-native-swiper';
import NavigatorUtil from '../navigators/NavigatorUtil';

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
class SliderImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loop: false
        }

    }

    goHome(){
        AsyncStorage.setItem('isFirst','toHome')
        NavigatorUtil.resetToHomePage({
            navigation: this.props.navigation
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Swiper 
                    style={styles.wrapper} 
                    dot={<View style={styles.dot}></View>}
                    activeDot={<View style={styles.activeDot}></View>}
                    paginationStyle={styles.pagination}
                    loop={this.state.loop}
                >
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/guide124222081.png')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/guide124222082.png')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/guide124222083.png')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/guide124222084.png')}></Image>
                        <TouchableOpacity
                            style={styles.enterbtn}
                            onPress={() => this.goHome()}
                            activeOpacity={1}
                        >
                            <View >
                                <Text style={{color:'#414141',fontSize:13}}>马上体验</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </Swiper>
            </View>
        )
    }
}
export default SliderImg

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        width: width 
    },
    slide: {
      flex: 1,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    img: {
      flex:1,
      width: width 
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        marginLeft: 10,
        marginRight: 10
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: '#414141',
        borderColor: '#414141',
        marginLeft: 10,
        marginRight: 10
    },
    pagination: {
        bottom: 16
    },
    enterbtn: {
        width: 120,
        position: 'absolute',
        left: width/2-60,
        bottom: 40,
        height: 36,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#414141',
        borderWidth: 0.5,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center'
    },
  })