import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View
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

  renderHeader() {
    return (
      <View>
        <View style={styles.headerSearch}>
        </View>
        <View style={styles.headerFilter}>
        </View>
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
  },
  headerSearch: {
  },
  headerFilter: {
  },
  content: {
  }
});