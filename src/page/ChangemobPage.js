import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WingBlank,Flex,InputItem,List } from '@ant-design/react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';

class ChangemobPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNum: '',
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
                                title = {'修改手机号码'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={styles.container}>
                    <WingBlank>
                        <Flex direction={"column"} justify={"center"}>

                            <List style={{width:300,marginTop:100}}>
                                <InputItem
                                    style={styles.txtPut}
                                    clear
                                    type="phone"
                                    value={this.state.phoneNum}
                                    onChange={value => {
                                    this.setState({
                                        phoneNum: value,
                                    });
                                    }}
                                    placeholder="请输入新手机号码"
                                >
                                    <Text style={styles.valNameTxt}>手机号码：</Text>
                                </InputItem>
                                <Flex direction={"row"}>
                                    <InputItem
                                        clear
                                        style={{width:200,fontSize:13}}
                                        type="phone"
                                        value={this.state.checkNum}
                                        onChange={value => {
                                        this.setState({
                                            checkNum: value,
                                        });
                                        }}
                                        placeholder="请输入手机验证码"
                                    >
                                        <Text style={styles.valNameTxt}>验证码：</Text>
                                    </InputItem>
                                    <View style={{width:80,height:30,backgroundColor:theme.themeColor,borderRadius:8}}>
                                        <Text style={{lineHeight:30,color:'#fff',fontSize:13,textAlign:"center"}}>发送验证码</Text>
                                    </View>
                                </Flex>
                            </List>
                            <View style={{width:300,height:40,borderRadius:20,backgroundColor:theme.themeColor,marginTop:20}}>
                                <Text style={{lineHeight:40,color:'#fff',fontSize:13,textAlign:'center'}}>修改手机号码</Text>
                            </View>
                        </Flex>
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

export default connect(mapStateToProps,mapDispatchToProps)(ChangemobPage)


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