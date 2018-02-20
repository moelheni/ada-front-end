import React, { Component } from 'react';

import Main from './Main'

class App extends Component {
  componentDidUpdate(){
   window.scrollTo(0, 0)
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}


export default App;
