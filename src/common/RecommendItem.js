import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseItem from './BaseItem';
import {Dimensions} from "react-native";

export default class RecommendItem extends BaseItem {
    render() {
        const {projectModel,theme} = this.props;
        console.log("popo125",JSON.stringify(this.props))
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
                            source={{uri: item.picGoods}}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.titGoods}
                    </Text>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row',width:60,height:16,borderColor:theme.themeColor,borderWidth:1,borderRadius:4}}>
                            <View style={{alignItems:'center',justifyContent:'center',padding:5,backgroundColor:theme.themeColor}}>
                                <Text style={{color:'#fff',fontSize:10}}>券</Text>
                            </View>
                            <View style={{height:14,width:1,backgroundColor:theme.themeColor}}></View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:theme.themeColor,fontSize:10}}>{`${item.CouponNum}元`}</Text>
                            </View>
                        </View>
                        <Text style={{fontSize:10}}>{`月销量${item.monthNum}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{height:30,flexDirection: 'row',alignItems:'center'}}>
                            <Text style={{fontSize:12}}>券后￥:</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'#666'}}>{item.qhjGoods}</Text>
                        </View>
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
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:5,
            paddingLeft:8,
            paddingRight:8,
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