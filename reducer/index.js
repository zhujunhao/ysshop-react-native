import { combineReducers } from 'redux';
import recommend from './RecommendReducer';
import search from './SearchReducer';
import category from './category';
import favorite from './favorite'; 
import theme from './Theme';
import ydr from './Ydr';
import relative from './relative';
import loginstatus from './LoginStatus';
import invitePartners from './InvitePartners';
import myinfo from './Myinfo';
import {rootCom, RootNavigator} from '../src/navigators/AppNavigator';


//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 */

const index = combineReducers({
    nav : navReducer,
    recommend : recommend,
    search : search,
    category : category,
    favorite : favorite,
    theme : theme,
    ydr : ydr,
    relative : relative,
    invitePartners : invitePartners,
    loginstatus : loginstatus,
    myinfo : myinfo
})
export default index;