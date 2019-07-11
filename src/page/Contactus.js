import React, { Component } from 'react';
import {View, Text, Image, Clipboard, TouchableOpacity, Linking} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import Toast from 'react-native-easy-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';


export default class ContactusPage extends Component {
    constructor(props) {
        super(props);
        console.log("uuu",JSON.stringify(this.props))
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
        this.params = this.props.navigation.state.params;
        this.state = {
            coptext:'Mr_zhu2013',
            yxqq:'2210766286',
            consigneePhone: '15626489860',
            email: '15626489860@163.com',
            sms: '15626489860',
            ysemail: '2210766286@qq.com'
        }
    };


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

    onItemClick = (typeName) => {
        console.log("typename",typeName)
        let url;
        if (typeName == 'mobile') {
            url = 'tel: ' + this.state.consigneePhone;
        } else if (typeName == 'message') {
            url = 'sms: ' + this.state.sms;
        } else if (typeName == 'email') {
            url = 'mailto: ' + this.state.email;
        } else if (typeName == 'yxemail') {
            url = 'mailto: ' + this.state.ysemail;
        }
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    async copy(){
        Clipboard.setString(this.state.coptext);
        this.refs.toast.show('已经复制到粘贴板');
        let  str = await Clipboard.getString();
        console.log(str)//我是文本
    }

    async yxcopy(){
        Clipboard.setString(this.state.yxqq);
        this.refs.toast.show('已经复制到粘贴板');
        let  str = await Clipboard.getString();
        console.log(str)//我是文本
    }

    render() {
        const { theme } = this.params;
        const { coptext } = this.state;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'联系我们'}
                                style={theme.styles.navBar}
                            />
        
        const content = <View>
            <View style={{flex:1,alignItems:'center',flexDirection:'column'}}>
                <View style={{height:80,marginTop:46, alignItems:'center'}}>
                    <Image style={{height: 80, width: 80}}
                        source={require('../../res/ydrlogo.png')}
                    />
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',height:40,marginTop:80}}>
                    <Text style={{fontSize:13,fontWeight:'bold'}}>小猪</Text>
                    <View style={{width:2,height:14,marginRight:10,marginLeft:10,backgroundColor:theme.themeColor,borderRadius:1}}></View>
                    <Text style={{fontSize:13}}>开发工程师</Text>
                </View>

                <View style={{flex:1,height:60,flexDirection:'row',marginTop:20}}>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={this.copy.bind(this)}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'wechat'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                    <View style={{width:13}}></View>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.onItemClick("mobile")}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'mobile1'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                    <View style={{width:13}}></View>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.onItemClick("message")}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'message1'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                    <View style={{width:13}}></View>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.onItemClick("email")}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'mail'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',height:40,marginTop:80}}>
                    <Text style={{fontSize:13,fontWeight:'bold'}}>小丑鱼</Text>
                    <View style={{width:2,height:14,marginRight:10,marginLeft:10,backgroundColor:theme.themeColor,borderRadius:1}}></View>
                    <Text style={{fontSize:13}}>UI设计师</Text>
                </View>
                <View style={{flex:1,height:60,flexDirection:'row',marginTop:20}}>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={this.yxcopy.bind(this)}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'QQ'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity
                        style={{width:38,height:38,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.onItemClick("yxemail")}
                        activeOpacity={1}
                    >
                        <AntDesign
                            name={'mail'}
                            size={20}
                            style={{color:'#999',marginRight: 6,marginTop: 20}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Toast ref={'toast'}
                position={'center'}
            />
        </View>
        return (
            <View>
                {navigatorBar}
                {content}
            </View>
        )
    }

}