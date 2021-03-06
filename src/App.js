import React, { Component } from 'react';
import './App.css';
// import Search from './components/Search';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE  = 0;
const PATCH_BASE = 'https://hn.algolia.com/api/v1';
const PATCH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = "page="

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
    setSearchTopstories(result){
      this.setState({result})
    }

    fetchSearchTopstories(searchTerm){
      fetch(`${PATCH_BASE}${PATCH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
    }

    componentDidMount(){
      const {searchTerm} = this.state;
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ 
      result: {...this.state.result, hits: updatedHits} 
    });
  }

  render() {
    const { searchTerm, result } = this.state;
    // if(!result) {return null;}
    return (
      <div className="page">
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}>
              Search
            </Search>
          </div>
         { result &&
         <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
         }
      </div>
    );
  }
}


const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ list,  onDismiss }) =>
  <div className="table">
    { list.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

export default App;