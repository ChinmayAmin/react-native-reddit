import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ListView,
  Picker
} from 'react-native';

var _ = require('lodash');
var reddit = require('./RedditApi');

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

  	this.state = {
  		ds: [],
  		dataSource:ds,
      defaultSubredditList: [],
      currentSubreddit: 'gadgets',
      currentFilter: 'top',
      reloading: true
    }
}

  getInitialData() {
    reddit.getDefaultSubreddits().then((response) => {
      let names = [];
      _.each(response, function(subreddit) {
        names.push(
          subreddit.url.split('/r/')[1].split('/')[0]
        );
      });
      return names;
    }).then((names) => {
      this.setState({
        defaultSubredditList: names,
        currentSubreddit: names[0],
        reloading: false
      })
    }).then((names) => {
      reddit.getSubredditData(this.state.currentSubreddit).then((response) => {
        let storyHeading = [];
        _.each(response, function(subredditStory) {
          storyHeading.push(subredditStory.title);
        })
        return storyHeading;
      }).then((storyHeading) => {
        this.setState({
          ds: storyHeading,
          dataSource:this.state.dataSource.cloneWithRows(storyHeading),
          reloading: false
        })
      }).catch((error) => {
      	  console.warn(error);
    	}).done();
    }).catch((error) => {
    	  console.warn(error);
  	}).done();

  }

  componentDidMount() {
    this.getInitialData();
  }

  renderLoadingView() {
    return (
      <View style={styles.content}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }

  onDropDownClick(name) {
    reddit.getSubredditData(name).then((response) => {
      let storyHeading = [];
      _.each(response, function(subredditStory) {
        storyHeading.push(subredditStory.title);
      });
      return storyHeading;
    }).then((storyHeading) => {
      this.setState({
        currentSubreddit: name,
        ds: storyHeading,
        dataSource:this.state.dataSource.cloneWithRows(storyHeading)
      })
    }).catch((error) => {
    	  console.warn(error);
  	}).done();
  }

  onDropDownFilterClick(filter) {
    this.setState({
      currentFilter: filter,
      reloading: true
    });

    reddit.getSubredditDataWithFilter(this.state.currentSubreddit, this.state.currentFilter.toLowerCase()).then((response) => {
      let storyHeading = [];

      if(_.isEmpty(response)) {
        storyHeading.push('No data');
      }

      _.each(response, function(subredditStory) {
        storyHeading.push(subredditStory.title || subredditStory.link_title);
      });

      return storyHeading;
    }).then((storyHeading) => {
      this.setState({
        currentSubreddit: this.state.currentSubreddit,
        ds: storyHeading,
        reloading: false,
        dataSource:this.state.dataSource.cloneWithRows(storyHeading),
        reloading: false
      })
    }).catch((error) => {
        console.warn(error);
    }).done();
  }

  onRefreshClicked() {
    this.setState({
      reloading: true
    });

    reddit.getSubredditData(this.state.currentSubreddit).then((response) => {
      let storyHeading = [];
      _.each(response, function(subredditStory) {
        storyHeading.push(subredditStory.title);
      });
      this.setState({
        currentSubreddit: this.state.currentSubreddit,
        ds: storyHeading,
        reloading: false,
        dataSource:this.state.dataSource.cloneWithRows(storyHeading)
      })
      return storyHeading;
    }).catch((error) => {
    	  console.warn(error);
  	}).done();
  }

  headerButtonsPressed(itemPressed) {
  }
  populateSearchPickerItems() {
    return _.reduce(this.state.defaultSubredditList, function(result, subreddit) {
      result.push(<Picker.Item label={subreddit} value={subreddit} />);
      return result;
    }, []);
  }

  populateFilterPickerItems() {
    let filters = ['New', 'Rising', 'Top', 'Gilded', 'Controversial'];
    let result = [];
    _.each(filters, function(filter) {
      result.push(<Picker.Item label={filter} value={filter} />);
    }, []);
    return result;
  }

  renderHeaderSearch() {
    return (
    	<View style={styles.headerSearch}>
    	<View style={styles.hamburger}>
    	<TouchableHighlight onPress={this.headerButtonsPressed('hamburger')} underlayColor="#5C5C5C">
    		<Image source={require('./hamburger.png')} style={{height: 30, width: 30}}/>
    	</TouchableHighlight>
    	</View>
    	<View style={styles.subredditDropdown}>
        <Picker
           selectedValue={this.state.currentSubreddit}
           onValueChange={(name) => this.onDropDownClick(name)}
           mode={'dropdown'}
           >
           {this.populateSearchPickerItems()}
        </Picker>
    	</View>
    	<View style={styles.space}/>
    	<View style={styles.search}>
    		<TouchableHighlight onPress={this.headerButtonsPressed('search')} underlayColor="#5C5C5C">
    			<Image source={require('./search.png')} style={{height: 35, width: 35}}/>
    		</TouchableHighlight>
    	</View>
    	<View style={styles.refresh}>
    		<TouchableOpacity onPress={() => this.onRefreshClicked()}>
    		<Image source={require('./refresh.png')} style={{height: 30, width: 30}}/>
    	</TouchableOpacity>
    	</View>
    	<View style={styles.sidebar}>
        <TouchableHighlight onPress={this.headerButtonsPressed('sidebar')} underlayColor="#5C5C5C">
            <Image source={require('./sidebar.png')} style={{height: 30, width: 30}}/>
        </TouchableHighlight>
    	</View>
    	</View>
    );
  }

  renderHeaderFilter() {
    return (
      <View style={styles.headerFilter}>
        <TouchableHighlight onPress={this.headerButtonsPressed('FilterText')} underlayColor="#7A7A7A">
          <Text style={styles.headerFilterText}> What's hot </Text>
        </TouchableHighlight>
        <View style={styles.headerFilterDropdown}>
          <Picker
             selectedValue={this.state.currentFilter}
             onValueChange={(name) => this.onDropDownFilterClick(name)}
             mode={'dropdown'}
             >
             {this.populateFilterPickerItems()}
          </Picker>
        </View>
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
    if (this.state.reloading) {
      return this.renderLoadingView();
    }

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
		width: 190
	},
	space: {
		width: 20
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
		width: 1,
		fontSize: 18
	},
	headerFilterDropdown: {
    paddingTop: -10,
    width: 340
	},
  content: {
    flex: .75,
    alignSelf: "stretch",
    backgroundColor: '#9087BD'
  },
  row:{
    flex:1,
    flexDirection:'row',
    paddingTop:18,
    borderBottomWidth: 0.2,
    borderColor: '#d7d7d7'
  }
});
