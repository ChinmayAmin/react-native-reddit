import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  Image,
  ListView
} from 'react-native';

var _ = require('lodash');

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    var subreddit = 'all';

    this.getSubredditsData(subreddit).then(function(data) {
      console.log(data);
    })
    // console.log(this.getSubredditsData('all'));
    this.state = {
      ds: this.getSubredditData(),
      dataSource:ds,
      subreddit: subreddit
    }
  }

  async getSubredditsData(subredditName) {
    try {
      let response = await fetch('http://reddit.com/r/' + subredditName + '/.json');
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      // Handle error
      console.error(error);
    }
  }

  getSubredditData() {
    var data = [];
    for(var i = 0; i < 20; i++) {
      data.push('team' + i);
    }
    return data;
  }

  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds)
    })
  }

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
      <TouchableHighlight onPress={this.headerSearchButtonsPressed} underlayColor ='rgba(0,0,0,0)'>
          <Image
            source={{uri: './hamburger.png'}}
            style={styles.thumbnail}
          />
      </TouchableHighlight>
    );
  }

  renderHeaderFilter() {
    return (
      <View>
      </View>
    );
  }

  pressRow(rowData){

  }

  renderHeader() {
    return (
      <View style={styles.header}>
        {this.renderHeaderSearch()}
        {this.renderHeaderFilter()}
      </View>
    );
  }

  renderRow(rowData){
    return (
      <TouchableHighlight onPress={()=> this.pressRow(rowData)} underlayColor = '#ddd'>
        <View style ={styles.row}>
          <Text style={{fontSize:18}}> {rowData} </Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderContent() {
    return (
      <View style={styles.content}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}>
        </ListView>
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
      flex: .15
    },
    content: {
      flex: .75
    },
    row:{
      flex:1,
      flexDirection:'row',
      padding:18,
      borderBottomWidth: 1,
      borderColor: '#d7d7d7',
    }
});