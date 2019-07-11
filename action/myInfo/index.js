import Types from '../types';
import DataStore from '../../src/ask/DataStore';

/**
 * 获取推荐数据的异步action
 */

 export function onLoadMyInfo(url) {
     return dispatch => {
         dispatch({type: Types.MYINFO_REFRESH});
         let dataStore = new DataStore();
         dataStore.fetchData(url)//异步action与数据流
            .then(data => {
                console.log("infodata",JSON.stringify(data));
                dispatch({
                    type: Types.MYINFO_REFRESH_SUCCESS,
                    customerLevel: data.data.data.customerLevel,
                    invitationCode: data.data.data.invitationCode,
                    mobileNumber: data.data.data.mobileNumber
                })
            })
            .catch(error => {
                console.log("error",error);
                dispatch({
                    type: Types.MYINFO_REFRESH_FAIL,
                    error
                })
            })
     }
 }