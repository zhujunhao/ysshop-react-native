import React, {Component} from 'react';
import {Modal,Text,TouchableOpacity, StyleSheet, View, Platform, DeviceInfo} from 'react-native';


export default class ShowDialog extends Component {
    state = {
        visible: false
    };

    show() {
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    }

    render() {
        const {onClose, onSelect} = this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => onClose}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.dismiss()}
                    activeOpacity={1}
                >
                    <View style={styles.content}>
                        <Text style={styles.textPart}>文字部分</Text>
                    </View>

                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex:1,
        alignItems: 'center',
        paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingTop: 6,
        paddingBottom: 6,
        width: 360,
        height: 260
    },
    textPart: {
        fontSize: 14,
        color: "#eee"
    }
})