import React from 'react';
import { StyleSheet } from 'react-native';

export const ThemeFlags = {
    Default: '#e3007b',
    Red: '#b11732',
    Pink: '#ffd7e6',
    Purple: '#79d7da',
    DeepPurple: '#673AB7',
    Indigo: '#3F51B5',
    Blue: '#2196F3',
    LightBlue: '#03A9F4',
    Cyan: '#00BCD4',
    Teal: '#009688',
    Green: '#4CAF50',
    LightGreen: '#8BC34A',
    Lime: '#CDDC39',
    Yellow: '#FFEB3B',
    Amber: '#FFC107',
    Orange: '#FF9800',
    DeepOrange: '#FF5722',
    Brown: '#795548',
    Grey: '#9E9E9E',
    BlueGrey: '#607D8B',
    Black: '#000000'
};

export default class ThemeFactory {
    /**
     * 创建一个主题样式
     * @param themeFlag 主题标识
     * @returns {{themeColor: *, styles: *}}
     */

     static createTheme(themeFlag) {
         return {
             themeColor: themeFlag,
             styles: StyleSheet.create({
                 selectedTitleStyle: {
                     color: themeFlag,
                 },
                 tabBarSelectedIcon: {
                     tintColor: themeFlag,
                 },
                 navBar: {
                     backgroundColor: themeFlag,
                 }
             })
         }
     }
}