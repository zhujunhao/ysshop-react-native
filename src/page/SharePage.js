import React,{ Component } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { WhiteSpace,WingBlank,Flex,InputItem,List,Button } from '@ant-design/react-native';

class SharePage extends Component {




    render(){
        return (
            <ScrollView>
                <WingBlank>
                    <Flex direction={"column"} style={{flex:1}}>
                        <Flex.Item style={{height:200}}>
                            <Image
                                style={{height: 160}}
                                resizeMode={('contain')}
                            ></Image>
                        </Flex.Item>
                        <Flex.Item style={{height:100}}>
                            <Text style={{textAlign:"center",fontSize:20}}>把好的跟朋友一起分享</Text>
                            <WhiteSpace></WhiteSpace>
                            <Text style={{textAlign:"center",fontSize:16}}>邀请好友双倍积分</Text>
                        </Flex.Item>                    
                        <Flex direction={"row"}>
                            <Flex direction={"column"} style={{flex:1}}>
                                <View>
                                    <Image
                                        style={{width: 33, height: 33,borderRadius:6}}
                                    ></Image>
                                </View>
                                <Text style={{textAlign:"center",fontSize:13,color:'#333',marginTop:5}}>微信好友</Text>
                            </Flex>
                            <Flex direction={"column"} style={{flex:1}}>
                                <View>
                                    <Image
                                        style={{width: 33, height: 33,borderRadius:6}}
                                    ></Image>
                                </View>
                                <Text style={{textAlign:"center",fontSize:13,color:'#333',marginTop:5}}>微信朋友圈</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </WingBlank>
            </ScrollView>
        )
    }

}

export default SharePage;