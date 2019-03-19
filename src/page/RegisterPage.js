import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WhiteSpace,WingBlank,InputItem,List } from '@ant-design/react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum : "",
            password1 : "",
            password2 : "",
            chenkNum : ""
        }
    }

    static navigationOptions = {
        header:null
    };

    leftButtonPart (imageRoad) {
        return (
            <TouchableOpacity
                onPress = {()=>this.clickPage('back')}
            >
                <Image style={{width:25,height:25,margin:10}}
                    source={imageRoad}
                ></Image>
            </TouchableOpacity>
        )
    }

    clickPage(pageName) {
        if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    render() {
        return(
            <View style={{flex:1}}>
                <NavigationBar title={'注册'}/>
                <ScrollView style={{ flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{height:100,justifyContent:'center',marginTop:20}}>
                        <Text style={{textAlign:"center",color:'#333',fontSize:20,fontWeight:'bold'}}>欢迎来到悦购</Text>
                    </View>
                    <WhiteSpace />
                    <WingBlank>
                        <List>
                            <WingBlank>
                                <InputItem style={styles.inputVal}
                                        clear
                                        type="phone"
                                        value={this.state.phoneNum}
                                        onChange={value => {
                                            this.setState({
                                                phoneNum: value,
                                            });
                                        }}
                                        placeholder="请输入手机号码"
                                    >
                                        <Text style={styles.typeNames}>手机号码：</Text>
                                </InputItem>
                            </WingBlank>
                            <WhiteSpace />
                            <WingBlank>
                                <InputItem style={styles.inputVal}
                                    clear
                                    type="password"
                                    value={this.state.password1}
                                    onChange={value => {
                                        this.setState({
                                            password1: value,
                                        });
                                    }}
                                    placeholder="请输入登录密码"
                                >
                                    <Text style={styles.typeNames}>登录密码：</Text>
                                </InputItem>
                            </WingBlank>

                            <WhiteSpace />
                            <WingBlank>
                                <InputItem style={styles.inputVal}
                                    clear
                                    type="password"
                                    value={this.state.password2}
                                    onChange={value => {
                                        this.setState({
                                            password2: value,
                                        });
                                    }}
                                    placeholder="请再次输入登录密码"
                                >
                                    <Text style={styles.typeNames}>确认密码：</Text>
                                </InputItem>
                            </WingBlank>

                            <WhiteSpace />
                            <WingBlank>
                                <InputItem style={styles.inputVal}
                                    clear
                                    type="number"
                                    value={this.state.chenkNum}
                                    onChange={value => {
                                        this.setState({
                                            chenkNum: value,
                                        });
                                    }}
                                    placeholder="请输入手机验证码"
                                >
                                    <Text style={styles.typeNames}>手机验证码：</Text>
                                </InputItem>
                            </WingBlank>

                            <WhiteSpace />
                            <WingBlank>
                                <InputItem style={styles.inputVal}
                                    clear
                                    type="number"
                                    value={this.state.number}
                                    onChange={value => {
                                        this.setState({
                                            number: value,
                                        });
                                    }}
                                    placeholder="请输入推荐人邀请号"
                                >
                                    <Text style={styles.typeNames}>邀请号：</Text>
                                </InputItem>
                            </WingBlank>
                        </List>
                        <View style={{height:40,backgroundColor:'#79d7da',marginTop:20,borderColor:'#79d7da',borderRadius:20}}>
                            <Text style={{color:'#fff',textAlign:"center",lineHeight:40,fontSize:13}}>立即注册</Text>
                        </View>
                    </WingBlank>
                </ScrollView>
            </View>
        )
    }
}

export default RegisterPage;

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
});