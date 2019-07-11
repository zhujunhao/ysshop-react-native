import Types from '../types';

export function onLoginChange(loginstatus) {
    console.log("loginstatus2019",JSON.stringify(loginstatus))
    return dispatch => {
        dispatch({type: Types.LOGIN_REFRESH,status: '登录中'});
        if (loginstatus.StatusCode == "0000") {
            dispatch({type: Types.LOGIN_REFRESH_SUCCESS,status: '登录成功',loginstatus:loginstatus});
        } else {
            dispatch({type: Types.LOGIN_REFRESH_FAIL,status: '登录失败'});
        }
    }
}