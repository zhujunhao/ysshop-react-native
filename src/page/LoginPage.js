import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";
import { Dimensions } from "react-native";
import DataStore from "../../src/ask/DataStore";
import Toast from 'react-native-easy-toast'


var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
var height = WINDOW.height;
var times;
class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            uesrName: '',
            mobileNumber: '',
            passwordText: '',
            verifyCode: '',
            pwdShow: true,
            countDownStatus: 0,
            time : 60,
        }
        console.log("navss",this.props)
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
        this.timer&&clearInterval(this.timer);//同时为真的才执行卸载
        this.backPress.componentWillUnmout();
    }


    clickPage = (pageName) => {
        if (pageName == "忘记密码") {
            NavigatorUtil.goPage(this.props,'ForpwdPage')
        } else if (pageName == "新用户注册") {
            NavigatorUtil.goPage(this.props,'RegisterPage')
        } else if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    btnchange = () => {
        console.log("countDownStatus",this.state.countDownStatus)
        // if (this.checkMob() != '0001') {
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
            
        // }
    }


    checkMob = () => {
        this.refs.toast.show('请输入正确的手机号码');
        if (!this.state.mobileNumber) {
            console.log("请输入正确的手机号码")
            this.refs.toast.show('请输入正确的手机号码');
            return '0001'
        }
        let dataStore = new DataStore();
        let url = 'https://yuegomall.com/api/v0/users/signup'
        let data={'mobileNumber':this.state.mobileNumber};
        dataStore.postJson(url,data,function (set){
            console.log(JSON.stringify(set))
        });
    }

    checkVerify = () => {
        if (!this.state.mobileNumber) {
            return '0001'
        }

        if (!this.state.verifyCode) {
            return '0002'
        }
        let dataStore = new DataStore();
        let url = 'https://yuegomall.com/api/v0/users/verify'
        let data={'mobileNumber':this.state.mobileNumber,'verifyCode':this.state.verifyCode};
        dataStore.postJson(url,data,(set) => {
            console.log(JSON.stringify(set))
            if (set.success == true) {
                let loginSuccess = {
                    'mobileNum': this.state.mobileNumber,
                    'StatusCode': '0000'
                }
                AsyncStorage.setItem('loginStatus',JSON.stringify(loginSuccess))
                console.log("123456",JSON.stringify(this.props))
                NavigatorUtil.resetToHomePage({
                    navigation: this.props.navigation
                })
            }
        });

    }

    render(){
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'登录'}
                                style={theme.styles.navBar}
                            />

        let pwdPart = <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {/* 用户名 */}
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'user'}
                        size={20}
                        style={{color:'#999',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        maxLength={11}
                        keyboardType='numeric'
                        placeholder='请输入手机号码'
                    />
                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                </View>
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View>
            {/* 密码 */}
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'lock'}
                        size={20}
                        style={{color:'#999',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        secureTextEntry={true}
                        placeholder='请输入密码'
                    />
                    <View style={{width:1,height:20,marginLeft:10,marginRight:10,marginTop:20,backgroundColor:'#dcdcdc'}}></View>
                    <View style={{width:80,height:59,justifyContent:'center'}}>
                        <Text style={{color:'#999',fontSize:13,textAlign:'center'}}
                            onPress={()=>this.clickPage('忘记密码')}
                        >忘记密码</Text>
                    </View>
                </View>
            </View>
        </View>

        let msgPart =  <View style={{flexDirection:'column',alignItems:'center'}}>
            {/* 手机号码 */}
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:320,height:46,borderRadius: 30,borderWidth:0.5,borderColor: '#999',flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                    <AntDesign
                        name={'mobile1'}
                        size={20}
                        style={{color:'#999', marginLeft: 16,marginRight: 6}}
                    />
                    <TextInput
                        style={{width:170,fontSize:14,height:59,color: '#999'}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        maxLength={11}
                        onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                        value={this.state.mobileNumber}
                        keyboardType='numeric'
                        placeholder='请输入手机号'
                    />
                    <View style={{width:100,height:46,justifyContent:'center'}}></View>
                </View>
            </View>
            <View style={{height:30}}></View>
            {/* 手机验证码 */}
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:320,height:46,borderRadius: 30,borderWidth:0.5,borderColor: '#999',flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                    <AntDesign
                        name={'hourglass'}
                        size={20}
                        style={{color:'#999', marginLeft: 16,marginRight: 6}}
                    />
                    <TextInput
                        style={{width:170,fontSize:14,height:59,color: '#999'}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(verifyCode) => this.setState({verifyCode})}
                        value={this.state.verifyCode}
                        maxLength={6}
                        keyboardType='numeric'
                        placeholder='请输入验证码'
                    />
                    <View style={{width:1,height:20,marginLeft:10,marginRight:10,backgroundColor:'#dcdcdc'}}></View>
                    {!this.state.countDownStatus ? <TouchableOpacity onPress={() => this.btnchange() }>
                                                        <View style={{width:80,height:46,justifyContent:'center'}}>
                                                            <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>发送验证码</Text>
                                                        </View>
                                                  </TouchableOpacity> : <View style={{width:80,height:46,justifyContent:'center'}}>
                                                                            <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>{`剩余${this.state.time}秒`}</Text>
                                                                        </View>}
                </View>
            </View>
        </View>
        
        return (
            <ScrollView style={styles.container}>
                {navigatorBar}
                <View style={{flex:1,flexDirection:'column',alignItems:'center',marginTop:100}}>
                    {msgPart}

                    <View style={{height:10}}></View>
                    {/* 登录 */}
                    <TouchableOpacity onPress={()=>this.checkVerify()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.themeColor,marginTop:30,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>登  录</Text>
                        </View>
                    </TouchableOpacity>

                    {/* 注册 */}
                    <View style={{flexDirection:'row',width:300,height:30,marginTop:20}}>
                        <Text style={{lineHeight:30,color:theme.themeColor,fontSize:13,textAlign:'left',marginLeft:10}}
                        ></Text>
                        <View style={{flex:1}}></View>
                        <Text style={{lineHeight:30,color:'#333',fontSize:13,textAlign:'right',marginRight:10}} 
                        ></Text>
                    </View>
                    <Toast ref={'toast'}
                        position={'center'}
                    />

                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgbg: {
        flex:1,
        height: height - 50
    },
    titlePart: {
        height:120,
        marginTop:20
    }
});