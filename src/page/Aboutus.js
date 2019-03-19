import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { WhiteSpace,WingBlank,Flex,InputItem,List } from '@ant-design/react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';

class Aboutus extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNum: '',
            checkNum : ''
        }
    }

    static navigationOptions = {
        header:null
    };

    leftButtonPart (imageRoad) {
        return (
            <TouchableOpacity
                onPress = {()=>this.clickPage('back')}
            >
                <Image style={{width:25,height:25,margin:10}}
                    source={imageRoad}
                ></Image>
            </TouchableOpacity>
        )
    }

    clickPage(pageName) {
        if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <NavigationBar  title={'关于我们'}/>
                <ScrollView style={styles.container}>
                    <View style={{alignItems:"center",marginTop:60}}>
                        <Image
                            style={{width:50,height:50,borderRadius:6}}
                        ></Image>
                    </View>
                    <Text
                        style={{textAlign:"center",marginTop:20}}
                    >FL.091979</Text>
                </ScrollView>
            </View>
            
        )
    }
}

export default Aboutus;


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