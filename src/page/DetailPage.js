import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity, View, DeviceInfo,Text,Image } from 'react-native';
import { FLAG_STORAGE } from '../ask/DataStore';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
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
        const title = projectModel.item.titGoods;
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
                    <TouchableOpacity activeOpacity={1}>
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
        const {theme,projectModel} = this.params;
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
                    <View style={{flexDirection:'column'}}>
                        <Image style={{height:200}}
                                source={{uri: projectModel.item.picGoods}}
                        />
                        <View style={{flexDirection:'row',padding:10,alignItems:'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{color:'#333',paddingTop:3,paddingBottom:3}}>{projectModel.item.titGoods}</Text>
                            </View>
                            {this.webDetail()}
                        </View>
                        <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:10}}>
                            <View style={{height:20,marginLeft:10,borderColor:"#ff4800",backgroundColor:'#ff4800',borderRadius:6,borderWidth:2,paddingLeft:8,paddingRight:8,alignItems:'center',marginRight:10}}>
                                <Text style={{fontSize:13,color:'#fff',fontWeight:'bold'}}>券后价</Text>
                            </View>
                            <Text style={{color:"#ff4800",fontSize:16}}>{`${projectModel.item.qhjGoods}元`}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',height:40,padding:10,alignItems:'center',marginBottom:10}}>
                            <Text>{`原价：￥${projectModel.item.oriPrice}`}</Text>
                            <Text>{`月销量${projectModel.item.monthNum}`}</Text>
                        </View>
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