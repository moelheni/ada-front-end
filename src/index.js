import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import App from './App'

import reducers from './reducers/'

import { BrowserRouter } from 'react-router-dom'

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'https://ada.gomycode.tn',
  responseType: 'json'
});

const configureStore = () => {
  return createStore(
    reducers,
    applyMiddleware(axiosMiddleware(client))
  );
}
const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter onUpdate={() => console.log("hey")}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
