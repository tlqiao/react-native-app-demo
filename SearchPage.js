'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
} from 'react-native';

export default class SearchPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: '',
        };
    }

    _handleResponse = (response) => {
        this.setState({isLoading: false, message: ''});
        console.log('result found: ' + response.length);
        // navigation.navigate('Result');
    };

    _onSearchTextChanged = (event) => {
        console.log('_onSearchTextChanged');
        this.setState({searchString: event.nativeEvent.text});
        console.log('Current: ' + this.state.searchString + ', Next: ' + event.nativeEvent.text);
    };

    _executeQuery = () => {
        console.log('begin to call api')
       return fetch('https://conduit.productionready.io/api/articles?limit=10&offset=0', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            // .then(json => this._handleResponse(json.response))
            .then((json) => { return json.response})
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                })
            });
        this.setState({isLoading: true});
        console.log("finish call api")
    };

    _getMoviesFromApi = () => {
       fetch('https://reactnative.dev/movies.json')
            .then((response) => response.json())
            .then((json) => {
                console.log(json.movies);
                this._handleResponse(json.movies)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    _onSearchPressed = () => {
        this._getMoviesFromApi();
    };


    render() {
        console.log('SearchPage.render');
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Search for houses to buy!</Text>
                <Text style={styles.description}>
                    Search by place-name or postcode.
                </Text>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={styles.searchInput}
                    value={this.state.searchString}
                    onChange={this._onSearchTextChanged}
                    placeholder="Search via name or postcode"
                />
                <Button onPress={this._onSearchPressed
                } color="#48BBEC" title="Go"/>
                <Image source={require('./Resources/house.png')} style={styles.image}/>
                {spinner}<Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    image: {
        width: 217,
        height: 138,
    },
});
