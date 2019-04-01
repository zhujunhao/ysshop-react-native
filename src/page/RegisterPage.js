import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WhiteSpace,WingBlank,InputItem,List } from '@ant-design/react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';

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

    render() {
        const {theme} = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'注册'}
                                style={theme.styles.navBar}
                            />
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
                        <View style={{height:40,backgroundColor:theme.themeColor,marginTop:20,borderColor:theme.themeColor,borderRadius:20}}>
                            <Text style={{color:'#fff',textAlign:"center",lineHeight:40,fontSize:13}}>立即注册</Text>
                        </View>
                    </WingBlank>
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
});