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
                      source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                  ></Image>
                </View>
                <View
                    style={[styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
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
                      source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                  ></Image>
                </View>
                <View
                    style={[styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
                    ></Image>
                </View>
                <View
                    style={[
                    styles.containerHorizontal]}
                >
                    <Image
                      style={{height: 160}}
                      resizeMode={('contain')}
                      source={{uri: 'https://img.alicdn.com/imgextra/i2/1756135147/O1CN0177ogWg1ntN27Q1Iof_!!1756135147.jpg_310x310.jpg'}}
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