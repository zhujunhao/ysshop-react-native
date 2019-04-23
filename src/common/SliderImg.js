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
                        <Image style={styles.img} source={require('../../res/i6-2.jpg')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/i6-3.jpg')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/i6-4.jpg')}></Image>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../res/i6-5.jpg')}></Image>
                        <TouchableOpacity
                            style={styles.enterbtn}
                            onPress={() => this.goHome()}
                            activeOpacity={1}
                        >
                            <View >
                                <Text style={{color:'#999',fontSize:13}}>马上体验</Text>
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
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        marginLeft: 12,
        marginRight: 12
    },
    activeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: '#ff4800',
        borderColor: '#ff4800',
        marginLeft: 12,
        marginRight: 12
    },
    pagination: {
        bottom: 30
    },
    enterbtn: {
        width: 160,
        position: 'absolute',
        left: width/2-80,
        bottom: 60,
        height: 38,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center'
    },
  })