import React from 'react';
import {TouchableOpacity, StyleSheet, View , Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class ViewUtil {
    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param text 显示文本
     * @param color 图标着色
     * @param Icons react-native-vector-icons组件
     * @param icon 左侧图标
     * @param expandableIco 右侧图标
     * @return {XML}
     */

    static getSettingItem(callBack,text,color,Icons,icon,expandableIco) {
        return (
            <TouchableOpacity
                onPress={callBack}
                style={styles.setting_item_container}
                activeOpacity={1}
            >
                <View style={{alignItems:'center',flexDirection: 'row'}}>
                    {Icons && icon ?
                        <Icons
                            name={icon}
                            size={15}
                            style={{color: color,marginRight: 10}}
                        /> :
                        <View style={{opacity: 1,width:16,marginRight:10}}/>
                    }
                    <Text style={{fontSize:14}}>{text}</Text>
                </View>
                <AntDesign
                    name={expandableIco ? expandableIco : 'right'}
                    size={12}
                    style={{
                        alignSelf: 'center',
                        color: color || 'black'
                    }}
                />
            </TouchableOpacity>
        )
    }

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param menu 
     * @param color 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getMenuItem(callBack,menu,color,expandableIco) {
        return ViewUtil.getSettingItem(callBack,menu.name,color,menu.Icons,menu.icon,expandableIco) 
    }

    /**
     * 左侧返回按钮
     * @param callBack
     * @return {XML}
     */
    static getLeftBackButton(callBack) {
        return <TouchableOpacity
                    style={{padding: 8,paddingLeft:12}}
                    onPress={callBack}
                    activeOpacity={1}
                >
                <AntDesign
                    name={'left'}
                    size={18}
                    style={{color: '#fff'}}
                />
            </TouchableOpacity>
    }

    /**
     * 主题按钮
     * @param callBack
     * @return {XML}
     */
    static getThemeButton(callBack) {
        return <TouchableOpacity
                    style={{padding: 8,paddingLeft:12,marginRight:10}}
                    onPress={callBack}
                    activeOpacity={1}
                >
                <AntDesign
                    name={'skin'}
                    size={18}
                    style={{color: '#fff'}}
                />
            </TouchableOpacity>
    }

    /**
     * 获取右侧文字按钮
     * @param title
     * @param callBack
     * @returns {XML}
     */
    static getRightButton(title,callBack) {
        return <TouchableOpacity
            style={{alignItems:"center"}}
            onPress={callBack}
            activeOpacity={1}
        >
            <Text style={{fontSize:18,color: '#fff',marginRight:10}}>{title}</Text>
        </TouchableOpacity>
    }

    /**
     * 获取分享按钮
     * @param callBack
     * @returns {XML}
     */
    static getShareButton(callBack) {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callBack}
            activeOpacity={1}
        >
            <AntDesign
                name={'export'}
                size={20}
                style={{opacity: 0.9,marginRight:15,color: '#fff'}}
            />
        </TouchableOpacity>
    }

    /**
     * 获取设置按钮
     * @param callBack
     * @returns {XML}
     */
    static getSetButton(callBack) {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callBack}
            activeOpacity={1}
        >
            <AntDesign
                name={'setting'}
                size={20}
                style={{opacity: 0.9,marginLeft:15,color: '#fff'}}
            />
        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: '#fff',
        padding: 10,height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})