import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, View, DeviceInfo } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../ask/FavoriteDao';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const{ projectModel,flag } = this.params;
        console.log("projectModelde",JSON.stringify(projectModel));
        this.favoriteDao = new FavoriteDao(flag);
        this.url = TRENDING_URL + projectModel.item.full_name;
        const title = projectModel.item.full_name || projectModel.item.full_name;
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
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
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

    onFavoriteButtonClick() {
        const{ projectModel,callback } = this.params;
        const isFavorite = projectModel.isFavorite=!projectModel.isFavorite;
        callback(isFavorite);//更新item的收藏状态
        this.setState({
            isFavorite: isFavorite
        });
        let key = projectModel.item.full_name ? projectModel.item.full_name : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel.item))
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onFavoriteButtonClick()}>
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
                rightButton = {this.renderRightButton()}
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