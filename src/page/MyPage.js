import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {onThemeChange} from '../../action/theme';
import { ScrollView, StyleSheet, Text, View,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import { MORE_MENU } from '../common/MORE_MENU';
import GlobalStyles from '../ask/styles/GlobalStyles';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
class MyPage extends Component {
  constructor(props){
      super(props);
      this.mobileNum = '';
      this.checkLogin();
      this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
  }

  LoginOutDel = () => {
    AsyncStorage.removeItem('loginStatus');
    NavigatorUtil.resetToHomePage({
        navigation: this.props.navigation
    })
  }

  checkLogin = () => {
    AsyncStorage.getItem('loginStatus').then((value) => {
        if (value) {
            console.log("valParsein",value);
            let valParse = JSON.parse(value)
            this.mobileNum = valParse.mobileNum
            this.forceUpdate();
            
        } else {
            
        }
    }).catch(() => {
       
    });
  }

  onClick = (menu)=> {
      switch(menu) {
            case MORE_MENU.MyInfo:
                RouteName = 'MyinfoPage';
                break;
            case MORE_MENU.Myfavorite:
                RouteName = 'FavoritePage';
                break;
            case MORE_MENU.ChangeMobile:
                RouteName = 'ChangemobPage';
                break;
            case MORE_MENU.ChangePwd:
                RouteName = 'ForpwdPage';
                break;
            case MORE_MENU.AboutUs:
                RouteName = 'AboutPage';
                break;
            case MORE_MENU.ClearInfo:
                RouteName = 'AboutPage';
                break;
            case MORE_MENU.LoginOut:
                RouteName = 'LoginPage';
                break;
            case MORE_MENU.Sortcategory:
                RouteName = 'SortcategoryPage';
                break;
            case MORE_MENU.Selcategory:
                RouteName = 'SelcategoryPage';
                break;
            case MORE_MENU.CodePush:
                RouteName = 'CodePushPage';
                break;
            case MORE_MENU.Contactus:
                RouteName = 'ContactusPage';
                break;
      }
      if (RouteName) {
        NavigatorUtil.goPage(this.props,RouteName)
      }
  }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    ThemeBtn() {
        const {onShowCustomThemeView} = this.props;
        onShowCustomThemeView(true);
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    getItem = (menu) => {
        const {theme} = this.props;
        return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,theme.themeColor )
    }

  render() {
    const {theme} = this.props;
    let navigatorBar = <NavigatorBar
                            leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                            title = {'设置'}
                            rightButton = { ViewUtil.getThemeButton( () => this.ThemeBtn() ) }
                            style={theme.styles.navBar}
                        />
    return (
        <View style={GlobalStyles.root_container}>
            {navigatorBar}
            <ScrollView>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Selcategory)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sortcategory)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.AboutUs)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Contactus)}
                <View style={GlobalStyles.line}/>
                {this.mobileNum?<TouchableOpacity style={styles.out}
                    onPress={() => this.LoginOutDel()}
                >
                    <Text style={styles.outText}>退出登录</Text>
                </TouchableOpacity> : <View></View>}

            </ScrollView>
        </View>
    );
  }
}


const mapStateToProps = state => ({
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)

const styles = StyleSheet.create({
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    grounpTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    },
    out: {
        flex: 1,
        height: 50,
        marginTop: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    outText: {
        fontSize: 16
    }
})

