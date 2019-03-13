import Types from '../../action/types';
import {FLAG_CATEGORY} from '../../src/ask/categoryDao';

const defaultState = {
    categorys: [],
    keys: []
}

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.CATEGORY_LOAD_SUCCESS: //获取数据成功
            if (FLAG_CATEGORY.flag_key === action.flag) {
                return {
                    ...state,
                    keys: action.categorys
                }
            } else {
                return {
                    ...state,
                    categorys: action.categorys
                }
            }
        default:
            return state;
    }
}