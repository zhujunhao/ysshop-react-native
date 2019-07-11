import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseItem from './BaseItem';
import {Dimensions} from "react-native";

export default class RecommendItem extends BaseItem {
    render() {
        const {projectModel,theme} = this.props;
        const {item} = projectModel;
        if (!item || !item.goodsNum) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={styles.ImagePart}>
                        <Image style={styles.picPart}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: item.picGoods}}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.titGoods}
                    </Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={()=>this.dialog.show()}
                            activeOpacity={1}
                        >
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:60,height:20,borderColor:theme.themeColor,backgroundColor:theme.themeColor,borderWidth:1,borderRadius:10}}>
                                <Text style={{color:'#fff',fontSize:10}}>{`券${item.CouponNum}元`}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>
                        <Text style={{fontSize:10,color:'#9d9d9d',marginRight:5}}>{`月销${item.monthNum}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{height:30,flexDirection: 'row',alignItems:'center'}}>
                            <Text style={{fontSize:10}}>券后￥:</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'#666'}}>{item.qhjGoods}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <Text style={{fontSize:10,color:'#9d9d9d'}}>收藏</Text>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
function scaleWidth(w) {
    return width / 375.00 * w
}

const styles = StyleSheet.create({
        cell_container: {
            width: width / 2 - scaleWidth(12),
            backgroundColor: 'white',
            paddingBottom: 10,
            marginLeft: scaleWidth(6),
            marginRight: scaleWidth(6),
            marginBottom: scaleWidth(10),
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 6,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        ImagePart: {
            flex:1,
            height:160,
        },
        picPart: {
            borderRadius: 6,
            flex:1
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:8,
            paddingLeft:6,
            paddingRight:6,
            height:20
        },
        title: {
            flex:1,
            fontSize: 12,
            marginLeft:10,
            marginTop:10,
            color: '#212121',
            
        }
    }
);