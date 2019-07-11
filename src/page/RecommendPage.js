import React,{ Component } from 'react';
import { StyleSheet, Text, View, Platform,FlatList, RefreshControl,TouchableOpacity,ActivityIndicator,InteractionManager,AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../action/index';
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation';
import NavigatorUtil from '../navigators/NavigatorUtil';
import Toast from 'react-native-easy-toast';
import RecommendItem from '../common/RecommendItem';
import {FLAG_CATEGORY} from '../ask/categoryDao';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import { FLAG_STORAGE } from '../ask/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FavoriteDao from '../ask/FavoriteDao';
import SwiperArr from '../common/swiper/swiper';
import { configurationUrl } from '../ask/config';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.Collection);
const URL = configurationUrl + '/api/v0/lists';

class RecommendPage extends Component {
    constructor(props) {
        super(props);
        console.log("reprops",JSON.stringify(this.props))
        const { onLoadCategory } = this.props;
        onLoadCategory(FLAG_CATEGORY.flag_category);
        
    }

    _genTabs () {
        const tabs = {};
        const {categorys,theme} = this.props;
        console.log("categorys",JSON.stringify(categorys));
        categorys.forEach((item,index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <RecommendTabPage {...props} tabLabel={item.name} path={item.path} theme={theme}/>,
                    navigationOptions: {
                      title: item.name
                    }
                }
            }

        });
        return tabs;
    }

    render() {
      const { categorys,theme } = this.props;

      const TabNavigator = categorys.length ? createAppContainer(createMaterialTopTabNavigator(
          this._genTabs(),{
              tabBarOptions: {
                  tabStyle: styles.tabStyle,
                  upperCaseLabel: false,//是否使标签大写，默认为true
                  scrollEnabled: true,//是否支持选项卡滚动，默认false
                  style: {
                      paddingTop: 25,
                      backgroundColor: '#fff',//TabBar 的背景颜色
                      height: 59//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                  },
                  indicatorStyle: {
                      backgroundColor:theme.themeColor,
                      height: 2
                  },//标签指示器的样式
                  labelStyle: {
                      fontSize: 13,
                      margin: 0,
                      color:theme.themeColor
                  },//文字的样式
              },
              lazy: true
          }
      )) : null;

      return (
        <View style={styles.container}>
          {TabNavigator && <TabNavigator/>}
        </View>
      );
    }
}

const mapRecommendStateToProps = state => ({
    categorys: state.category.categorys,
    theme: state.theme.theme
})

const mapRecommendDispatchToProps = dispatch => ({
    onLoadCategory: (flag) => dispatch(actions.onLoadCategory(flag))
})
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapRecommendStateToProps,mapRecommendDispatchToProps)(RecommendPage)

const pageSize = 10;//设为常量，防止修改

class RecommendTab extends Component {
    constructor(props) {
        super(props);
        console.log("rethisprops",JSON.stringify(this.props))
        const {tabLabel,path} = this.props;
        console.log("tabLabel",JSON.stringify(tabLabel))
        this.storeName = path;
        console.log("sn",this.storeName)
        this.isFavoriteChanged = false;
        this.loginStatusCheck()
    }

    loginStatusCheck () {
        AsyncStorage.getItem('loginStatus').then((loginstatus) => {
            let loginstatusObj = JSON.parse(loginstatus)
            console.log("value",typeof loginstatusObj)
            if (loginstatusObj.StatusCode == "0000") {
                console.log("djhfjdhf")

                console.log("this.propsssdfdfd",JSON.stringify(this.props))
                const { onLoginChange } = this.props;
                onLoginChange(loginstatusObj)
            }
        }).catch((err) => {
            
        });
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.loadData();
         });
        EventBus.getInstance().addListener(EventTypes.favorite_changed_recommend,this.favoriteChangeListener=() => {
            this.isFavoriteChanged = true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 0 && this.isFavoriteChanged) {
                this.loadData(null, true);
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }

    onSearch(pathName){
        NavigatorUtil.goPage(this.props,pathName)
    }

    loadData(loadMore,refreshFavorite) {
        const {onRefreshRecommend, onLoadMoreRecommend, onFlushRecommendFavorite} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreRecommend(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushRecommendFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshRecommend(this.storeName, url, pageSize, favoriteDao)
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        console.log("store",JSON.stringify(this.props))
        const {recommend} = this.props;
        let store = recommend[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key;
    }

    renderItem(data) {
        const {item} = data;
        const {theme} = this.props;
        return <RecommendItem
            projectModel={item}
            theme = {theme}
            onSelect={(callback)=> {
                NavigatorUtil.goPage({
                    theme,
                    projectModel: item,
                    flag: FLAG_STORAGE.Collection,
                    callback
                },'DetailPage')
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite)}
        />
        
    }
    headerPart() {
        return (
            <View style={{flex:1,padding:5}}>
                <SwiperArr></SwiperArr>
                <View style={{flex:1,height:88,flexDirection:'row'}}>
                    <View style={{flex:1,backgroundColor:'#ff4800',borderColor:'#eee',borderWidth:1}}>
                        <Text>达人快抢</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:'#999',borderColor:'#eee',borderWidth:1}}>
                        <Text>实时榜单</Text>
                    </View>
                </View>
                <View style={{flex:1,height:88,backgroundColor:'#ff4800',borderColor:'#eee',borderWidth:1,marginTop:8}}>
                    <Text>品牌专区</Text>
                </View>
            </View>
        )
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
        let store = this._store();
        const {theme} = this.props;
        let searchPart = <TouchableOpacity
            onPress={()=>this.onSearch("SearchPage")}
            activeOpacity={1}
            style={{width:360,height:50}}
        >
            <View style={{height:50,justifyContent:"center",alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:"center",justifyContent:'flex-start' ,width:320,height:32,backgroundColor:'#eee',borderRadius:18}}>
                        <AntDesign
                            name={'search1'}
                            size={20}
                            style={{
                                marginRight: 10,
                                color: '#999',
                                marginLeft: 10
                            }}
                        />
                        <Text style={{fontSize:13}}>{'搜索更多优惠商品'}</Text>
                </View>
            </View>
        </TouchableOpacity>
        

        return (
            <View style={styles.container}>
                {searchPart}
                <FlatList 
                    data={store.projectModels}
                    numColumns={2}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.goodsNum}
                    refreshControl = {
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme.themeColor}
                            colors={[theme.themeColor]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            titleColor={theme.themeColor}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        console.log('---onEndReached----');
                        setTimeout(() => {
                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
                    }}
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    recommend: state.recommend
})

const mapDispatchToProps = dispatch => ({
    onRefreshRecommend: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshRecommend(storeName, url, pageSize, favoriteDao)),
    onLoadMoreRecommend: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreRecommend(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushRecommendFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushRecommendFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
    onLoginChange: (loginstatus) => dispatch(actions.onLoginChange(loginstatus))
})

//注意：connect只是个function，并不应定非要放在export后面
const RecommendTabPage = connect(mapStateToProps, mapDispatchToProps)(RecommendTab);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabStyle: {
        width:50,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        flex:1,
        color: 'red',
        margin: 10
    }

});