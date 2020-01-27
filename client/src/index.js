import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';

const store = createStore(
  rootReducer,
  undefined /* preloadedState, */,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
  , document.getElementById('root')
);