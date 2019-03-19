import React,{ Component } from 'react';
import { StyleSheet, Text, View ,Image } from 'react-native';
import { Carousel } from '@ant-design/react-native';


class SwiperArr extends Component {
    render () {
        return (
            <View>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={1}
                    autoplay
                    infinite
                    afterChange={this.onHorizontalSelectedIndexChange}
                >
                <View
                    style={[styles.containerHorizontal]}
                >
                  <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'http://img.haodanku.com/FmPL7ZRZK8_9JvhBLEN-fQaMtq_3'}}
                  ></Image>
                </View>
                <View
                    style={[styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'http://img.haodanku.com/FmPL7ZRZK8_9JvhBLEN-fQaMtq_3'}}
                  ></Image>
                </View>
                <View
                    style={[
                    styles.containerHorizontal
                    ]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'http://img.haodanku.com/Fo5poa05S1lZSmRXYMBy7KCOoi8s'}}
                  ></Image>
                </View>
                <View
                    style={[styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'http://img.haodanku.com/Ftgn6CSOnGrfJAfwIv9lvHvdAcQe'}}
                    ></Image>
                </View>
                <View
                    style={[
                    styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'http://img.haodanku.com/Fozo62JBx7cnix4WfneZ5LXGs5Hg'}}
                    ></Image>
                </View>
                </Carousel>
            </View>
        )
    }

}

export default SwiperArr;

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
    },
    containerHorizontal: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 160,
    },
    containerVertical: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 160,
    },
    text: {
      color: '#fff',
      fontSize: 36,
    },
  });