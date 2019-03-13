import React, {Component} from 'react';
import {ActivityIndicator,FlatList,Platform,RefreshControl,StyleSheet,Text,TextInput,TouchableOpacity,View,DeviceInfo} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index'
import NavigatorUtil from '../navigators/NavigatorUtil'
import FavouriteItem from '../common/FavouriteItem';
import NavigationBar from '../common/NavigationBar';
import {FLAG_STORAGE} from '../ask/DataStore';
import Toast from 'react-native-easy-toast'
import Utils from "../util/Utils";
import ViewUtil from '../util/ViewUtil';
import BackPressComponent from '../common/BackPressComponent';


const pageSize = 10;//设为常量，防止修改
class SearchPage extends Component {
    constructor(props) {
        super(props);
        console.log("searchprosp",JSON.stringify(props))
        this.params = this.props.navigation.state.params;
        this.isKeyChange = false;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
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

    loadData(loadMore) {
        const {onLoadMoreSearch, onSearch, search, keys} = this.props;
        console.log("search",search)
        console.log("keys",keys)
        if (loadMore) {
            onLoadMoreSearch(++search.pageIndex, pageSize, search.items, callback => {
                this.toast.show('没有更多了');
            })
        } else {
            onSearch(this.inputKey, pageSize, this.searchToken = new Date().getTime(),keys,  message => {
                this.toast.show(message);
            })
        }
    }

    onBackPress() {
        const {onSearchCancel, onLoadLanguage} = this.props;
        onSearchCancel();//退出时取消搜索
        this.refs.input.blur();
        NavigationUtil.goBack(this.props.navigation);
        if (this.isKeyChange) {
            onLoadLanguage(FLAG_LANGUAGE.flag_key);//重新加载标签
        }
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
            onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
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

    /**
     * 添加标签
     */
    saveKey() {
        const {keys} = this.props;
        let key = this.inputKey;
        if (Utils.checkKeyIsExist(keys, key)) {
            this.toast.show(key + '已经存在');
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            keys.unshift(key);//将key添加到数组的开头
            this.toast.show(key.name + '保存成功');
            this.isKeyChange = true;
        }
    }

    onRightButtonClick() {
        const {onSearchCancel, search} = this.props;
        console.log("search1",search)
        if (search.showText === '搜索') {
            this.loadData();
        } else {
            onSearchCancel(this.searchToken);
        }
    }

    renderNavBar() {
        const {showText, inputKey} = this.props.search;
        const placeholder = inputKey || "请输入您想购买的商品";
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
                keyExtractor={item => "" + item.item.id}
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

        return <View style={{flex:1}}>
            {navigationBar}
            {this.renderNavBar()}
            {listView}
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }
}

const mapStateToProps = state => ({
    search: state.search
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onSearch: (inputKey, pageSize, recommendKeys, callBack,token) => dispatch(actions.onSearch(inputKey, pageSize, recommendKeys, callBack, token)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onLoadMoreSearch: (pageIndex, pageSize, dataArray, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, callBack)),
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
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
});
