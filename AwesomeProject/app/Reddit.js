import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }

  headerSearchButtonsPressed() {

  }

  renderHeaderSearch() {
    return (
      <View>
        <TouchableHighlight onPress={this.headerSearchButtonsPressed}>
          <Image source={{uri: 'assets/hamburger.png'}}
           style={styles.hamburger} />
          </TouchableHighlight>
      </View>
    );
  }

  renderHeaderFilter() {
    return (
      <View>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        {this.renderHeaderSearch()}
        {this.renderHeaderFilter()}
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.content}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    header: {
      flex: .15,
      backgroundColor: '#FF3366' 
    },
    content: {
      flex: .75,
      backgroundColor: '#000' 
    },
    hamburger: {
      width: 50, 
      height: 50,
      marginLeft: 10,
      marginTop: 10
    }
});