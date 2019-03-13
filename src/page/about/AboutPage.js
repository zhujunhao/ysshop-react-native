import React, { Component } from 'react';
import {View,Text} from 'react-native';
import NavigationUtil from '../../navigators/NavigatorUtil';
import GlobalStyles from '../../ask/styles/GlobalStyles';
import config from '../../../res/data/config';
import BackPressComponent from '../../common/BackPressComponent';
import AboutCommon, { FLAG_ABOUT } from './AboutCommon';


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
            data: config
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

    render() {
        const content = <View>
            <View style={GlobalStyles.line}>
            </View>
        </View>
        return this.aboutCommon.render(content,this.state.data.app)
    }

}