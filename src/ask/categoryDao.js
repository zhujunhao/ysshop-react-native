import { AsyncStorage } from 'react-native';
import keys from '../../res/data/keys';
import category from '../../res/data/category';

export const FLAG_CATEGORY = { flag_category: 'category_dao_category',flag_key: 'category_dao_key' }
export default class CategoryDao {
    constructor(flag) {
        console.log("flags",flag)
        this.flag = flag;
    }

    /**
     * 获取类目标签
     */
    fetch() {
        return new Promise((resolve,reject) => {
            AsyncStorage.getItem(this.flag,(error,result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    console.log("noresult")
                    let data = this.flag === 'category_dao_category'? category : keys;
                    this.save(data);
                    resolve(data);
                } 
                if (result && result.indexOf(null) != -1) {//存在null的情况
                    console.log("jinlai")
                    let data = this.flag === 'category_dao_category'? category : keys;
                    this.save(data);
                    resolve(data);
                } else {
                    console.log("result",JSON.parse(result))
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            })
        })
    }

    /**
     * 保存类目标签
     */
    save(objectData) {
        let stringData = JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result) => {
            
        })
    }

}
