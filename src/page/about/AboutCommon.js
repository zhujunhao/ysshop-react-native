import React from 'react';
import {Alert,DeviceInfo,View,Text,Image,Dimensions,StyleSheet,Platform,TouchableOpacity,Clipboard} from "react-native";
import BackPressComponent from "../../common/BackPressComponent";
import NavigatorUtil from "../../navigators/NavigatorUtil";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../ask/styles/GlobalStyles.js';
import Imgshare from "../../common/Imgshare";
import ViewUtil from '../../util/ViewUtil.js';
import Toast from 'react-native-easy-toast';
export const FLAG_ABOUT = {flag_about: 'about',flag_about_me:'about_me'};
export default class AboutCommon {
    constructor(props,updateState,loginstatus) {
        console.log("common",JSON.stringify(props))
        console.log("commonloginstatus",JSON.stringify(loginstatus))
        console.log("updateState",JSON.stringify(updateState))
        this.props = props;
        this.updateState = updateState;
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }

    onBackPress() {
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    /**
     * 保存图片到相册
     * @param ImageUrl  图片地址
     * @returns {*}
     */
    DownloadLocalImage (uri) {
        if(!uri)return null;
        Alert.alert(
            '分享',
            '分享的图片会保存到相册中',
            [
                {text:'取消',onPress:()=>null},
                {text:'确定',onPress:()=>[Imgshare._Download(uri)
                    .then((res)=>{
                        
                    })
                    .catch((error)=>{
                        console.log('error',error)
                    })]} //打开遮罩
            ]
        );

    }

    componentDidMount() {
        console.log("ttt")
        this.backPress.componentDidMount();
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network Error')
            })
            .then(config => {
                if (config) {
                    this.updateState({
                        data : config
                    })
                }
            })
            .catch(e=> {
                console(e);
            })
    }

    componentWillUnmout() {
        this.backPress.componentWillUnmout();
    }

    componentWillmout() {
        console.log("jinlai666")
    }

    onShare() {
        this.DownloadLocalImage('http://r.photo.store.qq.com/psb?/V14gV2Ft3x6LH8/UkpBBlV3rJyASB.Zm8K9l7B12oPMOMjFXVN8DHDyYU4!/r/dL4AAAAAAAAA')
    }

    gotoLogin(pathName) {
        NavigatorUtil.goPage(this.props,pathName)
    }

    copyText (textContent) {
        Clipboard.setString(textContent);
        //this.refs.toast.show('已复制到粘贴板');
    }


    getParallaxRenderConfig = (params) => {
        console.log("ininini",JSON.stringify(this.props))
        const { loginstatus } = this.props
        let config = {};
        let avatar = typeof(params.avatar) === 'string' ? {uri: params.avator} : params.avator;
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: window.width,
                        backgroundColor: 'raba(0,0,0.4)',
                        height: PARALLAX_HEADER_HEIGHT
                    }}
                />
            </View>
        )

        config.renderForeground = () => (
           
            <View key="parallax-header" style={styles.parallaxHeader}>
                <View style={styles.avatar}>
                    <Image style={{height: 80, width: 80,borderRadius:40}}
                        defaultSource={require('../../../res/backgroundPic.png')} //默认图片
                        source={require('../../../res/backgroundPic.png')}
                    />
                </View>
                {loginstatus.mobileNum? <View style={{flexDirection:'column'}}>
                    <Text style={styles.loginText}>{`${loginstatus.mobileNum.substr(0,3)}****${loginstatus.mobileNum.substr(7,4)}`}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={styles.loginText}>{`我的邀请码：${loginstatus.invitationCode}`}</Text>
                        <View style={{width:1,height:10}}></View>
                        {loginstatus.invitationCode?<TouchableOpacity onPress={()=>this.copyText(loginstatus.invitationCode)}>
                            <View style={{width:38,height:18,justifyContent:'center',alignItems:'center',backgroundColor:'#ff4800',borderRadius:10,borderColor:'#ff4800',borderWidth:1,marginLeft:10}}>
                                <Text style={{color:'#fff',fontSize:10}}>复制</Text>
                            </View>
                        </TouchableOpacity>:<View></View>}
                    </View>
                </View> : <TouchableOpacity 
                    activeOpacity={1}
                    onPress={()=>this.gotoLogin("LoginPage")}
                >
                    <Text style={styles.sectionSpeakerText}>注册/登录</Text>
                </TouchableOpacity>}
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        )

        const leftpart = this.props.flagAbout == "about_me" ? ViewUtil.getLeftBackButton(() => NavigatorUtil.goBack(this.props.navigation)) : ViewUtil.getSetButton(() => NavigatorUtil.goPage(this.props,'MyPage'));

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {leftpart}
                {ViewUtil.getShareButton(()=> this.onShare())}
            </View>
        )
        return config;
    }

    render(contentView,params) {
        console.log("contentView",contentView)
        console.log("this.pPPPs",JSON.stringify(this.props));
        const {theme}= this.props.flagAbout == "about_me" ? this.props.navigation.state.params : this.props;
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView style={{flex:1,flexDirection:'column'}}
                backgroundColor={theme.themeColor}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        ) 
    }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 230;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 15;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop:TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        marginLeft:20,
        marginRight:10,
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        alignItems:'center',
        justifyContent:'center',
        width:80,
        height:80,
        backgroundColor:'#fff'
    },
    sectionSpeakerText: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5,
        marginBottom: 10
    },
    loginText: {
        color: '#e5e5e5',
        height: 20,
        lineHeight: 20,
        fontSize: 14,
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});

