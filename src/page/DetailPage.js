import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, View, DeviceInfo,Text } from 'react-native';
import { FLAG_STORAGE } from '../ask/DataStore';
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
import SwiperArr from '../common/swiper/swiper';

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
                    <TouchableOpacity onPress={() => this.gotowebDetail()} activeOpacity={1}>
                        <AntDesign
                            name={'filetext1'}
                            size={20}
                            style={{color:'#666'}}
                        />
                        <Text style={{marginTop:5,justifyContent:'center',alignItems:'center',fontSize:12}}>详情</Text>
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
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <SwiperArr></SwiperArr>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row',padding:10,alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{color:'#333',paddingTop:3,paddingBottom:3}}>券后价第三方开始的副驾驶的荆防颗粒睡大街的话费送积分卡拉斯的减肥了深刻的京东方设计师的风景</Text>
                            </View>
                            {this.webDetail()}
                        </View>
                        <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:10}}>
                            <View style={{height:20,marginLeft:10,borderColor:"#ff4800",backgroundColor:'#ff4800',borderRadius:6,borderWidth:2,paddingLeft:8,paddingRight:8,alignItems:'center',marginRight:10}}>
                                <Text style={{fontSize:13,color:'#fff',fontWeight:'bold'}}>券后价</Text>
                            </View>
                            <Text style={{color:"#ff4800",fontSize:16}}>￥99.99</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',height:40,padding:10,alignItems:'center',marginBottom:10}}>
                            <Text>￥99.90</Text>
                            <Text>已售：99.99万件</Text>
                        </View>
                    </View>
                    <View style={{flex:1,height:50,alignItems:'center',color:'#666',marginTop:20}}>
                        <Text>------   推荐商品   ------</Text>
                    </View>
                </View>
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