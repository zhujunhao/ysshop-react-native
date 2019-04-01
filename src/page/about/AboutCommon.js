import React from 'react';
import {Alert,DeviceInfo,View,Text,Image,Dimensions,StyleSheet,Platform,TouchableOpacity} from "react-native";
import BackPressComponent from "../../common/BackPressComponent";
import NavigatorUtil from "../../navigators/NavigatorUtil";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../ask/styles/GlobalStyles.js';
import Imgshare from "../../common/Imgshare";
import ViewUtil from '../../util/ViewUtil.js';
export const FLAG_ABOUT = {flag_about: 'about',flag_about_me:'about_me'};
export default class AboutCommon {
    constructor(props,updateState) {
        this.props = props;
        console.log("uspros",JSON.stringify(this.props))
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

    onShare() {
        this.DownloadLocalImage('http://a1.qpic.cn/psb?/V14gV2Ft3x6LH8/XjuqZjBhfQHAgCK5nrP8hjD0hCgKOQSGAJJ4X6DHq5Q!/m/dFQBAAAAAAAAnull&bo=OASABwAAAAADB5k!&rf=photolist&t=5')
    }

    gotoLogin(pathName) {
        NavigatorUtil.goPage(this.props,pathName)
    }

    

    getParallaxRenderConfig(params) {
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
                    <Text style={{color:'#999',fontSize:14}}>悦达人</Text>
                </View>
                <TouchableOpacity 
                    activeOpacity={1}
                >
                    <Text style={styles.sectionSpeakerText}>
                        更多内容敬请期待
                    </Text>
                </TouchableOpacity>
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
        color: 'white',
        fontSize: 16,
        paddingVertical: 5,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});

