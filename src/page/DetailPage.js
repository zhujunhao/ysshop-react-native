import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, View,Clipboard, DeviceInfo,Text,Image,FlatList,ScrollView,Linking  } from 'react-native';
import { FLAG_STORAGE } from '../ask/DataStore';
import { connect } from 'react-redux';
import actions from '../../action/index';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import RecommendItem from '../common/RecommendItem';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteUtil from '../util/FavoriteUtil';
import FavoriteDao from '../ask/FavoriteDao';
import DataStore from "../../src/ask/DataStore";
import Toast from 'react-native-easy-toast';
import { configurationUrl } from '../ask/config';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.Collection);
const URL = configurationUrl + '/api/v0/lists';
const pageSize = 10;//设为常量，防止修改

class DetailPage extends Component {
    constructor(props) {
        super(props);
        console.log("propldelde",JSON.stringify(this.props));
        this.params = this.props.navigation.state.params;
        const{ projectModel,flag } = this.params;
        console.log("projectModelde",JSON.stringify(projectModel));
        this.favoriteDao = new FavoriteDao(flag);
        const title = projectModel.item.titGoods;
        
        switch (projectModel.item.listTypes[0]) {
            case '全部':
                this.storeName = '/&all';
                break;
            case '女装':
                this.storeName = '/&wz';
                break;
            case '男装':
                this.storeName = '/&mz';
                break;
            case '内衣':
                this.storeName = '/&ny';
                break;
            case '彩妆':
                this.storeName = '/&cz';
                break;
            case '配饰':
                this.storeName = '/&ps';
                break;
            case '鞋品':
                this.storeName = '/&xp';
                break;
            case '箱包':
                this.storeName = '/&xb';
                break;
            case '儿童':
                this.storeName = '/&et';
                break;
            case '母婴':
                this.storeName = '/&my';
                break;
            case '居家':
                this.storeName = '/&jj';
                break;
            case '美食':
                this.storeName = '/&ms';
                break;
            case '数码':
                this.storeName = '/&sm';
                break;
            case '家电':
                this.storeName = '/&jd';
                break;
            case '车品':
                this.storeName = '/&cp';
                break;
            case '文体':
                this.storeName = '/&wt';
                break;
            case '宠物':
                this.storeName = '/&qw';
                break;
            case '其他':
                this.storeName = '/&qt';
                break;
            default:
                this.storeName = '/&all';
        }
        
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }



