import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, TextInput,ImageBackground } from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import DataStore from "../../src/ask/DataStore";

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
var height = WINDOW.height;

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum : "",
            password1 : "",
            password2 : "",
            chenkNum : ""
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

    checkMob () {
        let dataStore = new DataStore();
        let url = 'http://192.168.43.131:3333/api/v0/users/signup'
        let data={'mobileNumber':'15626489860'};
        dataStore.postJson(url,data,function (set){
            alert(set)
             switch (set.retCode) {
                   case "0000":
                    alert("登录成功");
                       break;
                    case "0001":
                        alert("登录失败");
                          break;
                      default:
                       alert("登录失败");
                }
        });
    }

    render() {
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'注册'}
                                style={theme.styles.navBar}
                            />

        let regPart = <View>
            {/* 手机验证码 */}
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <View style={{flexDirection:'row',height:59}}>
                    <AntDesign
                        name={'hourglass'}
                        size={20}
                        style={{color:'#fff',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#fff'
                        maxLength={6}
                        keyboardType='numeric'
                        placeholder='请输入验证码'
                    />
                    <View style={{width:1,height:20,marginLeft:10,marginRight:10,marginTop:20,backgroundColor:'#dcdcdc'}}></View>
                    <View style={{width:80,height:59,justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontSize:13,textAlign:'center'}}
                            onPress={()=>this.clickPage('忘记密码')}
                        >发送验证码</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff',height:1,width:320}}></View>
            </View>
            {/* 邀请人号码 */}
            {/* <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'barcode'}
                        size={20}
                        style={{color:'#999',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        placeholder='请输入邀请人编号'
                    />
                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                </View>
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View> */}
            {/* 立即注册 */}
            <View style={{width:320,height:46,borderRadius:25,backgroundColor:'#fff',marginTop:30,justifyContent:'center',opacity:0.8}}>
                <Text style={{lineHeight:40,color:'#000',fontSize:15,textAlign:'center'}}>立即注册</Text>
            </View>
        </View>
        
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={{ flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <ImageBackground style={styles.imgbg}
                        resizeMode={"stretch"}
                        source={require('../../res/psb.jpg')}
                    >
                        <View style={{height:100,justifyContent:'center',marginTop:20}}>
                            <Text style={{textAlign:"center",color:'#fff',fontSize:20,fontWeight:'bold'}}>欢迎来到悦达人</Text>
                        </View>
                        <View style={{flexDirection:'column',alignItems:'center'}}>
                            {/* 用户名 */}
                            <View style={{flexDirection:'column',alignItems:'center'}}>
                                <View style={{flexDirection:'row',height:59}}>
                                    <AntDesign
                                        name={'mobile1'}
                                        size={20}
                                        style={{color:'#fff',marginRight: 6,marginTop: 20}}
                                    />
                                    <TextInput
                                        style={{width:189,fontSize:14,height:59}}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#fff'
                                        maxLength={11}
                                        keyboardType='numeric'
                                        placeholder='请输入手机号'
                                    />
                                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                                </View>
                                <View style={{backgroundColor:'#fff',height:1,width:320}}></View>
                            </View>
                            <TouchableOpacity onPress={() => this.checkMob()}>
                                <View style={{width:320,height:46,borderRadius:25,backgroundColor:'#fff',marginTop:30,justifyContent:'center',opacity:0.8}}>
                                    <Text style={{lineHeight:40,color:'#000',fontSize:15,textAlign:'center'}}>下一步</Text>
                                </View>
                            </TouchableOpacity>
                            {/* 密码 */}
                            {/* <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                                    <AntDesign
                                        name={'lock'}
                                        size={20}
                                        style={{color:'#fff',marginRight: 6,marginTop: 20}}
                                    />
                                    <TextInput
                                        style={{width:189,fontSize:14,height:59}}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#fff'
                                        secureTextEntry={true}
                                        placeholder='请输入密码'
                                    />
                                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                                </View>
                                <View style={{backgroundColor:'#fff',height:1,width:320}}></View>
                            </View> */}
                            {/* 二次密码 */}
                            {/* <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                                    <AntDesign
                                        name={'lock'}
                                        size={20}
                                        style={{color:'#fff',marginRight: 6,marginTop: 20}}
                                    />
                                    <TextInput
                                        style={{width:189,fontSize:14,height:59}}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#fff'
                                        secureTextEntry={true}
                                        placeholder='请再次输入密码'
                                    />
                                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                                </View>
                                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                            </View> */}

                        </View>
                    </ImageBackground>

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