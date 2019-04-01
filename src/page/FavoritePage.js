import React, { Component } from 'react';
import { FlatList, RefreshControl,ScrollView, StyleSheet,Dimensions, View,Text} from 'react-native';
import { connect } from 'react-redux';
import actions from '../../action/index';
import FavouriteItem from '../common/FavouriteItem';
import NavigatorUtil from '../navigators/NavigatorUtil';
import Toast from 'react-native-easy-toast';
import FavoriteDao from '../ask/FavoriteDao';
import {FLAG_STORAGE} from '../ask/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import BackPressComponent from '../common/BackPressComponent';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import config from '../../res/data/config';
import AboutCommon from '../page/about/AboutCommon';


class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
                ...this.props,
                navigation: this.props.navigation,
            },data => this.setState({...data})
        )
        this.state = {
            data: config
        }
        this.storeName = FLAG_STORAGE.Collection;
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.Collection);
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData(true);
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.listener = data => {
            if(data.to === 2) {
                this.loadData(false);
            }
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
        EventBus.getInstance().removeListener(this.listener);
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData(isShowLoading) {
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName, isShowLoading)
    }

    /**
     * 获取当前页面相关数据
     */
    _store(){
        console.log("uuupro",JSON.stringify(this.props))
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: []//要显示的数据
            }
        }
        return store;
    }

    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite);
        EventBus.getInstance().fireEvent(EventTypes.favorite_changed_recommend)
    }

    renderItem(data) {
        const {theme} = this.props;
        const item = data.item;
        return <FavouriteItem
            theme={theme}
            projectModel={item}
            onSelect={(callback)=> {
                NavigatorUtil.goPage({
                    theme,
                    projectModel: item,
                    flag: FLAG_STORAGE.Collection,
                    callback
                },'DetailPage')
            }}
            onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
        />
        
    }

    render(){
        let store = this._store();
        const {theme} = this.props;
        let maxpage = <View style={styles.containerTab}>
                        {store.projectModels && store.projectModels.length >0 ?
                            <FlatList
                                data={store.projectModels}
                                renderItem={data => this.renderItem(data)}
                                keyExtractor={item => "" + (item.item.goodsNum)}
                                refreshControl={
                                    <RefreshControl
                                        title={'loading'}
                                        titleColor={theme.themeColor}
                                        colors={[theme.themeColor]}
                                        refreshing={store.isLoading}
                                        onRefresh={()=> this.loadData(true)}
                                        tintColor={theme.themeColor}
                                    />
                                }
                            /> : <View style={{backgroundColor:'#f5f5f5'}}><Text style={{textAlign:'center',marginTop:100}}>暂时还没有收藏的宝贝哦^_^</Text></View>
                        }

                        <Toast
                            ref={'toast'}
                            position={'center'}
                        />
                    </View>
        return this.aboutCommon.render(maxpage,this.state.data.app)
    }
}

const mapStateToProps = state => ({
    favorite : state.favorite,
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    containerTab:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    tabStyle: {
        height:39,
        paddingTop:10
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }

})
