import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseItem from './BaseItem';
import {Dimensions} from "react-native";

export default class RecommendItem extends BaseItem {
    render() {
        const {projectModel} = this.props;
        console.log("popo125",JSON.stringify(this.props))
        const {item} = projectModel;
        if (!item || !item.owner) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
            >
                <View style={styles.cell_container}>
                    <View style={styles.ImagePart}>
                        <Image style={styles.picPart}
                            source={{uri: 'https://upload-images.jianshu.io/upload_images/6874403-e28edfe8069b2c7d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240'}}
                        />
                    </View>
                    <Text style={styles.title}>
                        {item.full_name.substring(0, 24) + '...'}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Image style={{height: 22, width: 22,marginLeft:10,borderRadius:11}}
                                source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',height:36}}>
                            <Text>{item.stargazers_count}</Text>
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
            height:36
        },
        title: {
            fontSize: 12,
            marginLeft:10,
            marginTop:10,
            color: '#212121',
        }
    }
);