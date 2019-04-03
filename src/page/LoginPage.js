import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, TextInput } from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";

class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            uesrName: '',
            passwordText: '',
            pwdShow: true
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
        if (pageName == "忘记密码") {
            NavigatorUtil.goPage(this.props,'ForpwdPage')
        } else if (pageName == "新用户注册") {
            NavigatorUtil.goPage(this.props,'RegisterPage')
        } else if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    showPart() {
        if ("1" == "1") {

        } else {

        }
    }

    changeShow() {
        if ("1" == "1") {


        } else {

        }
    }

    render(){
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'登录'}
                                style={theme.styles.navBar}
                            />
        let pwdPart = <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {/* 用户名 */}
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
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
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
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
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View>
        </View>

        let msgPart =  <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
            {/* 手机号码 */}
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'mobile1'}
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
            {/* 手机验证码 */}
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'hourglass'}
                        size={20}
                        style={{color:'#999',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        maxLength={6}
                        keyboardType='numeric'
                        placeholder='请输入手机验证码'
                    />
                    <View style={{width:1,height:20,marginLeft:10,marginRight:10,marginTop:20,backgroundColor:'#dcdcdc'}}></View>
                    <View style={{width:80,height:59,justifyContent:'center'}}>
                        <Text style={{color:'#999',fontSize:13,textAlign:'center'}}
                            onPress={()=>this.clickPage('忘记密码')}
                        >发送验证码</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View>
        </View>
        
        return (
            <ScrollView style={styles.container}>
                {navigatorBar}
                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:100}}>
                    this.showPart {msgPart} : {pwdPart}
                    {/* 登录 */}
                    <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.themeColor,marginTop:30,justifyContent:'center'}}>
                        <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>登录</Text>
                    </View>
                    {/* 注册 */}
                    <View style={{flexDirection:'row',width:320,height:30,marginTop:20}}>
                        <Text style={{lineHeight:30,color:theme.themeColor,fontSize:13,textAlign:'left',marginLeft:10}}
                            onPress={()=>this.clickPage('新用户注册')}
                        >短信验证登录</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{lineHeight:30,color:theme.themeColor,fontSize:13,textAlign:'right',marginRight:10}}
                            onPress={()=>this.clickPage('新用户注册')}
                        >新用户注册</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titlePart: {
        height:120,
        marginTop:20
    }
});