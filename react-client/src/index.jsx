import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tweets: [],
      searchTerm: ''
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/home',
    //   success: (data) => {
    //     console.log('data in componentDidMount => ', data);
    //     this.setState({
    //       tweets: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  handleUserInput(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    $('.search-term-input').val('');
    const context = this;

    $.ajax({
      url: '/search',
      method: 'POST',
      data: {searchTerm: context.state.searchTerm},
      success: (data) => {
        context.setState({
          tweets: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <div className="search-container">
          <form onSubmit={ this.handleSearch }>
          <label>
            Enter term or username to search Twitter for: 
            <input type="text" className="search-term-input" value={this.state.searchTerm} onChange={this.handleUserInput} />
          </label>
            <input type="submit" value="Search Twitter" />
          </form>
        </div>
        <div>
          <h1>List items: </h1>
          <List tweets={this.state.tweets}></List>
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));