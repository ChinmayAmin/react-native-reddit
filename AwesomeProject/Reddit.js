import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  Image,
  ListView,
  Picker
} from 'react-native';

var _ = require('lodash');

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      ds: this.getSubredditData(),
      dataSource:ds,
	  subreddit: ''
  }
}

  getSubredditData() {
    var data = [];
    for(var i = 0; i < 20; i++) {
      data.push('team' + i);
    }
    return data;
  }

  componentDidMount() {
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
		<View style={styles.headerSearch}>
			<View style={styles.hamburger}>
      			<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
					<Image source={require('./hamburger.png')} style={{height: 30, width: 30}}/>			 
    	  		</TouchableHighlight>
			</View>
			<View style={styles.subredditDropdown}>	
				<Picker
					 selectedValue={this.state.subreddit}
  					 onValueChange={(subreddit) => this.setState({subreddit: subreddit})}>
					 <Picker.Item label="Front Page" value="Front Page" />
  					 <Picker.Item label="All" value="js" />
				</Picker>
			</View>
			<View style={styles.space}/>
			<View style={styles.search}>
				<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
					<Image source={require('./search.png')} style={{height: 35, width: 35}}/>			 
				</TouchableHighlight>
			</View>
			<View style={styles.refresh}>
				<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
					<Image source={require('./refresh.png')} style={{height: 30, width: 30}}/>			 
    	  		</TouchableHighlight>
			</View>
			<View style={styles.sidebar}>
				<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
					<Image source={require('./sidebar.png')} style={{height: 30, width: 30}}/>			 
    	  		</TouchableHighlight>
			</View>
		</View>
    );
  }

  renderHeaderFilter() {
    return (
     <View style={styles.headerFilter}>
      	<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
      	    <Text style={styles.headerFilterText}> What's hot </Text>
    	</TouchableHighlight>	
		<View style={styles.filterSpace}/>
      	<TouchableHighlight onPress={this.headerSearchButtonsPressed}>
			<Image source={require('./filter.png')} style={{height: 35, width: 35}}/>			 
    	</TouchableHighlight>
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
      <TouchableHighlight onPress={()=> this.pressRow(rowData)} underlayColor = '#3D3D3D'>
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
      flexDirection: 'column',
	  alignSelf: "stretch"
    },
    header: {
      flex: .15,
	  alignSelf: "stretch"
    },
	headerSearch: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: "stretch",
		backgroundColor: '#5C5C5C'
	},
	hamburger: {
		paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15	
	},
	subredditDropdown: {
		width: 145
	},
	space: {
		width: 50
	},
	search: {
		paddingTop: 7,
		paddingRight: 5,
		width: 35,
		height: 35
	},
	refresh: {
		paddingTop: 8,
		width: 30,
		height: 30
	},
	sidebar: {
		paddingTop: 8,
		width: 35,
		height: 35
	},
	headerFilter: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: "stretch",
		backgroundColor: '#7A7A7A',
		paddingTop: 15,
		paddingLeft: 15
	},
	headerFilterText: {
		width: 150,
		fontSize: 18
	},
	filterSpace: {
		width: 145
	},
	headerFilterDropdown: {
		width: 35,
		height: 35
	},
    content: {
      flex: .75,
	  alignSelf: "stretch",
	  backgroundColor: '#9087BD'
    },
    row:{
      flex:1,
      flexDirection:'row',
      padding:18,
      borderBottomWidth: 0.2,
      borderColor: '#d7d7d7',
    }
});
