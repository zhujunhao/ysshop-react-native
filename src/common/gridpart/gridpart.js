import React,{ Component } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { Grid } from '@ant-design/react-native';


const categoryArr = [
    {"categoryName":"9块9包邮","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/268/20181205192611.png"},
    {"categoryName":"淘抢购","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/268/20181205192611.png"},
    {"categoryName":"聚划算","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/268/20181205192611.png"},
    {"categoryName":"品牌精选","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/462/20181204094921.png"},
    {"categoryName":"今日疯抢","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/268/20181205192611.png"},
    {"categoryName":"夺宝岛","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/463/20181204095805.png"},
    {"categoryName":"砍价精品","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/464/20181204105336.png"},
    {"categoryName":"拼团火拼","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/465/20181204105806.png"},
    {"categoryName":"严选专区","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/465/20181204105806.png"},
    {"categoryName":"京东专区","logoLoad":"http://gdrcumall.oss-cn-shenzhen.aliyuncs.com/TopMall/indexPage/465/20181204105806.png"}
]

const data = categoryArr.map((_val, i) => ({
    icon: categoryArr[i].logoLoad,
    text: categoryArr[i].categoryName,
  }));

class GridPart extends Component {
    render() {
        return (
            <View style={[{ padding: 10 }]}>
                <Grid data={data} hasLine={false} columnNum={5}/>
            </View>
        );
    }
}


export default GridPart;