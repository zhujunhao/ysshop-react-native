import React,{ Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import GlobalStyles from '../ask/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';
import { configurationUrl } from '../ask/config';

const URL = configurationUrl + '/api/v0/users/';
class MyinfoPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNum: '',
            checkNum : ''
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

    onBackPress() {
        this.onBack();
        return true;
    }

    genFetchUrl(key) {
        return URL + key;
    }

    loadData() {
        const { onLoadMyInfo,invitationCode } = this.props;
        const url = this.genFetchUrl(invitationCode);
        onLoadMyInfo(url)
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    render(){
        console.log("myinfo",JSON.stringify(this.props))
        const {theme,myinfo} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'个人资料'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={GlobalStyles.root_container}>
                {navigatorBar}
                <View style={{flex:1,flexDirection:'column'}}>
                    <View style={{height:120,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Image style={{height: 80, width: 80,borderRadius:40,borderColor:'#eee',borderWidth:1}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={require('../../res/backgroundPic.png')}
                        />
                    </View>
                    <View style={{flexDirection:'row',height:50,marginLeft:10,marginRight:10}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>账号：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>{`${myinfo.myInfo.mobileNumber.substr(0,3)}****${myinfo.myInfo.mobileNumber.substr(7,4)}`}</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                    <View style={{flexDirection:'row',height:50,marginLeft:10,marginRight:10}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>邀请码：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>{myinfo.myInfo.invitationCode}</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                    <View style={{flexDirection:'row',height:50,marginLeft:10,marginRight:10}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>级别：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14}}>{myinfo.myInfo.customerLevel[0]}</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    myinfo : state.myinfo
})

const mapDispatchToProps = dispatch => ({
    onLoadMyInfo: (invitationCode) => dispatch(actions.onLoadMyInfo(invitationCode))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyinfoPage)

