import React, { Component } from 'react';
import { View, Linking, Clipboard } from 'react-native';
import NavigationUtil from '../../navigators/NavigatorUtil';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../../res/data/config';
import GlobalStyles from '../../ask/styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'

const THEME_COLOR = '#678';

export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about_me,
        },data => this.setState({...data}))
    }

    onClick() {

    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR)
    }

    _item(data,isShow,key) {
        return ViewUtil.getSettingItem(() => {
            this.setState({
                [key]: !this.state[key]
            });
        },data.name,'#ff4800',Ionicons,data.icon,isShow ? 'ios-arrow-up' : 'ios-arrow-down')
    }

    /**
     * 显示数据列表
     * @param dic
     * @param isShowAccount
     */

     renderItem(dic,isShowAccount) {
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i]
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(() => onClick(dic[i]),title,'#ff4800')}
                    <View style={GlobalStyles.line}></View>
                </View>
            )
        }
        return views;
     }

     render() {
         const content = <View>
            {this._item(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
            <View style={GlobalStyles.line}/>
            {this.state.showTutorial ? this.renderItems(this.state.data.aboutMe.Tutorial.items) : null}

            {this._item(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(this.state.data.aboutMe.Blog.items) : null}

            {this._item(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(this.state.data.aboutMe.QQ.items, true) : null}

            {this._item(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(this.state.data.aboutMe.Contact.items, true) : null}
         </View>
         return <View style={{flex:1}}>
            {this.aboutCommon.render(content, this.state.data.author)}
            <Toast ref={toast => this.toast = toast}
                   position={'center'}
            />
         </View>
     }

}