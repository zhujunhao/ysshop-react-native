import React,{ Component } from 'react';
import { StyleSheet, Text, View, Platform,FlatList, RefreshControl,TouchableOpacity,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../action/index';
import NavigatorUtil from '../navigators/NavigatorUtil';
import Toast from 'react-native-easy-toast';
import YdrItem from '../common/YdrItem';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import { FLAG_STORAGE } from '../ask/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import FavoriteDao from '../ask/FavoriteDao';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.Collection);
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

const pageSize = 10;//设为常量，防止修改

class YdrPage extends Component {
    constructor(props) {
        super(props);
        console.log("ydrprops",JSON.stringify(this.props))
        this.storeName = 'ios';
        this.isFavoriteChanged = false;
    }

    componentDidMount(){
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_changed_Ydr,this.favoriteChangeListener=() => {
            this.isFavoriteChanged = true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 1 && this.isFavoriteChanged) {
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
        const {onRefreshYdr, onLoadMoreYdr, onFlushYdrFavorite} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreYdr(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushYdrFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshYdr(this.storeName, url, pageSize, favoriteDao)
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
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
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const {item} = data;
        const {theme} = this.props;
        return <YdrItem
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
        return (
            <View style={styles.container}>
                <FlatList 
                    data={store.projectModels}
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
    theme: state.theme.theme,
    recommend: state.recommend
})

const mapDispatchToProps = dispatch => ({
    onRefreshYdr: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshYdr(storeName, url, pageSize, favoriteDao)),
    onLoadMoreYdr: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreYdr(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushYdrFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushYdrFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
})

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(YdrPage);

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