import React, { Component } from 'react';
import {View,Text,Image,Clipboard,TouchableWithoutFeedback} from 'react-native';
import NavigationUtil from '../../navigators/NavigatorUtil';
import GlobalStyles from '../../ask/styles/GlobalStyles';
import config from '../../../res/data/config';
import BackPressComponent from '../../common/BackPressComponent';
import AboutCommon, { FLAG_ABOUT } from './AboutCommon';
import Toast from 'react-native-easy-toast';


export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        console.log("uuu",JSON.stringify(this.props))
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
                ...this.props,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about_me
            },data => this.setState({...data})
        )
        this.state = {
            data: config,
            coptext:'Mr_zhu2013'
        }
    };

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation)
    }

    async copy(){
        Clipboard.setString(this.state.coptext);
        this.refs.toast.show('已经复制到粘贴板');
        let  str = await Clipboard.getString();
        console.log(str)//我是文本
    }

    render() {
        const { theme } = this.params
        const { coptext } = this.state;
        const content = <View>
            <View style={{flex:1,alignItems:'center'}}>
                <Image
                    resizeMode={('contain')}
                    style={{width:300,height:300,marginTop:100}}
                    source={require('../../../res/aboutme.png')}
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
        return this.aboutCommon.render(content,this.state.data.app)
    }

}