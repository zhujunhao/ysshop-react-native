import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
        this.params = this.props.navigation.state.params;
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

    render() {
        const { theme } = this.params;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'关于悦达人'}
                                style={theme.styles.navBar}
                            />
        
        const content = <View>
            <View style={{flex:1,alignItems:'center'}}>
                <View style={{height:80,marginTop:46, alignItems:'center'}}>
                    <Image style={{height: 80, width: 80}}
                        source={require('../../res/ydrlogo.png')}
                    />
                </View>
                <View style={{flexDirection:'column',height:80,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{marginTop:20,fontSize:14}}>购物前.淘张券</Text>
                    <Text style={{marginTop:10,fontSize:13}}>version</Text>
                    <Text style={{marginTop:5,fontSize:13}}>1.0.1</Text>
                </View>
            </View>
        </View>
        return (
            <View>
                {navigatorBar}
                {content}
            </View>
        )
    }
}