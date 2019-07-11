import Types from '../../action/types';

const defaultState = {};

export default function onAction(state = defaultState,action) {
    console.log("states",JSON.stringify(state))
    console.log("actions",JSON.stringify(action))
    switch (action.type) {
        case Types.MYINFO_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                myInfo : {
                    customerLevel: action.customerLevel,
                    invitationCode: action.invitationCode,
                    mobileNumber:action.mobileNumber,
                    isLoading: false,
                }
            }
        case Types.MYINFO_REFRESH://下拉刷新
            return {
                ...state,
                myInfo: {
                    isLoading: true
                }
            };
        case Types.MYINFO_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                myInfo: {
                    isLoading: false
                }
            };
        default:
            return state;
    }
}