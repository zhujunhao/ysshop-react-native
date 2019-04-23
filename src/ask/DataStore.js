import { AsyncStorage } from 'react-native';

export const FLAG_STORAGE = { Collection:'Collection',History:'History'};

export default class DataStore {
    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     */
    fetchData(url,flag) {
        return new Promise((resolve,reject) => {
            this.fetchLocalData(url).then((wrapData)=>{
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url,flag).then((data)=> {
                        resolve(this._wrapData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url,flag).then((data)=>{
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }

    /**
     * 保存数据
     */
    saveData(url,data,callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback);
    }

    /**
     * 获取本地数据
     */
    fetchLocalData(url) {
        return new Promise((resolve,reject) => {
            AsyncStorage.getItem(url,(error,result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网路数据
     */
    fetchNetData(url, flag) {
        return new Promise((resolve,reject) => {
            console.log("url",url)
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        console.log("ininin")
                        return response.json();
                    }
                    throw new Error('Network response was not ok.')
                })
                .then((responseData) => {
                    this.saveData(url,responseData)
                    resolve(responseData);
                })
                .catch((error) => {
                    reject("1111",error);
                })
        })
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     *url :请求地址
     *data:参数(Json对象)
     *callback:回调函数
     */
    postJson (url,data,callback){
        var fetchOptions = {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                //json形式
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions).then((response) => response.text()).then((responseText) => {
            callback(JSON.parse(responseText));
        }).done();
    }

    /**
     * 检查timestamp是否在有效期内
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() !== targetDate.getHours() > 4) return false;//有效期4小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}