import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, View, DeviceInfo } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
const goods_URL = 'https://detail.tmall.com/item.htm?id=';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../ask/FavoriteDao';

export default class WebviewDeatil extends Component {
    constructor(props) {
        super(props);
        console.log("projecPROPS",JSON.stringify(this.props));
        this.params = this.props.navigation.state.params;
        const{ projectModel,flag } = this.params;
        console.log("projectModelde",JSON.stringify(projectModel));
        this.favoriteDao = new FavoriteDao(flag);
        this.url = goods_URL + projectModel.goodsNum;
        const title = projectModel.titGoods;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false
        }
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

    onFavoriteButtonClick() {
        const{ projectModel,callback } = this.params;
        const isFavorite = projectModel.isFavorite=!projectModel.isFavorite;
        callback(isFavorite);//更新item的收藏状态
        this.setState({
            isFavorite: isFavorite
        });
        let key = projectModel.full_name ? projectModel.full_name : projectModel.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel))
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                onPress={() => this.onFavoriteButtonClick()}
                activeOpacity={1}
            >
                <AntDesign
                    name={this.state.isFavorite ? 'heart':'hearto'}
                    size={20}
                    style={{color:'#fff',marginRight: 10}}
                />
            </TouchableOpacity>
        </View>)
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    render() {
        const {theme} = this.params;
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                titleLayoutStyle = {titleLayoutStyle}
                title={this.state.title}
                style={theme.styles.navBar}
        />
        return (
            <SafeAreaViewPlus
                topColor={theme.themeColor}
            >
                {navigationBar}
                <WebView
                    ref={webView => this.WebView = WebView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri : this.state.url}}
                />
            </SafeAreaViewPlus>
        )
    
    
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0
    }
})