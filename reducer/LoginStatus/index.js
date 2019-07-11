import Types from '../../action/types';

const defaultState = {}

export default function onAction(state = defaultState,action) {
    console.log("loginaction2019",JSON.stringify(action))
    switch (action.type) {
        case Types.LOGIN_REFRESH_SUCCESS:
            return {
                ...state,
                StatusCode: action.loginstatus.StatusCode,
                accessToken: action.loginstatus.accessToken,
                invitationCode: action.loginstatus.invitationCode,
                mobileNum: action.loginstatus.mobileNum
            }
        case Types.LOGIN_REFRESH_FAIL:
            return {
                ...state,
                loginstatus: action.loginstatus
            }
        default: 
            return state;
    }
}