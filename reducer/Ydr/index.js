import Types from '../../action/types';

const defaultState = {};

export default function onAction(state = defaultState,action) {
    switch (action.type) {
        case Types.YDR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//此次展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.YDR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            };
        case Types.YDR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
        case Types.YDR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.YDR_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        case Types.FLUSH_YDR_FAVORITE://刷新收藏状态
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels
                }
            }
        default:
            return state;
    }
}