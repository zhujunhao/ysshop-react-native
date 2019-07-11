import React,{ Component } from 'react';
import { StyleSheet, Text, View,FlatList, RefreshControl,TouchableOpacity,ActivityIndicator,InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../action/index';
import Toast from 'react-native-easy-toast';
import InvitePartnersItem from '../common/InvitePartnersItem';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import { configurationUrl } from '../ask/config';
const URL = configurationUrl + '/api/v0/partners/';

const pageSize = 10;//设为常量，防止修改

class InvitePartnersPage extends Component {
    constructor(props) {
        super(props);
        console.log("rethisprops",JSON.stringify(this.props))
        this.isFavoriteChanged = false;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }
    
    componentDidMount() {
        this.backPress.componentDidMount();
        InteractionManager.runAfterInteractions(()=>{
            this.loadData();
         });
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onSearch(pathName){
        NavigatorUtil.goPage(this.props,pathName)
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData(loadMore) {
        const { onRefreshInvite, onLoadMoreInvite } = this.props;
        const {invitationCode} = this.props.navigation.state.params;
        const store = this._store();
        const url = this.genFetchUrl(invitationCode);
        if (loadMore) {//加载更多
            onLoadMoreInvite('getPartnersList', ++store.pageIndex, pageSize, store.items, '', callback => {
                this.refs.toast.show('没有更多了');
            })
        } else {//普通刷新
            onRefreshInvite('getPartnersList', url, pageSize, '')
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        console.log("store111111",JSON.stringify(this.props))
        //订阅回来的数据
        let store = this.props.invitePartners.getPartnersList;
        if (!store) {
            store = {
                objs: [],          //全部的数据
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
        const {theme} = this.props.navigation.state.params;
        return <InvitePartnersItem
            projectModel={item}
            theme = {theme}
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
        const {theme} = this.props.navigation.state.params;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                title={'悦达人合伙人'}
                style={theme.styles.navBar}
        />

        let searchPart = <TouchableOpacity
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
                            <Text style={{fontSize:13}}>{'输入手机号码'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        
        
        let lists = store.projectModels?<FlatList 
            data={store.projectModels}
            renderItem={data => this.renderItem(data)}
            keyExtractor={item => "" + item._id}
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
        /> : <View ><Text style={{height:80,lineHeight:80,textAlign:'center'}}>暂时还没有查询到合伙人信息^_^</Text></View>
        return (
            <SafeAreaViewPlus>
                {navigationBar}
                {searchPart}
                {lists}
                <Toast ref={'toast'}
                    position={'center'}
                />
            </SafeAreaViewPlus>
        )
    }
}

const mapStateToProps = state => ({
    invitePartners: state.invitePartners
})

const mapDispatchToProps = dispatch => ({
    onRefreshInvite: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshInvite(storeName, url, pageSize, favoriteDao)),
    onLoadMoreInvite: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreInvite(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
})

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(InvitePartnersPage);

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