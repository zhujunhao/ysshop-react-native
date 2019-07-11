import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import BaseItem from "./BaseItem";

export default class FavouriteItem extends BaseItem {
    render() {
        const {projectModel,theme} = this.props;
        console.log("ssprops",JSON.stringify(this.props))
        const {item} = projectModel;
        if (!item || !item.goodsNum) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                underlayColor={'transparent'}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={{height: 100, width: 100,borderRadius:6,borderWidth:1,borderColor:'#eee'}}>
                        <Image style={{height: 98, width: 98,borderRadius:6}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: item.picGoods}}
                        />
                    </View>
                    <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.titGoods}
                        </Text>
                        <View style={styles.row}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:60,height:20,borderColor:theme.themeColor,backgroundColor:theme.themeColor,borderWidth:1,borderRadius:10}}>
                                <Text style={{color:'#fff',fontSize:12}}>{`券${item.CouponNum}元`}</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <Text style={{fontSize:12,color:'#9d9d9d',marginRight:5}}>{`月销${item.monthNum}`}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text style={{fontSize:12}}>券后￥:</Text>
                                <Text style={{fontSize:18,fontWeight:'bold',color:'#666'}}>{item.qhjGoods}</Text>
                                <Text style={{fontSize:10,textDecorationLine:'line-through',color:'#999',marginLeft:5}}>{item.oriPrice}</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <Text style={{fontSize:10,color:'#9d9d9d'}}>收藏</Text>
                            {this._favoriteIcon()}
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 8,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        row: {
            height:30,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            flex:1,
            fontSize: 13,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);