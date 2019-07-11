import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, TextInput } from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import DataStore from "../../src/ask/DataStore";
import { configurationUrl } from '../ask/config';

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
var height = WINDOW.height;
var times;
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uesrName: '',
            mobileNumber: '',
            passwordText: '',
            invitationCode: '',
            verifyCode: '',
            pwdShow: true,
            countDownStatus: 0,
            time : 60,
        }
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }


    onBackPress() {
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmout() {
        this.backPress.componentWillUnmout();
    }

    clickPage(pageName) {
        if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    checkMob() {
        if (!this.state.mobileNumber) {
            console.log("请输入正确的手机号码")
            return '0001'
        }
        let dataStore = new DataStore();
        console.log("this.state.mobileNumber",this.state.mobileNumber)
        let url = configurationUrl + '/api/v0/users/sendVerifyCode'
        let data={'mobileNumber':this.state.mobileNumber};
        dataStore.postJson(url,data,function (set){
            console.log(JSON.stringify(set))
        });
    }

    //验证码倒计时
    resbtnchange () {
        console.log("countDownStatus",this.state.countDownStatus)
        if (this.checkMob() != '0001') {
            clearInterval(this.timer)
            this.timer=setInterval(()=>{
                if (times < 10) {
                    times = '0'+ times
                }
                this.setState({
                    countDownStatus: 1,
                    time: times
                })
                if (times > 0) {
                    times-- ;
                } else {
                    this.setState({
                        countDownStatus: 0
                    })
                    times = 60
                    clearInterval(this.timer)
                }
            },1000)
            console.log("thistime",this.timer)
        }
    }

    // 立即注册
    registerPart = () => {
        if (!this.state.mobileNumber) {
            return '0001'
        }

        if (!this.state.verifyCode) {
            return '0002'
        }
        let dataStore = new DataStore();
        let url = configurationUrl + '/api/v0/users/signupPart'
        let data={'mobileNumber':this.state.mobileNumber,'verifyCode':this.state.verifyCode};
        dataStore.postJson(url,data,(set) => {
            console.log(JSON.stringify(set))
            if (set.success == true) {
                let loginSuccess = {
                    'mobileNum': this.state.mobileNumber,
                    'StatusCode': '0000'
                }
                this.loadData('0000')
                //保存登录信息到本地
                AsyncStorage.setItem('loginStatus',JSON.stringify(loginSuccess))
                console.log("123456",JSON.stringify(this.props))
                NavigatorUtil.resetToHomePage({
                    navigation: this.props.navigation
                })
            } else {
                this.refs.toast.show('输入信息有误');
            }
        });

    }

    render() {
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'新用户注册'}
                                style={theme.styles.navBar}
                            />
        let regPart = <View style={{flexDirection:'column',alignItems:'center'}}>
            <View style={{flexDirection:'row',height:59}}>
                <AntDesign
                    name={'mobile1'}
                    size={20}
                    style={{color:'#666',marginRight: 6,marginTop: 20}}
                />
                <TextInput
                    style={{width:189,fontSize:14,height:59,color: '#999'}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    maxLength={11}
                    onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                    value={this.state.mobileNumber}
                    keyboardType='numeric'
                    placeholder='请输入手机号'
                />
                <View style={{width:100,height:59,justifyContent:'center'}}></View>
            </View>

            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>

            <View style={{flexDirection:'row',height:59,alignItems:'center'}}>
                <AntDesign
                    name={'hourglass'}
                    size={20}
                    style={{color:'#666',marginRight: 6}}
                />
                <TextInput
                    style={{width:189,fontSize:14,height:59}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    maxLength={6}
                    keyboardType='numeric'
                    placeholder='请输入验证码'
                />
                <View style={{width:1,height:20,marginLeft:10,marginRight:10,backgroundColor:'#dcdcdc'}}></View>
                {!this.state.countDownStatus ? <TouchableOpacity onPress={() => this.resbtnchange() }>
                                            <View style={{width:80,height:46,justifyContent:'center'}}>
                                                <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>获取验证码</Text>
                                            </View>
                                      </TouchableOpacity> : <View style={{width:80,height:46,justifyContent:'center'}}>
                                                                <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>{`剩余${this.state.time}秒`}</Text>
                                                            </View>}
            </View>
            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>

            {/* 邀请人号码 */}
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'barcode'}
                        size={20}
                        style={{color:'#666',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        placeholder='请输入邀请码'
                    />
                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                </View>
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View>
            {/* 立即注册 */}
            <TouchableOpacity onPress={() => this.registerPart() }>
                <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.themeColor,marginTop:30,justifyContent:'center',opacity:0.8}}>
                    <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>立即注册</Text>
                </View>
            </TouchableOpacity>
        </View>

        
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={{ flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{height:100,justifyContent:'center',marginTop:20}}>
                        <Text style={{textAlign:"center",color:'#333',fontSize:20,fontWeight:'bold'}}>欢迎来到悦达人</Text>
                    </View>
                    {regPart}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage)


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    typeNames: {
        fontSize:13,
        width:100,
        color:'#333'
    },
    inputVal: {
        fontSize:13,
        backgroundColor:'#fff'
    },
    imgbg: {
        flex:1,
        height: height - 50
    }
});