    loadData(loadMore,refreshFavorite) {
        const {onRefreshRelative, onLoadMoreRelative, onFlushRelativeFavorite} = this.props;
        //const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreRelative(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else if (refreshFavorite) {
            onFlushRelativeFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshRelative(this.storeName, url, pageSize, favoriteDao)
        }
    }

    _store() {
        console.log("store111",JSON.stringify(this.props))
        const { recommend } = this.props;
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

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.WebView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation)
        }
    }

    reqlink (goodsID,goType) {
        let dataStore = new DataStore();
        let url = configurationUrl + '/api/v0/links/reqLinks';
        let data={'goodsID':goodsID};
        console.log("0",JSON.stringify(goodsID))
        dataStore.postJson(url,data,(set) => {
            console.log(JSON.stringify(set))
            if (set.success == true) {
                console.log("modelData",JSON.stringify(set.modelData))
                this.copy(set.modelData,goType)
            } else {
                this.refs.toast.show('请求信息有误');
            }
        });
    }

    async copy(targetText,goType){
        console.log("targetText",targetText)
        Clipboard.setString(targetText);
        let  str = await Clipboard.getString();
        if (goType == 'goShop') {
            this.refs.toast.show('打开淘宝APP领取优惠吧');
            let url = 'taobao://www.taobao.com';
            Linking.openURL(url) 
        } else {
            this.refs.toast.show('已复制到粘贴板');
        }
        console.log('str',str)//我是文本
    }

    onFavoriteButtonClick() {
        const{ projectModel,callback } = this.params;
        const isFavorite = projectModel.isFavorite=!projectModel.isFavorite;
        callback(isFavorite);//更新item的收藏状态
        this.setState({
            isFavorite: isFavorite
        });
        let key = projectModel.item.goodsNum.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onFavoriteButtonClick()} activeOpacity={1}>
                <AntDesign
                    name={this.state.isFavorite ? 'heart':'hearto'}
                    size={20}
                    style={{color:'#fff',marginRight: 10}}
                />
            </TouchableOpacity>
        </View>)
    }

    gotowebDetail(){
        let {theme,projectModel} = this.params;
        console.log('this.params',JSON.stringify(this.params))
        NavigatorUtil.goPage({
            theme,
            projectModel: projectModel.item,
            flag: FLAG_STORAGE.Collection
        },'WebviewDeatil')
    }

    webDetail() {
        return (<View style={{flexDirection:'column',width:30,height:30,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.gotowebDetail()}>
                        <AntDesign
                            name={'filetext1'}
                            size={20}
                            style={{color:'#666'}}
                        />
                        <Text style={{marginTop:5,justifyContent:'center',alignItems:'center',fontSize:12}}>详情</Text>
                    </TouchableOpacity>
                </View>)
    }

    renderItem(data) {
        const { item } = data;
        console.log("tarfet",JSON.stringify(item))
        const { theme } = this.params;
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

    backHome = () => {
        NavigatorUtil.resetToHomePage({
            navigation: this.props.navigation
        })
      }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    render() {
        let store = this._store();
        const {theme,projectModel} = this.params;
        console.log("store123",JSON.stringify(store))
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                titleLayoutStyle = {titleLayoutStyle}
                title={this.state.title}
                style={theme.styles.navBar}
                rightButton = {this.renderRightButton()}
        />
        return (
            <SafeAreaViewPlus>
                {navigationBar}
                <ScrollView>
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <Image style={{height:300}}
                                    source={{uri: projectModel.item.picGoods}}
                            />
                            <View style={{flexDirection:'row',padding:10,alignItems:'center'}}>
                                <View style={{flex:1}}>
                                    <Text style={{color:'#333',paddingTop:3,paddingBottom:3}}>{projectModel.item.titGoods}</Text>
                                </View>
                                {this.webDetail()}
                            </View>
                            <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:10}}>
                                <View style={{height:20,marginLeft:10,borderColor:theme.themeColor,backgroundColor:theme.themeColor,borderRadius:10,borderWidth:2,paddingLeft:8,paddingRight:8,alignItems:'center',marginRight:10}}>
                                    <Text style={{fontSize:13,color:'#fff',fontWeight:'bold'}}>券后价</Text>
                                </View>
                                <Text style={{color:theme.themeColor,fontSize:16}}>{`${projectModel.item.qhjGoods}元`}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:40,padding:10,alignItems:'center',marginBottom:10}}>
                                <Text style={{textDecorationLine:'line-through',color:'#999'}}>{`原价：￥${projectModel.item.oriPrice}`}</Text>
                                <Text>{`月销量${projectModel.item.monthNum}`}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,height:10,backgroundColor:'#f5f5f5'}}></View>
                        <View style={styles.topic}>
                            <Text style={styles.topicHead}>-----  相关推荐  -----</Text>
                            <FlatList
                                data={store.projectModels}
                                keyExtractor={item => "" + item.item.goodsNum}
                                renderItem={data => this.renderItem(data)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{height:40}}></View>
                        </View>
                    </View>
                    <Toast ref={'toast'}
                        position={'center'}
                    />
                </ScrollView>
                
                <View style={{flex:1,height:51,flexDirection:'column',position: 'absolute',bottom: 0,left:0,right:0}}>
                    <View style={{height:1,backgroundColor:'#eee'}}></View>
                    <View style={{flex:1,flexDirection:'row',height:50,opacity:1,backgroundColor:'#fff',alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>this.backHome()} activeOpacity={1}>
                                <View style={{width:60,height:36,marginTop:7,marginBottom:7,flexDirection:'column',backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                    <AntDesign
                                        name={'home'}
                                        size={20}
                                        style={{color:'#777'}}
                                    />
                                    <Text style={{color:'#777',fontSize:10}}>首页</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.reqlink(projectModel.item.goodsNum,'goShop')}
                            activeOpacity={1}
                        >
                            <View style={{width:120,height:36,marginTop:7,marginBottom:7,marginRight:7,flexDirection:'row',backgroundColor:theme.themeColor,justifyContent:'center',alignItems:'center',borderRadius:18}}>
                                <AntDesign
                                    name={'gift'}
                                    size={20}
                                    style={{color:'#fff',marginRight:10}}
                                />
                                <Text style={{color:'#fff',fontSize:14}}>领券购买</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.reqlink(projectModel.item.goodsNum,'shareGoods')}
                            activeOpacity={1}
                        >
                            <View style={{width:120,height:36,marginTop:7,marginBottom:7,marginRight:7,flexDirection:'row',backgroundColor:'#ff4800',justifyContent:'center',alignItems:'center',borderRadius:18}}>
                                <AntDesign
                                    name={'export'}
                                    size={20}
                                    style={{color:'#fff',marginRight:10}}
                                />
                                <Text style={{color:'#fff',fontSize:14}}>复制分享</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaViewPlus>
        )
    }
}

const mapStateToProps = state => ({
    recommend: state.recommend
})

const mapDispatchToProps = dispatch => ({
    onRefreshRelative: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshRelative(storeName, url, pageSize, favoriteDao)),
    onLoadMoreRelative: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreRelative(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushRelativeFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushRelativeFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0
    },
    topic: {
        alignItems:'center',
        backgroundColor: '#fff',
        paddingBottom:10,
        marginBottom:10,
    },
    topicHead:{
        fontSize:14,
        color:'#666',
        padding:15,
    },
})