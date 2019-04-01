export default class Utils {
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item, keys=[]) {
        console.log("keys",JSON.stringify(keys))
        if (!keys) return false;
        for (let i = 0, len = keys.length; i < len; i++) {
            if (item.goodsNum.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }
    /**
     * 检查key是否存在于keys中
     * @param keys
     * @param key
     */
    static checkKeyIsExist(keys, key) {
        console.log("2")
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase()) return true;
        }
        return false;
    }
}