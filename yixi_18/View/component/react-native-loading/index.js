
'use strict';

import React, { Component } from 'react';
import styles from "./styles";
import {
   View,
   Text,
   ActivityIndicator,
   StyleSheet
} from 'react-native';

class SleekLoadingIndicator extends Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
            <View style={[styles.loadingContainer,this.props.style]}>
              <View style={styles.spinnerContainer}>
                <ActivityIndicator animating={true} size='large'/>
              </View>
              <Text style={styles.loadingText}>{this.props.text}</Text>
           </View>
        </View>
      );
    } else {
      return null;
    }
  }
}



export default SleekLoadingIndicator;




