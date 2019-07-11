import Types from '../types';
import {_projectModels,doCallBack,handleData } from '../ActionUtil';
import ArrayUtil from '../../src/util/ArrayUtil';
import { configurationUrl } from '../ask/config';
const SEARCH_URL = configurationUrl + '/api/v0/lists/$';
const CANCEL_TOKENS = [];

/**
 * 发起搜索
 * @param inputKey 搜索key
 * @param pageSize
 * @param token 与该搜索关联的唯一token
 * @param favoriteDao
 * @param recommendKeys
 * @param callBack
 * @returns {function(*=)}
 */
export function onSearch(inputKey,pageSize,token,favoriteDao,recommendKeys,callBack) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH});
        fetch(genFetchUrl(inputKey)).then(response => {//如果任务取消，则不作任何处理
            return hasCancel(token) ? null : response.json();
        }).then(responseData => {
            if (hasCancel(token,true)) {//如果任务取消，则不做任何处理
                console.log('user cancel');
                return;
            }
            console.log("responseData",JSON.stringify(responseData))
            if(!responseData || !responseData.textLists || responseData.textLists.length === 0) {
                dispatch({type: Types.SEARCH_FAIL,message: `没找到关于${inputKey}的内容`})
                doCallBack(callBack,`没找到关于${inputKey}的项目`);
                return;
            }
            console.log("favoriteDaosearch",JSON.stringify(favoriteDao))
            let items = responseData.textLists;
            handleData(Types.SEARCH_REFRESH_SUCCESS,dispatch,"",{data: items},pageSize,favoriteDao,{
                inputKey
            });
        }).catch(e => {
            console.log(e);
            dispatch({type: Types.SEARCH_FAIL,error: e})
        })
    }
}


 /**
  * 取消一个异步任务
  * @param token
  * @returns {function(*)}
  */
 export function onSearchCancel(token) {
     return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
     }
 }

 /**
  * 加载更多
  * @param pageIndex 第几页
  * @param pageSize 每页展示条数
  * @param dataArray 原始数据
  * @param favoriteDao
  * @param callBack 回调函数，可以通过回调函数来向调用页面通信；比如异常信息展示，没有更多等待
  * @returns {function(*)}
  */
 export function onLoadMoreSearch(pageIndex,pageSize,dataArray=[],favoriteDao,callBack) {
     return dispatch => {
         setTimeout(() => {//模拟网络请求
            if ((pageIndex-1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('别扯了没有了')
                }
                dispatch({
                    type:Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more',
                    pageIndex: --pageIndex
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0,max),favoriteDao,data => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: data,
                    })
                })
            }
         },500)
     }
 }

  function genFetchUrl(key) {
      return SEARCH_URL + key;
  }

  /**
   * 检查token是否已经取消
   * @param token
   * @param isRemove
   * @returns {boolean}
   */
  function hasCancel(token,isRemove) {
      if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
          return true;
      }
      return false;
  }