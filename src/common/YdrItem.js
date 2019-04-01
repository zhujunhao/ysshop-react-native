import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseItem from './BaseItem';
import {Dimensions} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class YdrItem extends BaseItem {
    render() {
        const {projectModel,theme} = this.props;
        console.log("popo125",JSON.stringify(this.props))
        const {item} = projectModel;
        if (!item || !item.owner) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={styles.ImagePart}>
                        <Image style={styles.picPart}
                            source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={1}>
                        9实用篇|小户型如何通过收纳挤出大空间
                    </Text>
                    <Text style={styles.content} numberOfLines={3}>
                        哈喽，大家好今天想跟大家讨论一个很现实的问题随着房价不断上升一家人挤在几十平方的小房子里室内空间小，家里东西却
                    </Text>
                    <View style={styles.picArr}>
                        <Image style={styles.mipic}
                            source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                        />
                        <Image style={styles.mipic}
                            source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                        />
                        <Image style={styles.mipic}
                            source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                        />
                        <Image style={styles.mipic}
                            source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                        />
                    </View>
                    <View style={{backgroundColor:"#eee",height:1,marginLeft:10,marginRight:10,marginTop:10}}></View>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row',width:32,height:32,borderColor:'#eee',borderWidth:1,borderRadius:16}}>
                            <Image  style={{width:32,height:32,borderRadius:16}}
                                source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <AntDesign
                                name={'team'}
                                size={18}
                                style={{
                                    marginRight: 5,
                                    color: theme.themeColor,
                                    marginLeft: 10
                                }}
                            />
                            <Text style={{fontSize:14,marginRight:20,color: theme.themeColor,}}>3.33万</Text>
                        </View>
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
            flex:1,
            backgroundColor: '#fff',
            marginTop:15,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderColor: '#ddd',
            borderWidth: 0.5,
            borderRadius: 8,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        picArr: {
            flexDirection:'row',
            height: 80,
            marginTop: 10,
            padding:5
        },
        mipic: {
            flex:1,
            marginLeft:5,
            marginRight:5,
            borderRadius:4
        },  
        ImagePart: {
            flex:1,
            height:120,
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
            paddingLeft:20,
            paddingRight:8,
            height:40,
            marginBottom:5
        },
        title: {
            flex:1,
            fontSize: 12,
            marginLeft:10,
            marginTop:10,
            color: '#212121',
        },
        content: {
            flex:1,
            fontSize: 12,
            paddingLeft:10,
            paddingRight:10,
            marginTop:10,
            color: '#666',
        }
    }
);