
import ProjectModel from "../src/model/ProjectModel";
import Utils from "../src/util/Utils";

/**
 * 处理数据
 */

 export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao,params) {
     let fixItems = [];
     console.log('nowdara',JSON.stringify(data))
     if ( data && data.data ) {
         if (Array.isArray(data.data.typeLists)) {
             fixItems = data.data.typeLists;
         } else if (Array.isArray(data.data)) {//搜索
             fixItems = data.data;
         } else if (Array.isArray(data.data.data.relativeLists)) {
            fixItems = data.data.data.relativeLists;
         }
     }
     //第一次加载的数据
     let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0,pageSize)
     console.log('showItems',JSON.stringify(showItems))
     _projectModels(showItems,favoriteDao,projectModels => {
         dispatch({
             type: actionType,
             items: fixItems,
             projectModels: projectModels,
             storeName,
             pageIndex: 1,
             ...params
         })
     })
}

/**
 * 通过本地的收藏状态包装Item
 */

 export async function _projectModels(showItems,favoriteDao,callback) {
    let keys = [] 
    try {
         //获取收藏的key
         keys = await favoriteDao.getFavoriteKeys();
         console.log("ker",JSON.stringify(keys))
     } catch (e) {
         console.log(e)
     }
     let projectModels = [];
     for (let i =0,len = showItems.length;i<len;i++) {
         projectModels.push(new ProjectModel(showItems[i],Utils.checkFavorite(showItems[i], keys)));
     }
     console.log('projectModels',JSON.stringify(projectModels))
     doCallBack(callback,projectModels);
 }

 export const doCallBack = (callBack,object) => {
     if (typeof callBack === 'function') {
         callBack(object);
     }
 }