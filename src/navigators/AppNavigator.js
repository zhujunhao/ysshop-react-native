import React,{ Component } from 'react';
import { createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from '../page/WelcomePage'
import SearchPage from '../page/SearchPage';
import HomePage from '../page/HomePage';
import ForpwdPage from '../page/ForpwdPage';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import MyPage from '../page/MyPage';
import ChangemobPage from '../page/ChangemobPage';
import MyinfoPage from '../page/MyinfoPage';
import Aboutus from '../page/Aboutus';
import AboutMePage from '../page/about/AboutMePage';
import AboutPage from '../page/about/AboutPage';
import DetailPage from '../page/DetailPage';
import FavoritePage from '../page/FavoritePage';
import SelcategoryPage from '../page/SelcategoryPage';
import CodePushPage from '../page/CodePushPage';
import WebviewDeatil from '../page/WebviewDeatil';
import SortcategoryPage from '../page/SortcategoryPage';
import YdrPage from '../page/YdrPage';
import { connect } from 'react-redux';
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';

export const rootCom = 'Init';//设置根路由

const InitNavigator = createStackNavigator({
  WelcomePage: {
      screen: WelcomePage,
      navigationOptions: {
          header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }
  }
});

const MainNavigator = createStackNavigator({
    HomePage: { 
      screen: HomePage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    SearchPage: {
      screen: SearchPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    ForpwdPage: { 
      screen: ForpwdPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }  
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    ChangemobPage: {
      screen: ChangemobPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    MyinfoPage: {
      screen: MyinfoPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Aboutus: {
      screen: Aboutus,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    AboutPage: {
      screen: AboutPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    AboutMePage: {
      screen: AboutMePage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    DetailPage: {
      screen: DetailPage,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    FavoritePage: {
      screen: FavoritePage,
      navigationOptions: {
        header: null
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        header: null
      }
    },
    SortcategoryPage: {
      screen:SortcategoryPage,
      navigationOptions: {
        header: null
      }      
    },
    SelcategoryPage: {
      screen:SelcategoryPage,
      navigationOptions: {
        header: null
      }      
    },
    CodePushPage: {
      screen:CodePushPage,
      navigationOptions: {
        header: null
      }      
    },
    WebviewDeatil: {
      screen:WebviewDeatil,
      navigationOptions: {
        header: null
      }     
    },
    YdrPage: {
      screen:YdrPage,
      navigationOptions: {
        header: null
      }     
    },
    ChangemobPage: {
      screen:ChangemobPage,
      navigationOptions: {
        header: null
      }     
    },
    ForpwdPage: {
      screen:ForpwdPage,
      navigationOptions: {
        header: null
      }     
    },
  }, {
    defaultNavigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
})
  
export const RootNavigator = createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator,
}, {
  navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
  }
}));

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

/**
* 2.将根导航器组件传递给 reduxifyNavigator 函数,
* 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
* 注意：要在createReactNavigationReduxMiddleware之后执行
*/
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
* State到Props的映射关系
* @param state
*/
const mapStateToProps = state => ({
  state: state.nav,//v2
});
/**
* 3.连接 React 组件与 Redux store
*/
export default connect(mapStateToProps)(AppWithNavigationState);