import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WhiteSpace,WingBlank,Flex,InputItem,List } from '@ant-design/react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";


class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            uesrName: '',
            passwordText: ''
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

    render(){
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'登录'}
                                style={theme.styles.navBar}
                            />
        return (
            <ScrollView style={styles.container}>
                {navigatorBar}
                <WingBlank>
                    <Flex direction={"column"}>
                        <Flex justify={"center"} style={{width:300,height:150}}>
                            <Image
                                style={{width: 50, height: 50,borderRadius:6}}
                            ></Image>
                        </Flex>
                        <View style={{width:300,height:200,paddingTop:10}}>
                            <List>
                                <WhiteSpace></WhiteSpace>
                                <InputItem style={{fontSize:13,borderWidth:0}}
                                    clear
                                    value={this.state.uesrName}
                                    onChange={value => {
                                        this.setState({
                                            uesrName: value,
                                        });
                                    }}
                                    placeholder="请输入手机号码"
                                />
                                <WhiteSpace></WhiteSpace>
                                <Flex direction={"row"}>
                                    <InputItem style={{fontSize:13,width:200}}
                                        clear
                                        type="password"
                                        value={this.state.passwordText}
                                        onChange={value => {
                                            this.setState({
                                                passwordText: value,
                                            });
                                        }}
                                        placeholder="请输入密码"
                                    />
                                    <View style={{width:1,height:20,marginLeft:10,marginRight:10,backgroundColor:'#dcdcdc'}}></View>
                                    <Text style={{color:'#dcdcdc',fontSize:13}}
                                        onPress={()=>this.clickPage('忘记密码')}
                                    >忘记密码</Text>
                                </Flex>
                                <WhiteSpace></WhiteSpace>
                            </List>
                            <View style={{width:300,height:40,borderRadius:20,backgroundColor:theme.themeColor,marginTop:20}}>
                                <Text style={{lineHeight:40,color:'#fff',fontSize:13,textAlign:'center'}}>登录</Text>
                            </View>
                        </View>
                        <View style={{width:300,height:30}}>
                            <Text style={{lineHeight:30,color:theme.themeColor,fontSize:13,textAlign:'right',marginRight:10}}
                                onPress={()=>this.clickPage('新用户注册')}
                            >新用户注册</Text>
                        </View>
                        
                        <Flex direction={"row"} justify={"center"} style={{width:300,height:20,marginTop:40}}>
                            <View style={{width:60,height:1,backgroundColor:'#eee',marginRight:20}}></View>
                            <Text style={{lineHeight:20,color:"#ddd",fontSize:13,textAlign:"center"}}>其他第三方登录</Text>
                            <View style={{width:60,height:1,backgroundColor:'#eee',marginLeft:20}}></View>
                        </Flex>
                        <Flex direction={"column"} justify={"center"} style={{width:300,height:80,justifyContent:'center'}}>
                            <Image
                                resizeMode={('contain')}
                                style={{width: 26, height: 26}}
                            ></Image>
                            <Text style={{fontSize:10,color:'#666',marginTop:3}}></Text>
                        </Flex>
                    </Flex>
                </WingBlank>


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