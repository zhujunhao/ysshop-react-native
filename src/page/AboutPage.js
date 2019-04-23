import React, { Component } from 'react';
import {View,Text,Image,Clipboard,TouchableWithoutFeedback} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import GlobalStyles from '../ask/styles/GlobalStyles';
import BackPressComponent from '../common/BackPressComponent';
import Toast from 'react-native-easy-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';


export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        console.log("uuu",JSON.stringify(this.props))
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
        this.params = this.props.navigation.state.params;
        this.state = {
            coptext:'Mr_zhu2013'
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

    async copy(){
        Clipboard.setString(this.state.coptext);
        this.refs.toast.show('已经复制到粘贴板');
        let  str = await Clipboard.getString();
        console.log(str)//我是文本
    }

    render() {
        const { theme } = this.params;
        const { coptext } = this.state;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'关于悦达人'}
                                style={theme.styles.navBar}
                            />
        
        const content = <View>
            <View style={{flex:1,alignItems:'center'}}>
                <Image
                    resizeMode={('contain')}
                    style={{width:300,height:300,marginTop:100}}
                    source={require('../../res/aboutme.png')}
                ></Image>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:20,fontSize:13}}>微信号：</Text>
                    <Text style={{marginTop:20,fontSize:13}}>{coptext}</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.copy.bind(this)}>
                    <View style={{width:60,height:20,alignItems:'center',backgroundColor:theme.themeColor,borderRadius:10,marginTop:10,justifyContent:'center'}}>
                        <Text style={{fontSize:13,color:"#fff"}}>复制</Text>
                    </View>
                </TouchableWithoutFeedback>
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