import React from 'react';
import { Alert,Platform, CameraRoll } from 'react-native';
import RNFS from 'react-native-fs';

export default class Imgshare {
    /**
     * 下载页面
     */
    static _Download(uri) {
        if (!uri) return null;
        return new Promise((resolve, reject) => {
            let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
            const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.jpg`;
            const formUrl = uri;
            const options = {
                fromUrl: formUrl,
                toFile: downloadDest,
                background: true,
                begin: (res) => {
                    console.log('begin', res);
                    console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                },
            };
            try {
                const ret = RNFS.downloadFile(options);
                ret.promise.then(res => {
                    console.log('success', res);
                    console.log('file://' + downloadDest)
                    var promise = CameraRoll.saveToCameraRoll(downloadDest);
                    promise.then(function(result) {
                        Alert.alert('保存到相册成功','快去邀请好友吧！');
                    }).catch(function(error) {
                        console.log('error', error);
                        alert('保存失败！\n' + error);
                    });
                    resolve(res);
                }).catch(err => {
                    reject(new Error(err))
                });
            } catch (e) {
                reject(new Error(e))
            }

        })

    }
}