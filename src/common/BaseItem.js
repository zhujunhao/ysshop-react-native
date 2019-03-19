import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTMLView from 'react-native-htmlview';
import {PropTypes} from 'prop-types';

export default class BaseItem extends Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
        }
    }

    /**
     * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
     * componentWillReceiveProps在新版React中不能再用了
     * @param nextProps
     * @param prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.projectModel.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite,
            };
        }
        return null;
    }

    setFavoriteState(isFavorite) {
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
        })
    }

    onItemClick() {
        this.props.onSelect(isFavorite => {
            this.setFavoriteState(isFavorite);
        });
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }

    _favoriteIcon() {
        const {theme} = this.props;
        return <TouchableOpacity
            style={{padding: 6}}
            activeOpacity={1}
            underlayColor='transparent'
            onPress={() => this.onPressFavorite()}>
            <AntDesign
                name={this.state.isFavorite ? 'heart' : 'hearto'}
                size={18}
                style={{color: theme.themeColor}}
            />
        </TouchableOpacity>
    }
}
