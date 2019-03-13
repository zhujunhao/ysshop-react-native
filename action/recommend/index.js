import Types from '../types';
import DataStore from '../../src/ask/DataStore';
import {_projectModels, handleData} from '../ActionUtil';

/**
 * 获取推荐数据的异步action
 */

 export function onRefreshRecommend(storeName,url,pageSize,favoriteDaoCollection,favoriteDaoLike,favoriteDaoConcern) {
     return dispatch => {
         dispatch({type: Types.RECOMMEND_REFRESH,storeName: storeName});
         let dataStore = new DataStore();
         dataStore.fetchData(url)//异步action与数据流
            .then(data => {
                handleData(Types.RECOMMEND_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDaoCollection,favoriteDaoLike,favoriteDaoConcern)
            })
            .catch(error => {
                console.log("error",error);
                dispatch({
                    type: Types.RECOMMEND_REFRESH_FAIL,
                    storeName,
                    error
                })
            })
     }
 }

 /**
  * 加载更多
  */

  export function onLoadMoreRecommend(storeName,pageIndex,pageSize,dataArray=[],favoriteDaoCollection,favoriteDaoLike,favoriteDaoConcern,callBack) {
    return dispatch => {
          setTimeout(()=> {//模拟网络请求
                if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                    if (typeof callBack === 'function') {
                        callBack('no more');
                    }
                    dispatch({
                        type: Types.RECOMMEND_LOAD_MORE_FAIL,
                        error: 'no more',
                        storeName: storeName,
                        pageIndex: --pageIndex
                    })
                } else {
                    //本次和载入的最大数量
                    let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                    _projectModels(dataArray.slice(0,max), favoriteDaoCollection, favoriteDaoLike, favoriteDaoConcern, data => {
                        dispatch({
                            type: Types.RECOMMEND_LOAD_MORE_SUCCESS,
                            storeName,
                            pageIndex,
                            projectModels: data
                        })
                    })
                }
          },500)
      }
  }

  /**
   * 刷新状态
   */
  export function onFlushRecommendFavorite(storeName,pageIndex,pageSize,dataArray=[],favoriteDao) {
      return dispatch=> {
            //本次和载入的最大数量
            let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
            _projectModels(dataArray.slice(0,max),favoriteDao,data => {
                dispatch({
                    type: Types.FLUSH_RECOMMEND_FAVORITE,
                    storeName,
                    pageIndex,
                    projectModels: data
                })
            })
        }
  }