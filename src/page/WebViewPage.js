import React, { Component } from 'react';
import { DeviceInfo, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import GlobalStyles from '../ask/styles/GlobalStyles';

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const { title,url } = this.params;
        this.state = {
            title : title,
            url: url,
            canGoBack: false
        };
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillMount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            leftButton={ViewUtil.getLeftBackButton(()=> this.onBackPress())}
        />;

        return (
            <SafeAreaViewPlus
                style= {GlobalStyles.root_container}
                topColor= {'#ff4800'}
            >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </SafeAreaViewPlus>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0
    }
})