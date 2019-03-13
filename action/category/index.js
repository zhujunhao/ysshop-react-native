import Types from '../types';
import DataStore from '../../src/ask/DataStore';
import {_projectModel,handleData} from '../ActionUtil';
import CategoryDao from '../../src/ask/categoryDao';

/**
 * 加载类目
 */
export function onLoadCategory(flagKey) {
    console.log("flagKey",JSON.stringify(flagKey));
    return async dispatch => {
        try {
            let categorys = await new CategoryDao(flagKey).fetch();
            dispatch({type: Types.CATEGORY_LOAD_SUCCESS,categorys: categorys, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}