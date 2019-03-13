import React, { Component } from 'react';
import { createBottomTabNavigator,createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import RecommendPage from '../page/RecommendPage';
import MyPage from '../page/MyPage';
import SharePage from '../page/SharePage';
import FavoritePage from '../page/FavoritePage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EventTypes from '../../src/util/EventTypes';
import { BottomTabBar } from 'react-navigation-tabs';
import EventBus from 'react-native-event-bus'

const TABS = {//页面路由配置
    RecommendPage: {
        screen: RecommendPage,
        navigationOptions: {
            tabBarLabel: '推荐',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'flag'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }       
    },
    SharePage: {
        screen: SharePage,
        navigationOptions: {
            tabBarLabel: '分享',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'sharealt'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    }
}

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const { RecommendPage,FavoritePage,SharePage,MyPage } = TABS;
        const tabs = { RecommendPage,FavoritePage };//根据需要定制
        RecommendPage.navigationOptions.tabBarLabel = '推荐';//动态配置Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,{
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
   
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState,newState,action)=>{
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件
                    from: prevState.index,
                    to: newState.index
                })
            }}
        />
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.themeColor}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)
