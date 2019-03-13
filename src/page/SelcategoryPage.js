import React, {Component} from 'react';
import {Alert,ScrollView, StyleSheet,View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index';
import NavigationUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';
import CategoryDao ,{FLAG_CATEGORY} from '../ask/categoryDao';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import ArrayUtil from '../util/ArrayUtil';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
class SelcategoryPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e)=> this.onBackPress(e)});
        this.changeValues = [];
        this.isRemoveKey = false;
        this.categoryDao = new CategoryDao(FLAG_CATEGORY.flag_category);
        this.state = {
            keys: []
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.keys !== SelcategoryPage._keys(nextProps, null, prevState)) {
    //         return {
    //             keys: SelcategoryPage._keys(nextProps, null, prevState),
    //         }
    //     }
    //     return null;
    // }

    componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签为空则本地存储中获取标签
        if (SelcategoryPage._keys(this.props.category).length === 0) {
            let {onLoadCategory} = this.props;
            onLoadCategory(FLAG_CATEGORY.flag_category)
        }
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }

    
    componentWillMount() {
        this.setState({
            keys: SelcategoryPage._keys(this.props.category),
        })
    }

    /**
     * 获取标签
     */
    
    static _keys(props, original, state) {
        let key = "categorys";
        if (this.isRemoveKey && !original) {
            //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {//注意：不直接修改props，copy一份
                    ...val,
                    checked: false
                };
            });
        } else {
            return props[key]
        }
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    onSave() {
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return;
        }
        let keys;
        if (this.isRemoveKey) {//移除标签的特殊处理
            for (let i=0, l = this.changeValues.length; i<l;i++) {
                ArrayUtil.remove(keys = SelcategoryPage._keys(this.props.category,true),this.changeValues[i],"name");
            }
        }
        //更新本地数据
        this.categoryDao.save(keys || this.state.keys);
        const {onLoadCategory} = this.props;
        //更新store
        onLoadCategory(FLAG_CATEGORY.flag_category);
        NavigationUtil.goBack(this.props.navigation);
    }

    renderView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i=0,l = len;i<l;i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i],i)}
                        {i + 1 < len ? this.renderCheckBox(dataArray[i + 1], i+1) : <View style={{flex:1,padding:10,marginLeft:6,marginRight:6}}></View>}
                    </View>
                </View>
            )
        }
        return views;
    }

    onClick(data,index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues,data);
        this.state.keys[index] = data;//更新state以便选中状态
        this.setState({
            keys: this.state.keys
        })
    }

    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert('提示','要保存修改吗？',[
                {
                    text: '否',onPress:() => {
                        NavigationUtil.goBack(this.props.navigation)
                    }
                },{
                    text: '是',onPress: ()=> {
                        this.onSave();
                    }
                }
            ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    _CheckedImage(checked) {
        const {theme} = this.params;
        return <AntDesign
            name={checked ? 'checkcircle' : 'checkcircleo'}
            size={20}
            style={{
                color: theme.themeColor
            }}
        />
    }

    renderCheckBox(data,index) {
        return <CheckBox
            style={styles.checkBoxPart}
            onClick={()=> this.onClick(data,index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._CheckedImage(true)}
            unCheckedImage={this._CheckedImage(false)}
        />
    }

    render() {
        const {theme} = this.params;
        let title = this.isRemoveKey ? '移除喜好' : '自定义喜好';
        title =  '自定义喜好'
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(()=> this.onBack())}
            style={theme.styles.navBar}
            rightButton = {ViewUtil.getRightButton(rightButtonTitle, () => this.onSave())}
        />
        return <SafeAreaViewPlus
            style={styles.container}
            topColor={theme.themeColor}
        >
            {navigationBar}
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </SafeAreaViewPlus>
    }
}

const mapRecommendStateToProps = state => ({
    category: state.category
})

const mapRecommendDispatchToProps = dispatch => ({
    onLoadCategory: (flag) => dispatch(actions.onLoadCategory(flag))
})

export default connect(mapRecommendStateToProps,mapRecommendDispatchToProps)(SelcategoryPage);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        height:60,
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        marginTop:5
    },
    checkBoxPart: {
        flex:1,
        height:60,
        padding:10,
        marginLeft:6,
        marginRight:6,
        backgroundColor:"#eee",
        borderRadius:8
    }
})
