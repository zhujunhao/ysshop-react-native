import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, TextInput } from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';

class ForpwdPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNum: '',
            password1 : '',
            password2 : '',
            checkNum : ''
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

    render(){
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'修改登录密码'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={styles.container}>
                    <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:100}}>
                        {/* 用户名 */}
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
                                    placeholder='请输入绑定的手机号码'
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
                                <View style={{width:100,height:59,justifyContent:'center'}}></View>
                            </View>
                            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                        </View>
                        {/* 二次密码 */}
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
                                    placeholder='请再次输入密码'
                                />
                                <View style={{width:100,height:59,justifyContent:'center'}}></View>
                            </View>
                            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                        </View>
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
                        {/* 登录 */}
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.themeColor,marginTop:30,justifyContent:'center'}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>修改密码</Text>
                        </View>
                    </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(ForpwdPage)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    valNameTxt: {
        fontSize: 13,
        color: "#333"
    },
    txtPut: {
        fontSize: 13,
        color: "#333"
    }
});