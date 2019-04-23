import React, {Component} from 'react';
import {ActivityIndicator,FlatList,Platform,RefreshControl,StyleSheet,Text,TextInput,TouchableOpacity,View,DeviceInfo,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index'
import NavigatorUtil from '../navigators/NavigatorUtil'
import FavoriteUtil from '../util/FavoriteUtil';
import FavouriteItem from '../common/FavouriteItem';
import NavigationBar from '../common/NavigationBar';
import {FLAG_STORAGE} from '../ask/DataStore';
import Toast from 'react-native-easy-toast'
import Utils from "../util/Utils";
import ViewUtil from '../util/ViewUtil';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../ask/FavoriteDao';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.Collection);

const pageSize = 10;//设为常量，防止修改

class SearchPage extends Component {
    constructor(props) {
        super(props);
        console.log("searchprosp",JSON.stringify(this.props))
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.historyView();
        this.state = {
            historyStr: ''
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData(loadMore,searchVal) {
        const {onLoadMoreSearch, onSearch, search, keys} = this.props;
        console.log("searchprops",JSON.stringify(this.props))
        console.log("keys",keys)
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, pageSize, search.items, this.favoriteDao,callback => {
                this.refs.toast.show('没有更多了');
            })
            // 点击历史记录
        } else if (searchVal) {
            onSearch(searchVal, pageSize, this.searchToken = new Date().getTime(), this.favoriteDao, keys, message => {
                this.refs.toast.show(message);
            })
        } else {
            onSearch(this.inputKey, pageSize, this.searchToken = new Date().getTime(), this.favoriteDao, keys, message => {
                this.refs.toast.show(message);
            })
        }
    }

    onBackPress() {
        const { onSearchCancel } = this.props;
        onSearchCancel();//退出时取消搜索
        this.refs.input.blur();
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    renderItem(data) {
        const {theme} = this.params;
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
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao,item, isFavorite)}
        />
    }

    genIndicator() {
        const {theme} = this.params;
        const {search} = this.props;
        return search.hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:theme.themeColor}}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    onRightButtonClick(searchVal) {
        const {onSearchCancel, search} = this.props;
        console.log("search1",search)
        if (search.showText === '搜索') {
            AsyncStorage.getItem('historyArr').then((value) => {
                if (value) {
                    //排重
                    if (value.indexOf(this.inputKey) == -1) {
                        value = value + ',' + this.inputKey
                        AsyncStorage.setItem('historyArr',value)
                    }
                } else {
                    AsyncStorage.setItem('historyArr',this.inputKey)
                }
            }).catch(() => {
               
            });
            
            this.loadData(false,searchVal);
        } else {
            onSearchCancel(this.searchToken);
        }
    }

    renderNavBar(historyVal) {
        const {showText, inputKey} = this.props.search;
        const placeholder = inputKey || "请输入您想购买的商品名称";
        
        let inputView = <TextInput
            ref="input"
            placeholder={placeholder}
            onChangeText={text => this.inputKey = text}
            style={styles.textInput}
        >
        </TextInput>;
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.refs.input.blur();//收起键盘
                    this.onRightButtonClick();
                }}
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.title}>{showText}</Text>
                </View>
            </TouchableOpacity>;
        return <View style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            borderWidth:1,
            borderColor:'#eee'
        }}>
            {inputView}
            {rightButton}
        </View>
    }

    onItemClick (data,index) {

        console.log("datae",JSON.stringify(data))
        console.log("index",JSON.stringify(index))
        this.onRightButtonClick(data);
    }

    historyBox (data,index) {
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick(data,index)}
            >
                <View style={styles.historybox}>
                    <Text>{data}</Text>
                </View>
            </TouchableOpacity>
        )
    }




    historyView = () => {
        AsyncStorage.getItem('historyArr',(error,result)=>{
            if (error){
                console.log('取值失败:'+error);
            }else{
                console.log('取值:'+result);
                this.setState({
                    historyStr: result
                })
            }
        })
    }

    viewsArr = () => {
        console.log("historyStr123",this.state.historyStr)
        let views = [];
        
        if (this.state.historyStr) {

            let values;
            
            values = this.state.historyStr.split(',')
        
            views.push(<View style={{height:40,marginTop:10,justifyContent:'center',marginLeft:16}}>
                <Text >历史搜索</Text>
            </View>)
            console.log("viewsArrres",JSON.stringify(values))
            for (let i = 0, len = values.length; i < len; i+=5) {
                console.log('ioioioio')
                views.push(
                    <View key={i}>
                        <View style={styles.historyitem}>
                            {this.historyBox(values[i].length>=4?`${values[i].substring(0,4)}...`: values[i], i)}
                            {i + 1 < len ? this.historyBox(values[i + 1].length>=4?`${values[i + 1].substring(0,4)}...`: values[i + 1], i+1) : <View></View>}
                            {i + 2 < len ? this.historyBox(values[i + 2].length>=4?`${values[i + 2].substring(0,4)}...`: values[i + 2], i+2) : <View></View>}
                            {i + 3 < len ? this.historyBox(values[i + 3].length>=4?`${values[i + 3].substring(0,4)}...`: values[i + 3], i+3) : <View></View>}
                            {i + 4 < len ? this.historyBox(values[i + 4].length>=4?`${values[i + 4].substring(0,4)}...`: values[i + 4], i+4) : <View></View>}
                        </View>
                    </View>
                )
            }
        }
        return views
    }

    render() {
        const {isLoading, projectModels, showBottomButton, hideLoadingMore} = this.props.search;
        const {theme} = this.params;
        let statusBar = null;
        if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#ff4800'}]}/>
        }
        let navigationBar = <NavigationBar
            leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
            title={'搜索'}
            style={theme.styles.navBar}
        />
        console.log("projectModels11",JSON.stringify(projectModels));

        let listView = <FlatList
                data={projectModels}
                renderItem={data => this.renderItem(data)}
                keyExtractor={item => "" + item.item.goodsNum}
                contentInset={
                    {
                        bottom: 45
                    }
                }
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={theme.themeColor}
                        colors={[theme.themeColor]}
                        refreshing={isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={theme.themeColor}
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
        
        let historyViews = this.viewsArr()

        return <View style={{flex:1}}>
            {navigationBar}
            {this.renderNavBar()}
            {projectModels && projectModels.length>0? listView : historyViews}
            <Toast ref={'toast'}
                position={'center'}
            />
        </View>
    }
}

const mapStateToProps = state => ({
    search: state.search
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onSearch: (inputKey, pageSize, token, favoriteDao, recommendKeys, callBack) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, recommendKeys, callBack)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onLoadMoreSearch: (pageIndex, pageSize, dataArray, favoriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, favoriteDao, callBack)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#fff'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    statusBar: {
        height: 20
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: 45,
        right: 10,
        borderRadius: 3
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "#fff",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 3,
        opacity: 0.7,
        color: '#999'
    },
    title: {
        fontSize: 16,
        color: "#999",
    },
    historyitem: {
        flexDirection:'row',
        height:40,
        alignItems: 'center'
    },
    historybox: {
        marginLeft:10,
        marginTop:10,
        fontSize:13,
        paddingLeft:8,
        paddingRight:8,
        paddingTop:4,
        paddingBottom:4,
        borderRadius:6,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#eee'
    }
});

